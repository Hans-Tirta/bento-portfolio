import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import educationData from "./data/educations";
import experienceData from "./data/experiences";

// Timeline categories
const categories = ["Experience", "Education"];

export default function EducationExperience() {
  const [activeCategory, setActiveCategory] = useState("Experience");
  const { colors } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full rounded-2xl p-4 sm:p-6 shadow flex flex-col"
      style={{ backgroundColor: colors.light }}
    >
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-xl font-bold" style={{ color: colors.deep }}>
          {activeCategory === "Experience" ? "💼 Experience" : "🎓 Education"}
        </h2>

        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-2 py-1 text-xs rounded-lg transition-all duration-300"
              style={{
                backgroundColor:
                  activeCategory === category
                    ? colors.muted
                    : `${colors.soft}66`,
                color: activeCategory === category ? "white" : colors.deep,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content container with smooth tab transition */}
      <div className="relative flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-3 h-full pb-1 pr-1"
          >
            {(activeCategory === "Experience"
              ? experienceData
              : educationData
            ).map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md border"
                style={{
                  backgroundColor: colors.light,
                  borderColor: `${colors.soft}80`,
                  width: "100%",
                }}
              >
                <div className="flex justify-between items-center mb-1 flex-wrap">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: colors.deep }}
                  >
                    {activeCategory === "Experience" ? item.role : item.degree}
                  </h3>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${colors.soft}66`,
                      color: colors.deep,
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: colors.muted }}
                  >
                    {activeCategory === "Experience"
                      ? item.company
                      : item.institution}
                  </span>
                  {item.status === "current" && (
                    <span
                      className="px-2 py-0.5 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: `${colors.muted}20`,
                        color: colors.muted,
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>

                <p className="text-sm mb-4" style={{ color: colors.deep }}>
                  {item.description}
                </p>

                {activeCategory === "Experience" && item.skills && (
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 text-xs font-medium rounded-md transition-colors duration-200 hover:brightness-110"
                        style={{
                          backgroundColor: `${colors.muted}15`,
                          color: colors.muted,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
