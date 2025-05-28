import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TextCaptcha = ({ colors, onComplete }) => {
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [trollMode, setTrollMode] = useState(false);
  const [hiddenCaptcha, setHiddenCaptcha] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    const length = 6;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptchaText(result);
  };

  const generateHiddenCaptcha = () => {
    const result = "boogie";
    setHiddenCaptcha(result);
    console.log("Hidden verification code:", result);
  };

  const handleSubmit = () => {
    if (!trollMode) {
      // First phase - normal captcha
      if (captchaInput.trim() === captchaText) {
        setTrollMode(true);
        setCaptchaInput("");
        generateHiddenCaptcha();
      } else {
        setShowError(true);
        setCaptchaInput("");
        setAttempts(attempts + 1);
        if (attempts >= 1) {
          generateCaptcha();
        }
      }
    } else {
      // Second phase - troll captcha
      if (captchaInput.trim() === hiddenCaptcha) {
        onComplete();
      } else {
        setShowError(true);
        setCaptchaInput("");
      }
    }
  };

  const renderCaptchaImage = () => {
    return (
      <svg
        width="200"
        height="80"
        viewBox="0 0 200 80"
        className="mb-4 mx-auto"
        style={{ backgroundColor: `${colors.soft}33` }}
      >
        {[...Array(6)].map((_, i) => (
          <line
            key={`line-${i}`}
            x1={Math.random() * 200}
            y1={Math.random() * 80}
            x2={Math.random() * 200}
            y2={Math.random() * 80}
            stroke={`${colors.muted}33`}
            strokeWidth="0.5"
          />
        ))}
        {[...Array(3)].map((_, i) => (
          <circle
            key={`circle-${i}`}
            cx={Math.random() * 200}
            cy={Math.random() * 80}
            r={Math.random() * 8 + 3}
            fill="none"
            stroke={`${colors.muted}22`}
            strokeWidth="0.5"
          />
        ))}
        {!trollMode && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={colors.deep}
            fontSize="30"
            fontFamily="monospace"
            fontWeight="bold"
            style={{
              transform: "skewX(-10deg)",
              textShadow: "1px 1px 1px rgba(0,0,0,0.1)",
            }}
          >
            {captchaText}
          </text>
        )}
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <div className="mb-4 rounded-lg">
        <h3
          className="text-lg font-semibold mb-3 text-center"
          style={{ color: colors.deep }}
        >
          {trollMode
            ? "Enter the characters you DON'T see"
            : "Enter the characters you see"}
        </h3>
        {renderCaptchaImage()}
        <div className="mb-4">
          <input
            type="text"
            value={captchaInput}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              setShowError(false);
            }}
            className="w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2 text-center"
            style={{ borderColor: `${colors.soft}66`, color: colors.deep }}
            placeholder={
              trollMode
                ? "It's not on the page, but behind the scenes."
                : "Type characters here"
            }
            maxLength={6}
          />
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 rounded-lg"
            style={{ backgroundColor: `${colors.soft}66`, color: colors.deep }}
            onClick={trollMode ? generateHiddenCaptcha : generateCaptcha}
          >
            New Code
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 rounded-lg"
            style={{ backgroundColor: colors.muted, color: colors.light }}
            onClick={handleSubmit}
          >
            Verify
          </motion.button>
        </div>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm"
            style={{ color: "#e53e3e" }}
          >
            {trollMode
              ? "Wrong hidden code. Please try again!"
              : "Characters don't match. Please try again."}
          </motion.div>
        )}
      </div>
      <div
        className="text-xs text-center"
        style={{ color: `${colors.muted}99` }}
      >
        {trollMode
          ? "For those on mobile, feel free to ask my assistant and you'll get what you need"
          : "Final verification step: Enter the hidden code to proceed"}
      </div>
    </motion.div>
  );
};

export default TextCaptcha;
