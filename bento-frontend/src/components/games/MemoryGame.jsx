import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiMongodb,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiFramer,
} from "react-icons/si";
import { BiRefresh, BiHomeAlt } from "react-icons/bi";

const techIcons = [
  { id: "react", icon: <SiReact />, label: "React" },
  { id: "node", icon: <SiNodedotjs />, label: "Node.js" },
  { id: "postgres", icon: <SiPostgresql />, label: "PostgreSQL" },
  { id: "tailwind", icon: <SiTailwindcss />, label: "Tailwind CSS" },
  { id: "mongodb", icon: <SiMongodb />, label: "MongoDB" },
  { id: "typescript", icon: <SiTypescript />, label: "TypeScript" },
  { id: "javascript", icon: <SiJavascript />, label: "JavaScript" },
  { id: "html", icon: <SiHtml5 />, label: "HTML" },
  { id: "css", icon: <SiCss3 />, label: "CSS" },
  { id: "framer", icon: <SiFramer />, label: "Framer Motion" },
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Valorant ranks based on number of mistakes
const valorantRanks = [
  { name: "Radiant", threshold: 0 }, // Perfect score - no mistakes
  { name: "Immortal", threshold: 1 },
  { name: "Ascendant", threshold: 2 },
  { name: "Diamond", threshold: 3 },
  { name: "Platinum", threshold: 4 },
  { name: "Gold", threshold: 5 },
  { name: "Silver", threshold: 6 },
  { name: "Bronze", threshold: 7 },
  { name: "Iron", threshold: Infinity },
];

export default function TechMemoryGame() {
  const { colors } = useTheme();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [rank, setRank] = useState("Radiant");

  useEffect(() => {
    setupCards();
  }, []);

  useEffect(() => {
    let timer;
    if (startTime && started && !gameOver) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, started, gameOver]);

  useEffect(() => {
    if (matched.length === 6) {
      setGameOver(true);
      // Final rank calculation when game ends
      calculateRank();
    }
  }, [matched]);

  // Update current rank during gameplay whenever mistakes change
  useEffect(() => {
    if (started && !gameOver) {
      updateCurrentRank();
    }
  }, [mistakes]);

  const updateCurrentRank = () => {
    // Find best possible rank based on current mistakes
    for (const rankData of valorantRanks) {
      if (mistakes <= rankData.threshold) {
        setRank(rankData.name);
        break;
      }
    }
  };

  const calculateRank = () => {
    // Final rank calculation (same logic, but ensures it's done at game end)
    for (const rankData of valorantRanks) {
      if (mistakes <= rankData.threshold) {
        setRank(rankData.name);
        break;
      }
    }
  };

  const handleFlip = (index) => {
    // Early returns to prevent invalid moves
    if (!started || gameOver) return;
    if (flipped.length === 2) return; // Already have two cards flipped
    if (flipped.includes(index)) return; // Same card clicked twice
    if (matched.includes(cards[index].id)) return; // Card already matched

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // Only increment moves when selecting the second card
    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;

      if (cards[first].id === cards[second].id) {
        setMatched([...matched, cards[first].id]);
        // Clear flipped status after a short delay
        setTimeout(() => setFlipped([]), 600);
      } else {
        // Increment mistakes counter for wrong matches
        setMistakes((prev) => prev + 1);
        // Clear flipped status after a slightly longer delay for wrong matches
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const setupCards = () => {
    const selected = techIcons.slice(0, 6);
    const duplicated = shuffleArray([...selected, ...selected]);
    setCards(duplicated);
  };

  const startNewGame = () => {
    setupCards();
    setFlipped([]);
    setMatched([]);
    setGameOver(false);
    setMoves(0);
    setMistakes(0);
    setElapsedTime(0);
    setStarted(true);
    setStartTime(Date.now());
    setRank("Radiant");
  };

  const goToMenu = () => {
    setStarted(false);
    setGameOver(false);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setMistakes(0);
    setElapsedTime(0);
    setRank("Radiant");
  };

  const getRankColor = () => {
    switch (rank) {
      case "Radiant":
        return "#FFF5CC";
      case "Immortal":
        return "#FF4654";
      case "Ascendant":
        return "#00A152";
      case "Diamond":
        return "#B1A8FF";
      case "Platinum":
        return "#00A3E0";
      case "Gold":
        return "#F2D45C";
      case "Silver":
        return "#A9A9A9";
      case "Bronze":
        return "#CD7F32";
      case "Iron":
        return "#696969";
    }
  };

  const getRankBadge = () => {
    return (
      <span
        className="text-xs font-semibold px-2 py-1 rounded-md"
        style={{
          backgroundColor: getRankColor(),
          color: rank === "Radiant" ? "#000" : "#FFF",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        {rank}
      </span>
    );
  };

  return (
    <>
      {started && (
        <div
          className="flex items-center justify-between text-sm"
          style={{ color: colors.muted }}
        >
          {/* Rank Badge on the left */}
          <div className="hidden sm:block">{getRankBadge()}</div>

          {/* Game stats in the center */}
          <div className="flex items-center gap-3">
            <span>🕒 {elapsedTime}s</span>
            <span>🔁 {moves} moves</span>
            <span>❌ {mistakes} mistakes</span>
          </div>

          {/* Icon buttons on the right */}
          <div className="flex items-center space-x-2">
            <button
              onClick={startNewGame}
              className="w-8 h-8 flex items-center justify-center rounded-full"
              style={{ backgroundColor: colors.muted, color: colors.light }}
              title="Restart Game"
            >
              <BiRefresh size={18} />
            </button>
            <button
              onClick={goToMenu}
              className="w-8 h-8 flex items-center justify-center rounded-full"
              style={{ backgroundColor: colors.muted, color: colors.light }}
              title="Back to Menu"
            >
              <BiHomeAlt size={18} />
            </button>
          </div>
        </div>
      )}

      {!started ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center max-w-md mb-4">
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: colors.deep }}
            >
              How to Play
            </h3>

            <div className="text-sm mb-4 px-4" style={{ color: colors.muted }}>
              <p className="mb-2">
                Find matching pairs of tech stack icons by flipping cards!
              </p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div
                  className="flex items-center p-2 rounded-md"
                  style={{ backgroundColor: `${colors.soft}55` }}
                >
                  <span className="font-semibold mr-2">🎯</span>
                  <span>Match all 6 pairs</span>
                </div>
                <div
                  className="flex items-center p-2 rounded-md"
                  style={{ backgroundColor: `${colors.soft}55` }}
                >
                  <span className="font-semibold mr-2">❌</span>
                  <span>Avoid mistakes</span>
                </div>
                <div
                  className="flex items-center p-2 rounded-md"
                  style={{ backgroundColor: `${colors.soft}55` }}
                >
                  <span className="font-semibold mr-2">🏆</span>
                  <span>Rank-based system</span>
                </div>
                <div
                  className="flex items-center p-2 rounded-md"
                  style={{ backgroundColor: `${colors.soft}55` }}
                >
                  <span className="font-semibold mr-2">⏱️</span>
                  <span>Beat your time</span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startNewGame}
            className="px-8 py-3 text-sm font-semibold rounded-xl shadow-lg transition-colors duration-300"
            style={{
              backgroundColor: colors.muted,
              color: colors.light,
              boxShadow: `0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.1)`,
            }}
          >
            Start Game
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4 place-items-center flex-grow">
          {!gameOver ? (
            cards.map((card, index) => {
              const isFlipped =
                flipped.includes(index) || matched.includes(card.id);
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center text-2xl sm:text-3xl shadow-md"
                  style={{
                    backgroundColor: isFlipped
                      ? `${colors.muted}cc`
                      : `${colors.soft}55`,
                    color: isFlipped ? colors.light : "transparent",
                    border: `2px solid ${colors.muted}`,
                    cursor: flipped.length === 2 ? "not-allowed" : "pointer",
                  }}
                  onClick={() => handleFlip(index)}
                >
                  {isFlipped ? (
                    <div>{card.icon}</div>
                  ) : (
                    <span style={{ color: colors.deep, fontSize: "1.5rem" }}>
                      ?
                    </span>
                  )}
                </motion.button>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="col-span-4 sm:col-span-6 text-center mt-8"
              style={{ color: colors.deep }}
            >
              <div className="mb-3">
                <span
                  className="text-lg font-bold px-3 py-1 rounded-md"
                  style={{
                    backgroundColor: getRankColor(),
                    color: rank === "Radiant" ? "#000" : "#FFF",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {rank} Rank
                </span>
              </div>

              <p className="text-lg font-semibold">
                {rank === "Radiant"
                  ? "PERFECT MATCH! No mistakes!"
                  : rank === "Immortal"
                  ? "Amazing skills! Just one mistake!"
                  : rank === "Ascendant"
                  ? "Almost perfect!"
                  : rank === "Diamond"
                  ? "Impressive memory!"
                  : rank === "Platinum"
                  ? "Great job!"
                  : rank === "Gold"
                  ? "Well done!"
                  : rank === "Silver"
                  ? "Good effort!"
                  : rank === "Bronze"
                  ? "Nice try!"
                  : "Keep practicing!"}
              </p>

              <p className="text-sm mt-1">
                Completed with {moves} moves and {mistakes} mistakes in{" "}
                {elapsedTime}s
              </p>

              <div className="flex flex-row justify-center gap-x-3 mt-4">
                <button
                  onClick={startNewGame}
                  className="px-4 py-2 text-sm rounded-md shadow min-w-[120px] text-center"
                  style={{ backgroundColor: colors.muted, color: colors.light }}
                >
                  Play Again
                </button>
                <button
                  onClick={goToMenu}
                  className="px-4 py-2 text-sm rounded-md border min-w-[120px] text-center"
                  style={{ borderColor: colors.muted, color: colors.deep }}
                >
                  Back to Menu
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}
