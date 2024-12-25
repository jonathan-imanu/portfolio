"use client"

import React from "react";

import Experience from "@/components/ui/experience";

const Experiences: React.FC = () => {
    const experiences = [
        {
            jobTitle: "Software Developer",
            company: "Dash Hudson",
            location: "Remote",
            startDate: "January 2025",
            endDate: "April 2025",
            description: "Developed and maintained features for the Dash Hudson platform.",
            companyImage: "/alt"
        }

    ]
    return (
        <div className="bg-test">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-row space-x-3 justify-center items-center w-full pt-40">
                    <p className="font-semibold text-2xl text-accent-blue">02.</p>
                    <h3 className="text-white text-3xl md:text-3xl font-semibold whitespace-nowrap">Experience</h3>
                </div>
                <div>
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