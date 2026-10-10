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

export type CareersMailPayload = {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  jobSlug: string;
  message?: string | null;
  cv: {
    filename: string;
    content: Buffer;
    contentType: string;
  };
};

export type MailProvider = "resend" | "smtp" | "none";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

type OutboundMail = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
  attachments?: MailAttachment[];
};

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

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

export function buildCareersEmail(payload: CareersMailPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const message = payload.message?.trim() || "—";
  const subject = `[NEXUS Careers] Νέα αίτηση - ${payload.jobTitle}`;

  const text = [
    "NEXUS DEV STUDIO — CAREERS",
    "NEW APPLICATION",
    "",
    `Position: ${payload.jobTitle}`,
    `Slug: ${payload.jobSlug}`,
    "",
    `Candidate: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    "",
    "Message:",
    message,
    "",
    `Attachment: ${payload.cv.filename}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.55;color:#28232D;background:#FFFCF7;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E8DED3;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#6D28D9,#241535);padding:20px 24px;color:#FFFCF7">
          <p style="margin:0;font-size:11px;letter-spacing:0.16em;font-weight:700;opacity:0.85">NEXUS DEV STUDIO</p>
          <h1 style="margin:6px 0 0;font-size:22px;font-weight:800">CAREERS</h1>
          <p style="margin:8px 0 0;font-size:13px;color:#EDE4FF">NEW APPLICATION</p>
        </div>
        <div style="padding:22px 24px">
          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6D28D9;width:120px">Position</td>
              <td style="padding:8px 0;font-size:15px;font-weight:700">${escapeHtml(payload.jobTitle)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6D28D9">Candidate</td>
              <td style="padding:8px 0;font-size:15px">${escapeHtml(payload.name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6D28D9">Email</td>
              <td style="padding:8px 0;font-size:15px"><a href="mailto:${escapeHtml(payload.email)}" style="color:#6D28D9">${escapeHtml(payload.email)}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6D28D9">Phone</td>
              <td style="padding:8px 0;font-size:15px">${escapeHtml(payload.phone)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6D28D9">Attachment</td>
              <td style="padding:8px 0;font-size:15px">${escapeHtml(payload.cv.filename)}</td>
            </tr>
          </table>
          <h2 style="margin:22px 0 8px;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:#D99A55">Message</h2>
          <p style="white-space:pre-wrap;margin:0;padding:14px 16px;background:#F5EDE3;border-radius:12px;font-size:14px">${escapeHtml(message)}</p>
        </div>
      </div>
    </div>
  `.trim();

  return { subject, text, html };
}

function hasSmtpConfig(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  );
}

async function sendViaResend(mail: OutboundMail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: getContactFrom(),
    to: [getContactRecipient()],
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    attachments: mail.attachments?.map((file) => ({
      filename: file.filename,
      content: file.content,
      contentType: file.contentType,
    })),
  });

  if (error) {
    throw new Error(error.message || "Resend failed to send email");
  }
}

async function sendViaSmtp(mail: OutboundMail): Promise<void> {
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

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: getContactRecipient(),
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    attachments: mail.attachments?.map((file) => ({
      filename: file.filename,
      content: file.content,
      contentType: file.contentType,
    })),
  });
}

async function dispatchMail(
  mail: OutboundMail,
): Promise<{ sent: boolean; provider: MailProvider; error?: string }> {
  if (hasSmtpConfig()) {
    try {
      await sendViaSmtp(mail);
      return { sent: true, provider: "smtp" };
    } catch (err) {
      return {
        sent: false,
        provider: "smtp",
        error: err instanceof Error ? err.message : "Unknown SMTP error",
      };
    }
  }

  if (process.env.RESEND_API_KEY?.trim()) {
    try {
      await sendViaResend(mail);
      return { sent: true, provider: "resend" };
    } catch (err) {
      return {
        sent: false,
        provider: "resend",
        error: err instanceof Error ? err.message : "Unknown Resend error",
      };
    }
  }

  return {
    sent: false,
    provider: "none",
    error:
      "No email provider configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS (Outlook) or RESEND_API_KEY.",
  };
}

/**
 * Sends a contact-form notification to the business inbox.
 * Prefer SMTP (Outlook) when configured, otherwise Resend.
 */
export async function sendContactNotification(
  payload: ContactMailPayload,
): Promise<{ sent: boolean; provider: MailProvider; error?: string }> {
  const { subject, text, html } = buildContactEmail(payload);
  return dispatchMail({
    subject,
    text,
    html,
    replyTo: payload.email,
  });
}

/**
 * Sends a careers application notification with CV attachment.
 * Reuses the same SMTP / Resend infrastructure as the contact form.
 */
export async function sendCareersApplicationNotification(
  payload: CareersMailPayload,
): Promise<{ sent: boolean; provider: MailProvider; error?: string }> {
  const { subject, text, html } = buildCareersEmail(payload);
  return dispatchMail({
    subject,
    text,
    html,
    replyTo: payload.email,
    attachments: [
      {
        filename: payload.cv.filename,
        content: payload.cv.content,
        contentType: payload.cv.contentType,
      },
    ],
  });
}
