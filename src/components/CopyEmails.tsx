"use client";

import { useState } from "react";

/**
 * Host-only: copy the guest email list to the clipboard, comma-separated, so
 * it can be pasted straight into an email client's To/BCC field. Renders
 * nothing when there are no emails to copy.
 */
export default function CopyEmails({
  emails,
  label = "Copy emails",
}: {
  emails: string[];
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const list = Array.from(new Set(emails));

  if (list.length === 0) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(list.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-sm whitespace-nowrap"
      title={`Copy ${list.length} email${list.length === 1 ? "" : "s"}, comma-separated`}
    >
      {copied ? "Copied!" : `${label} (${list.length})`}
    </button>
  );
}
