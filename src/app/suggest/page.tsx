import Link from "next/link";
import type { Metadata } from "next";
import SuggestionForm from "@/components/SuggestionForm";

export const metadata: Metadata = {
  title: "Suggestion box · Unplugg Me",
  description: "Ideas, bugs, hot takes, love notes: drop them in the box.",
};

export default function SuggestPage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        className="halftone pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-4xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-display text-lg text-blue">
            Unplugg Me
          </Link>
          <span className="eyebrow">Suggestion box</span>
        </div>
        <SuggestionForm />
      </div>
    </main>
  );
}
