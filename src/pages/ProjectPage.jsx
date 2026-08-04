import { Link, useParams } from "react-router-dom";
import { getProject } from "../data/projects.js";
import NotFound from "./NotFound.jsx";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <article className="project-page container">
      <Link to="/#projects" className="back-link">
        ← Terug naar projecten
      </Link>

      <div className="project-banner hex-frame">
        <div className="hex-frame__inner">
          <img src={project.banner} alt={`Banner van ${project.title}`} />
        </div>
      </div>

      <h1>{project.title}</h1>
      <p className="tagline">{project.tagline}</p>

      <dl className="project-meta">
        <div>
          <dt>Mijn rol</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Tools</dt>
          <dd>
            <span className="tool-tags">
              {project.tools.map((tool) => (
                <span key={tool} className="tool-tag">
                  {tool}
                </span>
              ))}
            </span>
          </dd>
        </div>
        <div>
          <dt>Wanneer</dt>
          <dd>{project.period}</dd>
        </div>
      </dl>

      <div className="project-description">
        {project.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {project.sections?.map((section) => (
        <section key={section.heading} className="project-section">
          <h2>{section.heading}</h2>

          {section.text?.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          {section.list && (
            <ul className="content-list">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {section.image && (
            <figure className="project-figure hex-frame">
              <div className="hex-frame__inner">
                <img src={section.image.src} alt={section.image.alt} />
                {section.image.caption && (
                  <figcaption>{section.image.caption}</figcaption>
                )}
              </div>
            </figure>
          )}

          {section.code && (
            <div className="code-block">
              {section.code.caption && (
                <p className="code-caption">{section.code.caption}</p>
              )}
              <pre>
                <code>{section.code.snippet}</code>
              </pre>
              {section.code.explanation && (
                <p className="code-explanation">{section.code.explanation}</p>
              )}
            </div>
          )}
        </section>
      ))}

      {project.link && (
        <a
          className="project-link-btn"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          Bekijk project ↗
        </a>
      )}
    </article>
  );
}
