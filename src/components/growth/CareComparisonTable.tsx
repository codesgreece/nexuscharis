import { careComparison } from "@/content/growth-services";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function cellValue(value: string) {
  if (value === "✓") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-lavender-soft text-sm font-bold text-purple-primary">
        ✓
      </span>
    );
  }
  if (value === "—") {
    return <span className="text-muted">—</span>;
  }
  return <span>{value}</span>;
}

export function CareComparisonTable() {
  return (
    <section
      className="bg-lavender-light py-16 sm:py-20"
      aria-labelledby="care-comparison-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Comparison
          </p>
          <h2
            id="care-comparison-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
          >
            Σύγκριση Website Care πακέτων
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Δες γρήγορα τι περιλαμβάνει κάθε μηνιαίο support package.
          </p>
        </Reveal>

        {/* Desktop / tablet table */}
        <Reveal delay={80}>
          <div className="mt-10 hidden overflow-hidden rounded-[1.5rem] border border-border-soft bg-white shadow-[0_16px_40px_-30px_rgba(76,29,149,0.3)] md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border-soft bg-lavender-soft/70">
                    <th scope="col" className="px-5 py-4 text-sm font-bold text-[#171717]">
                      Feature
                    </th>
                    {careComparison.columns.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        className="px-5 py-4 text-center text-sm font-bold text-[#171717]"
                      >
                        <span className="block">{col.label}</span>
                        <span className="mt-1 block text-xs font-semibold text-purple-primary">
                          {col.price}/μήνα
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {careComparison.rows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={cn(
                        "border-b border-border-soft/80 last:border-0",
                        i % 2 === 1 && "bg-lavender-light/50",
                      )}
                    >
                      <th
                        scope="row"
                        className="px-5 py-3.5 text-sm font-semibold text-[#171717]"
                      >
                        {row.feature}
                      </th>
                      <td className="px-5 py-3.5 text-center text-sm text-[#171717]">
                        {cellValue(row.care)}
                      </td>
                      <td className="px-5 py-3.5 text-center text-sm text-[#171717]">
                        {cellValue(row.carePro)}
                      </td>
                      <td className="px-5 py-3.5 text-center text-sm text-[#171717]">
                        {cellValue(row.dedicated)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Mobile cards */}
        <div className="mt-8 grid gap-4 md:hidden">
          {careComparison.columns.map((col, i) => (
            <Reveal key={col.key} delay={i * 60}>
              <article className="rounded-[1.35rem] border border-border-soft bg-white p-5 shadow-[0_14px_36px_-28px_rgba(76,29,149,0.28)]">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-bold text-[#171717]">{col.label}</h3>
                  <p className="text-sm font-extrabold text-purple-deep">{col.price}/μήνα</p>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {careComparison.rows
                    .filter((row) => row.feature !== "Price")
                    .map((row) => (
                      <li
                        key={row.feature}
                        className="flex items-center justify-between gap-3 border-b border-border-soft/70 pb-2 text-sm last:border-0 last:pb-0"
                      >
                        <span className="text-muted">{row.feature}</span>
                        <span className="font-semibold text-[#171717]">
                          {row[col.key]}
                        </span>
                      </li>
                    ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
