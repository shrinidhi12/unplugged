"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  KINDS,
  UNKNOWN,
  buildFilters,
  kindColor,
  matches,
  optionSlug,
  type Filter,
  type VenueSummary,
} from "@/lib/venue-filters";

// MapLibre is heavy; load it only on this page, after the list renders.
const VenueMap = dynamic(() => import("./VenueMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-paper-2" />,
});

const UNKNOWN_SLUG = "unknown";

/** URL value ("bar-cafe-restaurant") -> option label, or null if not an option. */
function fromSlug(f: Filter, slug: string | null): string | null {
  if (!slug) return null;
  if (slug === UNKNOWN_SLUG) return UNKNOWN;
  return f.options.find((o) => optionSlug(o) === slug) ?? null;
}

export function capacityLabel(v: VenueSummary): string {
  const n = Math.max(v.capacityStanding ?? 0, v.capacitySeated ?? 0);
  return n ? `Up to ~${n}` : "Capacity unknown";
}

function Facts({ v }: { v: VenueSummary }) {
  return (
    <p className="mt-1 text-sm text-ink-soft">
      {v.indoorOutdoor ?? "Indoor/outdoor unknown"} · {capacityLabel(v)} ·{" "}
      {v.cost && v.cost !== UNKNOWN ? v.cost : "Cost unknown"}
    </p>
  );
}

export default function VenueBrowser({
  venues,
  options,
}: {
  venues: VenueSummary[];
  options: Record<string, string[]>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = useMemo(() => buildFilters(venues, options), [venues, options]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);

  const selected = useMemo(
    () =>
      Object.fromEntries(
        filters.map((f) => [f.key, fromSlug(f, params.get(f.key))])
      ) as Record<string, string | null>,
    [filters, params]
  );
  const active = filters.filter((f) => selected[f.key]);

  const shown = useMemo(
    () =>
      venues.filter((v) =>
        filters.every((f) => !selected[f.key] || matches(f, v, selected[f.key]!))
      ),
    [venues, filters, selected]
  );
  const visible = useMemo(() => new Set(shown.map((v) => v.id)), [shown]);
  const current = selectedId && visible.has(selectedId)
    ? venues.find((v) => v.id === selectedId) ?? null
    : null;

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const select = useCallback((id: string) => {
    setSelectedId(id);
    // On wide screens the list scrolls beside the map; bring the row into view.
    const row = document.getElementById(`venue-row-${id}`);
    if (row && listRef.current && listRef.current.scrollHeight > listRef.current.clientHeight) {
      row.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, []);

  return (
    <div>
      {/* Phones: filters fold away so the map is on the first screen. */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          aria-controls="venue-filters"
          className="btn-outline w-full"
        >
          {filtersOpen ? "Hide filters" : "Filters"}
          {active.length > 0 && ` (${active.length} on)`}
        </button>
      </div>
      <form
        id="venue-filters"
        className={`${filtersOpen ? "grid" : "hidden"} mt-3 grid-cols-2 gap-3 sm:mt-0 sm:grid sm:grid-cols-3 lg:grid-cols-5`}
        onSubmit={(e) => e.preventDefault()}
        aria-label="Filter venues"
      >
        {filters.map((f, i) => {
          const id = `filter-${f.key}`;
          return (
            // The odd one out spans both columns on phones.
            <div key={f.key} className={i === filters.length - 1 ? "col-span-2 sm:col-span-1" : ""}>
              <label htmlFor={id} className="mb-1 block text-xs font-bold uppercase tracking-wider text-ink-soft">
                {f.label}
              </label>
              <select
                id={id}
                className="field venue-select"
                value={selected[f.key] ? optionSlug(selected[f.key]!) : ""}
                onChange={(e) => setFilter(f.key, e.target.value)}
              >
                <option value="">Any</option>
                {f.groups
                  ? f.groups.map((g) => (
                      <optgroup key={g.label} label={g.label}>
                        {g.options.map((o) => (
                          <option key={o} value={optionSlug(o)}>
                            {o}
                          </option>
                        ))}
                      </optgroup>
                    ))
                  : f.options.map((o) => (
                      <option key={o} value={optionSlug(o)}>
                        {o}
                      </option>
                    ))}
                <option value={UNKNOWN_SLUG}>{UNKNOWN}</option>
              </select>
            </div>
          );
        })}
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" aria-live="polite">
        <span className="font-bold">
          Showing {shown.length} of {venues.length} venues
        </span>
        {active.length > 0 && (
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="text-ink-soft underline underline-offset-4 hover:text-ink"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <div className="h-[360px] overflow-hidden border-2 border-ink md:h-[560px]">
            <VenueMap
              venues={venues}
              visible={visible}
              selectedId={current?.id ?? null}
              onSelect={select}
            />
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft" aria-label="Map key">
            {KINDS.map((k) => (
              <li key={k.label} className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-full" style={{ background: k.color }} aria-hidden="true" />
                {k.label}
              </li>
            ))}
            <li>Bigger dot = more Off Tech events</li>
          </ul>

          <div className="mt-4 min-h-[120px]" aria-live="polite">
            {current ? (
              <div className="card p-4">
                <p className="eyebrow">{current.type}</p>
                <h2 className="font-display mt-1 text-xl">{current.name}</h2>
                <p className="text-sm text-ink-soft">
                  {[current.neighborhood, current.borough].filter(Boolean).join(", ")}
                </p>
                <Facts v={current} />
                {current.listings > 0 && (
                  <p className="mt-1 text-sm">
                    {current.listings} Off Tech listing{current.listings === 1 ? "" : "s"}
                  </p>
                )}
                <Link href={`/find-a-venue/${current.id}`} className="btn btn-sm mt-3">
                  Hosting details →
                </Link>
              </div>
            ) : (
              <p className="border-2 border-dashed border-line p-4 text-sm text-ink-soft">
                Pick a dot on the map or a venue in the list to see it here.
              </p>
            )}
          </div>
        </div>

        <div>
          {shown.length === 0 ? (
            <p className="border-2 border-dashed border-line p-4 text-ink-soft">
              No venues match all of those filters. Try setting one back to
              &ldquo;Any&rdquo;, or include &ldquo;Unknown&rdquo;: most details
              are still being filled in.
            </p>
          ) : (
            <ul
              ref={listRef}
              className="divide-y-2 divide-line border-2 border-ink bg-card md:max-h-[740px] md:overflow-y-auto"
              aria-label="Venues"
            >
              {shown.map((v) => {
                const on = v.id === current?.id;
                return (
                  <li
                    key={v.id}
                    id={`venue-row-${v.id}`}
                    className={`flex items-start gap-3 p-3 ${on ? "bg-paper-2" : ""}`}
                  >
                    <span
                      className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full"
                      style={{ background: kindColor(v.type) }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/find-a-venue/${v.id}`}
                        className="font-bold underline-offset-4 hover:underline"
                      >
                        {v.name}
                      </Link>
                      <p className="text-sm text-ink-soft">
                        {v.type}
                        {v.neighborhood ? ` · ${v.neighborhood}` : ""}
                      </p>
                      <Facts v={v} />
                    </div>
                    <button
                      type="button"
                      onClick={() => select(v.id)}
                      aria-pressed={on}
                      aria-label={`Show ${v.name} on the map`}
                      className="shrink-0 border-2 border-ink px-2 py-1 text-xs font-bold hover:bg-paper-2 aria-pressed:bg-blue aria-pressed:text-card"
                    >
                      Map
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
