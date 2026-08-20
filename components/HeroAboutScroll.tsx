import AboutSection from "@/components/AboutSection";
import HeroBanner from "@/components/HeroBanner";

export default function HeroAboutScroll() {
  return (
    <>
      <div id="startseite">
        <HeroBanner />
      </div>
      <div id="uber-mich">
        <AboutSection />
      </div>
    </>
  );
}
