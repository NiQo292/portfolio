import Hero from "@/components/sections/Hero/Hero";
import Section from "@/components/Section";
import About from "@/components/sections/About/About";
import Contact from "@/components/sections/Contact/Contact";
import Experience from "@/components/sections/Experience/Experience";
import Projects from "@/components/sections/Projects/Projects";
import TechStack from "@/components/sections/Techstack/Techstack";

export default function Home() {
  return (
    <main>
      <Hero />
      <Section>
        <About />
      </Section>
      <Section>
        <Projects />
      </Section>
      <Section>
        <Experience />
      </Section>

      <Section>
        <TechStack />
      </Section>
      <Section>
        <Contact />
      </Section>
    </main>
  );
}
