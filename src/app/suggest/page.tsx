import Link from "next/link";
import type { Metadata } from "next";
import SuggestionForm from "@/components/SuggestionForm";

export const metadata: Metadata = {
  title: "Suggestion box · Unplugg Me",
  description:
    "Suggest new functionality for Unplugg Me, or report a bug or issue.",
};

export default function SuggestPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-10">
      <header className="mb-8">
        <Link href="/" className="font-display text-lg font-semibold">
          Unplugg Me
        </Link>
        <h1 className="font-display mt-6 text-3xl">Suggestion box</h1>
        <p className="mt-2 text-ink-soft">
          If you&apos;d like Shrin to add any functionality to this site, or if
          there are any bugs or issues, please use this function
        </p>
      </header>
      <SuggestionForm />
    </main>
  );
}
