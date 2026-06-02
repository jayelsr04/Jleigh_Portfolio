import Navbar from "@/components/layout/Navbar";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import ClickSpark from "@/components/ui/ClickSpark";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ClickSpark
        sparkColor="#88c9bf"
        sparkSize={12}                    
        sparkRadius={20}                 
        sparkCount={10}                  
        duration={500}                    
      >
        <Navbar />
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </ClickSpark>
    </main>
  );
}