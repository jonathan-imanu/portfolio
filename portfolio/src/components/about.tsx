import React from "react";
import Link from "next/link";
import Image from "next/image";
import Headshot from "@/assets/images/jonathanmanuel.png";

const About: React.FC = () => {
  return (
    <div
      id="about"
      className="flex flex-col md:flex-row bg-purple p-6 justify-center items-center z-10 gap-8">
      <div className="flex flex-col items-start h-full md:w-1/3 lg:w-1/3 max-w-[480px] space-y-6 mt-10">
        <div className="flex flex-row space-x-3 justify-center items-center w-full">
          <p className="font-semibold text-2xl text-accent z-10 font-mono">
            01.
          </p>
          <h3 className="text-white text-3xl md:text-3xl font-semibold whitespace-nowrap z-10">
            About Me
          </h3>
        </div>
        <p className="text-faded text-sm md:text-md leading-relaxed z-10">
          <span className="text-accent font-extrabold">Hello!</span> My name is
          Jonathan and I enjoy building cool things with software. I&apos;m a CS
          co-op student at the University of Toronto and I will be graduating in
          2027.
        </p>
        <p className="text-faded text-sm md:text-md leading-relaxed z-10">
          So far I&apos;ve the privilege of working with some amazing people at{" "}
          <Link
            className="animated-underline"
            href="https://aws.amazon.com/"
            target="blank">
            AWS
          </Link>
          ,{" "}
          <Link
            className="animated-underline"
            href="https://www.dashsocial.com/"
            target="blank">
            Dash Social
          </Link>
          , my{" "}
          <Link
            className="animated-underline"
            href="https://www.autodrive.utoronto.ca/"
            target="blank">
            university&apos;s self-driving car team
          </Link>
          , an{" "}
          <Link
            className="animated-underline"
            href="https://okareai.com/"
            target="blank">
            AI dental software startup
          </Link>{" "}
          and the{" "}
          <Link
            className="animated-underline"
            href="https://www.utat.ca/space-systems"
            target="blank">
            CubeSat division{" "}
          </Link>{" "}
          within a student-led aerospace team.
        </p>
        <p className="text-faded text-sm md:text-md leading-relaxed max-w-screen-sm z-10">
          Right now, I&apos;m working as a Software Engineer Intern at{" "}
          <Link
            className="animated-underline"
            href="https://www.indexexchange.com/"
            target="blank">
            Index Exchange
          </Link>{" "}
          on the Exchange Platform team where I work primarily on low-latency
          microservices with Go, Kafka, Redis, Docker and k8s.
        </p>
      </div>
      <div className="flex items-center justify-center md:w-1/4 max-w-[400px]">
        <div className="relative w-52 h-48 md:w-72 md:h-60 z-30">
          <Image
            src={Headshot}
            height={400}
            width={400}
            className="rounded border-4 border-white object-cover w-full h-full"
            alt="Headshot of Jonathan Manuel"></Image>
        </div>
      </div>
    </div>
  );
};

export default About;
