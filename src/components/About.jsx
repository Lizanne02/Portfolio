import HexDivider from "./HexDivider.jsx";
import { profile } from "../data/profile.js";

export default function About() {
  return (
    <section id="about" className="container">
      <HexDivider />
      <h2 className="section-title">About Me</h2>
      <p className="section-subtitle">A quick introduction</p>

      <div className="about-layout">
        <div className="about-portrait">
          <img src="/images/portrait.jpg" alt={`Portrait of ${profile.fullName}`} />
        </div>

        <div className="about hex-frame">
          <div className="hex-frame__inner">
            {profile.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {profile.stats && (
        <div className="stats-grid">
          {profile.stats.map((stat, i) => (
            <div className="stat-card hex-frame" key={i}>
              <div className="hex-frame__inner">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
