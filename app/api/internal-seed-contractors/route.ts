import { NextResponse } from "next/server";

const SEED_TOKEN = "seed-africa-contractors-2026-08-04-7f3b91";

const contractors = [
  {
    company_name: "BGA Protection",
    contact_name: "Operations Team",
    email: "info@bga.za.com",
    phone: "+27 10 443 8768",
    countries: "South Africa; Southern Africa",
    services: "Executive Protection; VIP Protection; Secure Transportation; In-country Support; Risk Assessment; Manned Guarding",
    rating: 4,
    notes: "Verified from the company's official website. Headquarters in Johannesburg, with Durban and Cape Town coverage.",
    status: "Active"
  },
  {
    company_name: "G4S Nigeria",
    contact_name: "General Enquiries",
    email: "admin@ng.g4s.com",
    phone: "+234 817 665 6010",
    countries: "Nigeria; Lagos",
    services: "Security Guarding; Security Systems; Risk Management; Security Consulting",
    rating: 4,
    notes: "Official G4S Africa contact for Nigeria.",
    status: "Active"
  },
  {
    company_name: "G4S Ghana",
    contact_name: "General Enquiries",
    email: "administration@gh.g4s.com",
    phone: "+233 54 412 3447",
    countries: "Ghana; Accra",
    services: "Security Personnel; Security Systems; Risk Consulting; Cash Solutions",
    rating: 4,
    notes: "Official G4S Africa contact for Ghana.",
    status: "Active"
  },
  {
    company_name: "G4S Kenya",
    contact_name: "General Enquiries",
    email: "info@ke.g4s.com",
    phone: "+254 711 042 000",
    countries: "Kenya; Nairobi",
    services: "Manned Security; Secure Journey Management; Event Security; Alarm Response; Asset Tracking; Fire Safety; Security Systems",
    rating: 4,
    notes: "Official G4S Africa contact for Kenya.",
    status: "Active"
  },
  {
    company_name: "G4S Côte d’Ivoire",
    contact_name: "General Enquiries",
    email: "information@ci.g4s.com",
    phone: "+225 22 48 01 00",
    countries: "Côte d’Ivoire; Abidjan",
    services: "Security Personnel; Security Systems; Risk Management; Security Consulting",
    rating: 4,
    notes: "Official G4S Africa contact for Côte d’Ivoire.",
    status: "Active"
  },
  {
    company_name: "G4S Sierra Leone",
    contact_name: "General Enquiries",
    email: "enquiries@sl.g4s.com",
    phone: "+232 30 695 477",
    countries: "Sierra Leone; Freetown",
    services: "Security Guarding; Security Systems; Risk Management; Security Consulting",
    rating: 4,
    notes: "Official G4S Africa contact for Sierra Leone.",
    status: "Active"
  },
  {
    company_name: "G4S South Africa",
    contact_name: "Customer Services",
    email: "customerservice@africa.g4s.com",
    phone: "+27 10 001 4500",
    countries: "South Africa; Nationwide",
    services: "Security Personnel; Monitoring and Response; Security Technology; Risk Advisory; Airport Security; Corporate Security",
    rating: 4,
    notes: "Official G4S South Africa customer service contact.",
    status: "Active"
  }
];

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (token !== SEED_TOKEN) return NextResponse.json({ message: "Not found." }, { status: 404 });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ message: "Database connection is not configured." }, { status: 503 });

  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const results: Array<{ email: string; status: string }> = [];

  for (const contractor of contractors) {
    const email = contractor.email.toLowerCase();
    const check = await fetch(`${url}/rest/v1/contractors?email=eq.${encodeURIComponent(email)}&select=id&limit=1`, { headers, cache: "no-store" });
    if (!check.ok) {
      results.push({ email, status: "check-failed" });
      continue;
    }
    const existing = await check.json();
    if (existing.length) {
      results.push({ email, status: "already-exists" });
      continue;
    }
    const insert = await fetch(`${url}/rest/v1/contractors`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ ...contractor, email })
    });
    results.push({ email, status: insert.ok ? "inserted" : "insert-failed" });
  }

  return NextResponse.json({ imported: results.filter(x => x.status === "inserted").length, results });
}
