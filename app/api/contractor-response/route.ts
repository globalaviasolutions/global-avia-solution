import { createHash } from "crypto";
import { NextResponse } from "next/server";

function config(){const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;return url&&key?{url,key}:null}
function clean(value:unknown,max=3000){return String(value??"").trim().slice(0,max)}
function hashToken(token:string){return createHash("sha256").update(token).digest("hex")}
function headers(key:string){return {apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"}}
async function findDispatch(token:string,c:{url:string;key:string}){
  const hash=hashToken(token);
  const response=await fetch(`${c.url}/rest/v1/contractor_dispatches?token_hash=eq.${hash}&select=*,contractors(company_name,contact_name,email),client_requests(service,country,location,required_date,people,urgency)&limit=1`,{headers:headers(c.key),cache:"no-store"});
  if(!response.ok)return null;
  return (await response.json())[0]||null;
}
export async function GET(request:Request){
  const c=config();if(!c)return NextResponse.json({message:"Service unavailable."},{status:503});
  const token=clean(new URL(request.url).searchParams.get("token"),128);if(!token)return NextResponse.json({message:"Invalid link."},{status:400});
  const dispatch=await findDispatch(token,c);if(!dispatch)return NextResponse.json({message:"This contractor request could not be found."},{status:404});
  if(new Date(dispatch.expires_at).getTime()<Date.now())return NextResponse.json({message:"This contractor response link has expired."},{status:410});
  await fetch(`${c.url}/rest/v1/contractor_dispatches?id=eq.${dispatch.id}`,{method:"PATCH",headers:headers(c.key),body:JSON.stringify({viewed_at:dispatch.viewed_at||new Date().toISOString(),status:dispatch.status==="Sent"?"Viewed":dispatch.status})});
  return NextResponse.json({dispatch:{id:dispatch.id,reference:dispatch.reference,status:dispatch.status,brief:dispatch.brief,responseDeadline:dispatch.response_deadline,expiresAt:dispatch.expires_at,contractor:dispatch.contractors,request:dispatch.client_requests,availability:dispatch.availability,quoteAmount:dispatch.quote_amount,currency:dispatch.currency,personnel:dispatch.personnel,transport:dispatch.transport,responseNotes:dispatch.response_notes}});
}
export async function POST(request:Request){
  const c=config();if(!c)return NextResponse.json({message:"Service unavailable."},{status:503});
  const body=await request.json() as Record<string,unknown>,token=clean(body.token,128),decision=clean(body.decision,40);
  if(!token||!["Accepted","Declined","Clarification"].includes(decision))return NextResponse.json({message:"Invalid response."},{status:400});
  const dispatch=await findDispatch(token,c);if(!dispatch)return NextResponse.json({message:"Request not found."},{status:404});
  if(new Date(dispatch.expires_at).getTime()<Date.now())return NextResponse.json({message:"This response link has expired."},{status:410});
  const payload={status:decision,availability:clean(body.availability,300),quote_amount:body.quoteAmount?Number(body.quoteAmount):null,currency:clean(body.currency,12)||null,personnel:clean(body.personnel,1000),transport:clean(body.transport,1000),response_notes:clean(body.responseNotes,3000),responded_at:new Date().toISOString()};
  const response=await fetch(`${c.url}/rest/v1/contractor_dispatches?id=eq.${dispatch.id}`,{method:"PATCH",headers:{...headers(c.key),Prefer:"return=representation"},body:JSON.stringify(payload)});
  if(!response.ok)return NextResponse.json({message:"Unable to save your response."},{status:502});
  return NextResponse.json({message:"Your response has been submitted successfully.",dispatch:(await response.json())[0]});
}
