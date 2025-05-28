import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { BiRefresh, BiHomeAlt } from "react-icons/bi";
import { FaTerminal } from "react-icons/fa";

// Tech/Code related words for the hangman game
const WORDS = [
  // 👨‍💻 Basics & Stack
  "HTML",
  "CSS",
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "NODE JS",
  "EXPRESS",
  "POSTGRESQL",
  "MONGODB",
  "REDUX",
  "BOOTSTRAP",

  // 🛠️ Tools
  "GIT",
  "GITHUB",
  "VSCODE",
  "FIGMA",
  "JASPERSOFT",
  "DOCKER",
  "POSTMAN",
  "PRISMA",
  "VITE",
  "TAILWIND",
  "FRAMER MOTION",

  // Developer Roles
  "FRONTEND",
  "BACKEND",
  "FULLSTACK",

  // Workplace & Collaboration
  "KPSG",
  "ANABATIC",
  "STACK OVERFLOW",

  // 🧑‍💻 AI & Tech
  "GITHUB COPILOT",
  "CLAUDE",
  "CHATGPT",
  "DEEPSEEK",
];

// Italian Brainrot words for the hangman game
// const WORDS = [
//   "AEROMUCCA ARMATA",
//   "APOLLINO CAPPUCCINO",
//   "BALLERINA CAPPUCCINA",
//   "BALLERINO LOLOLO",
//   "BANG BANG BANG BANG EID",
//   "BEARORITO APPLEPITOLIROTITO",
//   "BLUBERINI OCTOPUSINI",
//   "BOBRINI CACTUSINI SU SATURNO",
//   "BOMBARDIRO CROCODILLO",
//   "BOMBOCLAT CROCOCLAT",
//   "BRR BRR PATAPIM",
//   "BUNGOLETTI SPGHETTINI",
//   "BURBALONI LULILOLI",
//   "CAPUCHINO ASSASSINO",
//   "CHIMPANZINI BANANINI",
//   "COCCODRILLO FORMAGGIOSO",
//   "COCCODRILLO ROBLOXINO",
//   "CROCODILO POTATINO",
//   "EVIL BABY OCTI TRIPLETS",
//   "FRIGO CAMELO",
//   "GAMBERO SPERO",
//   "GANGSTER FOOTERA",
//   "GATTINO AEREOPLANINO",
//   "GIRAFFA CELESTE",
//   "LA VACA SATURNO SATURNITA",
//   "LEGENI PESHKAQENI",
//   "LINGUICINE SERPENTINE",
//   "LOS TRALAERITOS DICEN TRALALA",
//   "MARGERITI OCTOPUSINI",
//   "MATTEO",
//   "MOUSARINI PISTOLINI",
//   "ORANGUTINI ANANASINI",
//   "PARARELL BARARELL",
//   "PECORINI LANUSINI",
//   "PICCIONE MACCHINA",
//   "POLPETTA ERBIVORA",
//   "RUGGINATO LUPOGT",
//   "SOVIETO ELEPHINO",
//   "STICKINI JOE INI CRAWFISHINI TERRORISTINI",
//   "TANGERINI OCTOPUSINI",
//   "TIRILICALICA TIRILICALACO",
//   "TRACOTUCOTULU DELAPELADUSTUZ",
//   "TRALALERO TRALALA",
//   "TRIC TRAC BARABOOM",
//   "TRIPPA TROPPA TRALALA LIRILI RILA TUNG TUNG SAHUR BONECA TUNG TUNG TRALALELO TRIPPI TROPPA CROCODINA",
//   "TRIPPI TROPPI",
//   "TRULIMERO TRULICINA",
// ];

// Maximum wrong guesses allowed
const MAX_WRONG_GUESSES = 7;

