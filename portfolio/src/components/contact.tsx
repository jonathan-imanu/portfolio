import React from "react";
import Link from "next/link";

const Contact: React.FC = () => {
    return (
        <div className="bg-test pb-20">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-row space-x-3 justify-center items-center w-full mt-40">
                    <p className="font-semibold text-2xl text-accent-blue">04.</p>
                    <h3 className="text-white text-3xl md:text-3xl font-semibold whitespace-nowrap">Contact</h3>
                </div>
                <p className="text-faded text-sm md:text-md leading-relaxed z-10 mt-4 w-1/3 text-center">
                    I would love to learn about new opportunities and my inbox is always open. If you'd like to get in touch, feel free to send me an email.
                </p>
                <button className="text-sm md:text-md text-white font-bold px-3 py-2 md:px-4 md:py-2.5 border-2 border-accent-blue rounded transform transition-transform duration-300 mt-7">
                    <Link href="mailto:jonathan.imanuel@gmail.com">
                        <p>Email Me!</p>
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Contact;
