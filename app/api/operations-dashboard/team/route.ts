import { NextResponse } from "next/server";

function authorised(request:Request){const expected=process.env.OPERATIONS_DASHBOARD_KEY;const supplied=request.headers.get("x-operations-key")||"";return Boolean(expected&&supplied===expected)}
function config(){const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;return url&&key?{url,key}:null}
function clean(value:unknown,max=500){return String(value??"").trim().slice(0,max)}
function headers(key:string,prefer?:string){return {apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",...(prefer?{Prefer:prefer}:{})}}

export async function GET(request:Request){
  if(!authorised(request))return NextResponse.json({message:"Unauthorised."},{status:401});
  const c=config();if(!c)return NextResponse.json({message:"Database connection is not configured."},{status:503});
  const reference=new URL(request.url).searchParams.get("reference")||"";
  const [staffRes,assignedRes]=await Promise.all([
    fetch(`${c.url}/rest/v1/team_members?select=*&order=full_name.asc`,{headers:headers(c.key),cache:"no-store"}),
    reference?fetch(`${c.url}/rest/v1/assignment_team?reference=eq.${encodeURIComponent(reference)}&select=team_member_id,assignment_role`,{headers:headers(c.key),cache:"no-store"}):Promise.resolve(null)
  ]);
  if(!staffRes.ok)return NextResponse.json({message:"Unable to load team members."},{status:502});
  const members=await staffRes.json();
  const assigned=assignedRes&&assignedRes.ok?await assignedRes.json():[];
  return NextResponse.json({members,assigned});
}

export async function POST(request:Request){
  if(!authorised(request))return NextResponse.json({message:"Unauthorised."},{status:401});
  const c=config();if(!c)return NextResponse.json({message:"Database connection is not configured."},{status:503});
  const body=await request.json();
  const payload={full_name:clean(body.fullName,120),role:clean(body.role,100),phone:clean(body.phone,80),email:clean(body.email,180),countries:clean(body.countries,300),availability:clean(body.availability,40)||"Available",notes:clean(body.notes,1000)};
  if(!payload.full_name||!payload.role)return NextResponse.json({message:"Name and role are required."},{status:400});
  const res=await fetch(`${c.url}/rest/v1/team_members`,{method:"POST",headers:headers(c.key,"return=representation"),body:JSON.stringify(payload)});
  if(!res.ok)return NextResponse.json({message:"Unable to create team member."},{status:502});
  return NextResponse.json({member:(await res.json())[0]});
}

export async function PUT(request:Request){
  if(!authorised(request))return NextResponse.json({message:"Unauthorised."},{status:401});
  const c=config();if(!c)return NextResponse.json({message:"Database connection is not configured."},{status:503});
  const body=await request.json();const reference=clean(body.reference,60);const assignments=Array.isArray(body.assignments)?body.assignments:[];
  if(!reference)return NextResponse.json({message:"Reference is required."},{status:400});
  const del=await fetch(`${c.url}/rest/v1/assignment_team?reference=eq.${encodeURIComponent(reference)}`,{method:"DELETE",headers:headers(c.key)});
  if(!del.ok)return NextResponse.json({message:"Unable to update assignment team."},{status:502});
  if(assignments.length){
    const rows=assignments.map((item:any)=>({reference,team_member_id:clean(item.id,80),assignment_role:clean(item.assignmentRole,100)})).filter((x:any)=>x.team_member_id);
    const add=await fetch(`${c.url}/rest/v1/assignment_team`,{method:"POST",headers:headers(c.key,"return=representation"),body:JSON.stringify(rows)});
    if(!add.ok)return NextResponse.json({message:"Unable to save assigned team."},{status:502});
  }
  return NextResponse.json({saved:true});
}
