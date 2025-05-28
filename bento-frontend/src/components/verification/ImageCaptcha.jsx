import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaAngular,
  FaPhp,
  FaLaravel,
  FaDocker,
} from "react-icons/fa";
import { SiExpress, SiPostgresql, SiMongodb, SiMysql } from "react-icons/si";

const ImageCaptcha = ({ colors, onComplete }) => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [showError, setShowError] = useState(false);
  const [currentStack, setCurrentStack] = useState("PERN");

  // Stack positions definitions
  const stackPositions = {
    PERN: [2, 4, 6, 7], // PostgreSQL, Express, React, Node positions
    LAMP: [1, 3, 5, 8], // Laravel, Angular, MySQL, PHP positions
  };

  // All tech stack icons
  const allIcons = [
    { icon: SiMongodb, name: "MongoDB" },
    { icon: FaLaravel, name: "Laravel" },
    { icon: SiPostgresql, name: "PostgreSQL" },
    { icon: FaAngular, name: "Angular" },
    { icon: SiExpress, name: "Express" },
    { icon: SiMysql, name: "MySQL" },
    { icon: FaReact, name: "React" },
    { icon: FaNodeJs, name: "Node.js" },
    { icon: FaPhp, name: "PHP" },
    { icon: FaDocker, name: "Docker" },
  ];

  // Reset selections when changing stack type
  useEffect(() => {
    setSelectedCells([]);
    setShowError(false);
  }, [currentStack]);

  const toggleCell = (index) => {
    if (selectedCells.includes(index)) {
      setSelectedCells(selectedCells.filter((i) => i !== index));
    } else {
      setSelectedCells([...selectedCells, index]);
    }
    setShowError(false);
  };

  const handleSubmit = () => {
    // Check if correct stack is selected
    const correctCells = stackPositions[currentStack];
    const isCorrect =
      selectedCells.length === correctCells.length &&
      correctCells.every((cell) => selectedCells.includes(cell));

    if (isCorrect) {
      // If PERN is complete, switch to LAMP.
      // If LAMP is complete, we're done.
      if (currentStack === "PERN") {
        setCurrentStack("LAMP");
        setSelectedCells([]);
      } else {
        onComplete();
      }
    } else {
      setShowError(true);
      setSelectedCells([]);
    }
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
          Select all squares with {currentStack} stack technologies
        </h3>

        <div className="grid grid-cols-5 gap-3 mb-4">
          {allIcons.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square flex flex-col items-center justify-center cursor-pointer rounded border-2 p-2"
              style={{
                borderColor: selectedCells.includes(index)
                  ? colors.muted
                  : `${colors.soft}66`,
                backgroundColor: selectedCells.includes(index)
                  ? `${colors.muted}33`
                  : "transparent",
              }}
              onClick={() => toggleCell(index)}
            >
              <item.icon size={32} color={colors.deep} />
              {/* <span className="text-xs mt-1" style={{ color: colors.deep }}>
                {item.name}
              </span> */}
            </motion.div>
          ))}
        </div>

        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm mb-4"
            style={{ color: "#e53e3e" }}
          >
            Incorrect {currentStack} stack selection. Try again.
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 rounded-lg"
          style={{ backgroundColor: colors.muted, color: colors.light }}
          onClick={handleSubmit}
        >
          Verify
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ImageCaptcha;
