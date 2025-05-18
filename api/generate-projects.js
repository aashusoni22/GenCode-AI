import OpenAI from "openai";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const {
      skills,
      experience,
      complexity,
      projectType,
      industry,
      timeCommitment,
    } = req.body;

    if (
      !skills ||
      skills.length === 0 ||
      !complexity ||
      !projectType ||
      !timeCommitment
    ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const prompt = createEnhancedPrompt(
      skills,
      experience,
      complexity,
      projectType,
      industry,
      timeCommitment
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates detailed project ideas for developers. Respond in JSON format with comprehensive information about each project.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    let projects;
    try {
      projects = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      projects = createDefaultProjects(skills);
    }

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

    return res.status(200).json({ projects });
  } catch (error) {
    console.error("Error:", error);
    const fallbackProjects = createDefaultProjects(req.body.skills || []);
    return res.status(200).json({ projects: fallbackProjects });
  }
}

// Helper Functions
function getExperienceLevel(experience) {
  if (experience < 25) return "Beginner";
  if (experience >= 25 && experience < 50) return "Intermediate";
  if (experience >= 50 && experience < 75) return "Advanced";
  return "Expert";
}

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

function createEnhancedPrompt(
  skills,
  experience,
  complexity,
  projectType,
  industry,
  timeCommitment
) {
  const experienceLevel = getExperienceLevel(experience);
  let timeEstimate =
    timeCommitment === "small"
      ? "5-10 hours"
      : timeCommitment === "medium"
      ? "10-25 hours"
      : timeCommitment === "large"
      ? "25-50+ hours"
      : "a few hours";

  return `Generate 4 detailed project ideas for a ${experienceLevel}-level frontend developer with the following specifications:

DEVELOPER PROFILE:
- Skills: ${skills.join(", ")}
- Experience Level: ${experienceLevel} (${experience}/100)
- Project Complexity Preference: ${complexity}
- Project Type Focus: ${projectType}
- Available Time: ${timeEstimate} (${timeCommitment})
${industry ? `- Industry Domain: ${industry}` : ""}`;
}

function createDefaultProjects(skills) {
  return [
    {
      id: 1,
      title: "Interactive Dashboard",
      difficulty: "Medium",
      estimatedTime: "2-3 weeks",
      type: "Dashboard",
      description:
        "Build a responsive dashboard that displays real-time data visualizations.",
      overview:
        "This dashboard project demonstrates your ability to organize and present complex data in a user-friendly interface.",
      employerAppeal:
        "This project showcases your ability to transform complex data into actionable insights through an intuitive interface.",
      features: [
        "Real-time data updates using WebSockets",
        "Interactive charts and graphs with filtering options",
        "User authentication and role-based access control",
        "Customizable dashboard layouts",
        "Data export capabilities",
      ],
      techStack: [...skills, "Chart.js", "Socket.io"],
      learningOpportunities: [
        "State management for complex UI interactions",
        "Real-time data handling and WebSocket integration",
        "Creating reusable chart components",
        "Implementing dashboard layouts with CSS Grid",
      ],
      challenges: [
        "Handling real-time data updates without affecting performance",
        "Creating an intuitive drag-and-drop interface for widget arrangement",
      ],
      implementationSteps: [
        {
          phase: "Project Setup",
          description: "Set up project structure and install dependencies",
          tasks: ["Initialize project", "Install necessary libraries"],
          estimatedTime: "2-3 hours",
        },
        {
          phase: "Dashboard Layout",
          description: "Create the main dashboard layout and widget system",
          tasks: [
            "Design responsive dashboard grid",
            "Implement widget containers",
          ],
          estimatedTime: "6-8 hours",
        },
      ],
      resources: [
        {
          title: "Chart.js Documentation",
          url: "https://www.chartjs.org/docs/latest/",
          type: "Documentation",
          description: "Official documentation for Chart.js",
        },
      ],
    },
  ];
}
