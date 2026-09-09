import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showText = true,
  href = "/#home",
}: {
  className?: string;
  showText?: boolean;
  href?: string;
}) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5 focus-ring rounded-xl", className)}>
      <Image
        src="/images/logo.svg"
        alt="NEXUS DEV STUDIO"
        width={40}
        height={40}
        className="h-9 w-9 sm:h-10 sm:w-10"
        priority
      />
      {showText && (
        <span className="leading-tight">
          <span className="block text-sm font-bold tracking-wide text-[#171717] sm:text-[15px]">
            NEXUS DEV STUDIO
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-primary">
            Greece
          </span>
        </span>
      )}
    </Link>
  );
}
