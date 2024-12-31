import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ExperienceProps {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    companyImage: StaticImport;
}

const Experience: React.FC<ExperienceProps> = ({ jobTitle, company, location, startDate, endDate, description, companyImage }) => {
    return (
        <div className="flex justify-center items-center">       
        <div className="flex flex-col bg-dark-grey px-5 pt-5 rounded-lg shadow-lg w-5/6 max-w-[1000px] items-center ">
            <div className="flex flex-col justify-center items-center space-y-2 md:flex-row md:justify-between md:space-x-3 md:w-full">
                <div className="flex flex-col justify-center space-y-2 md:flex-row md:space-x-3 items-center">
                    <Image 
                    src={companyImage}
                    width={50} 
                    height={50} 
                    alt="Company Logo" 
                    className="rounded-full border-2 border-white" />
                    <div className="flex flex-col text-center space-y-1 md:text-left">
                        <h4 className="text-white font-semibold text-lg">{jobTitle}</h4>
                        <h5 className="text-accent font-semibold text-sm font-mono">{company}</h5>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-end">
                    <p className="text-white text-sm font-semibold">{startDate} - {endDate}</p>
                    <p className="text-faded font-semibold text-sm">{location}</p>
                    
                </div>
            </div>
            <div>
                <p className="text-white text-xs text-center md:text-sm md:text-left px-10 py-5">{description}</p>
            </div>
        </div>
        </div>
    )
}

export default Experience;