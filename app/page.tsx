import HeroAboutScroll from "@/components/HeroAboutScroll";
import Nav from "@/components/Nav";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroAboutScroll />
        <ProjectsSection />
      </main>
    </>
  );
}