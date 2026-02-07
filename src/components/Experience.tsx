import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import type { Experience as ExperienceType } from "../types/experiences";

interface ExperienceProps {
  experience: ExperienceType;
  isExpanded: boolean;
  toggleExpanded: (id: string) => void;
  index: number;
  totalExperiences: number;
}

export function Experience({
  experience,
  isExpanded,
  toggleExpanded,
  index,
  totalExperiences,
}: ExperienceProps) {
  return (
    <div key={experience.id}>
      <button
        onClick={() => toggleExpanded(experience.id)}
        className={`group w-full flex items-center gap-2 sm:gap-3 py-2 sm:py-3 text-left cursor-pointer rounded-md`}>
        <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center overflow-hidden rounded">
            {typeof experience.icon === "string" ? (
              <span className="text-xs font-semibold text-black">
                {experience.icon}
              </span>
            ) : (
              <img
                src={experience.icon.src}
                alt={experience.icon.alt}
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain rounded-full border border-gray-200"
                style={{
                  imageRendering: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            )}
          </div>
          <span
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
              experience.status === "active"
                ? "bg-green-500"
                : experience.status === "inactive"
                  ? "bg-black"
                  : "bg-blue-300"
            }`}></span>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 min-w-0">
          <span className="font-bold text-black text-md">
            {experience.company}
          </span>
          <span className="text-gray-700 font-normal text-sm">
            {experience.role}
          </span>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <span
            className={`hidden lg:inline text-gray-400 text-xs transition-opacity duration-200 ${
              isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}>
            {experience.dates}
          </span>
          {isExpanded ? (
            <FaChevronUp className="text-gray-400 text-xs" />
          ) : (
            <FaChevronDown className="text-gray-400 text-xs" />
          )}
        </div>
      </button>
      {isExpanded && experience.description && (
        <div className="pb-2 sm:pb-3 ml-9 sm:ml-14">
          <p className="experience-text">{experience.description}</p>
        </div>
      )}
      {index < totalExperiences - 1 && (
        <div className="border-t border-gray-200"></div>
      )}
    </div>
  );
}
