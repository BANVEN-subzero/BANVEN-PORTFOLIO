import { getContactConfig } from "@/lib/email";
import { Preloader } from "@/components/shared/Preloader";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Research } from "@/components/sections/Research";
import { Milestones } from "@/components/sections/Milestones";
import { Vision } from "@/components/sections/Vision";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  // Server-read configuration — the email never ships to the client bundle
  // as a literal in JS; it is passed as a prop from this server component.
  const { email } = getContactConfig();

  return (
    <>
      <Preloader />
      <Navbar />
      <main className="relative">
        {/* Ambient background lighting */}
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-midnight" />
          <div className="absolute -top-40 left-1/4 h-[560px] w-[560px] rounded-full bg-electric/[0.07] blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[620px] w-[620px] translate-x-1/4 rounded-full bg-vio/[0.06] blur-[160px]" />
          <div className="absolute left-0 top-1/3 h-[420px] w-[420px] rounded-full bg-cy/[0.04] blur-[130px]" />
          {/* Fine grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
        </div>

        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Experience />
        <Research />
        <Milestones />
        <Vision />
        <GitHubSection />
        <Contact email={email} />
      </main>
      <Footer />
    </>
  );
}
