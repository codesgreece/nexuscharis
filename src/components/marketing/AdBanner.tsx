import Link from "next/link";

type Ad = {
  id: string;
  title: string;
  content: string | null;
  imageUrl: string | null;
  url: string | null;
  position: string;
};

export function AdBanner({ ads, position }: { ads: Ad[]; position: string }) {
  const items = ads.filter((a) => a.position === position);
  if (!items.length) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      {items.map((ad) => {
        const inner = (
          <div className="rounded-2xl border border-purple-primary/15 bg-gradient-to-r from-lavender-soft to-white px-5 py-4">
            <p className="text-sm font-bold text-purple-deep">{ad.title}</p>
            {ad.content && <p className="mt-1 text-sm text-muted">{ad.content}</p>}
          </div>
        );
        return ad.url ? (
          <Link key={ad.id} href={ad.url} className="block focus-ring rounded-2xl">
            {inner}
          </Link>
        ) : (
          <div key={ad.id}>{inner}</div>
        );
      })}
    </div>
  );
}
