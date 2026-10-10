/** Compact product-style visuals for service flip cards */

import type { ReactElement } from "react";

type VisProps = { className?: string };

const stroke = "#6D28D9";
const fill = "#EDE4FF";
const amber = "#D99A55";
const cream = "#FFFCF7";

export function BrowserMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 56 40" fill="none" aria-hidden focusable="false">
      <rect x="2" y="4" width="52" height="32" rx="4" fill={cream} stroke={stroke} strokeWidth="1.3" />
      <rect x="2" y="4" width="52" height="8" rx="4" fill={fill} />
      <circle cx="8" cy="8" r="1.4" fill={amber} />
      <circle cx="13" cy="8" r="1.4" fill={stroke} opacity="0.4" />
      <circle cx="18" cy="8" r="1.4" fill={stroke} opacity="0.25" />
      <rect x="8" y="16" width="20" height="3" rx="1" fill={stroke} opacity="0.35" />
      <rect x="8" y="22" width="28" height="2" rx="1" fill={stroke} opacity="0.18" />
      <rect x="8" y="27" width="16" height="2" rx="1" fill={amber} opacity="0.45" />
    </svg>
  );
}

export function LandingMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 56 40" fill="none" aria-hidden focusable="false">
      <rect x="2" y="3" width="52" height="34" rx="3" fill={cream} stroke={stroke} strokeWidth="1.3" />
      <rect x="6" y="8" width="22" height="4" rx="1" fill={stroke} opacity="0.35" />
      <rect x="6" y="15" width="18" height="2" rx="1" fill={stroke} opacity="0.15" />
      <rect x="6" y="20" width="12" height="5" rx="2" fill={amber} opacity="0.7" />
      <rect x="34" y="8" width="16" height="22" rx="2" fill={fill} stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

export function FullSiteMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 56 40" fill="none" aria-hidden focusable="false">
      <rect x="2" y="6" width="18" height="24" rx="2" fill={cream} stroke={stroke} strokeWidth="1.1" />
      <rect x="22" y="4" width="18" height="26" rx="2" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="36" y="10" width="18" height="22" rx="2" fill={cream} stroke={stroke} strokeWidth="1.1" />
      <path d="M20 18h2M40 20h-2" stroke={amber} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function ShopMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 56 40" fill="none" aria-hidden focusable="false">
      <rect x="4" y="6" width="20" height="26" rx="2.5" fill={cream} stroke={stroke} strokeWidth="1.2" />
      <rect x="8" y="10" width="12" height="10" rx="1" fill={fill} />
      <rect x="8" y="24" width="12" height="3" rx="1" fill={amber} opacity="0.55" />
      <rect x="28" y="6" width="20" height="26" rx="2.5" fill={cream} stroke={stroke} strokeWidth="1.2" />
      <rect x="32" y="10" width="12" height="10" rx="1" fill={fill} />
      <rect x="32" y="24" width="12" height="3" rx="1" fill={amber} opacity="0.55" />
    </svg>
  );
}

export function DesktopMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 56 40" fill="none" aria-hidden focusable="false">
      <rect x="6" y="4" width="44" height="26" rx="3" fill={cream} stroke={stroke} strokeWidth="1.3" />
      <rect x="10" y="8" width="36" height="16" rx="1.5" fill={fill} />
      <path d="M22 34h12" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="24" y="30" width="8" height="4" rx="1" fill={fill} stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

export function PhoneMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 56 40" fill="none" aria-hidden focusable="false">
      <rect x="18" y="2" width="20" height="36" rx="4" fill={cream} stroke={stroke} strokeWidth="1.3" />
      <rect x="21" y="6" width="14" height="24" rx="1.5" fill={fill} />
      <circle cx="28" cy="34" r="1.8" fill={amber} />
    </svg>
  );
}

export function DashboardMock({ className }: VisProps) {
  return (
    <svg className={className} viewBox="0 0 56 40" fill="none" aria-hidden focusable="false">
      <rect x="2" y="4" width="52" height="32" rx="3" fill={cream} stroke={stroke} strokeWidth="1.3" />
      <rect x="2" y="4" width="12" height="32" rx="3" fill={fill} />
      <rect x="18" y="8" width="14" height="10" rx="1.5" fill="white" stroke={stroke} strokeWidth="1" />
      <rect x="34" y="8" width="14" height="10" rx="1.5" fill="white" stroke={stroke} strokeWidth="1" />
      <rect x="18" y="22" width="30" height="8" rx="1.5" fill={amber} opacity="0.35" />
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
