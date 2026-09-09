import { AuditAction, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function writeAuditLog(params: {
  adminId?: string | null;
  action: AuditAction;
  entity?: string;
  entityId?: string;
  details?: Prisma.InputJsonValue;
  ip?: string;
}) {
  await prisma.auditLog.create({
    data: {
      adminId: params.adminId ?? null,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      details: params.details,
      ip: params.ip,
    },
  });
}
