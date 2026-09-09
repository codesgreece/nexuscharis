import { PageHeader } from "@/components/admin/DataTable";
import { SettingsForm } from "@/components/admin/forms/SettingsForm";
import { prisma } from "@/lib/db";

export default async function SettingsAdminPage() {
  const item = await prisma.siteSettings.findFirst();
  return (
    <div>
      <PageHeader
        title="Site settings"
        description="Contact details, social links, business hours, and footer content."
      />
      <SettingsForm item={item} />
    </div>
  );
}
