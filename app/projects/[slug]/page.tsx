import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FramedPanel } from "@/components/frame";
import { WonderReveal } from "@/components/projects/WonderReveal";
import { StatusPill, TechTags } from "@/components/ui";
import { formatMonth, getProject, getProjects } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

const TIER_BANNER = { wonder: "Wonder Completed", "great-work": "Great Work", work: "Work" } as const;

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  const prev = all[i - 1];
  const next = all[i + 1];

  return (
    <article className="px-4 pb-24 pt-28 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <Link href="/projects" className="prose-link label inline-flex items-center gap-2 no-underline">
          <ArrowLeft size={14} aria-hidden /> All projects
        </Link>

        <WonderReveal slug={slug} banner={TIER_BANNER[project.tier]}>
          <h1 className="inscription gold-gradient-text mt-4 text-4xl font-semibold leading-tight md:text-6xl">{project.title}</h1>
          <p className="mt-3 font-mono text-sm uppercase tracking-wide text-ink-500">
            {formatMonth(project.date)}
          </p>
          {project.tagline && <p className="mt-4 font-italic text-2xl italic text-ink-700">{project.tagline}</p>}
        </WonderReveal>

        {project.cover && (
          <FramedPanel className="mt-10 p-2 md:p-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1px]">
              <Image src={project.cover} alt={`${project.title} screenshot`} fill priority sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
            </div>
          </FramedPanel>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside>
            <FramedPanel className="p-5 lg:sticky lg:top-24">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="label text-ink-500">Status</dt>
                  <dd className="mt-1">
                    <StatusPill status={project.status} />
                  </dd>
                </div>
                {project.role && (
                  <div>
                    <dt className="label text-ink-500">Role</dt>
                    <dd className="mt-1 text-base text-ink-900">{project.role}</dd>
                  </div>
                )}
                {project.team && (
                  <div>
                    <dt className="label text-ink-500">Team</dt>
                    <dd className="mt-1 text-base text-ink-900">{project.team}</dd>
                  </div>
                )}
                <div>
                  <dt className="label text-ink-500">Stack</dt>
                  <dd className="mt-2">
                    <TechTags items={project.stack} />
                  </dd>
                </div>
                {Object.entries(project.links).some(([, v]) => v) && (
                  <div>
                    <dt className="label text-ink-500">Links</dt>
                    <dd className="mt-1 flex flex-col gap-1 font-mono text-sm">
                      {project.links.repo && <a className="prose-link" href={project.links.repo}>Source code ↗</a>}
                      {project.links.live && <a className="prose-link" href={project.links.live}>Live site ↗</a>}
                      {project.links.writeup && <a className="prose-link" href={project.links.writeup}>Write-up ↗</a>}
                    </dd>
                  </div>
                )}
              </dl>
            </FramedPanel>
          </aside>

          <div className="max-w-[68ch]">
            <p className="text-xl text-ink-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.4rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-gold-800">
              {project.summary}
            </p>
            {project.impact.length > 0 && (
              <ul className="mt-6 space-y-2 border-l border-gold-500/60 pl-4">
                {project.impact.map((x) => (
                  <li key={x} className="text-ink-700">
                    {x}
                  </li>
                ))}
              </ul>
            )}
            <div className="mdx mt-10">
              <MDXRemote source={project.body} />
            </div>
          </div>
        </div>

        <nav aria-label="More projects" className="mt-20 flex items-center justify-between gap-4 border-t border-gold-500/50 pt-6">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="prose-link label inline-flex items-center gap-2 no-underline">
              <ArrowLeft size={14} aria-hidden /> {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="prose-link label inline-flex items-center gap-2 no-underline">
              {next.title} <ArrowRight size={14} aria-hidden />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
