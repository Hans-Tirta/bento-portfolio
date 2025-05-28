import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingVerification = ({ colors, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVerifying, setIsVerifying] = useState(true);

  // Verification steps with messages
  const verificationSteps = [
    "Analyzing your cookie consumption habits...",
    "Determining if you're worthy of our memes...",
    "Recording your mouse movement dance style...",
    "Checking if you're actually a robot in disguise...",
    "Evaluating your ability to spot Rick Astley...",
    "Calculating potential productivity loss...",
    "Preparing to add your data to The Diddler™ collection...",
    "Loading developer jokes you'll pretend to understand...",
    "Finalizing authentication process...",
    "Preparing access to secret content...",
  ];

  // Progress animation
  useEffect(() => {
    if (!isVerifying) return;

    const incrementTime = Math.floor(Math.random() * 300) + 200;

    const timer = setTimeout(() => {
      if (progress < 100) {
        const increment = Math.floor(Math.random() * 5) + 1;
        const newProgress = Math.min(progress + increment, 100);
        setProgress(newProgress);

        const newStep = Math.floor(
          (newProgress / 100) * verificationSteps.length
        );
        if (newStep !== currentStep && newStep < verificationSteps.length) {
          setCurrentStep(newStep);
        }

        if (newProgress === 100) {
          setTimeout(() => {
            setIsVerifying(false);
          }, 500);
        }
      }
    }, incrementTime);

    return () => clearTimeout(timer);
  }, [progress, isVerifying, currentStep]);

  useEffect(() => {
    if (!isVerifying && progress === 100) {
      onComplete();
    }
  }, [isVerifying, progress, onComplete]);

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
          Authenticating...
        </h3>

        <div className="mb-4">
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full"
              style={{
                backgroundColor: colors.muted,
                transition: "width 0.3s ease-out",
              }}
            ></motion.div>
          </div>
          <div
            className="text-right text-sm mt-1"
            style={{ color: colors.muted }}
          >
            {progress}%
          </div>
        </div>
        <div className="h-16 overflow-hidden">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-sm"
            style={{ color: colors.muted }}
          >
            {isVerifying ? verificationSteps[currentStep] : ""}
          </motion.div>
        </div>
      </div>

      <div
        className="text-xs text-center"
        style={{ color: `${colors.muted}99` }}
      >
        {isVerifying ? "Please wait while we authenticate your access..." : ""}
      </div>
    </motion.div>
  );
};

export default LoadingVerification;
