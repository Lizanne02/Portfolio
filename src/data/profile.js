/**
 * ✏️ All personal info (except the projects) lives in this file:
 * name, tagline, intro texts, stats, skills, and contact info. Edit the
 * text here and the site updates itself.
 */

export const profile = {
  name: "Lizanne",
  fullName: "Lizanne van Rhijn",
  tagline: "Game Development Student · HvA Amsterdam",

  // Links (null = don't show)
  itchUrl: "https://rhijnl.itch.io",
  linkedinUrl: "https://www.linkedin.com/in/lizanne-van-rhijn-05206a3a6",
  email: "lizanne.van.rhijn@hotmail.com",

  // Short text under the photo on the homepage
  heroIntro:
    "Eager and driven student with a passion for software development, game design, and virtual reality.",

  // Paragraphs in the "About me" block
  about: [
    "I'm an eager and driven HBO-ICT Game Development student with a passion for software development, game development, and virtual reality working primarily in Unity and C#.",

    "I build systems that scale and hold up under real use: a fully data-driven VR menu that grows to 50+ processes without hand-built UI, backed by UX research and A/B testing with real users. I've also built object-pooled combat systems, tunable resource management, and enemy AI with independent movement and attack behavior going all the way back to my first project, where I also learned to work with databases to persist player progress.",

    "I'm always looking for opportunities to grow my technical and creative skills further, through challenging software and game development projects.",
  ],

  // Quick-glance stats shown under the "About me" text
  stats: [
    { value: "2023–Present", label: "HBO-ICT Game Dev" },
    { value: "4", label: "Projects shipped" },
    { value: "C#", label: "Primary language" },
    { value: "HvA", label: "Amsterdam" },
  ],

  // Skills grouped by category for the "Skills" section
  skills: {
    "Engines & Frameworks": ["Unity", "MonoGame", "XR Interaction Toolkit"],
    Languages: ["C#", "JavaScript", "HTML/CSS", "SQL"],
    "Tools & Other": ["Git / GitHub", "Blender", "Quixel Mixer", "Microsoft Office"],
  },

  // Intro paragraph for the "Contact" section
  contactIntro:
    "Open to internship opportunities. If you're looking for someone who enjoys building games, interactive applications, and VR experiences, I'd love to talk.",
};
