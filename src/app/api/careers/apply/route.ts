import { NextRequest, NextResponse } from "next/server";
import { sanitizeCvFilename, validateCvBuffer, validateCvFileMeta } from "@/lib/cv";
import { prisma } from "@/lib/db";
import { sendCareersApplicationNotification } from "@/lib/mail";
import { checkRateLimit, hashIp } from "@/lib/rate-limit";
import { careersApplicationSchema } from "@/lib/validations";
import { getAcceptingJobBySlug } from "@/server/services/careers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    let rateAllowed = true;
    try {
      const rate = await checkRateLimit(`careers:${hashIp(ip)}`, 5, 15 * 60 * 1000);
      rateAllowed = rate.allowed;
    } catch {
      rateAllowed = true;
    }

    if (!rateAllowed) {
      return NextResponse.json(
        { error: "Πολλά αιτήματα. Δοκίμασε ξανά σε λίγα λεπτά." },
        { status: 429 },
      );
    }

    const form = await req.formData();
    const privacyRaw = form.get("privacyAccepted");
    const privacyAccepted =
      privacyRaw === "true" || privacyRaw === "on" || privacyRaw === "1";

    const parsed = careersApplicationSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      jobSlug: form.get("jobSlug"),
      jobTitle: form.get("jobTitle"),
      message: form.get("message") ?? "",
      website: form.get("website") ?? "",
      privacyAccepted: privacyAccepted ? true : false,
    });

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

    const job = await getAcceptingJobBySlug(parsed.data.jobSlug);
    if (!job) {
      return NextResponse.json(
        { error: "Η θέση εργασίας δεν είναι διαθέσιμη." },
        { status: 400 },
      );
    }

    // Trust server-side job title from data, not client-provided title.
    if (parsed.data.jobTitle.trim() !== job.title) {
      return NextResponse.json(
        { error: "Μη έγκυρα δεδομένα θέσης εργασίας." },
        { status: 400 },
      );
    }

    const cvEntry = form.get("cv");
    if (!(cvEntry instanceof File)) {
      return NextResponse.json(
        { error: "Το βιογραφικό είναι υποχρεωτικό.", field: "cv" },
        { status: 400 },
      );
    }

    const meta = validateCvFileMeta({
      filename: cvEntry.name,
      size: cvEntry.size,
      mimeType: cvEntry.type,
    });
    if (!meta.ok) {
      return NextResponse.json({ error: meta.error, field: "cv" }, { status: 400 });
    }

    const bytes = Buffer.from(await cvEntry.arrayBuffer());
    const contentCheck = validateCvBuffer(bytes, meta.extension);
    if (!contentCheck.ok) {
      return NextResponse.json({ error: contentCheck.error, field: "cv" }, { status: 400 });
    }

    const cvFileName = sanitizeCvFilename(cvEntry.name);

    const application = await prisma.jobApplication.create({
      data: {
        jobId: job.id,
        fullName: parsed.data.name.trim(),
        email: parsed.data.email.trim().toLowerCase(),
        phone: parsed.data.phone.trim(),
        coverMessage: parsed.data.message?.trim() || null,
        cvFileName,
        cvContentType: contentCheck.contentType,
        cvSize: bytes.length,
        cvData: bytes,
        privacyAccepted: true,
        ipHash: hashIp(ip),
        status: "NEW",
      },
    });

    const mail = await sendCareersApplicationNotification({
      name: application.fullName,
      email: application.email,
      phone: application.phone,
      jobTitle: job.title,
      jobSlug: job.slug,
      message: application.coverMessage,
      cv: {
        filename: cvFileName,
        content: bytes,
        contentType: contentCheck.contentType,
      },
    });

    if (!mail.sent) {
      console.error("[careers] email notification failed:", mail.provider, mail.error);
    }

    return NextResponse.json({
      ok: true,
      emailSent: mail.sent,
      applicationId: application.id,
    });
  } catch (err) {
    console.error("[careers] unexpected error:", err);
    return NextResponse.json(
      {
        error:
          "Δεν ήταν δυνατή η αποστολή της αίτησης. Έλεγξε τα στοιχεία σου και προσπάθησε ξανά.",
      },
      { status: 500 },
    );
  }
}
