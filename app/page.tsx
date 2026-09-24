import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GithubShowcase from "@/components/GithubShowcase";
import OpenSourceEducation from "@/components/OpenSourceEducation";
import Chatbot from "@/components/Chatbot";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GithubShowcase />
        <OpenSourceEducation />
        <Chatbot />
      </main>
      <Contact />
    </>
  );
}
