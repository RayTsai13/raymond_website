import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Hobbies } from "@/components/sections/Hobbies";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { site } from "@/content/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Hobbies />
      <Contact />
    </>
  );
}
