import Link from "next/link";

/** The plain top-right "Suggestion box" link to /suggest. */
export default function SuggestionBoxButton() {
  return (
    <Link
      href="/suggest"
      className="whitespace-nowrap text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
    >
      Suggestion box
    </Link>
  );
}
