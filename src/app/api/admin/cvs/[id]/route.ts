import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: RouteContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = await prisma.adminUser.findUnique({ where: { id: session.sub } });
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const application = await prisma.jobApplication.findUnique({
    where: { id },
    select: {
      cvData: true,
      cvFileName: true,
      cvContentType: true,
    },
  });

  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const disposition =
    req.nextUrl.searchParams.get("disposition") === "inline" ? "inline" : "attachment";
  const safeName = application.cvFileName.replace(/"/g, "");

  return new NextResponse(Buffer.from(application.cvData), {
    status: 200,
    headers: {
      "Content-Type": application.cvContentType || "application/octet-stream",
      "Content-Disposition": `${disposition}; filename="${safeName}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
