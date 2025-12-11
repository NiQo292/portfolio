import Footer from "@/components/Footer";
import Hero from "@/pages/Hero";
import Section from "@/components/Section";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Experience from "@/pages/Experience";
import Projects from "@/pages/Projects";
import TechStack from "@/pages/TechStack";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Section> */}
      <About />
      {/* </Section> */}
      <Section>
        <TechStack />
      </Section>
      <Section>
        <Experience />
      </Section>
      <Section>
        <Projects />
      </Section>
      <Section>
        <Contact />
      </Section>
      <Footer />
    </main>
  );
}
