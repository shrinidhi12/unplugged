import Link from "next/link";

/** The little top-right "Suggestion box" sticker that links to /suggest. */
export default function SuggestionBoxButton() {
  return (
    <Link
      href="/suggest"
      className="suggest-btn"
      aria-label="Suggestion box"
      title="Suggestion box"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <rect
          x="8"
          y="1.5"
          width="8"
          height="10"
          className="suggest-note fill-pink stroke-ink"
          strokeWidth="1.5"
        />
        <rect
          x="3"
          y="9"
          width="18"
          height="13"
          className="fill-blue stroke-ink"
          strokeWidth="1.8"
        />
        <line
          x1="7.5"
          y1="9"
          x2="16.5"
          y2="9"
          className="stroke-ink"
          strokeWidth="2.6"
        />
      </svg>
      <span className="hidden sm:inline">Suggestion box</span>
    </Link>
  );
}
