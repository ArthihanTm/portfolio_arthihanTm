import HeroAboutScroll from "@/components/HeroAboutScroll";
import Nav from "@/components/Nav";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroAboutScroll />
        <SkillsSection />
        <ProjectsSection />
      </main>
    </>
  );
}