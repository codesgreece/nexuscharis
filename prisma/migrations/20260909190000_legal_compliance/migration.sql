-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "privacyAccepted" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "marketingOptIn" BOOLEAN NOT NULL DEFAULT false;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "LegalPageKey" AS ENUM ('PRIVACY', 'COOKIES', 'TERMS', 'SERVICES_TERMS', 'COPYRIGHT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "LegalPage" (
    "id" TEXT NOT NULL,
    "pageKey" "LegalPageKey" NOT NULL,
    "title" TEXT NOT NULL,
    "sections" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalPage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "LegalPage_pageKey_key" ON "LegalPage"("pageKey");

CREATE TABLE IF NOT EXISTS "LegalBusinessInfo" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL DEFAULT 'NEXUS DEV STUDIO GREECE',
    "address" TEXT,
    "email" TEXT NOT NULL DEFAULT 'nexusdevstudio@outlook.com',
    "phone" TEXT NOT NULL DEFAULT '6936732844',
    "vatNumber" TEXT,
    "taxOffice" TEXT,
    "registryNumber" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Ελλάδα',
    "dpoEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalBusinessInfo_pkey" PRIMARY KEY ("id")
);
