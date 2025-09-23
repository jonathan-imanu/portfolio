"use client";

import React from "react";

import Experience from "@/components/ui/experience";
import IndexExchange from "@/assets/images/index-exchange.png";
import AmazonWebServices from "@/assets/images/aws.jpg";
import DashHudson from "@/assets/images/dash-social.png";
import aUToronto from "@/assets/images/autoronto.png";
import Okare from "@/assets/images/okare.png";
import UTAT from "@/assets/images/utat.png";

const Experiences: React.FC = () => {
  const experiences = [
    {
      jobTitle: "Software Engineer Intern",
      company: "Index Exchange",
      location: "Toronto, ON",
      startDate: "September 2025",
      endDate: "December 2025",
      description:
        "On the Exchange Platform team, where I'm working developing high-performance, low-latency microservices using Go, Kafka, Redis, and k8s.",
      companyImage: IndexExchange,
    },
    {
      jobTitle: "Software Development Engineer Intern",
      company: "Amazon Web Services",
      location: "Toronto, ON",
      startDate: "May 2025",
      endDate: "August 2025",
      description:
        "Worked on the AWS Aurora Control Plane team to create an MCP server to automate the monitoring and maintenance of Aurora and RDS clusters.",
      companyImage: AmazonWebServices,
    },
    {
      jobTitle: "Software Developer Intern",
      company: "Dash Social",
      location: "Remote",
      startDate: "January 2025",
      endDate: "April 2025",
      description:
        "Contributing to the development and maintainence of full-stack applications as apart of the Storm team using Vue.js, JavaScript, Python, Flask, AWS and MySQL.",
      companyImage: DashHudson,
    },
    {
      jobTitle: "Cloud Developer",
      company: "aUToronto",
      location: "Toronto, ON",
      startDate: "September 2024",
      endDate: "Present",
      description:
        "Working to improve the cloud infrastrucutre and streamline CI workflows for the 4x winner of the GM/SAE AutoDrive Challenge using Docker and GitLab CI.",
      companyImage: aUToronto,
    },
    {
      jobTitle: "Software Developer Intern",
      company: "Okare",
      location: "Toronto, ON",
      startDate: "June 2024",
      endDate: "September 2024",
      description:
        "Integrated third-party PMS into the Okare platform, accelerating customer onboarding through solutions built with Flask, Python, Postgres, and Selenium.",
      companyImage: Okare,
    },
    {
      jobTitle: "Firmware Developer",
      company: "University of Toronto Aerospace Team",
      location: "Toronto, ON",
      startDate: "May 2024",
      endDate: "August 2024",
      description:
        "Developed Housekeeping and Parameter services for the FINCH satellite in C as part of a three-person team, following Test-Driven Development (TDD) by using Unity and ZTest for unit testing.",
      companyImage: UTAT,
    },
  ];

  return (
    <div className="bg-purple" id="experience">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-row space-x-3 justify-center items-center w-full pt-40">
          <p className="font-semibold text-2xl text-accent font-mono">02.</p>
          <h3 className="text-white text-3xl md:text-3xl font-semibold whitespace-nowrap">
            Experience
          </h3>
        </div>
        <div className="z-20 space-y-5 mt-12">
          {experiences.map((experience, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};
export default Experiences;
