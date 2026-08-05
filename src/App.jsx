import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { profile } from "./data/profile.js";

export default function App() {
  const { pathname, hash } = useLocation();

  // SPA navigation doesn't scroll on its own: jump to the #section if the
  // URL has one, otherwise start new pages at the top.
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link to="/" className="site-logo">
            LIZANNE VAN RHIJN<span>.COM</span>
          </Link>
          <nav className="site-nav">
            <Link to="/#about">About me</Link>
            <Link to="/#projects">Projects</Link>
            <Link to="/#skills">Skills</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {profile.fullName}{" "}
            <span className="gold">✦</span> Game Development Portfolio
            {profile.itchUrl && (
              <>
                {" "}
                <span className="gold">✦</span>{" "}
                <a href={profile.itchUrl} target="_blank" rel="noreferrer">
                  itch.io
                </a>
              </>
            )}
            {profile.linkedinUrl && (
              <>
                {" "}
                <span className="gold">✦</span>{" "}
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </>
            )}
          </p>
        </div>
      </footer>
    </>
  );
}
