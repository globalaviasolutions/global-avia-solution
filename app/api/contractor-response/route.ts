import { createHash } from "crypto";
import { NextResponse } from "next/server";

function config(){const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;return url&&key?{url,key}:null}
function clean(value:unknown,max=3000){return String(value??"").trim().slice(0,max)}
function hashToken(token:string){return createHash("sha256").update(token).digest("hex")}
function headers(key:string){return {apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"}}
function escapeHtml(value:string){return value.replace(/[&<>'\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'\"':"&quot;"}[c]||c))}
async function findDispatch(token:string,c:{url:string;key:string}){
  const hash=hashToken(token);
  const response=await fetch(`${c.url}/rest/v1/contractor_dispatches?token_hash=eq.${hash}&select=*,contractors(company_name,contact_name,email),client_requests(service,country,location,required_date,people,urgency)&limit=1`,{headers:headers(c.key),cache:"no-store"});
  if(!response.ok)return null;
  return (await response.json())[0]||null;
}
async function notifyOperations(dispatch:Record<string,any>,payload:Record<string,any>){
  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey)return {sent:false,warning:"RESEND_API_KEY is not configured."};
  const from=process.env.RESEND_FROM_EMAIL||"Africa Security Solutions <onboarding@resend.dev>";
  const to=process.env.CONTRACTOR_RESPONSE_NOTIFICATION_EMAIL||"info@security-solutions.africa";
  const contractor=dispatch.contractors||{};
  const request=dispatch.client_requests||{};
  const reference=clean(dispatch.reference,80);
  const company=clean(contractor.company_name,180)||"Contractor";
  const decision=clean(payload.status,40);
  const quote=payload.quote_amount!==null&&payload.quote_amount!==undefined?`${payload.quote_amount} ${clean(payload.currency,12)}`:"Not provided";
  const dashboardUrl="https://security-solutions.africa/operations-dashboard";
  const html=`<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#171717"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9a742f">Africa Security Solutions</p><h1 style="font-size:30px;margin:12px 0">Contractor response received</h1><p><strong>${escapeHtml(company)}</strong> submitted a response for request <strong>${escapeHtml(reference)}</strong>.</p><div style="margin:26px 0;padding:22px;border-left:4px solid #c9a052;background:#f7f4ed"><p style="margin:0 0 8px;color:#666">Decision</p><h2 style="margin:0 0 18px">${escapeHtml(decision)}</h2><table style="width:100%;border-collapse:collapse"><tr><td style="padding:7px 0;color:#666">Service</td><td style="padding:7px 0;text-align:right">${escapeHtml(clean(request.service,160)||"Not specified")}</td></tr><tr><td style="padding:7px 0;color:#666">Location</td><td style="padding:7px 0;text-align:right">${escapeHtml([clean(request.location,120),clean(request.country,120)].filter(Boolean).join(", ")||"Not specified")}</td></tr><tr><td style="padding:7px 0;color:#666">Availability</td><td style="padding:7px 0;text-align:right">${escapeHtml(clean(payload.availability,300)||"Not provided")}</td></tr><tr><td style="padding:7px 0;color:#666">Quotation</td><td style="padding:7px 0;text-align:right"><strong>${escapeHtml(quote)}</strong></td></tr><tr><td style="padding:7px 0;color:#666">Personnel</td><td style="padding:7px 0;text-align:right">${escapeHtml(clean(payload.personnel,1000)||"Not provided")}</td></tr><tr><td style="padding:7px 0;color:#666">Transport</td><td style="padding:7px 0;text-align:right">${escapeHtml(clean(payload.transport,1000)||"Not provided")}</td></tr></table>${payload.response_notes?`<p style="margin:20px 0 7px;color:#666">Contractor comments</p><p style="margin:0;white-space:pre-line">${escapeHtml(clean(payload.response_notes,3000)).replace(/\n/g,"<br>")}</p>`:""}</div><p><a href="${dashboardUrl}" style="display:inline-block;padding:13px 20px;background:#171717;color:#fff;text-decoration:none">Open Operations Dashboard</a></p><p style="margin-top:26px;color:#666;font-size:13px">This is an internal notification. Review the contractor response before confirming any service commitment.</p></div>`;
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],reply_to:clean(contractor.email,180)||"info@security-solutions.africa",subject:`${reference} — ${company} responded: ${decision}`,html})});
  if(!response.ok){console.error("Contractor response notification error:",await response.text());return {sent:false,warning:"Response saved, but the operations email notification could not be delivered."};}
  return {sent:true,warning:""};
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
  const payload={status:decision,availability:clean(body.availability,300),quote_amount:body.quoteAmount?Number(body.quoteAmount):null,currency:clean(body.currency,12)||null,personnel:clean(body.personnel,1000),transport:clean(body.transport,1000),response_notes:clean(body.responseNotes,3000),responded_at:new Date().toISOString(),updated_at:new Date().toISOString()};
  const response=await fetch(`${c.url}/rest/v1/contractor_dispatches?id=eq.${dispatch.id}`,{method:"PATCH",headers:{...headers(c.key),Prefer:"return=representation"},body:JSON.stringify(payload)});
  if(!response.ok)return NextResponse.json({message:"Unable to save your response."},{status:502});
  const updated=(await response.json())[0];
  const notification=await notifyOperations(dispatch,payload);
  return NextResponse.json({message:"Your response has been submitted successfully.",dispatch:updated,notificationSent:notification.sent,warning:notification.warning});
}
