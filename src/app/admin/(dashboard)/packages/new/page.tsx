import { PackageForm } from "@/components/admin/forms/PackageForm";

export default function NewPackagePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-extrabold">New package</h1>
      <PackageForm />
    </div>
  );
}
