import Hero from "@/components/landing/Hero";
import Experience from "@/components/landing/Experience";
import Projects from "@/components/landing/Projects";
import Github from "@/components/landing/Github";
import Achievements from "@/components/landing/Achievements";
import { Quote } from "@/components/common/Quote";
import Container from "@/components/common/Container";


export default function Home() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Experience />
      <Projects />
      <Github />
      <Achievements />
      <Quote
        fixedQuote={{
          quote: "Either increase your sacrifice, or reduce your desire.",
          author: "",
        }}
      />
    </Container>
  );
}
