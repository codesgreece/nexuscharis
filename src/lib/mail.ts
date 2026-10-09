import { Resend } from "resend";
import nodemailer from "nodemailer";

export type ContactMailPayload = {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  marketingOptIn: boolean;
};

export type MailProvider = "resend" | "smtp" | "none";

const DEFAULT_TO = "nexusdevstudio@outlook.com";
const DEFAULT_FROM = "NEXUS DEV STUDIO <onboarding@resend.dev>";

export function getContactRecipient(): string {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.SITE_CONTACT_EMAIL?.trim() ||
    DEFAULT_TO
  );
}

export function getContactFrom(): string {
  return process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;
}

export function buildContactEmail(payload: ContactMailPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const phone = payload.phone?.trim() || "—";
  const service = payload.service?.trim() || "—";
  const marketing = payload.marketingOptIn ? "Ναι" : "Όχι";

  const subject = `Νέο μήνυμα επικοινωνίας — ${payload.name}`;

  const text = [
    "Νέο μήνυμα από τη φόρμα επικοινωνίας του nexusdevstudio.gr",
    "",
    `Όνομα: ${payload.name}`,
    `Email: ${payload.email}`,
    `Τηλέφωνο: ${phone}`,
    `Υπηρεσία: ${service}`,
    `Marketing opt-in: ${marketing}`,
    "",
    "Μήνυμα:",
    payload.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#171717">
      <h2 style="margin:0 0 16px">Νέο μήνυμα επικοινωνίας</h2>
      <p style="margin:0 0 12px">Από τη φόρμα του <strong>nexusdevstudio.gr</strong></p>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:6px 0;font-weight:bold">Όνομα</td><td style="padding:6px 0">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
        <tr><td style="padding:6px 0;font-weight:bold">Τηλέφωνο</td><td style="padding:6px 0">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold">Υπηρεσία</td><td style="padding:6px 0">${escapeHtml(service)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold">Marketing opt-in</td><td style="padding:6px 0">${marketing}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px">Μήνυμα</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function hasSmtpConfig(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  );
}

async function sendViaResend(payload: ContactMailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const { subject, text, html } = buildContactEmail(payload);
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: getContactFrom(),
    to: [getContactRecipient()],
    replyTo: payload.email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message || "Resend failed to send email");
  }
}

async function sendViaSmtp(payload: ContactMailPayload): Promise<void> {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) {
    throw new Error("SMTP is not fully configured");
  }

  const port = Number(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    `NEXUS DEV STUDIO <${user}>`;

  const { subject, text, html } = buildContactEmail(payload);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: getContactRecipient(),
    replyTo: payload.email,
    subject,
    text,
    html,
  });
}

/**
 * Optional server-side notification when Resend or SMTP is configured.
 * Browser-side FormSubmit covers the default zero-config path.
 */
export async function sendContactNotification(
  payload: ContactMailPayload,
): Promise<{ sent: boolean; provider: MailProvider; error?: string }> {
  if (process.env.RESEND_API_KEY?.trim()) {
    try {
      await sendViaResend(payload);
      return { sent: true, provider: "resend" };
    } catch (err) {
      return {
        sent: false,
        provider: "resend",
        error: err instanceof Error ? err.message : "Unknown Resend error",
      };
    }
  }

  if (hasSmtpConfig()) {
    try {
      await sendViaSmtp(payload);
      return { sent: true, provider: "smtp" };
    } catch (err) {
      return {
        sent: false,
        provider: "smtp",
        error: err instanceof Error ? err.message : "Unknown SMTP error",
      };
    }
  }

  return {
    sent: false,
    provider: "none",
    error: "No server email provider configured (browser FormSubmit is used instead).",
  };
}
