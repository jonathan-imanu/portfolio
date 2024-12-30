"use client"

import React from "react";

import Experience from "@/components/ui/experience";
import DashHudson from './../../public/images/dash-hudson.png';
import aUToronto from './../../public/images/autoronto.png';
import Okare from './../../public/images/okare.png';
import UTAT from './../../public/images/utat.png';

const Experiences: React.FC = () => {
    const experiences = [
        {
            jobTitle: "Software Developer Intern",
            company: "Dash Hudson",
            location: "Remote",
            startDate: "January 2025",
            endDate: "April 2025",
            description: "Contributing to the development and maintainence of full-stack applications as apart of the Storm team using Vue.js, JavaScript, Python, Flask, AWS and MySQL.",
            companyImage: DashHudson
        },
        {
            jobTitle: "Cloud Developer",
            company: "aUToronto",
            location: "Remote",
            startDate: "January 2025",
            endDate: "April 2025",
            description: "Contributing to the development and maintainence full-stack SaaS solutions as apart of the Storm team using Vue.js, JavaScript, Python, Flask, AWS and MySQL.",
            companyImage: aUToronto
        },
        {
            jobTitle: "Software Developer Intern",
            company: "Okare",
            location: "Remote",
            startDate: "January 2025",
            endDate: "April 2025",
            description: "Contributing to the development and maintainence of full-stack SaaS solutions as apart of the Storm team. using Vue.js, JavaScript, Python, Flask, AWS and MySQL.",
            companyImage: Okare
        },
        {
            jobTitle: "Firmware Developer",
            company: "University of Toronto Aerospace Team",
            location: "Remote",
            startDate: "January 2025",
            endDate: "April 2025",
            description: "Developed Housekeeping and Parameter services of the FINCH satellite using C as part of a team of 3. Followed TDD and used Unity and ZTest for unit testing.",
            companyImage: UTAT
        }
    ]

    return (
        <div className="bg-purple">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-row space-x-3 justify-center items-center w-full pt-40">
                    <p className="font-semibold text-2xl text-accent">02.</p>
                    <h3 className="text-white text-3xl md:text-3xl font-semibold whitespace-nowrap">Experience</h3>
                </div>
                <div className="z-20 space-y-5 mt-12">
                    {
                        experiences.map((experience, index) => (
                            <Experience 
                                key={index}
                                jobTitle={experience.jobTitle}
                                company={experience.company}
                                location={experience.location}
                                startDate={experience.startDate}
                                endDate={experience.endDate}
                                description={experience.description}
                                companyImage={experience.companyImage}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Experiences;