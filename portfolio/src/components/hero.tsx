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
                <p className="text-sm md:text-2xl text-gray-200 text-center mt-2 z-10">
                    Computer Science @ University of Toronto &apos;27
                </p>
                <div className="flex flex-row space-x-4 md:space-x-6 text-lg sm:text-xl md:text-2xl text-gray-200 z-30 mt-5">
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
                <button className="text-xs md:text-base text-white font-bold px-3 py-2 md:px-4 md:py-2.5 border-2 border-white bg-accent mt-6 rounded-full z-50">
                    <Link href="https://drive.google.com/file/d/169HIDU_fDcct5LfQYeGOV0Yd6oQDz0rk/view?usp=sharing" target="_blank" className="z-50">
                        <div className="flex flex-row items-center justify-center space-x-2 z-50">
                            <p>Resume</p>
                            <IoDocumentText />
                        </div>
                    </Link>
                </button>
            </div>
        </div>
    </>
  );
};

export default Hero;
