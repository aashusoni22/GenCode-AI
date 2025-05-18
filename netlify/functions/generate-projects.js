const { Router } = require("express");
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY,
});

// Import helper functions
const {
  getExperienceLevel,
  getEstimatedTime,
  formatProjectType,
  createDefaultProjects,
  createEnhancedPrompt,
} = require("../../src/api/generate-projects.js");

app.post("/generate-projects", async (req, res) => {
  try {
    const {
      skills,
      experience,
      complexity,
      projectType,
      industry,
      timeCommitment,
    } = req.body;

    // Validate required fields
    if (
      !skills ||
      skills.length === 0 ||
      !complexity ||
      !projectType ||
      !timeCommitment
    ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Create enhanced prompt for OpenAI
    const prompt = createEnhancedPrompt(
      skills,
      experience,
      complexity,
      projectType,
      industry,
      timeCommitment
    );

    console.log("Calling OpenAI API with enhanced prompt...");

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that generates detailed project ideas for developers. Respond in JSON format with comprehensive information about each project.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const generatedContent = response.choices[0].message.content;
    let projects;

    try {
      projects = JSON.parse(generatedContent);
    } catch (parseError) {
      const jsonMatch = generatedContent.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        try {
          projects = JSON.parse(jsonMatch[0]);
        } catch (extractError) {
          projects = createDefaultProjects(skills);
        }
      } else {
        projects = createDefaultProjects(skills);
      }
    }

    // Add IDs and ensure required fields
    projects = projects.map((project, index) => ({
      id: project.id || index + 1,
      title: project.title || "Unnamed Project",
      difficulty:
        project.difficulty ||
        complexity.charAt(0).toUpperCase() + complexity.slice(1),
      estimatedTime: project.estimatedTime || getEstimatedTime(timeCommitment),
      type: project.type || formatProjectType(projectType),
      description:
        project.description || `A project using ${skills.join(", ")}`,
      overview: project.overview || project.description,
      employerAppeal:
        project.employerAppeal ||
        `This project demonstrates proficiency in ${skills
          .slice(0, 3)
          .join(", ")} and problem-solving skills.`,
      features: project.features || ["Feature 1", "Feature 2", "Feature 3"],
      techStack: project.techStack || [...skills],
      learningOpportunities: project.learningOpportunities || [
        "Learning opportunity",
      ],
      implementationSteps: project.implementationSteps || [],
      challenges: project.challenges || [],
      resources: project.resources || [],
      ...project,
    }));

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error generating projects:", error);
    const fallbackProjects = createDefaultProjects(req.body.skills || []);
    return res.status(200).json({ projects: fallbackProjects });
  }
});

// Export the serverless function
exports.handler = serverless(app);
