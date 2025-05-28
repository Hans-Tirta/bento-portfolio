import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function TimeDate() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDay, setIsDay] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { colors } = useTheme();

  // Available timezones
  const timezones = [
    {
      city: "Jakarta",
      country: "ID",
      timezone: "WIB",
      timeZoneId: "Asia/Jakarta",
      lat: -6.2088,
      lng: 106.8456,
    },
    {
      city: "Shanghai",
      country: "CN",
      timezone: "CST",
      timeZoneId: "Asia/Shanghai",
      lat: 31.2304,
      lng: 121.4737,
    },
    {
      city: "London",
      country: "UK",
      timezone: "GMT",
      timeZoneId: "Europe/London",
      lat: 51.5074,
      lng: -0.1278,
    },
    {
      city: "New York",
      country: "USA",
      timezone: "EST",
      timeZoneId: "America/New_York",
      lat: 40.7128,
      lng: -74.006,
    },
    {
      city: "Melbourne",
      country: "AU",
      timezone: "AEST",
      timeZoneId: "Australia/Melbourne",
      lat: -37.8136,
      lng: 144.9631,
    },
  ];

  // Selected location (default to Jakarta)
  const [selectedLocation, setSelectedLocation] = useState(timezones[0]);

  // Update time every second for smooth seconds animation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Check if it's day or night in the selected location
      const localTime = getLocalTime(now, selectedLocation.timeZoneId);
      const hours = localTime.getHours();
      setIsDay(hours >= 6 && hours < 18);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedLocation]);

  // Convert UTC time to local time in the selected timezone
  const getLocalTime = (date, timeZoneId) => {
    return new Date(date.toLocaleString("en-US", { timeZone: timeZoneId }));
  };

  // Format time as HH:MM:SS based on timezone
  const formatTime = (date) => {
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: selectedLocation.timeZoneId,
    });
  };

  // Format date as "Day, DD Month YYYY" (e.g., "Monday, 12 June 2023")
  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: selectedLocation.timeZoneId,
    });
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
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
          🌏 Time & Date
        </h2>
        <div className="relative">
          <div
            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg cursor-pointer transition-all"
            style={{
              backgroundColor: `${colors.soft}33`,
              color: colors.muted,
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>
              🗺️ {selectedLocation.city}, {selectedLocation.country}
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
              className="absolute right-0 mt-1 z-10 w-48 rounded-md shadow-lg"
              style={{ backgroundColor: colors.light }}
            >
              <div
                className="py-1 border rounded-md"
                style={{ borderColor: `${colors.soft}4D` }}
              >
                {timezones.map((location) => (
                  <div
                    key={location.city}
                    className="px-3 py-2 text-sm cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-between"
                    style={{
                      backgroundColor:
                        selectedLocation.city === location.city
                          ? `${colors.soft}33`
                          : "transparent",
                      color: colors.deep,
                    }}
                    onClick={() => handleLocationSelect(location)}
                  >
                    <span>
                      {location.city}, {location.country}
                    </span>
                    <span className="text-xs" style={{ color: colors.muted }}>
                      {location.timezone}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main content */}
      <motion.div className="relative flex-grow flex flex-col items-center justify-center gap-3">
        {/* Date display */}
        <div className="text-center" style={{ color: `${colors.deep}` }}>
          <p className="text-sm sm:text-base font-medium">
            {formatDate(currentTime)}
          </p>
        </div>

        {/* Time display */}
        <motion.div
          className="p-4 rounded-xl w-full max-w-xs flex items-center justify-between border"
          style={{
            backgroundColor: `${colors.soft}4D`, // 30% opacity
            borderColor: `${colors.soft}4D`, // 30% opacity
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="flex items-center">
            <span
              className="font-mono text-2xl font-bold"
              style={{ color: colors.deep }}
            >
              {formatTime(currentTime)}
            </span>
            <span
              className="ml-2 text-sm font-medium"
              style={{ color: colors.muted }}
            >
              {selectedLocation.timezone}
            </span>
          </div>

          {/* Day/night indicator */}
          <motion.div
            animate={{
              rotate: isDay ? [0, 360] : [0, -360],
              backgroundColor: isDay ? "#F1F0E8" : "#2b3a42",
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 20, ease: "linear" },
              backgroundColor: { duration: 1 },
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner"
          >
            {isDay ? (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="text-lg"
              >
                ☀️
              </motion.span>
            ) : (
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="text-lg"
              >
                🌙
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Footer note */}
        <div
          className="mt-2 text-xs text-center"
          style={{ color: colors.muted }}
        >
          {isDay ? "☀️ Bright daylight hours" : "🌙 Peaceful nighttime"} • Local
          time in {selectedLocation.city}
        </div>
      </motion.div>
    </motion.div>
  );
}
