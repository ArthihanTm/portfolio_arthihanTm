import AboutSection from "@/components/AboutSection";
import HeroBanner from "@/components/HeroBanner";
import Nav from "@/components/Nav";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroBanner />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
    </>
  );
}