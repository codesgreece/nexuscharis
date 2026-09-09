import Link from "next/link";
import { Tag } from "lucide-react";

type Offer = {
  id: string;
  title: string;
  description: string;
  discount: string | null;
  price: string | null;
  oldPrice: string | null;
  ctaText: string;
  ctaUrl: string;
};

export function OffersBanner({ offers }: { offers: Offer[] }) {
  if (!offers.length) return null;
  const offer = offers[0];

  return (
    <div className="border-b border-purple-primary/10 bg-gradient-to-r from-purple-deep via-purple-primary to-purple-bright text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-start gap-3">
          <Tag className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <div>
            <p className="text-sm font-bold">
              {offer.title}
              {offer.discount ? ` — ${offer.discount}` : ""}
            </p>
            <p className="text-xs text-white/85">{offer.description}</p>
          </div>
        </div>
        <Link
          href={offer.ctaUrl || "#contact"}
          className="rounded-full bg-white px-4 py-2 text-xs font-bold text-purple-deep transition hover:bg-lavender-soft focus-ring"
        >
          {offer.ctaText}
        </Link>
      </div>
    </div>
  );
}
