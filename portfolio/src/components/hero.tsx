"use client";
import React from "react";

import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { IoDocumentText, IoMailOutline } from "react-icons/io5";
import { FiLinkedin, FiGithub } from "react-icons/fi";

import Link from "next/link";

const Hero: React.FC = () => {
    const words = [
        { text: "Jonathan"},
        { text: "Manuel"},
    ]
    return (
    <>
        <div className="min-h-screen flex flex-col items-center justify-center w-full better-gradient">
            <div className="flex flex-col items-center justify-center">
                <TypewriterEffectSmooth words={words} className="z-10"/>
                <p className="text-xs md:text-2xl text-gray-200 text-center mt-2 z-10">
                    Computer Science @ University of Toronto '27
                </p>
                <div className="flex flex-row space-x-4 md:space-x-6 text-2xl text-gray-200 z-30 mt-5">
                    <Link
                        href="https://www.linkedin.com/in/jonathan-imanuel"
                        target="_blank"
                        className="hover:scale-125 transition-transform"
                    >
                        <FiLinkedin />
                    </Link>
                    <Link
                        href="https://github.com/jonathan-imanu"
                        target="_blank"
                        className="hover:scale-125 transition-transform"
                    >
                        <FiGithub />
                    </Link>
                    <Link
                        href="mailto:jonathan@example.com"
                        target="_blank"
                        className="hover:scale-125 transition-transform"
                    >
                        <IoMailOutline />
                    </Link>
                </div>
                <button className="text-sm md:text-md text-white font-bold px-3 py-2 md:px-4 md:py-2.5 border-2 rounded border-accent transform transition-transform duration-300 mt-7">
                    <div className="flex flex-row items-center justify-center space-x-2">
                        <p>Resume</p>
                        <IoDocumentText />
                    </div>
                </button>
            </div>
        </div>
    </>
  );
};

export default Hero;
