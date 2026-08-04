import { NextResponse } from "next/server";

function clean(value:unknown,max=160){return String(value??"").trim().slice(0,max)}
export async function POST(request:Request){
  try{
    const body=await request.json(); const reference=clean(body.reference,40).toUpperCase(); const email=clean(body.email).toLowerCase();
    if(!/^ASS-\d{8}-[A-F0-9]{6}$/.test(reference)||!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({message:"Enter a valid reference number and email address."},{status:400});
    const url=process.env.SUPABASE_URL; const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
    if(!url||!key) return NextResponse.json({message:"The client portal database is being configured. Please contact info@security-solutions.africa."},{status:503});
    const query=`${url}/rest/v1/client_requests?reference=eq.${encodeURIComponent(reference)}&email=eq.${encodeURIComponent(email)}&select=reference,status,service,urgency,country,location,required_date,people,created_at,updated_at,next_step,client_notes&limit=1`;
    const response=await fetch(query,{headers:{apikey:key,Authorization:`Bearer ${key}`},cache:"no-store"});
    if(!response.ok){console.error("Portal database error",await response.text());return NextResponse.json({message:"The request could not be retrieved."},{status:502});}
    const rows=await response.json(); if(!rows.length) return NextResponse.json({message:"No matching request was found. Check the reference and email address."},{status:404});
    const historyResponse=await fetch(`${url}/rest/v1/request_history?reference=eq.${encodeURIComponent(reference)}&client_visible=eq.true&select=status,next_step,client_note,event_type,created_at&order=created_at.desc&limit=50`,{headers:{apikey:key,Authorization:`Bearer ${key}`},cache:"no-store"});
    const history=historyResponse.ok?await historyResponse.json():[];
    const row=rows[0]; return NextResponse.json({request:{reference:row.reference,status:row.status,service:row.service,urgency:row.urgency,country:row.country,location:row.location,requiredDate:row.required_date,people:row.people,createdAt:row.created_at,updatedAt:row.updated_at,nextStep:row.next_step,notes:row.client_notes,history}});
  }catch(error){console.error("Portal lookup error",error);return NextResponse.json({message:"The request could not be processed."},{status:500});}
}
