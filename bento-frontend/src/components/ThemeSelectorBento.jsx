// src/components/ThemeSelectorBento.jsx
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const ThemeSelectorBento = () => {
  const { currentTheme, toggleTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Format theme name for display (capitalize first letter)
  const formatThemeName = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="absolute top-4 left-4">
      <div className="relative">
        <motion.button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 bg-theme-light bg-opacity-90 rounded-lg px-3 py-2 shadow-md border border-theme-soft"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cursor-show="true"
        >
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: themes[currentTheme].deep }}
            />
            <span className="text-sm font-medium text-theme-deep">
              {formatThemeName(currentTheme)}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform text-theme-deep ${
              isOpen ? "rotate-180" : ""
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
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 mt-2 w-48 bg-theme-light rounded-lg shadow-lg border border-theme-soft overflow-hidden"
              data-cursor-show="true"
            >
              {Object.keys(themes).map((themeName) => (
                <motion.button
                  key={themeName}
                  onClick={() => {
                    toggleTheme(themeName);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left hover:bg-theme-soft hover:bg-opacity-30 transition-colors ${
                    themeName === currentTheme
                      ? "bg-theme-soft bg-opacity-40"
                      : ""
                  }`}
                  whileHover={{ x: 2 }}
                >
                  <div
                    className="w-5 h-5 rounded-full mr-3"
                    style={{
                      background: `linear-gradient(135deg, ${themes[themeName].deep} 0%, ${themes[themeName].deep} 50%, ${themes[themeName].soft} 50%, ${themes[themeName].soft} 100%)`,
                    }}
                  />
                  <span className="text-sm text-theme-deep">
                    {formatThemeName(themeName)}
                  </span>

                  {themeName === currentTheme && (
                    <svg
                      className="w-4 h-4 ml-auto text-theme-soft"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeSelectorBento;
