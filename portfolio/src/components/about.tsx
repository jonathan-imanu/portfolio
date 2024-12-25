import React from "react";
import Link from "next/link";

const About: React.FC = () => {
    return (
        <div id="about" className="flex flex-col md:flex-row bg-test p-6 justify-center items-center z-10">
            <div className="flex flex-col items-start h-full md:w-1/3 max-w-[480px] space-y-6 mt-40">
                <div className="flex flex-row space-x-3 justify-center items-center w-full">
                    <p className="font-semibold text-2xl text-accent-blue z-10">01.</p>
                    <h3 className="text-white text-3xl md:text-3xl font-semibold whitespace-nowrap z-10">About Me</h3>
                </div>
                <p className="text-faded text-sm md:text-md leading-relaxed z-10">
                    <span className="text-accent-blue font-extrabold">Hello!</span> My name is Jonathan and I enjoy building cool things with software. 
                    I'm a CS co-op student at the University of Toronto and I will be graduating in 2027.
                </p>
                <p className="text-faded text-sm md:text-md leading-relaxed z-10">
                    So far I've the privilege of working with some amazing people at  my <Link className="animated-underline" href="https://www.autodrive.utoronto.ca/" target="blank">university's self-driving car team</Link>, 
                    an <Link className="animated-underline" href="https://okareai.com/" target="blank">AI dental software startup</Link> and the <Link className="animated-underline" href="https://www.utat.ca/space-systems" target="blank">CubeSat division </Link> within a student-led aerospace team.
                </p>
                <p className="text-faded text-sm md:text-md leading-relaxed max-w-screen-sm z-10">
                    Right now, I'm working as a Software Developer Intern at <Link className="animated-underline" href="https://www.dashhudson.com/" target="blank">Dash Hudson</Link> on the Storm team where I work primarily with Python, Vue, MySQL and AWS.
                </p>
            </div>
            <div className="flex items-center justify-center md:w-1/4 max-w-[400px] mt-20">
                <div className="bg-gray-700 w-48 h-48 md:w-60 md:h-60 rounded-full z-30"></div>
            </div>
        </div>
    )
}

export default About;