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
    "I'm an eager and driven HBO-ICT Game Development student with a passion for software development, game development, and virtual reality. I enjoy building games and interactive applications in Unity and C#, but I'm also interested in web development and data analysis. Alongside my technical skills, I have strong analytical and problem-solving abilities, an eye for detail, and a strong sense of responsibility. During group projects, I regularly take the initiative by setting up a clear plan and working together on a fair division of tasks.",
    "Personal growth and gaining new experiences are central to me, both in my studies and in practice. I'm always looking for opportunities to further develop my technical and creative skills and deepen my knowledge.",
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
