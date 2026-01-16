import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import indexExchange from "./assets/images/index-exchange.png";
import aws from "./assets/images/aws.jpg";
import dashSocial from "./assets/images/dash-social.png";
import aUToronto from "./assets/images/autoronto.png";
import okare from "./assets/images/okare.png";
import utat from "./assets/images/utat.png";

interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  icon: string | { src: string; alt: string };
  active: boolean;
}

const experiences: Experience[] = [
  {
    id: "index-exchange",
    company: "Index Exchange",
    role: "Software Engineer Intern",
    description:
      "I wrote code that gets executed over 550B+ times a day. I’ve shipped features and systems in Go (and a little Rust), worked on data pipelines running on Kubernetes, and extended parts of the auction path to support future customer integrations.",
    icon: { src: indexExchange, alt: "Index Exchange" },
    active: false,
  },
  {
    id: "aws",
    company: "Amazon Web Services",
    role: "Software Development Engineer Intern",
    description:
      "Built an MCP server that lets LLMs monitor and reason about RDS and Aurora databases. I also improved an internal tool by speeding up a LangGraph-based workflow  and rearchitected the system to eliminate Lambda timeouts.",
    icon: { src: aws, alt: "Amazon Web Services" },
    active: false,
  },
  {
    id: "dash-social",
    company: "Dash Social",
    role: "Software Developer Intern",
    description:
      "I learned a lot here and had a great manager who gave me the freedom to work on what interested me. I worked across the stack, from speeding up backend APIs and test pipelines to collaborating with product on frontend features that improved how users found and managed content.",
    icon: { src: dashSocial, alt: "Dash Social" },
    active: false,
  },
  {
    id: "autoronto",
    company: "aUToronto",
    role: "Software Developer",
    description:
      "I worked on improving cloud infrastructure and streamlining CI workflows for the 4× GM/SAE AutoDrive Challenge winner, focusing on faster testing pipelines.",
    icon: { src: aUToronto, alt: "aUToronto" },
    active: false,
  },
  {
    id: "okare",
    company: "Okare",
    role: "Software Developer Intern",
    description:
      "Integrated third-party PMS into the Okare platform, accelerating customer onboarding.",
    icon: { src: okare, alt: "Okare" },
    active: false,
  },
  {
    id: "utat",
    company: "University of Toronto Aerospace Team",
    role: "Firmware Developer",
    description:
      "I worked on the FINCH satellite, building core housekeeping and parameter services in C as part of a small, three-person team. ",
    icon: { src: utat, alt: "University of Toronto Aerospace Team" },
    active: false,
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
            <div key={exp.id}>
              <button
                onClick={() => toggleExpanded(exp.id)}
                className={`w-full flex items-center gap-2 sm:gap-3 py-2 sm:py-3 text-left cursor-pointer rounded-md`}>
                <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center overflow-hidden rounded">
                    {typeof exp.icon === "string" ? (
                      <span className="text-xs font-semibold text-black">
                        {exp.icon}
                      </span>
                    ) : (
                      <img
                        src={exp.icon.src}
                        alt={exp.icon.alt}
                        width={32}
                        height={32}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain rounded-full"
                        style={{ 
                          imageRendering: "auto",
                          maxWidth: "100%",
                          maxHeight: "100%"
                        }}
                      />
                    )}
                  </div>
                  <span
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
                      exp.active ? "bg-green-500" : "bg-black"
                    }`}></span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 min-w-0">
                  <span className="font-bold text-black text-md">
                    {exp.company}
                  </span>
                  <span className="text-gray-700 font-normal text-sm">
                    {exp.role}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  {isExpanded ? (
                    <FaChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FaChevronDown className="text-gray-400 text-xs" />
                  )}
                </div>
              </button>
              {isExpanded && exp.description && (
                <div className="pb-2 sm:pb-3 ml-9 sm:ml-14">
                  <p className="experience-text">
                    {exp.description.replace(exp.company, "").trim()}
                  </p>
                </div>
              )}
              {index < experiences.length - 1 && (
                <div className="border-t border-gray-200"></div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Experiences;
