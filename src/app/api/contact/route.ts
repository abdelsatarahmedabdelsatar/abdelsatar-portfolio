import { personal } from "@/lib/content";
import {
  CONTACT_FIELDS,
  validateContactForm,
  type ContactValues,
} from "@/lib/contact-validation";

const RESEND_API_URL = "https://api.resend.com/emails";
const RESEND_TIMEOUT_MS = 10_000;
// Resend's shared test sender. It can only deliver to the address that owns the Resend account.
const DEFAULT_FROM_EMAIL = "Portfolio <onboarding@resend.dev>";

function readString(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

async function sendContactEmail(apiKey: string, { name, email, message }: ContactValues) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL,
      to: personal.email,
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
    signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  if (typeof payload !== "object" || payload === null) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const fields = payload as Record<string, unknown>;

  // Honeypot: only bots fill this hidden field, so report success without sending anything.
  if (readString(fields, "website")) return Response.json({ ok: true });

  const values = Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, readString(fields, field)]),
  ) as ContactValues;

  const errors = validateContactForm(values);
  if (Object.keys(errors).length > 0) return Response.json({ errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return Response.json({ error: "Email is not configured." }, { status: 503 });
  }

  try {
    await sendContactEmail(apiKey, values);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form: sending failed.", error);
    return Response.json({ error: "Sending failed." }, { status: 502 });
  }
}
