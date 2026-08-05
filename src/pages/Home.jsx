import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Contact from "../components/Contact.jsx";
import HexDivider from "../components/HexDivider.jsx";
import ProjectTile from "../components/ProjectTile.jsx";
import { projects } from "../data/projects.js";

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      <section id="projects" className="container">
        <HexDivider />
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Click a tile to read more about a project
        </p>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <Skills />
      <Contact />
    </>
  );
}
