import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ImageCaptcha from "./verification/ImageCaptcha";
import TermsOfService from "./verification/TermsOfService";
import TextCaptcha from "./verification/TextCaptcha";
import EmailVerification from "./verification/EmailVerification";
import LoadingVerification from "./verification/LoadingVerification";

const SecretComponent = () => {
  const { colors } = useTheme();
  const [isComponentLocked, setIsComponentLocked] = useState(true);
  const [isRiddleSolved, setIsRiddleSolved] = useState(false);
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [keypressHistory, setKeypressHistory] = useState([]);
  const [showError, setShowError] = useState(false);
  const [verificationStage, setVerificationStage] = useState(0);
  const [isFullyVerified, setIsFullyVerified] = useState(false);

  // GTA Code sequence
  const gtaCode = ["h", "e", "s", "o", "y", "a", "m"];

  const [riddleStep, setRiddleStep] = useState(0);
  const riddleSequence = [
    {
      question:
        "I am a word that means 'not ever', but I'm often used in dramatic vows or stubborn refusals. What am I?",
      answer: "never",
      hint: "Think: 'I will _____ surrender.'",
    },
    {
      question:
        "I'm a casual contraction of 'going to', and I often follow 'I'm'. What word am I?",
      answer: "gonna",
      hint: "I'm _____ be coding all night.",
    },
    {
      question:
        "I'm a verb that means to offer something voluntarily, often mistaken for surrender. What word am I?",
      answer: "give",
      hint: "Used in 'don't ____ up'.",
    },
    {
      question:
        "I'm a pronoun used to refer to a singular or plural person being addressed directly. What am I?",
      answer: "you",
      hint: "Think: 'Not me, but ___.'",
    },
    {
      question:
        "A short word meaning 'not down', used in direction and optimism. What is it?",
      answer: "up",
      hint: "It's where balloons go.",
    },
  ];

  // Current riddle based on step
  const currentRiddle = riddleSequence[riddleStep];

  // Handle keydown events for GTA code detection
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only track keys if the component is still locked
      if (isComponentLocked) {
        const newHistory = [...keypressHistory, e.key];

        // Keep only the last 7 keypresses
        if (newHistory.length > 7) {
          newHistory.shift();
        }

        setKeypressHistory(newHistory);

        // Check if the GTA code has been entered
        if (newHistory.length === 7) {
          const isGtaCode = newHistory.every(
            (key, index) => key === gtaCode[index]
          );

          if (isGtaCode) {
            setIsComponentLocked(false);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keypressHistory, isComponentLocked]);

  // Handle riddle answer submission
  const handleRiddleSubmit = (e) => {
    e.preventDefault();

    const currentAnswer = currentRiddle.answer.toLowerCase().trim();
    if (riddleAnswer.toLowerCase().trim() === currentAnswer) {
      // Move to next riddle or complete if this was the last one
      if (riddleStep < riddleSequence.length - 1) {
        setRiddleStep(riddleStep + 1);
        setRiddleAnswer("");
        setShowError(false);
      } else {
        setIsRiddleSolved(true);
      }
    } else {
      setRiddleAnswer("");
      setShowError(true);
    }
  };

  // Move to next verification stage
  const handleNextVerification = () => {
    if (verificationStage < 4) {
      setVerificationStage(verificationStage + 1);
    } else {
      setIsFullyVerified(true);
    }
  };

  // Render the appropriate verification component based on the current stage
  const renderVerificationStage = () => {
    switch (verificationStage) {
      case 0:
        return (
          <TermsOfService colors={colors} onComplete={handleNextVerification} />
        );
      case 1:
        return (
          <ImageCaptcha colors={colors} onComplete={handleNextVerification} />
        );
      case 2:
        return (
          <TextCaptcha colors={colors} onComplete={handleNextVerification} />
        );
      case 3:
        return (
          <EmailVerification
            colors={colors}
            onComplete={handleNextVerification}
          />
        );
      case 4:
        return (
          <LoadingVerification
            colors={colors}
            onComplete={handleNextVerification}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full w-full rounded-2xl p-4 sm:p-6 shadow flex flex-col"
      style={{ backgroundColor: colors.light }}
    >
      {/* Locked State */}
      {isComponentLocked && (
        <div className="flex flex-col items-center justify-center h-full">
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 0.5, repeat: Infinity, repeatDelay: 1.5 },
            }}
            className="text-4xl mb-4"
          >
            🔒
          </motion.div>

          <h2 className="text-xl font-bold mb-2" style={{ color: colors.deep }}>
            Secret Component
          </h2>

          <p
            className="text-center text-sm mb-4"
            style={{ color: colors.muted }}
          >
            This area contains hidden treasure...
          </p>

          <div
            className="text-center text-xs italic"
            style={{ color: `${colors.muted}99` }}
          >
            Hint: The cheat to increase ones health and money in GTA San
            Andreas.
          </div>
        </div>
      )}

      {/* Riddle State */}
      {!isComponentLocked && !isRiddleSolved && isFullyVerified && (
        <div className="flex flex-col h-full w-full">
          <h2
            className="text-xl font-bold mb-4 text-center"
            style={{ color: colors.deep }}
          >
            🧩 Final Stage: Can you beat the Riddler? 🧩
          </h2>

          <div className="flex-grow flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md"
            >
              <div
                className="text-sm text-center mb-2"
                style={{ color: colors.muted }}
              >
                Riddle {riddleStep + 1} of {riddleSequence.length}
              </div>

              <div
                className="p-4 rounded-lg mb-6 text-center"
                style={{ backgroundColor: `${colors.soft}33` }}
              >
                <p className="mb-2" style={{ color: colors.deep }}>
                  {currentRiddle.question}
                </p>
                <p className="text-xs italic" style={{ color: colors.muted }}>
                  {showError && currentRiddle.hint}
                </p>
              </div>

              <form onSubmit={handleRiddleSubmit} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    value={riddleAnswer}
                    onChange={(e) => setRiddleAnswer(e.target.value)}
                    className="w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2"
                    style={{
                      borderColor: `${colors.muted}30`,
                      "--tw-ring-color": colors.muted,
                    }}
                    placeholder="Enter your answer..."
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-2 px-3 py-1 rounded-md"
                    style={{
                      backgroundColor: colors.muted,
                      color: colors.light,
                    }}
                    type="submit"
                  >
                    Unlock
                  </motion.button>
                </div>

                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 text-center text-sm"
                    style={{ color: "#e53e3e" }}
                  >
                    That's not quite right. Try again!
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      )}

      {/* Verification State */}
      {!isComponentLocked && !isRiddleSolved && !isFullyVerified && (
        <div className="flex flex-col h-full w-full">
          <h2
            className="text-xl font-bold mb-4 text-center"
            style={{ color: colors.deep }}
          >
            🛡️ Security Verification 🛡️
          </h2>

          <div className="flex-grow flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md"
            >
              <div
                className="text-sm text-center mb-2"
                style={{ color: colors.muted }}
              >
                Step {verificationStage + 1} of 5
              </div>

              {renderVerificationStage()}
            </motion.div>
          </div>
        </div>
      )}

      {/* Unlocked State */}
      {!isComponentLocked && isRiddleSolved && isFullyVerified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center h-full"
        >
          <motion.div
            animate={{
              rotate: [0, 10, 0, -10, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-5xl mb-6"
          >
            🎉
          </motion.div>

          <h2
            className="text-xl font-bold mb-4 text-center"
            style={{ color: colors.deep }}
          >
            You Found My Secret!
          </h2>

          <p className="text-center mb-6" style={{ color: colors.muted }}>
            Congratulations on unlocking this hidden component! You've
            discovered that I never give up on you, and I'll never let you down.
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg flex items-center gap-2"
            style={{ backgroundColor: colors.muted, color: colors.light }}
          >
            <span>Claim Your Prize</span>
            <span>🎁</span>
          </motion.a>

          <div
            className="mt-6 text-xs italic text-center"
            style={{ color: `${colors.muted}99` }}
          >
            The button is definitely not a Rickroll link.
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SecretComponent;
