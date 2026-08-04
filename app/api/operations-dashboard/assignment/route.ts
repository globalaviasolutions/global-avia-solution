import { NextResponse } from "next/server";

function authorised(request:Request){
  const expected=process.env.OPERATIONS_DASHBOARD_KEY;
  const supplied=request.headers.get("x-operations-key")||"";
  return Boolean(expected&&supplied&&supplied===expected);
}
function config(){const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;return url&&key?{url,key}:null;}
function clean(value:unknown,max=3000){return String(value??"").trim().slice(0,max)}
function headers(key:string,prefer?:string){return {apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",...(prefer?{Prefer:prefer}:{})};}

export async function GET(request:Request){
  if(!authorised(request))return NextResponse.json({message:"Unauthorised."},{status:401});
  const db=config();if(!db)return NextResponse.json({message:"Database connection is not configured."},{status:503});
  const reference=clean(new URL(request.url).searchParams.get("reference"),60);
  if(!reference)return NextResponse.json({message:"Reference is required."},{status:400});
  const response=await fetch(`${db.url}/rest/v1/assignments?reference=eq.${encodeURIComponent(reference)}&select=*&limit=1`,{headers:headers(db.key),cache:"no-store"});
  if(!response.ok)return NextResponse.json({message:"Unable to load assignment."},{status:502});
  const rows=await response.json();
  return NextResponse.json({assignment:rows[0]||null});
}

export async function PUT(request:Request){
  if(!authorised(request))return NextResponse.json({message:"Unauthorised."},{status:401});
  const db=config();if(!db)return NextResponse.json({message:"Database connection is not configured."},{status:503});
  const body=await request.json();
  const reference=clean(body.reference,60);
  if(!reference)return NextResponse.json({message:"Reference is required."},{status:400});
  const record={
    reference,
    operation_name:clean(body.operationName,180),
    team_leader:clean(body.teamLeader,160),
    team_members:clean(body.teamMembers,2000),
    vehicles:clean(body.vehicles,1000),
    start_at:clean(body.startAt,40)||null,
    end_at:clean(body.endAt,40)||null,
    meeting_point:clean(body.meetingPoint,500),
    emergency_contact:clean(body.emergencyContact,500),
    internal_notes:clean(body.internalNotes,5000),
    updated_at:new Date().toISOString(),
  };
  const existing=await fetch(`${db.url}/rest/v1/assignments?reference=eq.${encodeURIComponent(reference)}&select=id&limit=1`,{headers:headers(db.key),cache:"no-store"});
  if(!existing.ok)return NextResponse.json({message:"Unable to verify assignment."},{status:502});
  const rows=await existing.json();
  const target=rows.length?`${db.url}/rest/v1/assignments?reference=eq.${encodeURIComponent(reference)}`:`${db.url}/rest/v1/assignments`;
  const response=await fetch(target,{method:rows.length?"PATCH":"POST",headers:headers(db.key,"return=representation"),body:JSON.stringify(record)});
  if(!response.ok){console.error("Assignment save error",await response.text());return NextResponse.json({message:"Unable to save assignment."},{status:502});}
  const saved=await response.json();
  return NextResponse.json({assignment:saved[0]||record});
}
