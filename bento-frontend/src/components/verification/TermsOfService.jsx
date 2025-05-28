import { useState } from "react";
import { motion } from "framer-motion";

const TermsOfService = ({ colors, onComplete }) => {
  const [acceptedTerms, setAcceptedTerms] = useState({
    term1: false,
    term2: false,
    term3: false,
    term4: false,
  });

  const [showError, setShowError] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const terms = [
    {
      id: "term1",
      title: "Cookie Policy",
      content:
        "I acknowledge that cookies aren't just delicious snacks but also digital tracking tools. I agree to share my browsing habits, darkest secrets, and cookie preferences with the Secret Component™.",
    },
    {
      id: "term2",
      title: "Intellectual Property",
      content:
        "I acknowledge that any memes, jokes, or code snippets I discover through this secret component are the intellectual property of The Diddler™ and I am not allowed to claim them as my own, even if they're really funny.",
    },
    {
      id: "term3",
      title: "Data Collection",
      content:
        "I agree that the Secret Component™ may collect my keyboard typing rhythm, mouse movement patterns, and preferred development IDE for scientific purposes, including but not limited to determining if I'm actually a robot pretending to be a human developer.",
    },
    {
      id: "term4",
      title: "Rick Roll Clause",
      content:
        "I hereby acknowledge that I might be Rick Rolled at any point during my interaction with this component and agree not to be upset about it because it's a classic internet tradition.",
    },
  ];

  const toggleTerm = (termId) => {
    if (isAnimating) return;

    setAcceptedTerms((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
    setShowError(false);
  };

  const handleSubmit = () => {
    const allAccepted = Object.values(acceptedTerms).every(Boolean);

    if (allAccepted) {
      setIsAnimating(true);
      setSubmitAttempts((prev) => prev + 1);

      // First submission - uncheck the first box
      if (submitAttempts === 0) {
        setAcceptedTerms((prev) => ({
          ...prev,
          term1: false,
        }));
        setShowError(true);
        setIsAnimating(false);
      }
      // Second submission - uncheck the last box
      else if (submitAttempts === 1) {
        setAcceptedTerms((prev) => ({
          ...prev,
          term4: false,
        }));
        setShowError(true);
        setIsAnimating(false);
      }
      // Third submission - fake success before unchecking the all boxes
      else if (submitAttempts === 2) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
          setAcceptedTerms((prev) => ({
            ...prev,
            term1: false,
            term2: false,
            term3: false,
            term4: false,
          }));
          setShowError(true);
        }, 3000);
      }
      // Let them through after trolling
      else if (submitAttempts >= 3) {
        setIsAnimating(false);
        onComplete();
      }
    } else {
      setShowError(true);
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
          Terms of Service Agreement
        </h3>

        <div className="mb-4 max-h-44 overflow-y-auto pr-2 space-y-4 scrollable-container">
          {terms.map((term) => (
            <div key={term.id} className="flex items-start gap-2">
              <input
                type="checkbox"
                id={term.id}
                checked={acceptedTerms[term.id]}
                onChange={() => toggleTerm(term.id)}
                className="mt-1"
                disabled={isAnimating}
              />
              <div className="flex-1">
                <label
                  htmlFor={term.id}
                  className="font-medium text-sm"
                  style={{ color: colors.deep }}
                >
                  {term.title}
                </label>
                <p className="text-xs mt-1" style={{ color: colors.muted }}>
                  {term.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showError && (
          <div className="text-sm text-red-500 text-center mb-4 opacity-100">
            {submitAttempts === 0
              ? "Please accept all terms to proceed."
              : submitAttempts === 1
              ? "Hmm, looks like you didn't check all boxes. Try again?"
              : submitAttempts === 2
              ? "You missed another box. Are your clicks registering properly?"
              : "Ok I'm gonna be honest, that was on me. Let's try one final time."}
          </div>
        )}

        <button
          className={`w-full py-2 rounded-lg transition-transform duration-200 ${
            isAnimating
              ? "cursor-not-allowed opacity-75"
              : "hover:scale-105 active:scale-95"
          }`}
          style={{ backgroundColor: colors.muted, color: colors.light }}
          onClick={handleSubmit}
          disabled={isAnimating}
        >
          {isAnimating ? "Processing..." : "Accept All Terms"}
        </button>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
