import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function SmoothScroller({ children }) {
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateScrollHeight = () => {
      if (scrollRef.current) {
        const contentHeight = scrollRef.current.scrollHeight;
        setScrollRange(contentHeight);

        if (ghostRef.current) {
          ghostRef.current.style.height = `${contentHeight}px`;
        }
      }
    };

    // Initial calculation
    updateScrollHeight();

    // 👉 Watch scrollRef, not ghostRef
    const resizeObserver = new ResizeObserver(updateScrollHeight);
    if (scrollRef.current) resizeObserver.observe(scrollRef.current);

    // Update on window resize
    window.addEventListener("resize", updateScrollHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollHeight);
    };
  }, []);

  // Set up smooth scrolling
  const { scrollY } = useScroll();
  const transform = useTransform(scrollY, [0, scrollRange], [0, -scrollRange]);
  const physics = { damping: 10, mass: 1, stiffness: 80 };
  const spring = useSpring(transform, physics);

  //damping: Controls how quickly the animation slows down (higher = more resistance)
  //mass: Higher values make scrolling feel heavier
  //stiffness: Controls the springiness (lower = more fluid)

  return (
    <>
      {/* Actual content container with smooth animation */}
      <motion.div
        ref={scrollRef}
        style={{ y: spring }}
        className="fixed top-0 left-0 w-full"
      >
        {children}
      </motion.div>

      {/* Ghost div that creates scrollable area */}
      <div
        ref={ghostRef}
        style={{ height: `${scrollRange}px`, pointerEvents: "none" }}
        className="invisible"
      />
    </>
  );
}

export default SmoothScroller;
