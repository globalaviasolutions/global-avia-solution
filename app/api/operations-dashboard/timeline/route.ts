import { NextResponse } from "next/server";

function authorised(request: Request) {
  const expected = process.env.OPERATIONS_DASHBOARD_KEY;
  const supplied = request.headers.get("x-operations-key") || "";
  return Boolean(expected && supplied && supplied === expected);
}

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

function clean(value: unknown, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
}

const allowedTypes = [
  "Assignment created",
  "Team assigned",
  "Vehicle dispatched",
  "Team arrived",
  "Operation started",
  "Checkpoint update",
  "Incident noted",
  "Operation completed",
  "Document uploaded",
  "General update",
];

export async function GET(request: Request) {
  if (!authorised(request)) return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  const supabase = config();
  if (!supabase) return NextResponse.json({ message: "Database connection is not configured." }, { status: 503 });
  const reference = clean(new URL(request.url).searchParams.get("reference"), 60);
  if (!reference) return NextResponse.json({ message: "Reference is required." }, { status: 400 });

  const response = await fetch(
    `${supabase.url}/rest/v1/operation_timeline?reference=eq.${encodeURIComponent(reference)}&select=*&order=event_at.desc,created_at.desc`,
    { headers: { apikey: supabase.key, Authorization: `Bearer ${supabase.key}` }, cache: "no-store" }
  );
  if (!response.ok) return NextResponse.json({ message: "Unable to load the operation timeline." }, { status: 502 });
  return NextResponse.json({ events: await response.json() });
}

export async function POST(request: Request) {
  if (!authorised(request)) return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  const supabase = config();
  if (!supabase) return NextResponse.json({ message: "Database connection is not configured." }, { status: 503 });

  const body = await request.json() as { reference?: string; eventType?: string; author?: string; details?: string; eventAt?: string };
  const reference = clean(body.reference, 60);
  const eventType = clean(body.eventType, 80);
  const author = clean(body.author, 120) || "Operations Team";
  const details = clean(body.details, 2000);
  const eventAt = clean(body.eventAt, 60) || new Date().toISOString();

  if (!reference || !allowedTypes.includes(eventType)) {
    return NextResponse.json({ message: "Invalid timeline entry." }, { status: 400 });
  }

  const response = await fetch(`${supabase.url}/rest/v1/operation_timeline`, {
    method: "POST",
    headers: {
      apikey: supabase.key,
      Authorization: `Bearer ${supabase.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ reference, event_type: eventType, author, details, event_at: eventAt }),
  });
  if (!response.ok) return NextResponse.json({ message: "Unable to add the timeline entry." }, { status: 502 });
  return NextResponse.json({ event: (await response.json())[0] || null });
}

export async function DELETE(request: Request) {
  if (!authorised(request)) return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  const supabase = config();
  if (!supabase) return NextResponse.json({ message: "Database connection is not configured." }, { status: 503 });
  const id = clean(new URL(request.url).searchParams.get("id"), 80);
  if (!id) return NextResponse.json({ message: "Timeline entry ID is required." }, { status: 400 });

  const response = await fetch(`${supabase.url}/rest/v1/operation_timeline?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { apikey: supabase.key, Authorization: `Bearer ${supabase.key}` },
  });
  if (!response.ok) return NextResponse.json({ message: "Unable to delete the timeline entry." }, { status: 502 });
  return NextResponse.json({ deleted: true });
}
