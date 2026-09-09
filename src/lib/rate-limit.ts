import { createHash } from "crypto";
import { prisma } from "@/lib/db";

export function hashIp(ip: string) {
  const salt = process.env.AUTH_SECRET || "nexus";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = new Date();
  const existing = await prisma.rateLimitEntry.findUnique({ where: { key } });

  if (!existing || existing.expiresAt < now) {
    const expiresAt = new Date(now.getTime() + windowMs);
    await prisma.rateLimitEntry.upsert({
      where: { key },
      create: { key, count: 1, windowStart: now, expiresAt },
      update: { count: 1, windowStart: now, expiresAt },
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await prisma.rateLimitEntry.update({
    where: { key },
    data: { count: { increment: 1 } },
  });

  return { allowed: true, remaining: limit - existing.count - 1 };
}
