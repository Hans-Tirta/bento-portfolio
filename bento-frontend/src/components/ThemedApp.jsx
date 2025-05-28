import { useTheme } from "../context/ThemeContext";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";
import TimeDate from "./TimeDate";
import Certifications from "./Certifications";
import ThemeSelectorBento from "./ThemeSelectorBento";
import EducationExperience from "./EducationExperience";
import GameContainer from "./GameContainer";
import SpotifyPlaylist from "./SpotifyPlaylist";
import SecretComponent from "./SecretComponent";
import ChatbotWidget from "./ChatbotWidget";

export default function ThemedApp() {
  const { colors } = useTheme();

  return (
    <>
      <main
        className="min-h-screen font-jp p-4 sm:p-6 relative"
        style={{
          background: `linear-gradient(to bottom right, ${colors.soft}, ${colors.light})`,
        }}
      >
        {/* Theme Selector positioned absolutely at top left */}
        <div className="fixed top-1 left-2 z-40">
          <ThemeSelectorBento />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-[minmax(300px,auto)] gap-4 pt-12">
          {/* AboutMe */}
          <div className="sm:col-span-2 lg:col-span-2 row-span-1">
            <AboutMe />
          </div>

          {/* Projects */}
          <div className="sm:col-span-2 lg:col-span-4 row-span-1">
            <Projects />
          </div>

          {/* Education & Experience */}
          <div className="sm:col-span-2 lg:col-span-3 row-span-1">
            <EducationExperience />
          </div>

          {/* Skills */}
          <div className="sm:col-span-2 lg:col-span-3 row-span-1">
            <Skills />
          </div>

          {/* Certifications */}
          <div className="sm:col-span-2 lg:col-span-4 row-span-1">
            <Certifications />
          </div>

          {/* TimezoneDisplay */}
          <div className="sm:col-span-2 lg:col-span-2 row-span-1">
            <TimeDate />
          </div>

          {/* Spotify Playlist */}
          <div className="sm:col-span-2 lg:col-span-2 row-span-1">
            <SpotifyPlaylist />
          </div>

          {/* Memory + Hangman Game */}
          <div className="sm:col-span-2 lg:col-span-4 h-auto">
            <GameContainer />
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-2 row-span-1">
            <Contact />
          </div>

          {/* Secret */}
          <div className="sm:col-span-2 lg:col-span-4 h-auto">
            <SecretComponent />
          </div>
        </div>

        <div className="fixed top-1 left-2 z-40">
          <ChatbotWidget />
        </div>
      </main>
    </>
  );
}
