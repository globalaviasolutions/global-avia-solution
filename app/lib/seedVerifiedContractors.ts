type SupabaseConfig = { url: string; key: string };

const verifiedContractors = [
  {
    company_name: "BGA Protection",
    contact_name: "Operations Team",
    email: "info@bga.za.com",
    phone: "+27 10 443 8768",
    countries: "South Africa, Southern Africa",
    services: "Executive Protection, VIP Protection, Secure Transportation, In-country Support, Risk Assessment, Manned Guarding",
    rating: 4,
    notes: "Public contact verified from the official company website. Johannesburg head office with Durban and Cape Town coverage.",
    status: "Active"
  },
  {
    company_name: "G4S Nigeria",
    contact_name: "General Enquiries",
    email: "admin@ng.g4s.com",
    phone: "+234 817 665 6010",
    countries: "Nigeria, Lagos",
    services: "Security Guarding, Security Systems, Risk Management, Security Consulting",
    rating: 4,
    notes: "Public contact listed on the official G4S Africa directory.",
    status: "Active"
  },
  {
    company_name: "G4S Ghana",
    contact_name: "General Enquiries",
    email: "administration@gh.g4s.com",
    phone: "+233 54 412 3447",
    countries: "Ghana, Accra",
    services: "Security Personnel, Security Systems, Risk Consulting, Cash Solutions",
    rating: 4,
    notes: "Public contact listed on the official G4S Africa directory.",
    status: "Active"
  },
  {
    company_name: "G4S Kenya",
    contact_name: "General Enquiries",
    email: "info@ke.g4s.com",
    phone: "+254 711 042 000",
    countries: "Kenya, Nairobi",
    services: "Manned Security, Secure Journey Management, Event Security, Alarm Response, Asset Tracking, Fire Safety, Security Systems",
    rating: 4,
    notes: "Public contact listed on the official G4S Africa directory.",
    status: "Active"
  },
  {
    company_name: "G4S Côte d’Ivoire",
    contact_name: "General Enquiries",
    email: "information@ci.g4s.com",
    phone: "+225 22 48 01 00",
    countries: "Côte d’Ivoire, Abidjan",
    services: "Security Personnel, Security Systems, Risk Management, Security Consulting",
    rating: 4,
    notes: "Public contact listed on the official G4S Africa directory.",
    status: "Active"
  },
  {
    company_name: "G4S Sierra Leone",
    contact_name: "General Enquiries",
    email: "enquiries@sl.g4s.com",
    phone: "+232 30 695 477",
    countries: "Sierra Leone, Freetown",
    services: "Security Guarding, Security Systems, Risk Management, Security Consulting",
    rating: 4,
    notes: "Public contact listed on the official G4S Africa directory.",
    status: "Active"
  },
  {
    company_name: "G4S South Africa",
    contact_name: "Customer Services",
    email: "customerservice@africa.g4s.com",
    phone: "+27 10 001 4500",
    countries: "South Africa, Nationwide",
    services: "Security Personnel, Monitoring and Response, Security Technology, Risk Advisory, Airport Security, Corporate Security",
    rating: 4,
    notes: "Public contact listed on the official G4S South Africa website.",
    status: "Active"
  }
];

function config(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

export async function seedVerifiedContractors() {
  const c = config();
  if (!c) return;
  const headers = { apikey: c.key, Authorization: `Bearer ${c.key}`, "Content-Type": "application/json" };

  for (const contractor of verifiedContractors) {
    const email = contractor.email.toLowerCase();
    try {
      const check = await fetch(`${c.url}/rest/v1/contractors?email=eq.${encodeURIComponent(email)}&select=id&limit=1`, {
        headers,
        cache: "no-store"
      });
      if (!check.ok) continue;
      const existing = await check.json();
      if (existing.length) continue;
      await fetch(`${c.url}/rest/v1/contractors`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=minimal" },
        body: JSON.stringify({ ...contractor, email }),
        cache: "no-store"
      });
    } catch (error) {
      console.error("Verified contractor seed failed for", email, error);
    }
  }
}
