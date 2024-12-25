import Hero from "@/components/hero";
import About from "@/components/about";
import Background from "@/components/background";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Experiences from "@/components/experiences";
import Contact from "@/components/contact";


export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <Hero />
      <About />
      <Experiences />
      <Contact />
      <Footer />
    </>
  );
}

