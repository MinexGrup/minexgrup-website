import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Quote / contact submission handler.
// Leads are delivered to INTERNAL recipients only (never exposed to the client):
//   QUOTE_RECIPIENTS = siraj.t@minexgrup.com,j.talibov@minexgrup.com
// Sending uses Resend if RESEND_API_KEY is set. Until keys are added, the route
// validates + logs the lead so the form is fully functional end-to-end.
//
// Spam protection (invisible to real users):
//   1. Honeypot field `company_url` — bots fill it, humans never see it.
//   2. Timing trap — submissions faster than 3s after render are treated as bots.
//   3. Basic per-IP rate limiting — soft cap of 5 requests / 10 min.
// ---------------------------------------------------------------------------

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // guard against unbounded growth
  return arr.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // 1. Honeypot — if filled, silently accept (so the bot thinks it worked) but don't send.
  if (data.company_url && data.company_url.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2. Timing trap — instant submits are bots. Silently accept, don't send.
  const ts = Number(data._ts);
  if (ts && Date.now() - ts < 3000) {
    return NextResponse.json({ ok: true });
  }

  // 3. Rate limit by IP.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes or email info@minexgrup.com." },
      { status: 429 }
    );
  }

  const { name, email, company, partNumber, quantity, location, urgency, message } = data;

  if (!name || !email || (!partNumber && !message)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, email, and what you need." },
      { status: 422 }
    );
  }

  // Basic email sanity check.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  const recipients = (process.env.QUOTE_RECIPIENTS || "siraj.t@minexgrup.com,j.talibov@minexgrup.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const subject = `New quote request — ${company || name}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : "",
    partNumber ? `Part / machine: ${partNumber}` : "",
    quantity ? `Quantity: ${quantity}` : "",
    location ? `Location: ${location}` : "",
    urgency ? `Urgency: ${urgency}` : "",
    message ? `\nMessage:\n${message}` : ""
  ].filter(Boolean).join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM || "quotes@minexgrup.com";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: `Minex Grup Website <${from}>`,
          to: recipients,
          reply_to: email,
          subject,
          text: body
        })
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
    } catch (err) {
      console.error("Quote email failed:", err);
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please email info@minexgrup.com." },
        { status: 502 }
      );
    }
  } else {
    // No email key configured yet — log so nothing is lost during setup.
    console.log("[QUOTE LEAD]\n" + body + "\n→ recipients: " + recipients.join(", "));
  }

  return NextResponse.json({ ok: true });
}
