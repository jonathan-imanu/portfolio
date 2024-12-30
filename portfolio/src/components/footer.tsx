"use client"

import React from "react";
import Link from "next/link";

import { FaGithub } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";

const Footer: React.FC = () => {
    return (
        <div className="bg-purple flex flex-col items-center justify-center space-y-3 pb-5">
            <div className="flex flex-col items-center justify-center h-full text-faded text-sm space-y-1 z-30">
                <h4>Designed & Built by Jonathan Manuel</h4>
                <p className="text-xs">Made using <Link className="animated-underline" href="https://nextjs.org/" target="blank">NextJS</Link> and <Link className="animated-underline" href="https://ui.aceternity.com/" target="blank">Aceternity UI</Link> </p>
            </div>
            <Link href="https://github.com/jonathan-imanu/portfolio" target="_blank" className="hover:scale-125 transition-transform z-30">
                <FaGithub className="text-xl text-white transition-colors" />
            </Link>
        </div>   
    )
}

export default Footer;