import { Link } from "react-router-dom";

export default function ProjectTile({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="project-tile hex-frame"
      aria-label={`View project: ${project.title}`}
    >
      <div className="hex-frame__inner">
        <div className="thumb">
          <img src={project.thumbnail} alt="" />
        </div>
        <div className="tile-body">
          <h3>{project.title}</h3>
          <p className="tile-tagline">{project.tagline}</p>
          <p className="tile-summary">{project.summary}</p>

          {project.tools && (
            <div className="tool-tags tile-tags">
              {project.tools.map((tool) => (
                <span key={tool} className="tool-tag">
                  {tool}
                </span>
              ))}
            </div>
          )}

          <span className="tile-case-study">View Case Study ↗</span>
        </div>
      </div>
    </Link>
  );
}
