import { PageHeader } from "@/components/admin/DataTable";
import { JobForm } from "@/components/admin/forms/JobForm";

export default function NewJobPage() {
  return (
    <div>
      <PageHeader title="Νέα Θέση" description="Δημιούργησε νέα θέση εργασίας χωρίς αλλαγές κώδικα." />
      <JobForm />
    </div>
  );
}
