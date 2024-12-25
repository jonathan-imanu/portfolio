"use client"

import React from "react";
import Link from "next/link";

import { FaGithub } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";

const Footer: React.FC = () => {
    return (
        <div className="bg-test flex flex-col items-center justify-center space-y-3 pb-5">
            <div className="flex flex-row space-x-4 md:space-x-6 text-lg text-gray-200 z-30 sm:hidden">
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
            <div className="flex flex-col items-center justify-center h-full text-faded text-sm space-y-1 mt-40">
                <h4>Designed & Built by Jonathan Manuel</h4>
                <p className="text-xs">Made using <Link className="animated-underline" href="https://nextjs.org/" target="blank">NextJS</Link> and <Link className="animated-underline" href="https://ui.aceternity.com/" target="blank">Aceternity UI</Link> </p>
                <p className="text-xs">Inspired by <Link className="animated-underline" href="https://v4.brittanychiang.com/" target="blank">Brittany Chiang</Link></p>
            </div>
            <Link href="">
                <FaGithub className="text-xl text-white transition-colors" />
            </Link>
            
        </div>   
    )
}

export default Footer;