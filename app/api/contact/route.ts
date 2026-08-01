import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  location?: string;
  date?: string;
  details?: string;
  website?: string;
};

function clean(value: unknown, max = 5000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[character] || character));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (clean(body.website, 200)) {
      return NextResponse.json({ message: "Request received." });
    }

    const name = clean(body.name, 100);
    const email = clean(body.email, 160);
    const details = clean(body.details, 5000);

    if (!name || !email || !details || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: "Please complete the required fields correctly." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ message: "Email delivery is being configured. Please email globalaviasolutions@gmail.com directly." }, { status: 503 });
    }

    const company = clean(body.company, 120);
    const phone = clean(body.phone, 50);
    const service = clean(body.service, 120);
    const location = clean(body.location, 120);
    const requiredDate = clean(body.date, 30);
    const from = process.env.RESEND_FROM_EMAIL || "Global Avia Solution <onboarding@resend.dev>";

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["globalaviasolutions@gmail.com"],
        reply_to: email,
        subject: `Security request: ${service || "General enquiry"} — ${name}`,
        html: `
          <h2>New Global Avia Solution website request</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(phone || "Not provided")}</p>
          <p><strong>Service:</strong> ${escapeHtml(service || "Not specified")}</p>
          <p><strong>Location:</strong> ${escapeHtml(location || "Not specified")}</p>
          <p><strong>Required date:</strong> ${escapeHtml(requiredDate || "Not specified")}</p>
          <p><strong>Assignment details:</strong></p>
          <p>${escapeHtml(details).replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend error:", errorText);
      return NextResponse.json({ message: "The request could not be delivered. Please email us directly." }, { status: 502 });
    }

    return NextResponse.json({ message: "Request sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ message: "The request could not be processed." }, { status: 500 });
  }
}
