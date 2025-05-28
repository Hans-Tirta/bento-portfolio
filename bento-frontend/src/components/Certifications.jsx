import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import certifications from "../components/data/certifications.jsx";

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(0);
  const { colors } = useTheme();

  // For a carousel effect
  const nextCert = () => {
    setActiveCert((prev) => (prev + 1) % certifications.length);
  };

  const prevCert = () => {
    setActiveCert(
      (prev) => (prev - 1 + certifications.length) % certifications.length
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full rounded-2xl p-4 sm:p-6 shadow flex flex-col"
      style={{ backgroundColor: colors.light }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold" style={{ color: colors.deep }}>
          🏆 Certifications
        </h2>
        <div className="text-sm" style={{ color: colors.muted }}>
          {certifications.length} Certifications
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 grow">
        {/* Certificate Image Display */}
        <div className="md:w-1/2 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCert}
              className="rounded-lg overflow-hidden shadow-md border w-full h-64 flex items-center justify-center"
              style={{ borderColor: colors.soft }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Placeholder for certificate image */}
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${certifications[activeCert].image})`,
                  backgroundSize: "contain", // Ensures the image fits within the container
                  backgroundRepeat: "no-repeat", // Prevents tiling of the image
                  backgroundColor: `${colors.soft}4D`, // Fallback if image fails to load
                }}
              ></div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prevCert}
            className="absolute left-4 rounded-full p-2 opacity-70 hover:opacity-100 transition-opacity"
            style={{ backgroundColor: `${colors.soft}99` }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke={colors.deep}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextCert}
            className="absolute right-4 rounded-full p-2 opacity-70 hover:opacity-100 transition-opacity"
            style={{ backgroundColor: `${colors.soft}99` }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke={colors.deep}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Certificate Details */}
        <div className="md:w-1/2 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`details-${activeCert}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl p-4 flex-grow flex flex-col"
              style={{
                backgroundColor: `${colors.soft}4D`,
                borderColor: colors.soft,
                borderWidth: "1px",
              }}
            >
              <div className="mb-2">
                <span
                  className="text-xs px-2 py-1 rounded-full inline-block mb-2"
                  style={{
                    backgroundColor: `${colors.muted}33`,
                    color: colors.deep,
                  }}
                >
                  {certifications[activeCert].date}
                </span>
                <h3
                  className="text-lg font-bold"
                  style={{ color: colors.deep }}
                >
                  {certifications[activeCert].title}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: colors.muted }}
                >
                  {certifications[activeCert].issuer}
                </p>
              </div>

              <p
                className="text-sm my-3 flex-grow"
                style={{ color: colors.deep }}
              >
                {certifications[activeCert].description}
              </p>

              <motion.a
                href={certifications[activeCert].link}
                target="_blank"
                rel="noopener noreferrer"
                className="self-end mt-auto inline-flex items-center text-sm py-2 px-4 rounded-lg transition-all"
                style={{
                  backgroundColor: `${colors.muted}1A`,
                  color: colors.deep,
                  borderWidth: "1px",
                  borderColor: `${colors.muted}33`,
                }}
                whileHover={{
                  backgroundColor: `${colors.muted}33`,
                  x: 5,
                }}
              >
                Verify Certificate
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </AnimatePresence>
          {/* Certificate navigator dots */}
          <div className="flex justify-center mt-4 gap-2">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCert(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeCert === index ? "scale-125" : "opacity-50"
                }`}
                style={{
                  backgroundColor:
                    activeCert === index ? colors.deep : colors.muted,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
