"use client"

import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
    return (
        <div className="bg-transparent h-16 z-50 flex items-center justify-center fixed top-0 left-0 w-full">
            <div className="flex flex-row justify-between items-center w-full max-w-screen-lg">
                <div >
                    <Image src="/favicon.ico" width={30} height={25} alt="Logo"/>
                </div>
                <div className="flex flex-row space-x-5 text-white text-lg font-sans font-bold">
                    <button className="hover:underline">
                        <p>About</p>
                    </button>
                    <button className="hover:underline">
                        <p>Experience</p>
                    </button>
                    <button className="hover:underline">
                        <p>Work</p>
                    </button>
                    <button className="hover:underline">
                        <p>Contact</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;