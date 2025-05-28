import { useState } from "react";
import { motion } from "framer-motion";

const EmailVerification = ({ colors, onComplete }) => {
  const [email, setEmail] = useState("");
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [showCodeError, setShowCodeError] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Generate a random 4-digit verification code
  const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSendCode = () => {
    // Validate the email first
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Generate the verification code
    const code = generateVerificationCode();
    setVerificationCode(code);
    setShowEmailSent(true);
    setEmailError("");
  };

  const handleVerifyCode = () => {
    if (enteredCode === verificationCode) {
      onComplete();
    } else {
      setShowCodeError(true);
      setEnteredCode("");
    }
  };

  // Fake email preview modal
  const renderEmailPreview = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border rounded-lg p-3 mb-4 mt-2"
        style={{ borderColor: `${colors.soft}66` }}
      >
        <div className="text-xs mb-2" style={{ color: colors.muted }}>
          <strong>From:</strong> security@secret-component.dev
          <br />
          <strong>To:</strong> {email}
          <br />
          <strong>Subject:</strong> Your Secret Component Verification Code
        </div>

        <div
          className="border-t pt-2"
          style={{ borderColor: `${colors.soft}33` }}
        >
          <p className="text-sm mb-2" style={{ color: colors.deep }}>
            Hello Developer,
          </p>
          <p className="text-sm mb-2" style={{ color: colors.deep }}>
            Thank you for verifying your email. Please use the following code to
            continue:
          </p>
          <div
            className="text-center font-mono text-xl font-bold p-2 mb-2"
            style={{ backgroundColor: `${colors.soft}33`, color: colors.deep }}
          >
            {verificationCode}
          </div>
          <p className="text-xs italic" style={{ color: colors.muted }}>
            This code will never expire. Feel free to share this code with
            anyone I guess.
          </p>
        </div>
      </motion.div>
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
          Email Verification
        </h3>

        {!showEmailSent ? (
          <>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm mb-1"
                style={{ color: colors.muted }}
              >
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className="w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2"
                style={{
                  borderColor: `${colors.soft}66`,
                  color: colors.deep,
                }}
                placeholder="you@example.com"
              />

              {emailError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm mt-1"
                  style={{ color: "#e53e3e" }}
                >
                  {emailError}
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 rounded-lg"
              style={{ backgroundColor: colors.muted, color: colors.light }}
              onClick={handleSendCode}
            >
              Send Verification Code
            </motion.button>
          </>
        ) : (
          <>
            {renderEmailPreview()}

            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-sm mb-1"
                style={{ color: colors.muted }}
              >
                Enter the 4-digit code sent to your email
              </label>
              <input
                type="text"
                id="code"
                value={enteredCode}
                onChange={(e) => {
                  setEnteredCode(
                    e.target.value.replace(/[^0-9]/g, "").slice(0, 4)
                  );
                  setShowCodeError(false);
                }}
                className="w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2 text-center font-mono text-xl"
                style={{
                  borderColor: `${colors.soft}66`,
                  color: colors.deep,
                }}
                placeholder="0000"
                maxLength={4}
              />

              {showCodeError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-center mt-1"
                  style={{ color: "#e53e3e" }}
                >
                  Incorrect code. Please try again.
                </motion.div>
              )}
            </div>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 rounded-lg"
                style={{
                  backgroundColor: `${colors.soft}66`,
                  color: colors.deep,
                }}
                onClick={() => {
                  setShowEmailSent(false);
                  setEnteredCode("");
                  setShowCodeError(false);
                }}
              >
                Change Email
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 rounded-lg"
                style={{ backgroundColor: colors.muted, color: colors.light }}
                onClick={handleVerifyCode}
                disabled={enteredCode.length !== 4}
              >
                Verify Code
              </motion.button>
            </div>
          </>
        )}
      </div>

      <div
        className="text-xs text-center"
        style={{ color: `${colors.muted}99` }}
      >
        We never store your email and it's just used for verification
      </div>
    </motion.div>
  );
};

export default EmailVerification;
