import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";

import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { NoteSkeleton } from "./components/NoteSkeleton";
import SocialLink from "./SocialLink";
import About from "./About";
import Experiences from "./Experiences";
import { NotesList } from "./components/NotesList";
import { Tabs } from "./components/Tabs";

const NoteViewer = lazy(() =>
  import("./components/NoteViewer").then((m) => ({ default: m.NoteViewer }))
);

function Home() {
  const [searchParams] = useSearchParams();
  const folderFilter = searchParams.get("folder");
  const tabParam = searchParams.get("tab");

  // If folder filter or tab param is set, default to notes tab
  const defaultTab =
    folderFilter || tabParam === "notes" ? "notes" : "experiences";

  return (
    <>
      <About />
      <Tabs
        tabs={[
          {
            id: "experiences",
            label: "Experiences",
            content: <Experiences />,
          },
          {
            id: "notes",
            label: "Notes",
            content: <NotesList />,
          },
        ]}
        defaultTab={defaultTab}
      />
    </>
  );
}

function AppContent() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="content-container">
        <div className="flex flex-col gap-[0.5] mt-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[0.5]">
              <h1 className="text-2xl lg:text-3xl font-bold text-black">
                Jonathan Manuel
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 flex items-center gap-1">
                <CiGlobe /> Toronto
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-1">
            <SocialLink href="https://github.com/jonathan-imanu">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/jonathan-imanuel">
              <FaLinkedin />
            </SocialLink>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes/:noteId"
            element={
              <Suspense
                fallback={
                  <div className="mt-6 body-text text-gray-500">
                    <NoteSkeleton />
                  </div>
                }>
                <NoteViewer />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
