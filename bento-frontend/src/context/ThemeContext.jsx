// src/context/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Define your theme color palettes here
const themes = {
  mocha: {
    soft: "#D4A574",
    muted: "#B8956A",
    light: "#FAF7F2",
    deep: "#3D2914",
  },
  amber: {
    soft: "#F2C464",
    muted: "#E6B547",
    light: "#FFFBF2",
    deep: "#5C4A1A",
  },
  forest: {
    soft: "#A8C896",
    muted: "#5E8C61",
    light: "#F2F7F2",
    deep: "#2C4024",
  },
  mint: {
    soft: "#9DDCC0",
    muted: "#68B394",
    light: "#F4FCF8",
    deep: "#1E4A37",
  },
  teal: {
    soft: "#7DD3C0",
    muted: "#5CB3A5",
    light: "#F0FAF8",
    deep: "#1F4F47",
  },
  slate: {
    soft: "#B8C5D1",
    muted: "#94A8B8",
    light: "#F5F7FA",
    deep: "#2C3E50",
  },
  blueberry: {
    soft: "#A8C5E8",
    muted: "#6B9BD1",
    light: "#F0F6FF",
    deep: "#1B3A5C",
  },
  discord: {
    soft: "#7289DA",
    muted: "#4E5D94",
    light: "#FFFFFF",
    deep: "#2C2F33",
  },
  iris: {
    soft: "#B8A9DC",
    muted: "#9B87C7",
    light: "#F7F5FB",
    deep: "#4A3B66",
  },
  plum: {
    soft: "#D8A8D8",
    muted: "#C78BC7",
    light: "#FAF5FA",
    deep: "#5C2E5C",
  },
  rose: {
    soft: "#F4B5C4",
    muted: "#E091A3",
    light: "#FDF2F5",
    deep: "#6B2C3B",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get theme from localStorage or default to 'discord'
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme && themes[savedTheme] ? savedTheme : "discord";
  });

  // Store theme selection in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", currentTheme);

    // Update CSS variables for theme colors
    const root = document.documentElement;
    Object.entries(themes[currentTheme]).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
  }, [currentTheme]);

  const toggleTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        toggleTheme,
        themes,
        colors: themes[currentTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
