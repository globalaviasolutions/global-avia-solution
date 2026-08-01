import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

type ContactPayload={name?:string;company?:string;email?:string;phone?:string;requestType?:string;urgency?:string;service?:string;country?:string;location?:string;date?:string;people?:string;details?:string;consent?:string;website?:string;startedAt?:number};
function clean(value:unknown,max=5000){return String(value??"").trim().slice(0,max)}
function escapeHtml(value:string){return value.replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]||c))}
function createReference(){const date=new Date().toISOString().slice(0,10).replace(/-/g,"");return `ASS-${date}-${randomBytes(3).toString("hex").toUpperCase()}`}

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
  const html=`<h2>New Africa Security Solutions website request</h2><p><strong>Reference:</strong> ${escapeHtml(reference)}</p><p><strong>Request type:</strong> ${escapeHtml(requestType)}</p><p><strong>Urgency:</strong> ${escapeHtml(urgency)}</p><hr><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Company:</strong> ${escapeHtml(company||"Not provided")}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone / WhatsApp:</strong> ${escapeHtml(phone||"Not provided")}</p><p><strong>Service:</strong> ${escapeHtml(service)}</p><p><strong>Country:</strong> ${escapeHtml(country)}</p><p><strong>City / location:</strong> ${escapeHtml(location)}</p><p><strong>Required start date:</strong> ${escapeHtml(requiredDate||"Not specified")}</p><p><strong>Travellers / personnel:</strong> ${escapeHtml(people||"Not specified")}</p><p><strong>Assignment details:</strong></p><p>${escapeHtml(details).replace(/\n/g,"<br>")}</p>`;
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:["info@security-solutions.africa"],reply_to:email,subject:`[${urgency}] ${reference} — ${service} — ${name}`,html})});
  if(!response.ok){console.error("Resend error:",await response.text());return NextResponse.json({message:"The request could not be delivered. Please email info@security-solutions.africa directly."},{status:502});}
  await savePortalRequest({reference,email,name,company,phone,request_type:requestType,urgency,service,country,location,required_date:requiredDate,people,details,status:"Received",next_step:"Our operations team will review the request and contact you with the next steps."});
  return NextResponse.json({message:"Thank you. Keep the reference number for future correspondence.",reference});
}catch(error){console.error("Contact form error:",error);return NextResponse.json({message:"The request could not be processed."},{status:500})}}
