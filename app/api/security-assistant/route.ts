import { NextResponse } from "next/server";

type ChatMessage = { role?: string; content?: string };

const fallback = "I can help you choose a service and prepare an initial brief. Please include the country, city, date, number of travellers or personnel, and whether you need executive protection, airport support, secure transportation, journey management, corporate security, or consulting. You can submit the formal request at /contact.";

function cleanMessages(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(-10).map((item: ChatMessage) => ({
    role: item?.role === "assistant" ? "assistant" : "user",
    content: String(item?.content || "").trim().slice(0, 1500),
  })).filter((item) => item.content);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = cleanMessages(body.messages);
    if (!messages.length) return NextResponse.json({ message: "Please enter a message." }, { status: 400 });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ reply: fallback });

    const latest = messages[messages.length - 1].content;
    const moderation = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "omni-moderation-latest", input: latest }),
    });
    if (moderation.ok) {
      const result = await moderation.json() as { results?: Array<{ flagged?: boolean }> };
      if (result.results?.[0]?.flagged) {
        return NextResponse.json({ reply: "I cannot assist with harmful or unlawful activity. For legitimate security services, please describe the location, date and protective support required. In immediate danger, contact local emergency authorities." });
      }
    }

    const instructions = `You are the AI Security Assistant for Africa Security Solutions, a corporate security services website focused on Nigeria and selected West African markets.
Your role is to explain services, help visitors identify suitable support, collect a concise initial brief, and direct qualified enquiries to /contact.
Services: Executive Protection; Airport & Crew Security; Secure Transportation; Corporate Security; Journey Management; Security Consulting.
Ask for country, city, dates, traveller/personnel count, itinerary or operational purpose, required service, and urgency when relevant.
Keep replies concise, professional and calm, normally under 120 words. Never claim an assignment is confirmed, quote prices, invent licences, certifications, clients, personnel, availability or response times.
Do not provide tactical instructions that facilitate violence, weapons use, surveillance abuse, evasion of law enforcement, kidnapping, wrongdoing or harm. Do not request passports, payment-card details, exact live locations or other unnecessary sensitive data in chat.
For immediate danger, tell the visitor to contact local police/emergency services and use the site's Emergency Request guidance; make clear this chat is not an emergency dispatch service.
When enough information is available, summarise the brief and direct the visitor to /contact. Mention info@security-solutions.africa only when useful.`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        store: false,
        instructions,
        input: messages,
        max_output_tokens: 300,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI assistant error:", await response.text());
      return NextResponse.json({ reply: fallback });
    }

    const data = await response.json() as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
    const reply = data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("").trim();
    return NextResponse.json({ reply: reply || fallback });
  } catch (error) {
    console.error("Security assistant error:", error);
    return NextResponse.json({ reply: fallback });
  }
}
