import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found container">
      <h1>404</h1>
      <p>This page got lost in the jungle.</p>
      <Link to="/" className="project-link-btn">
        Back to base
      </Link>
    </div>
  );
}
