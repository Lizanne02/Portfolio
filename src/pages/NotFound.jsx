import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found container">
      <h1>404</h1>
      <p>Deze pagina is de weg kwijtgeraakt in de jungle.</p>
      <Link to="/" className="project-link-btn">
        Terug naar de basis
      </Link>
    </div>
  );
}
