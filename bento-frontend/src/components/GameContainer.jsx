import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import MemoryGame from "./games/MemoryGame";
import HangmanGame from "./games/HangmanGame";

const GAME_TYPES = {
  MEMORY: "Memory Game",
  HANGMAN: "Hangman Game",
};

export default function GameContainer() {
  const { colors } = useTheme();
  const [activeGame, setActiveGame] = useState(GAME_TYPES.MEMORY);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="h-full w-full rounded-2xl p-4 sm:p-6 shadow flex flex-col"
      style={{ backgroundColor: colors.light }}
    >
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-xl font-bold" style={{ color: colors.deep }}>
          {activeGame === GAME_TYPES.MEMORY
            ? "🧩 Memory Game"
            : "👨🏻 Hangman Game"}
        </h2>

        <div className="flex flex-wrap gap-1">
          {Object.values(GAME_TYPES).map((gameType) => (
            <button
              key={gameType}
              onClick={() => setActiveGame(gameType)}
              className="px-2 py-1 text-xs rounded-lg transition-all duration-300"
              style={{
                backgroundColor:
                  activeGame === gameType ? colors.muted : `${colors.soft}66`,
                color: activeGame === gameType ? "white" : colors.deep,
              }}
            >
              {gameType}
            </button>
          ))}
        </div>
      </div>

      {/* Game content */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-3 h-full pb-1 pr-1"
          >
            {activeGame === GAME_TYPES.MEMORY ? (
              <div className="h-full flex flex-col">
                <MemoryGame />
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <HangmanGame />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
