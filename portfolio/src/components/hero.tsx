"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Navbar from "./navbar";
import Link from "next/link";

import { IoMailOutline } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FaLink } from "react-icons/fa";

const Hero: React.FC = () => {
    const words = [
        { text: "Jonathan"},
        { text: "Manuel"},
    ]
    return (
    <div className="min-h-screen flex flex-col items-center justify-center relative w-full bg-gradient-to-r from-night-blue via-lighter-night-blue to-night-blue ">
      <div className="flex flex-col items-center justify-center space-y-7 bg-transparent z-10">
        <TypewriterEffectSmooth words={words} />
        <p className="text-2xl text-gray-200">Computer Science @ University of Toronto '27</p>
        <div className="flex flex-row space-x-6 text-2xl text-gray-200">
            <Link href="https://www.linkedin.com/in/jonathan-imanuel" target="blank" className="hover:scale-125">
                <FiLinkedin />
            </Link>
            <Link href="https://github.com/jonathan-imanu" target="blank" className="hover:scale-125">
                <FiGithub />
            </Link>
             <Link href="https://www.linkedin.com/in/jonathan-imanuel" target="blank" className="hover:scale-125"> 
                <IoMailOutline />
            </Link>
        </div>
        <button className="text-md text-shooting-trail font-semibold px-4 py-1.5 border-2 border-shooting-trail transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
            <div className="flex flex-row items-center justify-center space-x-2">
                <p>Resume</p>
            </div>
        </button>
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
};

export default Hero;
