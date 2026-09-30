"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/** Copies the email and shows a small framed toast, announced politely. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
          } catch {
            window.location.href = `mailto:${email}`;
          }
        }}
        className="prose-link inline-flex items-center gap-2 font-mono text-sm"
      >
        {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
        {email}
      </button>
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-stone border border-gold-500 bg-lapis-800 px-5 py-3 text-gold-300 shadow-[var(--shadow-panel-lift)] transition-all duration-300 ${
          copied ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <span className="label">{copied ? "Email copied · the envoy departs" : ""}</span>
      </div>
    </>
  );
}