export default function HangmanGame() {
  const { colors } = useTheme();
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [started, setStarted] = useState(false);

  // Initialize game
  useEffect(() => {
    if (started && !gameOver) {
      const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      setWord(randomWord);
    }
  }, [started]);

  // Check for win condition
  useEffect(() => {
    if (started && word) {
      // Filter out space characters before checking if all letters are guessed
      const nonSpaceLetters = [...word].filter((letter) => letter !== " ");
      const isWin = nonSpaceLetters.every((letter) =>
        guessedLetters.includes(letter)
      );
      if (isWin) {
        setGameWon(true);
        setGameOver(true);
      }
    }
  }, [guessedLetters, word, started]);

  // Check for lose condition
  useEffect(() => {
    if (wrongGuesses >= MAX_WRONG_GUESSES) {
      setGameOver(true);
      setGameWon(false);
    }
  }, [wrongGuesses]);

  const handleLetterGuess = (letter) => {
    if (gameOver || guessedLetters.includes(letter)) return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    // Check if the guess was incorrect
    if (!word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
    setStarted(true);
  };

  const goToMenu = () => {
    setStarted(false);
    setGameOver(false);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setWord("");
    setGameWon(false);
  };

  // Display the word with guessed letters revealed and others hidden
  const displayWord = () => {
    return word.split("").map((letter, index) => {
      // If the letter is a space, render a visible space indicator
      if (letter === " ") {
        return (
          <div
            key={index}
            className="w-4 flex items-center justify-center mx-1"
          >
            <span className="text-lg font-bold" style={{ color: colors.soft }}>
              ·
            </span>
          </div>
        );
      }

      // Otherwise render a normal letter space
      return (
        <div
          key={index}
          className="w-8 h-8 flex items-center justify-center border-b-2 mx-1"
          style={{ borderColor: colors.muted }}
        >
          <span className="text-lg font-bold" style={{ color: colors.deep }}>
            {guessedLetters.includes(letter) ? letter : ""}
          </span>
        </div>
      );
    });
  };

  // Generate the keyboard
  const renderKeyboard = () => {
    const keyboard = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"],
    ];

    return keyboard.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center gap-1 my-1">
        {row.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect = word.includes(letter) && isGuessed;

          return (
            <motion.button
              key={letter}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-10 rounded flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: isGuessed
                  ? isCorrect
                    ? `${colors.soft}`
                    : `${colors.muted}80`
                  : `${colors.soft}55`,
                color: isGuessed
                  ? isCorrect
                    ? colors.deep
                    : colors.light
                  : colors.deep,
                cursor: isGuessed ? "not-allowed" : "pointer",
              }}
              onClick={() => handleLetterGuess(letter)}
              disabled={isGuessed || gameOver}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>
    ));
  };

  return (
    <>
      {started && (
        <div
          className="flex items-center justify-between text-sm"
          style={{ color: colors.muted }}
        >
          <div>
            <span>
              ❌ {wrongGuesses}/{MAX_WRONG_GUESSES} wrong guesses
            </span>
          </div>

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
                Guess the right tech related word or System32 go bye bye!
              </p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div
                  className="flex items-center p-2 rounded-md"
                  style={{ backgroundColor: `${colors.soft}55` }}
                >
                  <span className="font-semibold mr-2">🎮</span>
                  <span>Guess letters</span>
                </div>
                <div
                  className="flex items-center p-2 rounded-md"
                  style={{ backgroundColor: `${colors.soft}55` }}
                >
                  <span className="font-semibold mr-2">❌</span>
                  <span>Avoid 7 mistakes</span>
                </div>
                <div
                  className="flex items-center p-2 rounded-md"
                  style={{ backgroundColor: `${colors.soft}55` }}
                >
                  <span className="font-semibold mr-2">💻</span>
                  <span>Save System32</span>
                </div>
                <div
                  className="flex items-center p-2 rounded-md"
                  style={{ backgroundColor: `${colors.soft}55` }}
                >
                  <span className="font-semibold mr-2">🔤</span>
                  <span>Tech words only</span>
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
        <div className="flex-grow flex flex-col items-center justify-center">
          {!gameOver ? (
            <>
              {/* Word Display */}
              <div className="flex justify-center my-3 flex-wrap w-[90%] mx-auto">
                {displayWord()}
              </div>

              {/* Keyboard */}
              <div className="mt-4">{renderKeyboard()}</div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-grow flex flex-col items-center justify-center text-center"
              style={{ color: colors.deep }}
            >
              {gameWon ? (
                <>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="text-5xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-xl font-bold mb-1">System32 is Safe!</h3>
                  <p className="mb-1">You correctly guessed: {word}</p>
                  <p className="text-sm mb-4" style={{ color: colors.muted }}>
                    Your OS is safe... for now...
                  </p>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="text-5xl mb-4"
                  >
                    💥
                  </motion.div>
                  <h3 className="text-xl font-bold mb-1">System32 Deleted!</h3>
                  <p className="mb-1">The word was: {word}</p>
                  <p className="text-sm mb-4" style={{ color: colors.muted }}>
                    Time to reinstall your OS...
                  </p>
                </>
              )}

              <div className="flex flex-row justify-center gap-x-3 mt-2">
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
