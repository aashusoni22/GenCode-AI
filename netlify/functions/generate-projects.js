import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

export const handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const {
      skills,
      experience,
      complexity,
      projectType,
      industry,
      timeCommitment,
    } = JSON.parse(event.body);

    // Validate required fields
    if (
      !skills ||
      skills.length === 0 ||
      !complexity ||
      !projectType ||
      !timeCommitment
    ) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Missing required parameters" }),
      };
    }

    const experienceLevel = getExperienceLevel(experience);
    const timeEstimate = getTimeEstimate(timeCommitment);

    const prompt = `Generate 4 detailed project ideas for a ${experienceLevel}-level frontend developer with the following specifications:

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

Return the response in valid JSON format as an array of project objects.`;

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
      console.error("Failed to parse OpenAI response:", parseError);
      projects = createDefaultProjects(skills);
    }

    // Add IDs to projects if they don't have them
    projects = projects.map((project, index) => ({
      id: project.id || index + 1,
      ...project,
    }));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projects }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Failed to generate project",
        details: error.message,
      }),
    };
  }
};

// Helper function to get experience level
function getExperienceLevel(experience) {
  if (experience < 25) return "Beginner";
  if (experience >= 25 && experience < 50) return "Intermediate";
  if (experience >= 50 && experience < 75) return "Advanced";
  return "Expert";
}

// Helper function to get time estimate
function getTimeEstimate(timeCommitment) {
  switch (timeCommitment) {
    case "small":
      return "5-10 hours";
    case "medium":
      return "10-25 hours";
    case "large":
      return "25-50+ hours";
    default:
      return "a few hours";
  }
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
