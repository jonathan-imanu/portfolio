import React from "react";
import Link from "next/link";

const Contact: React.FC = () => {
    return (
        <div className="bg-purple pb-20" id="contact">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-row space-x-3 justify-center items-center w-full mt-40">
                    <p className="font-semibold text-2xl text-accent font-mono">04.</p>
                    <h3 className="text-white text-3xl md:text-3xl font-semibold whitespace-nowrap">Contact</h3>
                </div>
                <p className="text-faded text-xs md:text-md leading-relaxed z-10 mt-4 w-2/3 sm:w-1/3 max-w-[600px] text-center">
                    I would love to learn about new opportunities and my inbox is always open. If you&apos;d like to get in touch, feel free to send me an email.
                </p>
                <button className="text-sm md:text-md text-white font-bold px-3 py-2 md:px-4 md:py-2.5 border-2 border-accent rounded transform transition-transform duration-300 mt-7">
                    <Link href="mailto:jonathan.imanuel@gmail.com" className="text-accent">
                        <p>Email Me!</p>
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Contact;
