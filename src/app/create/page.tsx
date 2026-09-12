import Link from "next/link";
import type { Metadata } from "next";
import CreateForm from "@/components/CreateForm";
import SuggestionBoxButton from "@/components/SuggestionBoxButton";

export const metadata: Metadata = {
  title: "Create an event · Unplugg Me",
};

export default function CreatePage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-10">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-semibold">
            Unplugg Me
          </Link>
          <SuggestionBoxButton />
        </div>
        <h1 className="font-display mt-6 text-3xl">Create an event</h1>
        <p className="mt-2 text-ink-soft">
          (No account needed)
        </p>
      </header>
      <CreateForm />
    </main>
  );
}
