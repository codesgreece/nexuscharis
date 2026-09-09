export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-light via-white to-lavender-soft">
      {children}
    </div>
  );
}
