import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const playlists = [
  {
    id: "1YdPe5EpgwzbNYcPmH0mrv",
    name: "No Enemies",
    description: "Ethereal sounds for deep coding flow",
    icon: "✨",
  },
  {
    id: "7GJuJFGc4XdWRLptyLZWjF",
    name: "Hip Hop",
    description: "Rhythm & beats to power through bugs",
    icon: "🔥",
  },
  {
    id: "4pLBexDwyzmPchQxv8o4O4",
    name: "Funk Phonk",
    description: "Bass-heavy motivation for coding sprints",
    icon: "🎧",
  },
  {
    id: "11XjfotWh98R3FiBIfkmfx",
    name: "Japanese Andy",
    description: "Melodic J-pop vibes for frontend magic",
    icon: "🌸",
  },
  {
    id: "5BTnUKSwOPDT3tXmFF8yls",
    name: "Indonesia Vibes",
    description: "Indonesian tunes to inspire coding creativity",
    icon: "🇮🇩",
  },
];

const SpotifyPlaylist = () => {
  const { colors } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);
  const iframeWrapperRef = useRef(null);

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsDropdownOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full w-full rounded-2xl p-4 sm:p-6 shadow flex flex-col"
      style={{ backgroundColor: colors.light }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-xl font-bold" style={{ color: colors.deep }}>
          🎵 My Playlist
        </h2>
        <div className="relative">
          <div
            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg cursor-pointer transition-all"
            style={{
              backgroundColor: `${colors.soft}33`,
              color: colors.muted,
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            data-cursor-show="true"
          >
            <span>
              {selectedPlaylist.icon} {selectedPlaylist.name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-1 z-40 w-56 rounded-md shadow-lg"
              style={{ backgroundColor: colors.light }}
              data-cursor-show="true"
            >
              <div
                className="py-1 border rounded-md"
                style={{ borderColor: `${colors.soft}4D` }}
              >
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="px-3 py-2 text-sm cursor-pointer hover:opacity-80 transition-opacity flex items-center"
                    style={{
                      backgroundColor:
                        selectedPlaylist.id === playlist.id
                          ? `${colors.soft}33`
                          : "transparent",
                      color: colors.deep,
                    }}
                    onClick={() => handlePlaylistSelect(playlist)}
                    data-cursor-show="true"
                  >
                    <span className="mr-2 text-base">{playlist.icon}</span>
                    <div>
                      <div className="font-medium">{playlist.name}</div>
                      <div className="text-xs" style={{ color: colors.muted }}>
                        {playlist.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main content with iframe wrapper */}
      <div className="flex-grow relative" ref={iframeWrapperRef}>
        {/* The actual iframe */}
        <iframe
          src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.id}?utm_source=generator&theme=0`}
          width="100%"
          height="100%"
          style={{
            minHeight: window.innerWidth >= 1024 ? "352px" : "152px",
            borderRadius: "12px",
            position: "relative",
            zIndex: 1,
          }}
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        {/* Transparent overlay that passes through events but keeps custom cursor */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
          data-cursor-show="true"
        ></div>
      </div>
    </motion.div>
  );
};

export default SpotifyPlaylist;
