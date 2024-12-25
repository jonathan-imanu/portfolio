"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";

export function NavBar() {
  const navItems = [
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Experience",
      link: "#experience",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];
  return (
    <div className="hidden sm:flex relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

export default NavBar;