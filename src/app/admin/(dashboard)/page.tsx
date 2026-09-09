import Link from "next/link";
import { getDashboardStats } from "@/server/services/content";
import {
  FolderKanban,
  Package,
  BadgePercent,
  Bell,
  MessageSquare,
  FileEdit,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Total Projects", value: stats.totalProjects, icon: FolderKanban },
    { label: "Published", value: stats.publishedProjects, icon: FolderKanban },
    { label: "Drafts", value: stats.draftProjects, icon: FileEdit },
    { label: "Active Packages", value: stats.activePackages, icon: Package },
    { label: "Active Offers", value: stats.activeOffers, icon: BadgePercent },
    { label: "Active Popups", value: stats.activePopups, icon: Bell },
    { label: "New Messages", value: stats.contactMessages, icon: MessageSquare },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717]">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Επισκόπηση NEXUS DEV STUDIO</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border-soft bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{card.label}</p>
              <card.icon className="h-4 w-4 text-purple-primary" />
            </div>
            <p className="mt-3 text-3xl font-extrabold text-purple-deep">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border-soft bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-[#171717]">Recent Activity</h2>
          <Link href="/admin/messages" className="text-sm font-semibold text-purple-primary">
            Messages →
          </Link>
        </div>
        <ul className="divide-y divide-border-soft">
          {stats.recentActivity.length === 0 && (
            <li className="py-6 text-sm text-muted">Δεν υπάρχει πρόσφατη δραστηριότητα.</li>
          )}
          {stats.recentActivity.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
              <div>
                <p className="font-medium text-[#171717]">
                  {item.action}
                  {item.entity ? ` · ${item.entity}` : ""}
                </p>
                <p className="text-muted">
                  {item.admin?.name || item.admin?.email || "System"}
                </p>
              </div>
              <time className="shrink-0 text-xs text-muted">
                {new Date(item.createdAt).toLocaleString("el-GR")}
              </time>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
