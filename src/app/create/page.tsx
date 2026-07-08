import Link from "next/link";
import type { Metadata } from "next";
import CreateForm from "@/components/CreateForm";

export const metadata: Metadata = {
  title: "Create an event · Unplugg Me",
};

export default function CreatePage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-10">
      <header className="mb-8">
        <Link href="/" className="font-display text-lg font-semibold">
          Unplugg Me
        </Link>
        <h1 className="font-display mt-6 text-3xl">Create an event</h1>
        <p className="mt-2 text-ink-soft">
          No account needed and fully dumb-phone compatible.
        </p>
      </header>
      <CreateForm />
    </main>
  );
}
