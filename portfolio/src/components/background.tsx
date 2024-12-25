import React from "react";

import Link from "next/link";

import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

const Background: React.FC = () => {
    return (
        <div className="min-h-screen w-full fixed grid grid-rows-8 grid-cols-10">
            <StarsBackground className="row-span-full col-span-full z-0" />
            <ShootingStars className="row-span-full col-span-full z-0" />
        </div>

    )
}

export default Background;