import { PortfolioForm } from "@/components/admin/forms/PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-extrabold">New portfolio project</h1>
      <PortfolioForm />
    </div>
  );
}
