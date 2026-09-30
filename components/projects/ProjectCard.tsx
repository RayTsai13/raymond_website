import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FramedPanel } from "@/components/frame";
import { Laurel, Meander } from "@/components/ornaments";
import { StatusPill, TechTags } from "@/components/ui";
import { GithubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { ProjectMeta } from "@/lib/content";

/** Cover image, or an ornamental "coin" plate until a screenshot exists. */
function Cover({ project, className }: { project: ProjectMeta; className?: string }) {
  return (
    <div className={cn("relative aspect-[16/9] overflow-hidden rounded-[1px] border border-gold-500/60 bg-marble-100", className)}>
      {project.cover ? (
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover saturate-[0.8] sepia-[0.12] transition-[filter] duration-500 group-hover:saturate-100 group-hover:sepia-0"
        />
      ) : (
        <div aria-hidden className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_40%,#fffdf8,#f4eee2_70%)]">
          <Meander className="absolute inset-x-0 top-3 opacity-60" />
          <Meander className="absolute inset-x-0 bottom-3 opacity-60" />
          <div className="grid h-24 w-24 place-items-center rounded-full border border-gold-500 bg-ivory-0 shadow-[var(--shadow-panel)] transition-transform duration-500 group-hover:rotate-[8deg] md:h-28 md:w-28">
            <span className="inscription gold-gradient-text text-4xl font-semibold md:text-5xl">
              {project.title.replace(/^Codename\s+/i, "").charAt(0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Links({ project }: { project: ProjectMeta }) {
  const { repo, live, writeup } = project.links;
  const cls =
    "relative z-10 grid h-9 w-9 place-items-center rounded-full border border-gold-500/70 text-gold-800 transition-colors hover:border-gold-800 hover:bg-gold-300/40";
  return (
    <div className="flex gap-2">
      {repo && (
        <a href={repo} className={cls} aria-label={`${project.title} source code`}>
          <GithubIcon width={16} height={16} />
        </a>
      )}
      {live && (
        <a href={live} className={cls} aria-label={`${project.title} live site`}>
          <ExternalLink size={16} strokeWidth={1.5} aria-hidden />
        </a>
      )}
      {writeup && (
        <a href={writeup} className={cls} aria-label={`${project.title} write-up`}>
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
        </a>
      )}
    </div>
  );
}

function Title({ project, className }: { project: ProjectMeta; className?: string }) {
  return (
    <h3 className={cn("font-display font-medium leading-tight text-ink-900", className)}>
      {/* stretched link: the whole card opens the project page */}
      <Link
        href={`/projects/${project.slug}`}
        className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold-800"
      >
        {project.title}
        <ArrowUpRight
          aria-hidden
          size={18}
          className="ml-1 inline -translate-x-1 align-baseline text-gold-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Link>
    </h3>
  );
}

export function WonderCard({ project }: { project: ProjectMeta }) {
  return (
    <FramedPanel as="article" variant="ornate" interactive className="group p-5 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <Cover project={project} />
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="label inline-flex items-center gap-1.5 rounded-stone bg-tyrian-600 px-2.5 py-1 text-[0.65rem] text-gold-300">
              <Laurel className="h-4 w-4" leaves={5} />
              Wonder
            </span>
            <StatusPill status={project.status} />
          </div>
          <Title project={project} className="mt-4 text-3xl md:text-4xl" />
          <p className="mt-3 text-lg text-ink-700">{project.summary}</p>
          {project.impact.length > 0 && (
            <ul className="mt-5 space-y-2 border-l border-gold-500/60 pl-4">
              {project.impact.map((i) => (
                <li key={i} className="text-base text-ink-700">
                  {i}
                </li>
              ))}
            </ul>
          )}
          <TechTags items={project.stack} className="mt-6" />
          <div className="mt-6 flex items-center justify-between">
            <span className="label text-gold-800">View the Wonder →</span>
            <Links project={project} />
          </div>
        </div>
      </div>
    </FramedPanel>
  );
}

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <FramedPanel as="article" interactive className="group flex h-full flex-col p-4 md:p-5">
      <Cover project={project} />
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="label text-[0.65rem] text-ink-500">{project.tier === "great-work" ? "Great Work" : "Work"}</span>
        <StatusPill status={project.status} />
      </div>
      <Title project={project} className="mt-2 text-xl md:text-2xl" />
      <p className="mt-2 line-clamp-2 text-base text-ink-700">{project.summary}</p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <TechTags items={project.stack.slice(0, 4)} />
        <Links project={project} />
      </div>
    </FramedPanel>
  );
}
