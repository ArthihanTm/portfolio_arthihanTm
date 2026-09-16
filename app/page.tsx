import HeroAboutScroll from "@/components/HeroAboutScroll";
import PlacesSection from "@/components/PlacesSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main>
      <HeroAboutScroll />
      <ProjectsSection />
      <PlacesSection />
    </main>
  );
}
