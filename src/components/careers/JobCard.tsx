import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import type { Job } from "@/content/jobs";
import { cn } from "@/lib/utils";

function JobMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden focusable="false">
      <rect x="6" y="10" width="36" height="28" rx="6" fill="#EDE4FF" stroke="#6D28D9" strokeWidth="1.4" />
      <rect x="12" y="16" width="16" height="4" rx="2" fill="#6D28D9" opacity="0.35" />
      <rect x="12" y="24" width="22" height="3" rx="1.5" fill="#6D28D9" opacity="0.15" />
      <circle cx="36" cy="28" r="5" fill="#D99A55" opacity="0.85" />
    </svg>
  );
}

export function JobCard({ job, className }: { job: Job; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-soft-border bg-gradient-to-br from-warm-ivory to-white p-5 shadow-[0_14px_36px_-28px_rgba(65,42,66,0.18)] transition duration-300",
        "hover:-translate-y-1 hover:border-purple-primary/35 hover:shadow-[0_22px_48px_-28px_rgba(109,40,217,0.28)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-full bg-lavender/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-purple-deep">
          {job.category}
        </span>
        <JobMark className="h-10 w-10 shrink-0 opacity-90 transition duration-300 group-hover:scale-105" />
      </div>

      <h3 className="mt-4 text-xl font-extrabold tracking-tight text-warm-charcoal">
        {job.title}
      </h3>

      <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-purple-primary" aria-hidden />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-muted-amber" aria-hidden />
          {job.type}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{job.shortDescription}</p>

      {job.postedAt ? (
        <p className="mt-3 text-[11px] font-medium text-muted/70">
          Δημοσιεύθηκε{" "}
          {new Date(job.postedAt).toLocaleDateString("el-GR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      ) : null}

      <Link
        href={`/careers/${job.slug}`}
        className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-xl text-sm font-semibold text-purple-deep transition hover:text-purple-primary focus-ring"
      >
        Δες τη θέση
        <ArrowRight
          className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </article>
  );
}
