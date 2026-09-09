export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-purple-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-purple-electric/15 blur-3xl" />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
