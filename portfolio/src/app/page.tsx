import Image from "next/image";
import Hero from "@/components/hero";
import About from "@/components/about";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
