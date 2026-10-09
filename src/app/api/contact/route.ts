import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validations";
import { checkRateLimit, hashIp } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rate = await checkRateLimit(`contact:${hashIp(ip)}`, 5, 15 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Πολλά αιτήματα. Δοκίμασε ξανά σε λίγα λεπτά." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Μη έγκυρα δεδομένα" },
        { status: 400 },
      );
    }

    // Honeypot filled => pretend success
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const message = {
      name: parsed.data.name.trim(),
      email: parsed.data.email.trim().toLowerCase(),
      phone: parsed.data.phone?.trim() || null,
      service: parsed.data.service?.trim() || null,
      message: parsed.data.message.trim(),
      privacyAccepted: true,
      marketingOptIn: Boolean(parsed.data.marketingOptIn),
    };

    await prisma.contactMessage.create({
      data: {
        ...message,
        ipHash: hashIp(ip),
      },
    });

    const mail = await sendContactNotification({
      name: message.name,
      email: message.email,
      phone: message.phone,
      service: message.service,
      message: message.message,
      marketingOptIn: message.marketingOptIn,
    });

    if (!mail.sent) {
      console.error("[contact] email notification failed:", mail.provider, mail.error);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Σφάλμα διακομιστή. Δοκίμασε ξανά αργότερα." },
      { status: 500 },
    );
  }
}
