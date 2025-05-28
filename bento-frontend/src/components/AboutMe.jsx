import React, { useRef } from "react";
import profile from "../assets/profile.jpg";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const contactOptions = [
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
];

export default function AboutMe() {
  const { colors } = useTheme();
  const ref = useRef(null);
  const x = useMotionValue(150);
  const y = useMotionValue(100);

  const rotateX = useTransform(y, [0, 600], [8, -8]);
  const rotateY = useTransform(x, [0, 400], [-8, 8]);

  const gradient = useTransform(
    [x, y],
    ([px, py]) =>
      `radial-gradient(600px at ${px}px ${py}px, rgba(255,255,255,0.15), transparent)`
  );

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    animate(x, 150);
    animate(y, 100);
  };

  return (
    <>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          rotateX,
          rotateY,
          background: `linear-gradient(135deg, ${colors.deep}E6, ${colors.muted})`,
        }}
        className="h-full rounded-2xl p-6 sm:p-8 shadow transition-transform duration-300 ease-out flex flex-col justify-center items-center gap-6 cursor-pointer text-white"
      >
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{ background: gradient }}
        />

        {/* Content (raised to sit above gradient layer) */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative w-24 h-24 mb-4">
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full shadow-lg"
              style={{ borderColor: colors.light, borderWidth: "4px" }}
            />
          </div>
          <h2 className="text-2xl font-bold mb-1">Hans Dominic Tirta</h2>
          <p className="text-xl font-semibold" style={{ color: colors.light }}>
            Fullstack Developer
          </p>
          <p className="text-m mt-1" style={{ color: colors.light }}>
            📍 Jakarta, Indonesia
          </p>
        </div>

        <p className="relative z-10 text-base sm:text-lg text-center max-w-md">
          Love creating dynamic, responsive web interfaces using React and
          JavaScript.
        </p>

        {/* Buttons container */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-2 items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-full transition-colors"
              style={{
                backgroundColor: colors.light,
                color: colors.deep,
              }}
            >
              📄 View Resume
              <span className="animate-bounce">↗</span>
            </a>
          </motion.div>

          {/* Contact Icons */}
          <div className="flex gap-3">
            {contactOptions.map((option) => (
              <motion.a
                key={option.name}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full transition-colors"
                style={{
                  backgroundColor: colors.light + "20",
                  borderColor: colors.light,
                  borderWidth: "2px",
                }}
                title={option.name}
              >
                <div className="text-xl">{option.icon}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
