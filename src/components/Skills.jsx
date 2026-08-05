import HexDivider from "./HexDivider.jsx";
import { profile } from "../data/profile.js";

export default function Skills() {
  return (
    <section id="skills" className="container">
      <HexDivider />
      <h2 className="section-title">Skills</h2>
      <p className="section-subtitle">Toolkit & technologies I work with</p>

      <div className="skills-grid">
        {Object.entries(profile.skills).map(([category, items]) => (
          <div className="skills-category hex-frame" key={category}>
            <div className="hex-frame__inner">
              <h3>{category}</h3>
              <div className="tool-tags">
                {items.map((item) => (
                  <span key={item} className="tool-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
