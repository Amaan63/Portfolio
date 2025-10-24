import AboutSection from "@/sections/AboutUs";
import CertificateSection from "@/sections/CertificateSection";
import ExperienceSection from "@/sections/ExperienceSection";
import HeroSection from "@/sections/HeroSection";
import ProjectsSection from "@/sections/ProjectSection";
import SkillsSection from "@/sections/SkillsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificateSection />
    </main>
  );
}
