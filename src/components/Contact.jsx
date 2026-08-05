import HexDivider from "./HexDivider.jsx";
import { profile } from "../data/profile.js";

export default function Contact() {
  return (
    <section id="contact" className="container">
      <HexDivider />
      <h2 className="section-title">Contact</h2>
      <p className="section-subtitle">Let's build something great</p>

      <div className="contact-panel hex-frame">
        <div className="hex-frame__inner">
          <p>{profile.contactIntro}</p>

          {profile.email && (
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          )}

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
        </div>
      </div>
    </section>
  );
}
