import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import generateProjectsRouter from "./src/api/generate-projects.js";

// Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: ["https://dev-generator.netlify.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// API Routes
app.use("/api", generateProjectsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log(
  "OpenAI API Key available:",
  process.env.VITE_OPENAI_API_KEY
    ? "Yes (length: " + process.env.VITE_OPENAI_API_KEY.length + ")"
    : "No"
);
