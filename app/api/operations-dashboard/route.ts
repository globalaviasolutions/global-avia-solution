import { NextResponse } from "next/server";

const allowedStatuses = ["Received", "Under Review", "Proposal Sent", "Confirmed", "Completed"];

function authorised(request: Request) {
  const expected = process.env.OPERATIONS_DASHBOARD_KEY;
  const supplied = request.headers.get("x-operations-key") || "";
  return Boolean(expected && supplied && supplied === expected);
}
function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}
function clean(value: unknown, max = 3000) { return String(value ?? "").trim().slice(0, max); }
function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c] || c)); }

async function sendStatusEmail(record: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent:false, warning:"Email notification was not sent because RESEND_API_KEY is not configured." };
  const reference=clean(record.reference,60), email=clean(record.email,180), name=clean(record.name,120)||"Client";
  const status=clean(record.status,80), nextStep=clean(record.next_step,1000), clientNotes=clean(record.client_notes,3000);
  const from=process.env.RESEND_FROM_EMAIL||"Africa Security Solutions <onboarding@resend.dev>";
  const portalUrl=`https://security-solutions.africa/client-portal?reference=${encodeURIComponent(reference)}&email=${encodeURIComponent(email)}`;
  const html=`<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#171717"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9a742f">Africa Security Solutions</p><h1 style="font-size:30px;margin:12px 0">Your request status has been updated</h1><p>Hello ${escapeHtml(name)},</p><p>An update has been posted for request <strong>${escapeHtml(reference)}</strong>.</p><div style="margin:28px 0;padding:22px;border-left:4px solid #c9a052;background:#f7f4ed"><p style="margin:0 0 8px;color:#666">Current status</p><h2 style="margin:0 0 18px">${escapeHtml(status)}</h2><p style="margin:0 0 8px;color:#666">Next step</p><p style="margin:0">${escapeHtml(nextStep||"Our operations team will contact you with the next step.")}</p>${clientNotes?`<p style="margin:18px 0 8px;color:#666">Operations note</p><p style="margin:0">${escapeHtml(clientNotes).replace(/\n/g,"<br>")}</p>`:""}</div><p><a href="${portalUrl}" style="display:inline-block;padding:13px 20px;background:#171717;color:#fff;text-decoration:none">View Client Portal</a></p><p style="margin-top:28px;color:#666;font-size:13px">This update does not replace any written service confirmation, proposal or operational instruction issued separately by our team.</p></div>`;
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[email],reply_to:"info@security-solutions.africa",subject:`${reference} — Status updated to ${status}`,html})});
  if(!response.ok){console.error("Status notification email error:",await response.text());return {sent:false,warning:"The request was updated, but the client email could not be delivered."};}
  return {sent:true,warning:""};
}

async function loadHistory(config:{url:string;key:string}) {
  const response=await fetch(`${config.url}/rest/v1/request_history?select=reference,status,next_step,client_note,event_type,client_visible,created_at&order=created_at.desc&limit=1000`,{headers:{apikey:config.key,Authorization:`Bearer ${config.key}`},cache:"no-store"});
  if(!response.ok) return [];
  return await response.json();
}

export async function GET(request:Request){
  if(!authorised(request)) return NextResponse.json({message:"Unauthorised."},{status:401});
  const config=supabaseConfig(); if(!config) return NextResponse.json({message:"Database connection is not configured."},{status:503});
  const response=await fetch(`${config.url}/rest/v1/client_requests?select=*&order=created_at.desc&limit=250`,{headers:{apikey:config.key,Authorization:`Bearer ${config.key}`},cache:"no-store"});
  if(!response.ok) return NextResponse.json({message:"Unable to load requests."},{status:502});
  const requests=await response.json(); const history=await loadHistory(config);
  const enriched=requests.map((item:Record<string,unknown>)=>({...item,history:history.filter((event:Record<string,unknown>)=>event.reference===item.reference)}));
  return NextResponse.json({requests:enriched});
}

export async function PATCH(request:Request){
  if(!authorised(request)) return NextResponse.json({message:"Unauthorised."},{status:401});
  const config=supabaseConfig(); if(!config) return NextResponse.json({message:"Database connection is not configured."},{status:503});
  const body=await request.json() as {reference?:string;status?:string;nextStep?:string;clientNotes?:string;notifyClient?:boolean};
  const reference=clean(body.reference,60),status=clean(body.status,80),nextStep=clean(body.nextStep,1000),clientNotes=clean(body.clientNotes,3000);
  if(!reference||!allowedStatuses.includes(status)) return NextResponse.json({message:"Invalid update."},{status:400});
  const currentResponse=await fetch(`${config.url}/rest/v1/client_requests?reference=eq.${encodeURIComponent(reference)}&select=*&limit=1`,{headers:{apikey:config.key,Authorization:`Bearer ${config.key}`},cache:"no-store"});
  if(!currentResponse.ok) return NextResponse.json({message:"Unable to verify the current request."},{status:502});
  const current=(await currentResponse.json())[0]; if(!current) return NextResponse.json({message:"Request not found."},{status:404});
  const changed=current.status!==status||current.next_step!==nextStep||(current.client_notes||"")!==clientNotes;
  const response=await fetch(`${config.url}/rest/v1/client_requests?reference=eq.${encodeURIComponent(reference)}`,{method:"PATCH",headers:{apikey:config.key,Authorization:`Bearer ${config.key}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify({status,next_step:nextStep,client_notes:clientNotes,updated_at:new Date().toISOString()})});
  if(!response.ok) return NextResponse.json({message:"Unable to update the request."},{status:502});
  const updated=(await response.json())[0]||null;
  if(changed&&updated){
    const eventType=current.status!==status?"Status changed":"Request updated";
    const historyResponse=await fetch(`${config.url}/rest/v1/request_history`,{method:"POST",headers:{apikey:config.key,Authorization:`Bearer ${config.key}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({reference,status,next_step:nextStep,client_note:clientNotes,event_type:eventType,client_visible:true})});
    if(!historyResponse.ok) console.error("Request history error:",await historyResponse.text());
  }
  let notification={sent:false,warning:""}; if(body.notifyClient&&changed&&updated) notification=await sendStatusEmail(updated);
  const history=await loadHistory(config);
  return NextResponse.json({request:{...updated,history:history.filter((event:Record<string,unknown>)=>event.reference===reference)},notificationSent:notification.sent,warning:notification.warning});
}
