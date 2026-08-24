import HeroAboutScroll from "@/components/HeroAboutScroll";
import Nav from "@/components/Nav";
import PlacesSection from "@/components/PlacesSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroAboutScroll />
        <ProjectsSection />
        <PlacesSection />
      </main>
    </>
  );
}