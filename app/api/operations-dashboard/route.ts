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

export async function GET(request: Request) {
  if (!authorised(request)) return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  const config = supabaseConfig();
  if (!config) return NextResponse.json({ message: "Database connection is not configured." }, { status: 503 });

  const response = await fetch(`${config.url}/rest/v1/client_requests?select=*&order=created_at.desc&limit=250`, {
    headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
    cache: "no-store",
  });
  if (!response.ok) return NextResponse.json({ message: "Unable to load requests." }, { status: 502 });
  return NextResponse.json({ requests: await response.json() });
}

export async function PATCH(request: Request) {
  if (!authorised(request)) return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
  const config = supabaseConfig();
  if (!config) return NextResponse.json({ message: "Database connection is not configured." }, { status: 503 });

  const body = await request.json() as { reference?: string; status?: string; nextStep?: string; clientNotes?: string };
  const reference = String(body.reference || "").trim();
  const status = String(body.status || "").trim();
  const nextStep = String(body.nextStep || "").trim().slice(0, 1000);
  const clientNotes = String(body.clientNotes || "").trim().slice(0, 3000);
  if (!reference || !allowedStatuses.includes(status)) return NextResponse.json({ message: "Invalid update." }, { status: 400 });

  const response = await fetch(`${config.url}/rest/v1/client_requests?reference=eq.${encodeURIComponent(reference)}`, {
    method: "PATCH",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ status, next_step: nextStep, client_notes: clientNotes, updated_at: new Date().toISOString() }),
  });
  if (!response.ok) return NextResponse.json({ message: "Unable to update the request." }, { status: 502 });
  const records = await response.json();
  return NextResponse.json({ request: records[0] || null });
}
