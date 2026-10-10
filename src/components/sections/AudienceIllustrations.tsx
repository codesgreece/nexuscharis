/** Minimal custom SVG illustrations for audience cards — shared visual language */

type IllustProps = { className?: string };

const stroke = "#6D28D9";
const fill = "#EDE4FF";
const amber = "#D99A55";
const cream = "#F5EDE3";

export function SmallBusinessIllust({ className }: IllustProps) {
  return (
    <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden focusable="false">
      <rect x="8" y="18" width="48" height="26" rx="3" fill={cream} stroke={stroke} strokeWidth="1.4" />
      <path d="M6 20 L32 6 L58 20" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" fill={fill} />
      <rect x="26" y="28" width="12" height="16" rx="1.5" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <rect x="14" y="24" width="8" height="8" rx="1" fill="white" stroke={stroke} strokeWidth="1" />
      <rect x="42" y="24" width="8" height="8" rx="1" fill="white" stroke={stroke} strokeWidth="1" />
      <circle cx="48" cy="12" r="3" fill={amber} opacity="0.85" />
    </svg>
  );
}

export function FreelancerIllust({ className }: IllustProps) {
  return (
    <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden focusable="false">
      <rect x="6" y="10" width="40" height="28" rx="3" fill={cream} stroke={stroke} strokeWidth="1.4" />
      <rect x="10" y="14" width="32" height="16" rx="1.5" fill={fill} />
      <path d="M18 42h20" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M22 38h12v4H22z" fill={fill} stroke={stroke} strokeWidth="1" />
      <circle cx="50" cy="16" r="8" fill={fill} stroke={stroke} strokeWidth="1.3" />
      <path d="M46 16h8M50 12v8" stroke={amber} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function EcommerceIllust({ className }: IllustProps) {
  return (
    <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden focusable="false">
      <rect x="4" y="8" width="24" height="28" rx="2.5" fill={cream} stroke={stroke} strokeWidth="1.3" />
      <rect x="8" y="12" width="16" height="12" rx="1" fill={fill} />
      <rect x="10" y="28" width="12" height="3" rx="1" fill={amber} opacity="0.7" />
      <rect x="32" y="10" width="28" height="30" rx="3" fill="white" stroke={stroke} strokeWidth="1.4" />
      <rect x="36" y="14" width="20" height="10" rx="1.5" fill={fill} />
      <rect x="36" y="28" width="9" height="6" rx="1" fill={cream} stroke={stroke} strokeWidth="1" />
      <rect x="47" y="28" width="9" height="6" rx="1" fill={cream} stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

export function ServiceBizIllust({ className }: IllustProps) {
  return (
    <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden focusable="false">
      <rect x="6" y="6" width="52" height="36" rx="4" fill={cream} stroke={stroke} strokeWidth="1.4" />
      <rect x="10" y="10" width="14" height="28" rx="2" fill={fill} />
      <rect x="28" y="12" width="26" height="5" rx="1.5" fill="white" stroke={stroke} strokeWidth="1" />
      <rect x="28" y="22" width="18" height="4" rx="1" fill={amber} opacity="0.55" />
      <rect x="28" y="30" width="22" height="4" rx="1" fill="white" stroke={stroke} strokeWidth="1" />
      <circle cx="17" cy="18" r="3.5" fill="white" stroke={stroke} strokeWidth="1.1" />
    </svg>
  );
}

export function StartupIllust({ className }: IllustProps) {
  return (
    <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden focusable="false">
      <path
        d="M10 36 L22 24 L32 28 L44 14 L54 18"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 36 L22 24 L32 28 L44 14 L54 18 L54 36 Z"
        fill={fill}
        opacity="0.45"
      />
      <circle cx="22" cy="24" r="2.5" fill={amber} />
      <circle cx="32" cy="28" r="2.5" fill={stroke} />
      <circle cx="44" cy="14" r="3" fill={amber} />
      <path d="M48 10l6 2-2 6" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PersonalBrandIllust({ className }: IllustProps) {
  return (
    <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden focusable="false">
      <rect x="14" y="6" width="36" height="36" rx="18" fill={cream} stroke={stroke} strokeWidth="1.4" />
      <circle cx="32" cy="20" r="7" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <path
        d="M18 38c2.5-8 8-12 14-12s11.5 4 14 12"
        stroke={stroke}
        strokeWidth="1.3"
        fill={fill}
        opacity="0.7"
      />
      <circle cx="48" cy="12" r="4" fill={amber} opacity="0.8" />
    </svg>
  );
}

export const audienceIllustrations = {
  "Μικρές Επιχειρήσεις": SmallBusinessIllust,
  "Ελεύθεροι Επαγγελματίες": FreelancerIllust,
  "Καταστήματα & E-Commerce": EcommerceIllust,
  "Επιχειρήσεις Υπηρεσιών": ServiceBizIllust,
  "Startups & Νέα Projects": StartupIllust,
  "Προσωπικά Brands": PersonalBrandIllust,
} as const;
