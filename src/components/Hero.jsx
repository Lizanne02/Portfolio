import { profile } from "../data/profile.js";

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-portrait">
        <img src="/images/portrait.jpg" alt={`Portret van ${profile.name}`} />
      </div>
      <h1>{profile.name}</h1>
      <p className="tagline">{profile.tagline}</p>
      <p className="intro">{profile.heroIntro}</p>

      {(profile.linkedinUrl || profile.itchUrl) && (
        <div className="hero-links">
          {profile.linkedinUrl && (
            <a
              className="hero-btn hex-frame"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="hex-frame__inner">LinkedIn ↗</span>
            </a>
          )}
          {profile.itchUrl && (
            <a
              className="hero-btn hex-frame"
              href={profile.itchUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="hex-frame__inner">itch.io ↗</span>
            </a>
          )}
        </div>
      )}
    </section>
  );
}
