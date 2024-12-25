import React from "react";
import Image from "next/image";

interface ExperienceProps {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    companyImage: string;
}

const Experience: React.FC<ExperienceProps> = ({ jobTitle, company, location, startDate, endDate, description, companyImage }) => {
    return (
        <div className="flex flex-col bg-slate-700">
            <div className="flex flex-row space-x-3 w-full pt-10">
                <Image 
                    src={companyImage} 
                    width={50} 
                    height={50} 
                    alt="Company Logo" 
                    className="rounded-full border-2 border-white" 
                />
            </div>
           
        </div>
    )
}

export default Experience;