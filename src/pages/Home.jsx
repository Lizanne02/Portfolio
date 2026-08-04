import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
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
        <h2 className="section-title">Projecten</h2>
        <p className="section-subtitle">
          Klik op een tegel om meer over een project te lezen
        </p>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
