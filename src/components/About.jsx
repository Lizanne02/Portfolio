import HexDivider from "./HexDivider.jsx";
import { profile } from "../data/profile.js";

export default function About() {
  return (
    <section id="about" className="container">
      <HexDivider />
      <h2 className="section-title">Over Mij</h2>
      <p className="section-subtitle">Even voorstellen</p>

      <div className="about hex-frame">
        <div className="hex-frame__inner">
          {profile.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
