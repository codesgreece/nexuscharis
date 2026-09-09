import { PageHeader } from "@/components/admin/DataTable";
import { ProcessForm } from "@/components/admin/forms/ProcessForm";

export default function NewProcessPage() {
  return (
    <div>
      <PageHeader title="New process step" />
      <ProcessForm />
    </div>
  );
}
