import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const CustomCursor = () => {
  // Use motion values for smoother animations
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add spring physics for smoother following effect
  const springConfig = { damping: 50, stiffness: 1000 };
  const mainCursorX = useSpring(cursorX, springConfig);
  const mainCursorY = useSpring(cursorY, springConfig);

  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { colors } = useTheme();

  // Reference to track when cursor is over an iframe
  const isOverIframe = useRef(false);

  // Constants for cursor sizes
  const MAIN_CURSOR_SIZE = 32; // Size of the main cursor circle in pixels
  const DOT_CURSOR_SIZE = 8; // Size of the small dot cursor in pixels
  const ACTIVE_SCALE = 0.8; // Scale factor when clicking

  useEffect(() => {
    // Track mouse position with accurate centering
    const mouseMove = (e) => {
      // Update motion values directly
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check elements at the current mouse position
      const hoveredElements = document.elementsFromPoint(e.clientX, e.clientY);

      // First check if we're over elements with our special data attribute
      const isOverMarkedElement = hoveredElements.some(
        (el) => el.getAttribute("data-cursor-show") === "true"
      );

      // If we're over an iframe but also over our marked elements, prioritize the marked elements
      if (isOverMarkedElement) {
        isOverIframe.current = false;
        setIsVisible(true);
      } else {
        // Otherwise check if we're over an iframe with no overlay
        isOverIframe.current = hoveredElements.some(
          (el) => el.tagName === "IFRAME"
        );
        setIsVisible(!isOverIframe.current);
      }
    };

    // Track cursor style changes to detect when hovering over clickable elements
    const handleCursorStyle = () => {
      const hoveredElements = document.querySelectorAll(":hover");
      const isHoveringClickable = Array.from(hoveredElements).some((el) => {
        const cursor = window.getComputedStyle(el).cursor;
        return cursor === "pointer" || cursor === "hand";
      });
      setIsPointer(isHoveringClickable);
    };

    // Track mouse clicks
    const mouseDown = () => setIsActive(true);
    const mouseUp = () => setIsActive(false);

    // Track when cursor leaves/enters the window
    const mouseLeave = () => setIsVisible(false);
    const mouseEnter = () => setIsVisible(true);

    // Add event listeners
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mousemove", handleCursorStyle);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mouseleave", mouseLeave);
    document.addEventListener("mouseenter", mouseEnter);

    // Force the document cursor to be none
    document.body.style.cursor = "none";
    const allElements = document.querySelectorAll(
      "button, a, [role='button'], input, select, textarea"
    );
    allElements.forEach((el) => {
      el.style.cursor = "none";
    });

    // Clean up when component unmounts
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mousemove", handleCursorStyle);
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("mouseleave", mouseLeave);
      document.removeEventListener("mouseenter", mouseEnter);
      document.body.style.cursor = "auto"; // Restore default cursor
      allElements.forEach((el) => {
        el.style.cursor = "";
      });
    };
  }, [cursorX, cursorY]);

  // Animation variants
  const mainCursorVariants = {
    default: {
      scale: 1,
      opacity: isVisible ? 1 : 0,
      transition: { duration: 0.05 },
    },
    active: {
      scale: ACTIVE_SCALE,
      opacity: isVisible ? 1 : 0,
      transition: { duration: 0.025 },
    },
    pointer: {
      scale: 1.2,
      opacity: isVisible ? 1 : 0,
      transition: { duration: 0.2 },
    },
  };

  const dotCursorVariants = {
    default: {
      opacity: isVisible ? 1 : 0,
      scale: 1,
    },
    active: {
      opacity: isVisible ? 0.5 : 0,
      scale: 0.8,
    },
  };

  // Determine current animation state
  const mainCursorState = isActive
    ? "active"
    : isPointer
    ? "pointer"
    : "default";
  const dotCursorState = isActive ? "active" : "default";

  return (
    <>
      {/* Main circle cursor */}
      <motion.div
        className="fixed pointer-events-none rounded-full z-50 mix-blend-difference"
        style={{
          width: `${MAIN_CURSOR_SIZE}px`,
          height: `${MAIN_CURSOR_SIZE}px`,
          backgroundColor: isPointer ? colors.light : colors.deep,
          x: mainCursorX,
          y: mainCursorY,
          translateX: `-${MAIN_CURSOR_SIZE / 2}px`,
          translateY: `-${MAIN_CURSOR_SIZE / 2}px`,
        }}
        variants={mainCursorVariants}
        animate={mainCursorState}
      />

      {/* Small dot cursor for precision */}
      <motion.div
        className="fixed pointer-events-none rounded-full z-50"
        style={{
          width: `${DOT_CURSOR_SIZE}px`,
          height: `${DOT_CURSOR_SIZE}px`,
          backgroundColor: colors.deep,
          x: cursorX,
          y: cursorY,
          translateX: `-${DOT_CURSOR_SIZE / 2}px`,
          translateY: `-${DOT_CURSOR_SIZE / 2}px`,
        }}
        variants={dotCursorVariants}
        animate={dotCursorState}
      />
    </>
  );
};

export default CustomCursor;
