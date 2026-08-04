import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";

function authorised(request:Request){const expected=process.env.OPERATIONS_DASHBOARD_KEY;const supplied=request.headers.get("x-operations-key")||"";return Boolean(expected&&supplied===expected)}
function config(){const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;return url&&key?{url,key}:null}
function clean(value:unknown,max=3000){return String(value??"").trim().slice(0,max)}
function headers(key:string){return {apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"}}
function hashToken(token:string){return createHash("sha256").update(token).digest("hex")}

export async function GET(request:Request){
  if(!authorised(request))return NextResponse.json({message:"Unauthorised."},{status:401});
  const c=config();if(!c)return NextResponse.json({message:"Database connection is not configured."},{status:503});
  const reference=clean(new URL(request.url).searchParams.get("reference"),60);
  const [contractorsResponse,dispatchesResponse]=await Promise.all([
    fetch(`${c.url}/rest/v1/contractors?select=*&order=company_name.asc`,{headers:headers(c.key),cache:"no-store"}),
    reference?fetch(`${c.url}/rest/v1/contractor_dispatches?reference=eq.${encodeURIComponent(reference)}&select=*,contractors(company_name,contact_name,email)&order=created_at.desc`,{headers:headers(c.key),cache:"no-store"}):null,
  ]);
  if(!contractorsResponse.ok)return NextResponse.json({message:"Unable to load contractors."},{status:502});
  const contractors=await contractorsResponse.json();
  const dispatches=dispatchesResponse&&dispatchesResponse.ok?await dispatchesResponse.json():[];
  return NextResponse.json({contractors,dispatches});
}

export async function POST(request:Request){
  if(!authorised(request))return NextResponse.json({message:"Unauthorised."},{status:401});
  const c=config();if(!c)return NextResponse.json({message:"Database connection is not configured."},{status:503});
  const body=await request.json() as Record<string,unknown>;
  const action=clean(body.action,30);
  if(action==="addContractor"){
    const companyName=clean(body.companyName,180),contactName=clean(body.contactName,160),email=clean(body.email,180).toLowerCase();
    if(!companyName||!email)return NextResponse.json({message:"Company name and email are required."},{status:400});
    const response=await fetch(`${c.url}/rest/v1/contractors`,{method:"POST",headers:{...headers(c.key),Prefer:"return=representation"},body:JSON.stringify({company_name:companyName,contact_name:contactName,email,phone:clean(body.phone,80),countries:clean(body.countries,500),services:clean(body.services,1000),rating:Number(body.rating)||null,notes:clean(body.notes,2000),status:"Active"})});
    if(!response.ok)return NextResponse.json({message:"Unable to add contractor."},{status:502});
    return NextResponse.json({contractor:(await response.json())[0]});
  }
  if(action!=="dispatch")return NextResponse.json({message:"Invalid action."},{status:400});
  const reference=clean(body.reference,60),contractorId=clean(body.contractorId,60),brief=clean(body.brief,5000),responseDeadline=clean(body.responseDeadline,60);
  if(!reference||!contractorId||!brief)return NextResponse.json({message:"Contractor, reference and brief are required."},{status:400});
  const contractorResponse=await fetch(`${c.url}/rest/v1/contractors?id=eq.${encodeURIComponent(contractorId)}&select=*&limit=1`,{headers:headers(c.key),cache:"no-store"});
  const requestResponse=await fetch(`${c.url}/rest/v1/client_requests?reference=eq.${encodeURIComponent(reference)}&select=reference,service,country,location,required_date,people,urgency&limit=1`,{headers:headers(c.key),cache:"no-store"});
  const contractor=(await contractorResponse.json())[0],clientRequest=(await requestResponse.json())[0];
  if(!contractor||!clientRequest)return NextResponse.json({message:"Contractor or request not found."},{status:404});
  const token=randomBytes(32).toString("hex"),tokenHash=hashToken(token),expiresAt=new Date(Date.now()+7*24*60*60*1000).toISOString();
  const insert=await fetch(`${c.url}/rest/v1/contractor_dispatches`,{method:"POST",headers:{...headers(c.key),Prefer:"return=representation"},body:JSON.stringify({reference,contractor_id:contractorId,token_hash:tokenHash,status:"Sent",brief,response_deadline:responseDeadline||null,expires_at:expiresAt})});
  if(!insert.ok)return NextResponse.json({message:"Unable to create contractor dispatch."},{status:502});
  const dispatch=(await insert.json())[0];
  const portalUrl=`https://security-solutions.africa/contractor-response?token=${token}`;
  let warning="";
  const apiKey=process.env.RESEND_API_KEY;
  if(apiKey){
    const from=process.env.RESEND_FROM_EMAIL||"Africa Security Solutions <onboarding@resend.dev>";
    const html=`<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#171717"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9a742f">Africa Security Solutions</p><h1>Contractor availability request</h1><p>Hello ${contractor.contact_name||contractor.company_name},</p><p>Please review the following operational request and submit your availability and quotation.</p><div style="padding:20px;background:#f5f2ea;border-left:4px solid #c9a052"><p><strong>Reference:</strong> ${reference}</p><p><strong>Service:</strong> ${clientRequest.service}</p><p><strong>Location:</strong> ${clientRequest.location}, ${clientRequest.country}</p><p><strong>Required date:</strong> ${clientRequest.required_date||"To be confirmed"}</p><p><strong>Brief:</strong><br>${brief.replace(/\n/g,"<br>")}</p></div><p><a href="${portalUrl}" style="display:inline-block;padding:13px 20px;background:#171717;color:white;text-decoration:none">Review and respond</a></p><p style="font-size:13px;color:#666">This link expires in 7 days. Acceptance is not a final work order until separately confirmed in writing.</p></div>`;
    const emailResponse=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[contractor.email],reply_to:"info@security-solutions.africa",subject:`${reference} — Contractor availability request`,html})});
    if(!emailResponse.ok)warning="Dispatch saved, but the contractor email could not be delivered.";
  }else warning="Dispatch saved, but RESEND_API_KEY is not configured.";
  return NextResponse.json({dispatch,portalUrl,warning});
}
