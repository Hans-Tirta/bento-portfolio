import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const contactOptions = [
  {
    name: "Email",
    icon: <AiOutlineMail className="text-white" size={20} />,
    value: "hansdominict@gmail.com",
    action: "Copy",
  },
  {
    name: "GitHub",
    icon: <FaGithub className="text-white" size={20} />,
    value: "github.com/hans-tirta",
    action: "Visit",
    link: "https://github.com/hans-tirta",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-white" size={20} />,
    value: "linkedin.com/in/hans-dominic",
    action: "Visit",
    link: "https://linkedin.com/in/hans-dominic",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="text-white" size={20} />,
    value: "@hans_3487",
    action: "Visit",
    link: "https://instagram.com/hans_3487",
  },
];

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { colors } = useTheme();

  const handleContactAction = (option) => {
    if (option.action === "Copy") {
      navigator.clipboard.writeText(option.value);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (option.link) {
      window.open(option.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full w-full rounded-2xl p-4 sm:p-6 shadow flex flex-col"
      style={{
        backgroundColor: colors.deep,
      }}
    >
      {/* Title Section */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-white">😊 Let's Connect</h2>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-grow">
        {contactOptions.map((option) => (
          <motion.button
            key={option.name}
            onClick={() => handleContactAction(option)}
            className="rounded-xl px-3 py-4 sm:px-4 flex flex-col items-center justify-center text-center transition hover:shadow-lg relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{ backgroundColor: `${colors.light}14` }}
            aria-label={`${option.action} ${option.name}`}
          >
            <span className="text-2xl mb-1">{option.icon}</span>
            <span className="font-semibold mb-0.5 text-white">
              {option.name}
            </span>
            <span className="text-xs truncate max-w-[110px] sm:max-w-[130px] text-gray-300">
              {option.value}
            </span>

            {/* Tooltip-like action/feedback */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 py-1 text-xs font-medium translate-y-full group-hover:translate-y-0 transition-transform"
              style={{
                backgroundColor: `${colors.light}33`,
                color: "white",
              }}
            >
              {option.name === "Email" && copiedEmail
                ? "Copied!"
                : option.action}
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Subtext */}
      <div className="mt-4 text-xs text-center text-gray-300">
        Always open to interesting conversations and opportunities
      </div>
    </motion.div>
  );
}
