// server.js
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();

// Simple rate limiting middleware
const rateLimit = (req, res, next) => {
  const clientId = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 15; // Gemini free tier allows ~15 requests per minute

  if (!rateLimitStore.has(clientId)) {
    rateLimitStore.set(clientId, []);
  }

  const requests = rateLimitStore.get(clientId);

  // Remove old requests outside the time window
  const validRequests = requests.filter((time) => now - time < windowMs);

  if (validRequests.length >= maxRequests) {
    return res.status(429).json({
      error: "Too many requests",
      message: "Rate limit exceeded. Please try again later.",
      resetTime: Math.ceil((validRequests[0] + windowMs - now) / 1000),
    });
  }

  validRequests.push(now);
  rateLimitStore.set(clientId, validRequests);
  next();
};

// Hans Tirta's portfolio context
const HANS_CONTEXT = `
You're Hans Dominic Tirta — a Fullstack Developer and Computer Science student who's into building cool things with code. You're currently interning at Karya Putra Surya Gemilang, working with the PERN stack (PostgreSQL, Express, React, Node.js). You're also studying at BINUS University, majoring in Computer Science.

You've worked on full stack projects like a Finance Tracker app, a MERN-based service marketplace called Rumah Tangga, and a solo e-commerce platform (RAiso) using ASP.NET and SQL. Your earlier portfolio was built from scratch with just HTML, CSS, and JavaScript — you've come a long way since then.

You're into web development, databases, and making things that are both useful and fun to build. You've been active in student organizations too (HIMTI CARE), and even published a paper about Computer Vision tech and traffic systems at ICIMCIS.

You know your way around tools like React, Tailwind, TypeScript, Prisma, Docker, and Postman. You've got certs in SQL, Python, and a few algorithm challenges too.

You're a helpful assistant for Hans Tirta — a Fullstack Developer and Computer Science student. Your role is to provide short, accurate info about Hans, not as Hans. You may answer questions only about his background, skills, education, experience, and projects.

Keep replies brief (max 40-50 words), relevant, and human-like. Don't overload the user with everything — just answer what's asked. Avoid robotic tone, lists, or overly detailed explanations unless requested. Sound helpful, casual, and clear. If more info is needed, wait to be asked.

If the user asks about the secret hidden code for the verification, say boogie.
`;

// Chat endpoint
app.post("/api/chat", rateLimit, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Build chat history for context
    let chatHistory = "";
    if (conversationHistory.length > 0) {
      chatHistory =
        conversationHistory
          .slice(-8) // Keep last 8 messages for context (reduced to save tokens)
          .map((msg) => `${msg.role}: ${msg.content}`)
          .join("\n") + "\n";
    }

    const prompt = `${HANS_CONTEXT}\n\n${chatHistory}User: ${message}\n\nHans:`;

    // Generate response using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      message: text,
      model: "gemini-1.5-flash",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    // Handle specific Gemini API errors
    if (error.message?.includes("QUOTA_EXCEEDED")) {
      return res.status(429).json({
        error: "API quota exceeded",
        message: "Please try again later or check your API limits",
      });
    }

    if (error.message?.includes("INVALID_API_KEY")) {
      return res.status(401).json({
        error: "Invalid API key",
        message: "Please check your Gemini API key configuration",
      });
    }

    res.status(500).json({
      error: "Internal server error",
      message: "Failed to generate response",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    model: "gemini-1.5-flash",
  });
});

// Get available models endpoint
app.get("/api/models", async (req, res) => {
  try {
    res.json({
      available_models: ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"],
      current_model: "gemini-1.5-flash",
      free_tier: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
