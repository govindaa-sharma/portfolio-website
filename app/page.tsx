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
import Roles from "@/components/Roles";
import Hobbies from "@/components/Hobbies";

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
        <Roles />
        <Hobbies />
        <GithubShowcase />
        <OpenSourceEducation />
        <Chatbot />
      </main>
      <Contact />
    </>
  );
}
