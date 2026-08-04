import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

type ContactPayload={name?:string;company?:string;email?:string;phone?:string;requestType?:string;urgency?:string;service?:string;country?:string;location?:string;date?:string;people?:string;details?:string;consent?:string;website?:string;startedAt?:number};
function clean(value:unknown,max=5000){return String(value??"").trim().slice(0,max)}
function escapeHtml(value:string){return value.replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]||c))}
function createReference(){const date=new Date().toISOString().slice(0,10).replace(/-/g,"");return `ASS-${date}-${randomBytes(3).toString("hex").toUpperCase()}`}

async function sendEmail(apiKey:string,payload:Record<string,unknown>){
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify(payload)});
  if(!response.ok)throw new Error(await response.text());
}

async function savePortalRequest(record:Record<string,string>){
  const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!url||!key)return;
  const response=await fetch(`${url}/rest/v1/client_requests`,{method:"POST",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(record)});
  if(!response.ok)console.error("Client portal database error:",await response.text());
}

export async function POST(request:Request){try{
  const body=(await request.json()) as ContactPayload;if(clean(body.website,200))return NextResponse.json({message:"Request received."});
  const startedAt=Number(body.startedAt||0),elapsed=Date.now()-startedAt;if(!startedAt||elapsed<2000||elapsed>86400000)return NextResponse.json({message:"Please refresh the page and submit the form again."},{status:400});
  const name=clean(body.name,100),email=clean(body.email,160).toLowerCase(),requestType=clean(body.requestType,120),urgency=clean(body.urgency,80),service=clean(body.service,120),country=clean(body.country,100),location=clean(body.location,120),details=clean(body.details,5000),consent=clean(body.consent,10);
  if(!name||!email||!requestType||!urgency||!service||!country||!location||!details||consent!=="yes"||!/^\S+@\S+\.\S+$/.test(email))return NextResponse.json({message:"Please complete all required fields correctly and accept the privacy notice."},{status:400});
  const apiKey=process.env.RESEND_API_KEY;if(!apiKey)return NextResponse.json({message:"Email delivery is being configured. Please email info@security-solutions.africa directly."},{status:503});
  const reference=createReference(),company=clean(body.company,120),phone=clean(body.phone,50),requiredDate=clean(body.date,30),people=clean(body.people,20),from=process.env.RESEND_FROM_EMAIL||"Africa Security Solutions <onboarding@resend.dev>";
  const internalHtml=`<h2>New Africa Security Solutions website request</h2><p><strong>Reference:</strong> ${escapeHtml(reference)}</p><p><strong>Request type:</strong> ${escapeHtml(requestType)}</p><p><strong>Urgency:</strong> ${escapeHtml(urgency)}</p><hr><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Company:</strong> ${escapeHtml(company||"Not provided")}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone / WhatsApp:</strong> ${escapeHtml(phone||"Not provided")}</p><p><strong>Service:</strong> ${escapeHtml(service)}</p><p><strong>Country:</strong> ${escapeHtml(country)}</p><p><strong>City / location:</strong> ${escapeHtml(location)}</p><p><strong>Required start date:</strong> ${escapeHtml(requiredDate||"Not specified")}</p><p><strong>Travellers / personnel:</strong> ${escapeHtml(people||"Not specified")}</p><p><strong>Assignment details:</strong></p><p>${escapeHtml(details).replace(/\n/g,"<br>")}</p>`;
  try{await sendEmail(apiKey,{from,to:["info@security-solutions.africa"],reply_to:email,subject:`[${urgency}] ${reference} — ${service} — ${name}`,html:internalHtml});}
  catch(error){console.error("Resend internal email error:",error);return NextResponse.json({message:"The request could not be delivered. Please email info@security-solutions.africa directly."},{status:502});}

  await savePortalRequest({reference,email,name,company,phone,request_type:requestType,urgency,service,country,location,required_date:requiredDate,people,details,status:"Received",next_step:"Our operations team will review the request and contact you with the next steps."});

  const clientHtml=`<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#1d2422"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9a742f">Africa Security Solutions</p><h1 style="font-size:30px">Your request has been received.</h1><p>Hello ${escapeHtml(name)},</p><p>Thank you for contacting Africa Security Solutions. Your request has been recorded for operational review.</p><div style="padding:20px;border:1px solid #d6bd87;background:#faf7f0;margin:24px 0"><strong>Reference number</strong><div style="font-size:22px;margin-top:8px;letter-spacing:1px">${escapeHtml(reference)}</div></div><p><strong>Service:</strong> ${escapeHtml(service)}<br><strong>Location:</strong> ${escapeHtml(location)}, ${escapeHtml(country)}<br><strong>Urgency:</strong> ${escapeHtml(urgency)}</p><h2 style="font-size:20px">What happens next</h2><ol><li>Our team reviews the information supplied.</li><li>We may request clarification or additional operational details.</li><li>Scope, lawful availability and commercial terms are confirmed separately.</li></ol><p>Please keep the reference number in future correspondence. Submission of this form does not confirm deployment or service availability.</p><p><a href="https://security-solutions.africa/client-portal" style="display:inline-block;padding:12px 18px;background:#111816;color:#fff;text-decoration:none">Open client portal</a></p><p style="font-size:13px;color:#66706d">Africa Security Solutions<br>info@security-solutions.africa</p></div>`;
  try{await sendEmail(apiKey,{from,to:[email],reply_to:"info@security-solutions.africa",subject:`Request received — ${reference}`,html:clientHtml});}
  catch(error){console.error("Resend client confirmation error:",error);}

  return NextResponse.json({message:"Your request has been recorded for operational review.",reference});
}catch(error){console.error("Contact form error:",error);return NextResponse.json({message:"The request could not be processed."},{status:500})}}
