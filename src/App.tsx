import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";

import SocialLink from "./SocialLink";
import About from "./About";
import Experiences from "./Experiences";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="content-container">
        <div className="flex flex-col gap-[0.5] mt-6">
          <h1 className="text-2xl font-bold text-black">Jonathan Manuel</h1>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <CiGlobe /> Toronto
          </p>
          <div className="flex gap-3 mt-1">
            <SocialLink href="https://github.com/jonathan-imanu">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/jonathan-imanuel">
              <FaLinkedin />
            </SocialLink>
          </div>
        </div>
        <About />
        <Experiences />
      </div>
    </div>
  );
}

export default App;
