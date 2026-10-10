/** Compact product-style visuals for service showcase cards */

import type { ReactElement } from "react";

type VisProps = { className?: string };

const stroke = "#6D28D9";
const fill = "#EDE4FF";
const amber = "#D99A55";
const cream = "#FFFCF7";
const deep = "#241535";

export function BrowserMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 120 78" fill="none" aria-hidden focusable="false">
      <rect x="4" y="8" width="112" height="64" rx="8" fill={cream} stroke={stroke} strokeWidth="1.6" />
      <rect x="4" y="8" width="112" height="14" rx="8" fill={fill} />
      <circle cx="16" cy="15" r="2.2" fill={amber} />
      <circle cx="24" cy="15" r="2.2" fill={stroke} opacity="0.35" />
      <circle cx="32" cy="15" r="2.2" fill={stroke} opacity="0.2" />
      <rect x="42" y="12" width="48" height="6" rx="3" fill="white" />
      <rect x="14" y="30" width="42" height="6" rx="2" fill={stroke} opacity="0.28" />
      <rect x="14" y="40" width="54" height="3.5" rx="1.5" fill={stroke} opacity="0.12" />
      <rect x="14" y="48" width="36" height="3.5" rx="1.5" fill={stroke} opacity="0.1" />
      <rect x="14" y="56" width="22" height="8" rx="4" fill={amber} opacity="0.75" />
      <rect x="74" y="30" width="32" height="34" rx="4" fill={fill} stroke={stroke} strokeWidth="1.1" />
    </svg>
  );
}

export function LandingMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 120 78" fill="none" aria-hidden focusable="false">
      <rect x="6" y="6" width="108" height="66" rx="7" fill={cream} stroke={stroke} strokeWidth="1.6" />
      <rect x="14" y="16" width="48" height="8" rx="2" fill={stroke} opacity="0.3" />
      <rect x="14" y="28" width="40" height="3.5" rx="1.5" fill={stroke} opacity="0.12" />
      <rect x="14" y="36" width="28" height="9" rx="4.5" fill={amber} opacity="0.8" />
      <rect x="70" y="14" width="36" height="48" rx="5" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <circle cx="88" cy="30" r="8" fill="white" opacity="0.7" />
      <rect x="76" y="44" width="24" height="3" rx="1.5" fill={stroke} opacity="0.2" />
      <rect x="78" y="51" width="20" height="3" rx="1.5" fill={stroke} opacity="0.12" />
    </svg>
  );
}

export function FullSiteMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 120 78" fill="none" aria-hidden focusable="false">
      <rect x="4" y="18" width="34" height="44" rx="4" fill={cream} stroke={stroke} strokeWidth="1.3" />
      <rect x="42" y="10" width="36" height="52" rx="4" fill={fill} stroke={stroke} strokeWidth="1.4" />
      <rect x="82" y="20" width="34" height="42" rx="4" fill={cream} stroke={stroke} strokeWidth="1.3" />
      <path d="M38 40h4M78 36h4" stroke={amber} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="48" y="18" width="24" height="4" rx="1.5" fill={stroke} opacity="0.25" />
      <rect x="48" y="26" width="18" height="10" rx="2" fill="white" />
    </svg>
  );
}

export function ShopMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 120 78" fill="none" aria-hidden focusable="false">
      <rect x="8" y="10" width="48" height="56" rx="6" fill={cream} stroke={stroke} strokeWidth="1.4" />
      <rect x="16" y="18" width="32" height="24" rx="3" fill={fill} />
      <rect x="18" y="48" width="28" height="5" rx="2" fill={amber} opacity="0.65" />
      <rect x="64" y="10" width="48" height="56" rx="6" fill={cream} stroke={stroke} strokeWidth="1.4" />
      <rect x="72" y="18" width="32" height="24" rx="3" fill={fill} />
      <rect x="74" y="48" width="28" height="5" rx="2" fill={amber} opacity="0.65" />
      <circle cx="98" cy="16" r="7" fill={deep} />
      <path d="M95 16h6M98 13v6" stroke={cream} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function DesktopMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 120 78" fill="none" aria-hidden focusable="false">
      <rect x="12" y="8" width="96" height="52" rx="6" fill={cream} stroke={stroke} strokeWidth="1.5" />
      <rect x="18" y="14" width="84" height="36" rx="3" fill={fill} />
      <rect x="24" y="20" width="28" height="20" rx="2" fill="white" />
      <rect x="56" y="20" width="40" height="8" rx="2" fill={stroke} opacity="0.15" />
      <rect x="56" y="32" width="30" height="8" rx="2" fill={amber} opacity="0.45" />
      <path d="M48 68h24" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <rect x="52" y="60" width="16" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="1.1" />
    </svg>
  );
}

export function PhoneMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 120 78" fill="none" aria-hidden focusable="false">
      <rect x="40" y="4" width="40" height="70" rx="8" fill={cream} stroke={stroke} strokeWidth="1.6" />
      <rect x="46" y="12" width="28" height="48" rx="3" fill={fill} />
      <rect x="50" y="18" width="20" height="4" rx="1.5" fill={stroke} opacity="0.25" />
      <rect x="50" y="26" width="16" height="10" rx="2" fill="white" />
      <rect x="50" y="40" width="20" height="3" rx="1.5" fill={amber} opacity="0.55" />
      <circle cx="60" cy="66" r="3" fill={amber} />
    </svg>
  );
}

export function DashboardMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 120 78" fill="none" aria-hidden focusable="false">
      <rect x="4" y="8" width="112" height="62" rx="7" fill={cream} stroke={stroke} strokeWidth="1.5" />
      <rect x="4" y="8" width="28" height="62" rx="7" fill={fill} />
      <rect x="10" y="18" width="16" height="4" rx="2" fill={stroke} opacity="0.25" />
      <rect x="10" y="28" width="16" height="4" rx="2" fill={stroke} opacity="0.15" />
      <rect x="10" y="38" width="16" height="4" rx="2" fill={amber} opacity="0.55" />
      <rect x="40" y="16" width="32" height="22" rx="4" fill="white" stroke={stroke} strokeWidth="1" />
      <rect x="76" y="16" width="32" height="22" rx="4" fill="white" stroke={stroke} strokeWidth="1" />
      <rect x="40" y="44" width="68" height="18" rx="4" fill={amber} opacity="0.28" />
      <path d="M46 54h16M70 50h18M96 56h8" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

const byIcon: Record<string, (p: VisProps) => ReactElement> = {
  globe: BrowserMock,
  layout: LandingMock,
  layers: FullSiteMock,
  "shopping-cart": ShopMock,
  monitor: DesktopMock,
  smartphone: PhoneMock,
  settings: DashboardMock,
  "code-2": BrowserMock,
};

export function ServiceVisual({ icon, className }: { icon: string; className?: string }) {
  const Comp = byIcon[icon] || BrowserMock;
  return <Comp className={className} />;
}
