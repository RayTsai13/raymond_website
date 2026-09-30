/** Themed line-art emblems for the Forum (hobby) cards. Original, decorative. */
import type { Hobby } from "@/lib/content";

const paths: Record<Hobby["icon"], React.ReactNode> = {
  owl: (
    <>
      <path d="M10 9l2.5 3M22 9l-2.5 3" />
      <path d="M9 13c0-3 3-4.5 7-4.5s7 1.5 7 4.5v7c0 4-3 7-7 7s-7-3-7-7z" />
      <circle cx="13" cy="15" r="2.4" />
      <circle cx="19" cy="15" r="2.4" />
      <path d="M15.2 18.5L16 20l.8-1.5" />
      <path d="M12 22.5c1.2 1 2.6 1.4 4 1.4s2.8-.4 4-1.4" />
      <path d="M13 27v2M19 27v2" />
    </>
  ),
  amphora: (
    <>
      <path d="M13 4h6M13.5 4v4.5M18.5 4v4.5" />
      <path d="M13.5 8.5c-4 1.5-6 5-6 9.5 0 5 3.5 8.5 7 10h3c3.5-1.5 7-5 7-10 0-4.5-2-8-6-9.5" />
      <path d="M13.5 7c-3-1-5 .5-5 3.5M18.5 7c3-1 5 .5 5 3.5" />
      <path d="M8.5 16h15M9 20h14" />
      <path d="M14.5 28.5l-.5 1.5h4l-.5-1.5" />
    </>
  ),
  trireme: (
    <>
      <path d="M3 18h26l-3 5H7z" />
      <path d="M26 18l3-3" />
      <path d="M16 18V4" />
      <path d="M16 5c4 1 6 3.5 6 7-2-.5-4-.5-6 0" />
      <path d="M9 23l-2 4M13 23l-1.5 4M17 23l-1 4M21 23l-.5 4" />
    </>
  ),
  quill: (
    <>
      <path d="M26 4C16 6 10 13 8 24l2 .5C13 16 18 10 26 4z" />
      <path d="M26 4c-3 6-7 11-13 14" />
      <path d="M8 24l-2 5" />
      <path d="M11 16l3 1M13.5 12.5l3 .8M16.5 9.5l2.6.5" />
    </>
  ),
  column: (
    <>
      <path d="M6 5h20M8 8h16" />
      <path d="M9 8c-2.5 0-3.5 2.5-2 3.5M23 8c2.5 0 3.5 2.5 2 3.5" />
      <path d="M10 10v16M14 10v16M18 10v16M22 10v16" />
      <path d="M8 26h16M6 29h20" />
    </>
  ),
  lyre: (
    <>
      <path d="M9 27h14" />
      <path d="M11 27c-3-4-4-9-2-15 .8-2.5-.5-5-2.5-6M21 27c3-4 4-9 2-15-.8-2.5.5-5 2.5-6" />
      <path d="M8 9.5h16" />
      <path d="M13 9.5V27M16 9.5V27M19 9.5V27" />
    </>
  ),
};

export function Emblem({ name, className }: { name: Hobby["icon"]; className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
