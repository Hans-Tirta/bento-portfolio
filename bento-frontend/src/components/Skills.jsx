import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import skillCategories from "./data/skills";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const { colors } = useTheme();

  const currentCategory = skillCategories.find(
    (category) => category.name === activeCategory
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full w-full rounded-2xl p-4 sm:p-6 shadow flex flex-col"
      style={{ backgroundColor: colors.light }}
    >
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-xl font-bold" style={{ color: colors.deep }}>
          🧠 Skills
        </h2>
        <div className="flex flex-wrap gap-1">
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className="px-2 py-1 text-xs rounded-lg transition-all duration-300"
              style={{
                backgroundColor:
                  activeCategory === category.name
                    ? colors.muted
                    : `${colors.soft}66`,
                color: activeCategory === category.name ? "white" : colors.deep,
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Skills container */}
      <div className="relative flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentCategory.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md border"
                  style={{
                    backgroundColor: `${colors.soft}66`,
                  }}
                >
                  <div className="flex items-center flex-1">
                    <skill.icon
                      size={20}
                      className="mr-3 text-xl flex-shrink-0"
                      style={{ color: colors.muted }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-sm"
                        style={{ color: colors.deep }}
                      >
                        {skill.name}
                      </h3>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: `${colors.deep}aa` }}
                      >
                        {skill.description || "Essential tool for development"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtext */}
      <div className="mt-4 text-xs text-center" style={{ color: colors.muted }}>
        💖 {currentCategory?.name} I love to work with
      </div>
    </motion.div>
  );
}
