import { AdminCard, Badge, PageHeader } from "@/components/admin/DataTable";
import { getDashboardStats } from "@/server/services/content";
import { formatDistanceToNow } from "date-fns";
import {
  BadgePercent,
  Images,
  MessageSquare,
  Package,
  Bell,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "New messages",
      value: stats.contactMessages,
      href: "/admin/messages",
      icon: MessageSquare,
    },
    {
      label: "Active packages",
      value: stats.activePackages,
      href: "/admin/packages",
      icon: Package,
    },
    {
      label: "Portfolio projects",
      value: stats.totalProjects,
      href: "/admin/portfolio",
      icon: Images,
    },
    {
      label: "Published",
      value: stats.publishedProjects,
      href: "/admin/portfolio",
      icon: Images,
    },
    {
      label: "Active offers",
      value: stats.activeOffers,
      href: "/admin/offers",
      icon: BadgePercent,
    },
    {
      label: "Active popups",
      value: stats.activePopups,
      href: "/admin/popups",
      icon: Bell,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of site content, marketing activity, and recent admin actions."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="group">
              <AdminCard className="transition group-hover:-translate-y-0.5 group-hover:border-purple-electric/40">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted">{card.label}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-purple-deep">
                      {card.value}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-lavender-soft p-2.5 text-purple-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </AdminCard>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AdminCard>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-purple-deep">Portfolio snapshot</h2>
            <Badge tone="purple">{stats.draftProjects} drafts</Badge>
          </div>
          <p className="text-sm text-muted">
            {stats.totalProjects === 0
              ? "No portfolio projects yet. Add real client work when ready — never fake projects."
              : `${stats.publishedProjects} published · ${stats.draftProjects} drafts`}
          </p>
          <Link
            href="/admin/portfolio/new"
            className="mt-4 inline-flex text-sm font-semibold text-purple-primary hover:underline"
          >
            Add project →
          </Link>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 text-base font-semibold text-purple-deep">Recent activity</h2>
          {stats.recentActivity.length === 0 ? (
            <p className="text-sm text-muted">No audit events yet.</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentActivity.map((log) => (
                <li
                  key={log.id}
                  className="flex items-start justify-between gap-3 border-b border-border-soft pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-purple-deep">
                      {log.action}
                      {log.entity ? ` · ${log.entity}` : ""}
                    </p>
                    <p className="text-xs text-muted">
                      {log.admin?.name || "System"}
                      {log.entityId ? ` · ${log.entityId.slice(0, 8)}…` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">
                    {formatDistanceToNow(log.createdAt, { addSuffix: true })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
