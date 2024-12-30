"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";
import { AnimatedTooltip } from "./animated-tooltip";

interface ProjectCardProps {
    title: string;
    description: string;
    tech: any[];
    image: StaticImport;
    githubLink: string ;
    demoLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, image, githubLink, demoLink }) => {
    return (
        <CardContainer className="inter-var">
          <CardBody className="bg-dark-grey relative group/card border-white/[0.2]  sm:w-[22rem] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="30"
            >
                <div className="flex flex-col space-y-1">
                    <p className="text-sm text-accent">Featured Project</p>
                    <p className="text-xl text-white font font-bold">{title}</p>
                </div>
              {title}
            </CardItem>
            <CardItem translateZ="30" className="w-full">
              <Image
                src={image}
                height="2000"
                width="2000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl hover:bg-accent"
                alt="thumbnail"
              />
            </CardItem>
            <CardItem
              as="p"
              translateZ="30"
              className="text-faded text-sm max-w-sm mt-4"
            >
              {description}
            </CardItem>
            <div className="flex justify-between items-center mt-3">
                <CardItem
                    translateZ="30"
                    className="text-accent text-sm">
                        <div className="flex flex-row w-full z-30">
                            <AnimatedTooltip items={tech} />
                        </div>
                </CardItem>
                
                <div className="flex flex-row space-x-3 items-center justify-center text-accent text-lg">
                    {githubLink && <CardItem
                        as={Link}
                        href={githubLink}
                        translateZ="30"
                        target="_blank"
                    >
                        <FaGithubAlt className="text-accent" />
                    </CardItem>
                    }
                    {demoLink && <CardItem
                        as={Link}
                        href={demoLink}
                        translateZ="30"
                        target="_blank"
                    >
                        <FaExternalLinkAlt />
                    </CardItem>
                    }
                </div>
            </div>
          </CardBody>
        </CardContainer>
      );
}

export default ProjectCard;
