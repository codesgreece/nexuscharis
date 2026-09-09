"use client";

import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  UserRound,
  Eye,
  TextQuote,
  Layers,
  ListOrdered,
  Package,
  Images,
  Settings2,
  Megaphone,
  MessageSquare,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  X,
  Menu,
  BadgePercent,
  Bell,
  RectangleHorizontal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { logoutAction } from "@/server/actions/auth";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/hero", label: "Hero", icon: Sparkles },
      { href: "/admin/about", label: "About", icon: UserRound },
      { href: "/admin/vision", label: "Vision", icon: Eye },
      { href: "/admin/intro", label: "Intro", icon: TextQuote },
      { href: "/admin/services", label: "Services", icon: Layers },
      { href: "/admin/process", label: "Process", icon: ListOrdered },
      { href: "/admin/packages", label: "Packages", icon: Package },
      { href: "/admin/portfolio", label: "Portfolio", icon: Images },
      { href: "/admin/settings", label: "Contact / Footer", icon: Settings2 },
    ],
  },
  {
    title: "Marketing",
    items: [
      { href: "/admin/offers", label: "Offers", icon: BadgePercent },
      { href: "/admin/popups", label: "Popups", icon: Bell },
      { href: "/admin/advertisements", label: "Advertisements", icon: Megaphone },
    ],
  },
  {
    title: "Messages",
    items: [{ href: "/admin/messages", label: "Contact Messages", icon: MessageSquare }],
  },
  {
    title: "Settings",
    items: [
      { href: "/admin/seo", label: "SEO", icon: Search },
      { href: "/admin/settings", label: "Social / Contact", icon: RectangleHorizontal },
    ],
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({
  children,
  adminName,
  adminEmail,
}: {
  children: React.ReactNode;
  adminName: string;
  adminEmail: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className={cn("flex items-center gap-2 border-b border-border-soft px-4 py-4", collapsed && "justify-center px-2")}>
        <Logo href="/admin" showText={!collapsed} className="min-w-0" />
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {NAV.map((group) => (
          <div key={group.title}>
            {!collapsed ? (
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {group.title}
              </p>
            ) : null}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);
                return (
                  <li key={`${group.title}-${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium transition",
                        collapsed && "justify-center px-2",
                        active
                          ? "bg-purple-primary text-white shadow-sm"
                          : "text-purple-deep/80 hover:bg-lavender-soft hover:text-purple-deep",
                      )}
                      title={item.label}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed ? <span className="truncate">{item.label}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border-soft p-3">
        {!collapsed ? (
          <div className="mb-3 rounded-2xl bg-lavender-light px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-purple-deep">{adminName}</p>
            <p className="truncate text-xs text-muted">{adminEmail}</p>
          </div>
        ) : null}
        <form
          action={() => {
            startTransition(async () => {
              await logoutAction();
            });
          }}
        >
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            className={cn("w-full", collapsed && "px-2")}
            disabled={pending}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed ? (pending ? "Signing out…" : "Logout") : null}
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#faf8ff_0%,#ffffff_42%,#ffffff_100%)]">
      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-purple-deep/35 transition lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-border-soft bg-white shadow-xl transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          type="button"
          className="absolute right-3 top-3 rounded-xl p-2 text-muted hover:bg-lavender-soft"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
        {sidebar}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r border-border-soft bg-white/95 backdrop-blur lg:block",
          collapsed ? "w-[78px]" : "w-72",
        )}
      >
        {sidebar}
      </aside>

      <div className={cn("min-h-screen transition-[padding]", collapsed ? "lg:pl-[78px]" : "lg:pl-72")}>
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border-soft bg-white/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-xl border border-border-soft bg-white p-2 text-purple-deep hover:bg-lavender-soft lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="hidden rounded-xl border border-border-soft bg-white p-2 text-purple-deep hover:bg-lavender-soft lg:inline-flex"
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-purple-deep">Admin Panel</p>
              <p className="text-xs text-muted">NEXUS DEV STUDIO GREECE</p>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            className="rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep hover:bg-lavender-soft"
          >
            View site
          </Link>
        </header>
        <main className="px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
