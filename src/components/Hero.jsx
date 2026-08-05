import { profile } from "../data/profile.js";

export default function Hero() {
  return (
    <section className="hero container">
      <h1>{profile.fullName}</h1>
      <p className="tagline">{profile.tagline}</p>
      <p className="intro">{profile.heroIntro}</p>

      <div className="hero-cta">
        <a href="#projects" className="project-link-btn">
          View My Work
        </a>
        <a href="#contact" className="hero-btn hex-frame">
          <span className="hex-frame__inner">Get In Touch</span>
        </a>
      </div>

      {(profile.linkedinUrl || profile.itchUrl) && (
        <div className="hero-social">
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          )}
          {profile.itchUrl && (
            <a href={profile.itchUrl} target="_blank" rel="noreferrer">
              itch.io ↗
            </a>
          )}
        </div>
      )}
    </section>
  );
}
