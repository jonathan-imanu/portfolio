import React from "react";
import ProjectCard from "@/components/ui/project-card";
import MockPro from "@/assets/projects/mockpro.png";
import ClubHub from "@/assets/projects/clubhub.jpg";
import ClimateCompass from "@/assets/projects/climatecompass.png";
import CuratorsCompanion from "@/assets/projects/curatorscompanion.png";

import fastapi from "@/assets/tech/fastapi.png";
import nextjs from "@/assets/tech/nextjs.jpg";
import ts from "@/assets/tech/ts.png";
import python from "@/assets/tech/python.png";
import gcp from "@/assets/tech/gcp.png";
import docker from "@/assets/tech/docker.png";
import react from "@/assets/tech/react.png";
import js from "@/assets/tech/js.png";
import postgres from "@/assets/tech/postgres.svg";
import tailwind from "@/assets/tech/tailwind.png";
import huggingface from "@/assets/tech/huggingface.png";
import java from "@/assets/tech/java.jpg";
import django from "@/assets/tech/django.png";
import androidstudio from "@/assets/tech/androidstudio.png";
import firebase from "@/assets/tech/firebase.png";


const Projects: React.FC = () => {
    const projects = [
        {
            title: "MockPro",
            description: "A better way to prepare for Leetcode style technical interviews using speech-to-speech AI.",
            demoLink: "https://mockpro.io/",
            githubLink: "",
            image: MockPro,
            tech: [
                {
                    id: 1,
                    name: "FastAPI",
                    image: fastapi
                },
                {
                    id: 2,
                    name: "Next.js",
                    image: nextjs
                },
                {
                    id: 3,
                    name: "TypeScript",
                    image: ts
                },
                {
                    id: 4,
                    name: "Python",
                    image: python
                },
                {
                    id: 5,
                    name: "Google Cloud Platform",
                    image: gcp
                },
                {
                    id: 6,
                    name: "Docker",
                    image: docker
                }
            ]
        },
        {
            title: "ClubHub",
            description: "A centralized hub for discovering UofT student events, powered by Instagram scraping and Llama.",
            demoLink: "",
            githubLink: "https://github.com/ClubScraper",
            image: ClubHub,
            tech: [
                {
                    id: 1,
                    name: "React",
                    image: react
                },
                {
                    id: 2,
                    name: "JavaScript",
                    image: js
                },
                {
                    id: 3,
                    name: "Python",
                    image: python
                },
                {
                    id: 4,
                    name: "PostgreSQL",
                    image: postgres
                },
                {
                    id: 5,
                    name: "TailwindCSS",
                    image: tailwind
                },
                {
                    id: 6,
                    name: "Hugging Face",
                    image: huggingface
                }
            ]
        },
        {
            title: "Curator's Companion",
            description: "An Android app for the Toronto Asian Art Museum, simplifying collection management and admin tasks.",
            demoLink: "https://www.youtube.com/watch?v=6XS7RYfAn78",
            githubLink: "https://github.com/jonathan-imanu/TAAM-Collection-Management-System",
            image: CuratorsCompanion,
            tech: [
                    {
                    id: 1,
                    name: "Java",
                    image: java
                },
                {
                    id: 2,
                    name: "Android Studio",
                    image: androidstudio
                },
                {
                    id: 3,
                    name: "Firebase",
                    image: firebase
                }
            ]
        },
        {
            title: "Climate Compass",
            description: "Helping users stay safe during natural disasters by providing real-time data on global events and nearby climate shelters. ",
            demoLink: "https://devpost.com/software/climate-compass",
            githubLink: "https://github.com/Phalanyx/ClimateCompass",
            image: ClimateCompass,
            tech: [
                {
                    id: 1,
                    name: "Next.js",
                    image: nextjs
                },
                {
                    id: 2,
                    name: "Django",
                    image: django
                },
                {
                    id: 3,
                    name: "TypeScript",
                    image: ts
                },
                {
                    id: 4,
                    name: "Python",
                    image: python
                },
                {
                    id: 5,
                    name: "TailwindCSS",
                    image: tailwind
                }
            ]
        }
    ]
    return (
        <div className="bg-purple" id="projects">
            <div className="flex flex-col items-center justify-center h-full space-y-20">
                <div className="flex flex-row space-x-3 justify-center items-center w-full pt-40">
                    <p className="font-semibold text-2xl text-accent font-mono">03.</p>
                    <h3 className="text-white text-3xl md:text-3xl font-semibold whitespace-nowrap">Projects</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={index}
                            title={project.title}   
                            description={project.description}
                            tech={project.tech}
                            githubLink={project.githubLink}
                            demoLink={project.demoLink}
                            image={project.image}
                        />
                    ))}
                </div>
           </div>
        </div>
    )
}

export default Projects;
