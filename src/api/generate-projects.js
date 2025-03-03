import { Router } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
console.log("OPENAI_API_KEY available:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY,
});

router.post("/generate-projects", async (req, res) => {
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

    // Call OpenAI API with system prompt that specifies the JSON structure
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

    // Get the generated content
    const generatedContent = response.choices[0].message.content;

    // Log the full response for debugging
    console.log("==== FULL OPENAI RESPONSE START ====");
    console.log(generatedContent);
    console.log("==== FULL OPENAI RESPONSE END ====");

    let projects;
    try {
      // First try to parse the response as JSON directly
      projects = JSON.parse(generatedContent);

      // Log the parsed JSON object
      console.log("==== PARSED JSON OBJECT ====");
      console.log(JSON.stringify(projects, null, 2)); // Pretty-print with 2 spaces

      // Optionally log the structure of the first project to see all fields
      if (projects.length > 0) {
        console.log("==== FIRST PROJECT FIELDS ====");
        console.log(Object.keys(projects[0]));
      }
    } catch (parseError) {
      console.log(
        "Direct JSON parsing failed, trying to extract JSON from text"
      );

      // Try to extract JSON from the text (in case AI added markdown or explanations)
      const jsonMatch = generatedContent.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        try {
          projects = JSON.parse(jsonMatch[0]);
        } catch (extractError) {
          console.error("Failed to extract JSON from response", extractError);
          // Fall back to default projects
          projects = createDefaultProjects(skills);
        }
      } else {
        console.error("No JSON found in response");
        // Fall back to default projects
        projects = createDefaultProjects(skills);
      }
    }

    // Add IDs to projects if they don't have them
    projects = projects.map((project, index) => ({
      id: project.id || index + 1,
      ...project,
    }));

    // Ensure all required fields are present with fallbacks
    projects = projects.map((project) => ({
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

    // Return a more detailed error message
    if (error.response) {
      console.error("OpenAI API Error:", error.response.data);
      return res.status(500).json({
        error: "OpenAI API Error",
        details: error.response.data,
      });
    }

    // Fall back to default projects on error
    const fallbackProjects = createDefaultProjects(req.body.skills || []);

    // Decide whether to return the error or silently fall back
    // Uncomment this to return fallback projects instead of an error:
    return res.status(200).json({ projects: fallbackProjects });

    // Return the error
    // res
    //   .status(500)
    //   .json({ error: "Failed to generate projects: " + error.message });
  }
});

// Helper function to get experience level text
function getExperienceLevel(experienceValue) {
  if (experienceValue < 25) return "beginner";
  if (experienceValue < 50) return "intermediate";
  if (experienceValue < 75) return "advanced";
  return "expert";
}

// Helper function to get estimated time based on time commitment
function getEstimatedTime(timeCommitment) {
  switch (timeCommitment) {
    case "small":
      return "2-5 hours";
    case "medium":
      return "10-20 hours";
    case "large":
      return "20+ hours";
    default:
      return "1-2 weeks";
  }
}

// Helper function to format project type
function formatProjectType(projectType) {
  const typeMap = {
    ecommerce: "E-commerce",
    dashboard: "Dashboard",
    social: "Social Network",
    tool: "Developer Tool",
    portfolio: "Portfolio",
    game: "Browser Game",
    blog: "Blog System",
    api: "API Integration",
  };

  return (
    typeMap[projectType] ||
    projectType.charAt(0).toUpperCase() + projectType.slice(1)
  );
}

// Function to create default projects
function createDefaultProjects(skills) {
  return [
    {
      id: 1,
      title: "Interactive Dashboard",
      difficulty: "Medium",
      estimatedTime: "2-3 weeks",
      type: "Dashboard",
      description:
        "Build a responsive dashboard that displays real-time data visualizations. Allow users to filter and sort data, with multiple view options and exportable reports.",
      overview:
        "This dashboard project demonstrates your ability to organize and present complex data in a user-friendly interface. It focuses on data visualization, state management, and responsive design principles.",
      employerAppeal:
        "This project showcases your ability to transform complex data into actionable insights through an intuitive interface. Employers will value your skills in data visualization, state management, and creating practical business tools that help users make data-driven decisions.",
      features: [
        "Real-time data updates using WebSockets",
        "Interactive charts and graphs with filtering options",
        "User authentication and role-based access control",
        "Customizable dashboard layouts with drag-and-drop widgets",
        "Data export capabilities (CSV, PDF)",
        "Dark/light theme support",
        "Responsive design for all device sizes",
      ],
      techStack: [...(skills || []).slice(0, 3), "Chart.js", "Socket.io"],
      learningOpportunities: [
        "State management for complex UI interactions",
        "Real-time data handling and WebSocket integration",
        "Creating reusable chart components",
        "Implementing dashboard layouts with CSS Grid",
        "Managing user authentication and authorization",
      ],
      challenges: [
        "Handling real-time data updates without affecting performance",
        "Creating an intuitive drag-and-drop interface for widget arrangement",
        "Implementing responsive design that works across all device sizes",
      ],
      implementationSteps: [
        {
          phase: "Project Setup",
          description: "Set up project structure and install dependencies",
          tasks: [
            "Initialize project with Create React App",
            "Install necessary libraries (Chart.js, Socket.io, etc.)",
            "Set up routing and basic component structure",
          ],
          estimatedTime: "2-3 hours",
        },
        {
          phase: "Dashboard Layout",
          description: "Create the main dashboard layout and widget system",
          tasks: [
            "Design responsive dashboard grid",
            "Implement widget containers",
            "Create drag-and-drop functionality",
          ],
          estimatedTime: "6-8 hours",
        },
        {
          phase: "Data Visualization",
          description: "Implement charts and data display components",
          tasks: [
            "Create various chart components (bar, line, pie)",
            "Implement data filtering and manipulation",
            "Add export functionality",
          ],
          estimatedTime: "8-10 hours",
        },
      ],
      resources: [
        {
          title: "Chart.js Documentation",
          url: "https://www.chartjs.org/docs/latest/",
          type: "Documentation",
          description: "Official documentation for Chart.js",
        },
        {
          title: "Building Real-Time Applications with WebSockets",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
          type: "Tutorial",
          description: "MDN guide on using WebSockets for real-time features",
        },
        {
          title: "React DnD Tutorial",
          url: "https://react-dnd.github.io/react-dnd/docs/tutorial",
          type: "Tutorial",
          description: "Learn how to implement drag-and-drop in React",
        },
      ],
    },
    {
      id: 2,
      title: "E-commerce Product Page",
      difficulty: "Simple",
      estimatedTime: "1 week",
      type: "E-commerce",
      description:
        "Create a fully responsive product detail page with image gallery, product variations, reviews, and add-to-cart functionality.",
      overview:
        "This project focuses on creating a modern, interactive product page that showcases your frontend skills. You'll implement common e-commerce features that demonstrate your understanding of user experience and conversion optimization.",
      employerAppeal:
        "This project demonstrates your ability to create engaging user interfaces that drive conversion. Employers in e-commerce and retail will appreciate your attention to detail, understanding of shopping UX patterns, and implementation of features that directly impact business metrics.",
      features: [
        "Interactive product image gallery with zoom functionality",
        "Product variations (size, color, etc.) with inventory tracking",
        "Customer reviews and ratings section",
        "Add to cart with animations",
        "Related products carousel",
        "Size guide and measurement information",
      ],
      techStack: [...(skills || []).slice(0, 3), "Framer Motion"],
      learningOpportunities: [
        "Creating accessible and interactive UI components",
        "Managing product variations and options",
        "Implementing image galleries and carousels",
        "Animation and micro-interactions",
        "Practicing responsive design for e-commerce",
      ],
      challenges: [
        "Ensuring the image gallery works seamlessly across devices",
        "Managing product option combinations and inventory",
        "Creating smooth animations that enhance rather than detract from UX",
      ],
      implementationSteps: [
        {
          phase: "Project Setup",
          description: "Initialize project and create basic structure",
          tasks: [
            "Set up project with necessary dependencies",
            "Create component skeleton and routing",
            "Set up mock product data",
          ],
          estimatedTime: "1-2 hours",
        },
        {
          phase: "Image Gallery",
          description: "Create interactive product image gallery",
          tasks: [
            "Build main image viewer with thumbnails",
            "Implement image zoom functionality",
            "Make gallery fully responsive",
          ],
          estimatedTime: "3-4 hours",
        },
        {
          phase: "Product Options",
          description: "Implement product variations and selection",
          tasks: [
            "Create selectors for different product options",
            "Link options to inventory data",
            "Implement validation and error states",
          ],
          estimatedTime: "3-4 hours",
        },
      ],
      resources: [
        {
          title: "Building Accessible E-commerce Sites",
          url: "https://web.dev/accessible-ecommerce/",
          type: "Guide",
          description:
            "Best practices for creating accessible e-commerce experiences",
        },
        {
          title: "Animation Techniques in React",
          url: "https://www.framer.com/motion/",
          type: "Documentation",
          description: "Framer Motion documentation for animations",
        },
        {
          title: "E-commerce UX Design Patterns",
          url: "https://baymard.com/blog/product-page-ux",
          type: "Article",
          description: "Research-based UX design patterns for product pages",
        },
      ],
    },
  ];
}

// Function to create enhanced prompt for OpenAI
function createEnhancedPrompt(
  skills,
  experience,
  complexity,
  projectType,
  industry,
  timeCommitment
) {
  const experienceLevel = getExperienceLevel(experience);

  // Map timeCommitment to realistic hour ranges
  let timeEstimate = "a few hours";
  if (timeCommitment === "small") timeEstimate = "5-10 hours";
  else if (timeCommitment === "medium") timeEstimate = "10-25 hours";
  else if (timeCommitment === "large") timeEstimate = "25-50+ hours";

  let prompt = `Generate 4 detailed project ideas for a ${experienceLevel}-level frontend developer with the following specifications:

DEVELOPER PROFILE:
- Skills: ${skills.join(", ")}
- Experience Level: ${experienceLevel} (${experience}/100)
- Project Complexity Preference: ${complexity}
- Project Type Focus: ${projectType}
- Available Time: ${timeEstimate} (${timeCommitment})
${industry ? `- Industry Domain: ${industry}` : ""}

FOR EACH PROJECT, INCLUDE:
1. Title: A professional, concise project name
2. Difficulty: One of: Simple, Medium, or Complex
3. Estimated Time: Realistic completion timeframe
4. Type: The specific category this project falls under
5. Description: Brief explanation of what the project is
6. Overview: A more detailed description of the project's purpose and value
7. Employer Appeal: Why this project would impress potential employers
8. Features: 5-7 specific implementable features
9. Tech Stack: Required technologies, including the developer's skills plus complementary libraries
10. Learning Opportunities: 4-5 specific skills the developer will gain
11. Challenges: 2-3 potential technical challenges and how to address them
12. Implementation Steps: 3-4 phases of development with tasks and time estimates for each
13. Resources: 2-4 helpful resources with links and descriptions

RESPONSE FORMAT:
Return the response in valid JSON format as an array of project objects. Each project should follow this structure:

[
  {
    "title": "Project Title",
    "difficulty": "Medium",
    "estimatedTime": "1-2 weeks",
    "type": "Dashboard",
    "description": "Project description here",
    "overview": "A more comprehensive overview of the project, its purpose, and target audience",
    "employerAppeal": "Why this project is valuable for employment",
    "features": [
      "Feature 1 with explanation",
      "Feature 2 with explanation",
      "Feature 3 with explanation",
      "Feature 4 with explanation",
      "Feature 5 with explanation"
    ],
    "techStack": ["Tech 1", "Tech 2", "Tech 3"],
    "learningOpportunities": [
      "Learning opportunity 1",
      "Learning opportunity 2",
      "Learning opportunity 3",
      "Learning opportunity 4"
    ],
    "challenges": [
      "Challenge 1 and solution approach",
      "Challenge 2 and solution approach"
    ],
    "implementationSteps": [
      {
        "phase": "Setup",
        "description": "Initial project configuration",
        "tasks": [
          "Task 1",
          "Task 2",
          "Task 3"
        ],
        "estimatedTime": "X hours/days"
      },
      {
        "phase": "Core Development",
        "description": "Building main features",
        "tasks": [
          "Task 1",
          "Task 2",
          "Task 3"
        ],
        "estimatedTime": "X hours/days"
      }
    ],
    "resources": [
      {
        "title": "Resource title",
        "url": "Resource URL",
        "type": "Tutorial/Documentation/Article",
        "description": "Brief description of resource"
      }
    ]
  }
]`;

  return prompt;
}

export default router;
