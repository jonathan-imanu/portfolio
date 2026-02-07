import { useState } from "react";
import type { Experience } from "./types/experiences";
import indexExchange from "./assets/images/index-exchange.png";
import aws from "./assets/images/aws.jpg";
import dashSocial from "./assets/images/dash-social.png";
import aUToronto from "./assets/images/autoronto.png";
import utat from "./assets/images/utat.png";
import google from "./assets/images/google.png";
import yScope from "./assets/images/yscope.png";
import { Experience as ExperienceComponent } from "./components/Experience";

const experiences: Experience[] = [
  {
    id: "google",
    company: "Google",
    role: "Incoming Software Engineer Intern",
    description:
      "Designing and productionizing a SQL debugger for AlloyDB to analyze query execution plans and runtime behavior.",
    icon: { src: google, alt: "Google" },
    status: "incoming",
    dates: "May 2026 - Aug 2026",
  },
  {
    id: "y-scope",
    company: "YScope",
    role: "Part-time Software Engineer",
    description:
      "Contributing to the development of CLP, an open-source platform for compressed, searchable log analytics without decompression.",
    icon: { src: yScope, alt: "YScope" },
    status: "active",
    dates: "Feb 2026 - Present",
  },
  {
    id: "index-exchange",
    company: "Index Exchange",
    role: "Software Engineer Intern",
    description:
      "I wrote code that gets executed over 550B+ times a day. I shipped data pipelines running on Kubernetes and extended parts of the auction path to support bid shading.",
    icon: { src: indexExchange, alt: "Index Exchange" },
    status: "inactive",
    dates: "Sep 2025 - Dec 2025",
  },
  {
    id: "aws",
    company: "Amazon Web Services",
    role: "Software Dev Engineer Intern",
    description:
      "Built an MCP server that lets LLMs monitor and reason about RDS and Aurora databases. I also improved an internal tool by speeding up a LangGraph-based workflow  and rearchitected the system to eliminate Lambda timeouts.",
    icon: { src: aws, alt: "Amazon Web Services" },
    status: "inactive",
    dates: "May 2025 - Aug 2025",
  },
  {
    id: "dash-social",
    company: "Dash Social",
    role: "Software Developer Intern",
    description:
      "I learned a lot here and had a great manager who gave me the freedom to work on what interested me. I did everything from speeding up API endpoints to collaborating with product on features that improved how SMMs found their content.",
    icon: { src: dashSocial, alt: "Dash Social" },
    status: "inactive",
    dates: "Jan 2025 - Apr 2025",
  },
  {
    id: "autoronto",
    company: "aUToronto",
    role: "Software Developer",
    description:
      "I worked on improving cloud infrastructure and streamlining CI workflows for the 4× AutoDrive Challenge winner.",
    icon: { src: aUToronto, alt: "aUToronto" },
    status: "inactive",
    dates: "Sep 2023 - Apr 2024",
  },
  {
    id: "utat",
    company: "University of Toronto Aerospace Team",
    role: "Firmware Developer",
    description:
      "I worked on the FINCH satellite, building core housekeeping and parameter services in C as part of a three-person team. ",
    icon: { src: utat, alt: "University of Toronto Aerospace Team" },
    status: "inactive",
    dates: "May 2023 - Aug 2033",
  },
];

function Experiences() {
  const [expandedId, setExpandedId] = useState<string>("");

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <section id="experiences" className="text-sm space-y-2">
      <div className="space-y-0">
        {experiences.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          return (
            <ExperienceComponent
              key={exp.id}
              experience={exp}
              isExpanded={isExpanded}
              toggleExpanded={toggleExpanded}
              index={index}
              totalExperiences={experiences.length}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Experiences;
