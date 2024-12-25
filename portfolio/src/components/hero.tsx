"use client";
import React from "react";

import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import BorderButton from "./ui/border-button";

import { IoDocumentText } from "react-icons/io5";

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
                <button className="text-sm md:text-md text-white font-bold px-3 py-2 md:px-4 md:py-2.5 border-2 rounded border-accent-blue transform transition-transform duration-300 mt-7">
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
