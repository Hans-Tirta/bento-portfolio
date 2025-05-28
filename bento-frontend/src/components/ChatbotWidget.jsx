import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  AlertCircle,
  ChevronRight,
  Trash2,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

// Backend API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Hans's assistant. Need quick info about his background, skills, projects, or experience? Just ask - I'll keep it short and clear.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { colors } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    inputRef.current?.focus();
    scrollToBottom();
  }, [messages]);

  // Clear chat function
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm Hans's assistant. Need quick info about his background, skills, projects, or experience? Just ask — I'll keep it short and clear.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setError(null);
    setInputValue("");
  };

  // Build conversation history for API context
  const getConversationHistory = () => {
    return messages
      .filter((msg) => msg.id !== 1) // Exclude initial greeting
      .slice(-10) // Keep last 10 messages for context
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    try {
      // Send request to backend
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
          conversationHistory: getConversationHistory(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.message,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat API Error:", error);

      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: error.message.includes("Rate limit")
          ? "I'm receiving too many requests right now. Please wait a moment and try again."
          : error.message.includes("fetch")
          ? "I'm having trouble connecting to my brain right now. Please check if the backend server is running."
          : "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 384, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 384, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 },
            }}
            className="absolute right-4 top-4 h-[calc(100vh-2rem)] w-80 shadow-2xl pointer-events-auto rounded-2xl border overflow-hidden"
            style={{
              background: colors.light,
              borderColor: `${colors.muted}20`,
              borderWidth: "2px",
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-4 text-white font-semibold flex items-center justify-between border-b rounded-t-xl"
              style={{
                background: `${colors.deep}E6`,
                borderColor: `${colors.muted}30`,
              }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Bot size={22} />
                </motion.div>
                <div>
                  <span className="text-base">Chat with Hans</span>
                  <div className="text-xs opacity-80">AI Assistant</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Clear Chat Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearChat}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                  title="Clear Chat"
                >
                  <Trash2 size={18} />
                </motion.button>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-3 m-3 rounded-lg border-l-4 bg-red-50"
                  style={{ borderColor: "#ef4444" }}
                >
                  <div className="flex items-center">
                    <AlertCircle size={16} className="text-red-500 mr-2" />
                    <span className="text-sm text-red-700">
                      Connection issue - check if backend is running
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div
              className="scrollable-container flex-1 p-4 overflow-y-auto space-y-3"
              style={{ height: "calc(100vh - 200px)" }}
            >
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.95 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-xl text-sm leading-relaxed border ${
                        message.sender === "user"
                          ? "text-white shadow-md"
                          : "shadow-sm"
                      } ${message.isError ? "border-red-200 bg-red-50" : ""}`}
                      style={{
                        background: message.isError
                          ? "#fef2f2"
                          : message.sender === "user"
                          ? `${colors.muted}`
                          : "white",
                        color: message.isError
                          ? "#dc2626"
                          : message.sender === "user"
                          ? "white"
                          : colors.muted,
                        borderColor: message.isError
                          ? "#fecaca"
                          : message.sender === "bot"
                          ? `${colors.muted}20`
                          : "transparent",
                        borderWidth: "1px",
                      }}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && (
                          <motion.div
                            initial={{ rotate: -180 }}
                            animate={{ rotate: 0 }}
                            transition={{ type: "spring" }}
                          >
                            <Bot
                              size={16}
                              className="mt-1 flex-shrink-0"
                              style={{
                                color: message.isError
                                  ? "#dc2626"
                                  : colors.muted,
                              }}
                            />
                          </motion.div>
                        )}
                        {message.sender === "user" && (
                          <User
                            size={16}
                            className="mt-1 flex-shrink-0 text-white"
                          />
                        )}
                        <div className="flex-1">
                          <div className="whitespace-pre-wrap">
                            {message.text}
                          </div>
                          <div
                            className={`text-xs opacity-60 mt-1 ${
                              message.sender === "user" ? "text-white" : ""
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div
                      className="px-3 py-2 rounded-xl border shadow-sm bg-white"
                      style={{ borderColor: `${colors.muted}20` }}
                    >
                      <div className="flex items-center space-x-2">
                        <Bot size={16} style={{ color: colors.muted }} />
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              repeatType: "loop",
                            }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: colors.muted,
                              opacity: 0.7,
                            }}
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              repeatType: "loop",
                              delay: 0.1,
                            }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: colors.muted,
                              opacity: 0.7,
                            }}
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              repeatType: "loop",
                              delay: 0.2,
                            }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: colors.muted,
                              opacity: 0.7,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          Hans is thinking...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 border-t bg-white rounded-b-xl"
              style={{ borderColor: `${colors.muted}20` }}
            >
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Hans..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    borderColor: `${colors.muted}30`,
                    "--tw-ring-color": colors.muted,
                  }}
                  disabled={isLoading}
                  maxLength={500}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-3 py-2 rounded-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `${colors.deep}E6`,
                  }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                Powered by Gemini AI • {inputValue.length}/500
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="fixed bottom-6 right-6 pointer-events-auto"
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-14 h-14 rounded-full text-white shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden border-2"
              style={{
                background: `${colors.deep}E6`,
                borderColor: `${colors.muted}40`,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full scale-0"
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle size={22} />
              </motion.div>

              {/* Pulse effect for new messages */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
