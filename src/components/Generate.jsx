import React, { useEffect, useState } from "react";
import {
  Code,
  Cpu,
  Clock,
  Briefcase,
  Server,
  ArrowRight,
  Search,
  X,
  CheckCircle,
  CircleAlert,
} from "lucide-react";
import ProjectResults from "./ProjectResults";

const API_URL = import.meta.env.PROD
  ? "/.netlify/functions/generate-projects"
  : "http://localhost:3001/api/generate-projects";

const Generate = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("skills");
  const [showResults, setShowResults] = useState(false);
  const [generatedProjects, setGeneratedProjects] = useState([]);
  const [formData, setFormData] = useState({
    skills: [],
    experience: 20,
    complexity: "",
    projectType: "",
    industry: "",
    timeCommitment: "",
  });

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Angular",
    "Flutter",
    "Swift",
    "React Native",
    "Tailwind CSS",
    "Bootstrap",
    "SASS",
    "Redux",
    "GraphQL",
    "REST API",
    "Node.js",
    "Express",
    "MongoDB",
    "Firebase",
    "NextJS",
    "Gatsby",
    "Jest",
    "Cypress",
  ];

  const projectTypes = [
    { value: "ecommerce", label: "E-commerce" },
    { value: "dashboard", label: "Dashboard" },
    { value: "social", label: "Social Network" },
    { value: "tool", label: "Developer Tool" },
    { value: "portfolio", label: "Portfolio" },
    { value: "game", label: "Browser Game" },
    { value: "blog", label: "Blog System" },
    { value: "api", label: "API Integration" },
    { value: "mobile", label: "Mobile Web App" },
    { value: "learning", label: "Learning Platform" },
    { value: "booking", label: "Booking System" },
    { value: "map", label: "Interactive Map" },
    { value: "calendar", label: "Calendar App" },
    { value: "chat", label: "Chat Application" },
    { value: "weather", label: "Weather App" },
    { value: "forum", label: "Discussion Forum" },
    { value: "marketplace", label: "Marketplace" },
    { value: "music", label: "Music Player" },
    { value: "video", label: "Video Platform" },
    { value: "crm", label: "CRM System" },
    { value: "fitness", label: "Fitness Tracker" },
    { value: "recipe", label: "Recipe Collection" },
  ];

  const industries = [
    { value: "health", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "productivity", label: "Productivity" },
    { value: "travel", label: "Travel" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "social", label: "Social Media" },
    { value: "food", label: "Food & Beverage" },
    { value: "realestate", label: "Real Estate" },
    { value: "sports", label: "Sports & Fitness" },
    { value: "technology", label: "Technology" },
    { value: "gaming", label: "Gaming" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "automotive", label: "Automotive" },
    { value: "government", label: "Government" },
    { value: "nonprofit", label: "Non-profit" },
    { value: "arts", label: "Arts & Culture" },
    { value: "media", label: "Media & Publishing" },
    { value: "fashion", label: "Fashion & Apparel" },
    { value: "legal", label: "Legal Services" },
    { value: "environmental", label: "Environmental" },
    { value: "agriculture", label: "Agriculture" },
    { value: "science", label: "Science & Research" },
    { value: "logistics", label: "Logistics & Supply Chain" },
  ];

  useEffect(() => {
    const storedProjects = localStorage.getItem("generatedProjects");
    const storedFormData = localStorage.getItem("projectFormData");
    const storedShowResults = localStorage.getItem("showResults");

    if (storedProjects && storedFormData && storedShowResults === "true") {
      setGeneratedProjects(JSON.parse(storedProjects));
      setFormData(JSON.parse(storedFormData));
      setShowResults(true);
    }
  }, []);

  const handleSkillToggle = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData, // Add this to preserve other properties
        skills: formData.skills.filter((s) => s !== skill),
      });
    } else {
      setFormData({
        ...formData, // Add this to preserve other properties
        skills: [...formData.skills, skill],
      });
    }
  };

  const handleExperienceChange = (e) => {
    setFormData({
      ...formData,
      experience: parseInt(e.target.value),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      skills: formData.skills,
      experience: formData.experience,
      complexity: formData.complexity,
      projectType: formData.projectType,
      industry: formData.industry,
      timeCommitment: formData.timeCommitment,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            console.error("Error details:", err);
            throw new Error("Network response was not ok");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Projects received:", data.projects);
        setGeneratedProjects(data.projects);

        localStorage.setItem(
          "generatedProjects",
          JSON.stringify(data.projects)
        );
        localStorage.setItem("projectFormData", JSON.stringify(formData));
        localStorage.setItem("showResults", "true");

        setLoading(false);
        setShowResults(true);
      })
      .catch((error) => {
        console.error("Error generating projects:", error);
        setLoading(false);
        alert("Failed to generate projects. Please try again.");
      });
  };

  const handleRegenerate = () => {
    setLoading(true);

    const payload = {
      skills: formData.skills,
      experience: formData.experience,
      complexity: formData.complexity,
      projectType: formData.projectType,
      industry: formData.industry,
      timeCommitment: formData.timeCommitment,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            console.error("Error details:", err);
            throw new Error("Network response was not ok");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Projects regenerated:", data.projects);
        setGeneratedProjects(data.projects);

        localStorage.setItem(
          "generatedProjects",
          JSON.stringify(data.projects)
        );
        localStorage.setItem("projectFormData", JSON.stringify(formData));
        localStorage.setItem("showResults", "true");

        return { success: true };
      })
      .catch((error) => {
        console.error("Error regenerating projects:", error);
        alert("Failed to regenerate projects. Please try again.");
        return { success: false };
      })
      .finally(() => setLoading(false));
  };

  const handleBackToForm = () => {
    const result = confirm(
      "Are you sure you want to go back to the form? Generated projects will be lost."
    );

    if (result) {
      setShowResults(false);

      // Clear local storage
      localStorage.removeItem("generatedProjects");
      localStorage.removeItem("projectFormData");
      localStorage.removeItem("showResults");
    } else {
      return;
    }
  };

  const getExperienceLabel = () => {
    if (formData.experience < 25) return "Beginner";
    if (formData.experience >= 25 && formData.experience < 50)
      return "Intermediate";
    if (formData.experience >= 50 && formData.experience < 75)
      return "Advanced";
    return "Expert";
  };

  const filteredSkills = searchQuery
    ? skills.filter((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : skills;

  const getProgress = () => {
    let progress = 0;
    if (formData.skills.length > 0) progress += 20;
    if (formData.experience >= 0) progress += 20;
    if (formData.complexity) progress += 20;
    if (formData.projectType) progress += 20;
    if (formData.timeCommitment) progress += 20;
    return progress;
  };

  if (showResults) {
    return (
      <div className="bg-black min-h-screen font-primary pb-20 pt-12">
        <ProjectResults
          formData={formData}
          projects={generatedProjects}
          onBack={handleBackToForm}
          onRegenerate={handleRegenerate}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-primary">
      {/* Hero Section with Animation */}
      <section className="max-w-5xl mx-auto pt-32 pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Generate Your <span className="text-secondary">Perfect Project</span>
        </h1>
        <p className="mt-4 text-gray-400 text-center max-w-2xl mx-auto text-lg">
          Tell us what you're looking for, and we'll create the ideal portfolio
          project
        </p>

        {/* Progress Bar */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex justify-between mb-2 text-xs text-gray-400">
            <span>Skills</span>
            <span>Experience</span>
            <span>Complexity</span>
            <span>Type</span>
            <span>Time</span>
          </div>
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-secondary to-purple-400 transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden">
          {/* Form Navigation */}
          <div className="flex justify-between overflow-x-auto hide-scrollbar bg-gray-950 border-b border-gray-800">
            {/* Skills Button */}
            <button
              className={`px-6 py-4 whitespace-nowrap transition-all ${
                activeSection === "skills"
                  ? "border-b-2 border-secondary text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveSection("skills")}
            >
              <span className="flex items-center">
                <Code size={16} className="mr-2" />
                Skills
                {formData.skills.length > 0 && (
                  <span className="ml-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {formData.skills.length}
                  </span>
                )}
              </span>
            </button>
            {/* Experience Button */}
            <button
              className={`px-6 py-4 whitespace-nowrap transition-all ${
                activeSection === "experience"
                  ? "border-b-2 border-secondary text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveSection("experience")}
            >
              <span className="flex items-center">
                <Cpu size={16} className="mr-2" />
                Experience
                {formData.experience > 0 && (
                  <CheckCircle size={12} className="ml-2 text-green-400" />
                )}
              </span>
            </button>
            {/* Complexity Button */}
            <button
              className={`px-6 py-4 whitespace-nowrap transition-all ${
                activeSection === "complexity"
                  ? "border-b-2 border-secondary text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveSection("complexity")}
            >
              <span className="flex items-center">
                <Server size={16} className="mr-2" />
                Complexity
                {formData.complexity && (
                  <CheckCircle size={12} className="ml-2 text-green-400" />
                )}
              </span>
            </button>
            {/* Project Type Button */}
            <button
              className={`px-6 py-4 whitespace-nowrap transition-all ${
                activeSection === "projectType"
                  ? "border-b-2 border-secondary text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveSection("projectType")}
            >
              <span className="flex items-center">
                <Briefcase size={16} className="mr-2" />
                Project Type
                {formData.projectType && (
                  <CheckCircle size={12} className="ml-2 text-green-400" />
                )}
              </span>
            </button>
            {/* Time Commitment Button */}
            <button
              className={`px-6 py-4 whitespace-nowrap transition-all ${
                activeSection === "time"
                  ? "border-b-2 border-secondary text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveSection("time")}
            >
              <span className="flex items-center">
                <Clock size={16} className="mr-2" />
                Time
                {formData.timeCommitment && (
                  <CheckCircle size={12} className="ml-2 text-green-400" />
                )}
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Skills Section */}
            {activeSection === "skills" && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-white mb-4">
                  What skills do you want to practice?
                </h2>
                <p className="text-gray-400 mb-6">
                  Select the technologies you'd like to use or learn in your
                  project.
                </p>

                {/* Search Box */}
                <div className="relative mb-6">
                  <Search
                    className="absolute left-3 top-4 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search for technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-4 text-gray-400 hover:text-white"
                      onClick={() => setSearchQuery("")}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Selected Skills Pills */}
                {formData.skills.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">
                      Selected skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-secondary/40 bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            className="ml-2 text-white hover:text-red-300"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className={`px-3 py-3 rounded-lg text-sm transition-all flex items-center justify-center ${
                        formData.skills.includes(skill)
                          ? "bg-secondary bg-opacity-20 text-white border border-secondary"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {formData.skills.includes(skill) && (
                        <CheckCircle size={14} className="mr-2" />
                      )}
                      {skill}
                    </button>
                  ))}
                </div>

                {formData.skills.length === 0 && (
                  <p className="text-amber-400 text-sm mt-2 flex items-center">
                    <CircleAlert size={16} className="mr-2" />
                    Please select at least one skill to continue
                  </p>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={formData.skills.length === 0}
                    onClick={() => setActiveSection("experience")}
                  >
                    Next <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Experience Section */}
            {activeSection === "experience" && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-white mb-4">
                  What's your experience level?
                </h2>
                <p className="text-gray-400 mb-14">
                  This helps us tailor the complexity of the generated project.
                </p>

                <div className="mb-10 max-w-4xl mx-auto">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.experience}
                      onChange={handleExperienceChange}
                      className="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #9F7AEA 0%, #9F7AEA ${formData.experience}%, #1F2937 ${formData.experience}%, #1F2937 100%)`,
                      }}
                    />

                    <div className="absolute -top-12 left-0 right-0 flex justify-center">
                      <div className="bg-secondary text-white text-sm font-medium rounded-lg px-4 py-2">
                        {getExperienceLabel()}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div className="text-center">
                      <div
                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-2 mx-auto border-2 border-transparent transition-colors duration-200"
                        style={{
                          borderColor:
                            formData.experience < 25
                              ? "#9F7AEA"
                              : "transparent",
                        }}
                      >
                        <span className="text-xs text-white">0-1</span>
                      </div>
                      <span className="text-sm text-gray-400">Beginner</span>
                    </div>
                    <div className="text-center">
                      <div
                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-2 mx-auto border-2 border-transparent transition-colors duration-200 cursor-pointer"
                        style={{
                          borderColor:
                            formData.experience >= 25 &&
                            formData.experience < 50
                              ? "#9F7AEA"
                              : "transparent",
                        }}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            experience: 35,
                          })
                        }
                      >
                        <span className="text-xs text-white">1-2</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        Intermediate
                      </span>
                    </div>
                    <div className="text-center">
                      <div
                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-2 mx-auto border-2 border-transparent transition-colors duration-200 cursor-pointer"
                        style={{
                          borderColor:
                            formData.experience >= 50 &&
                            formData.experience < 75
                              ? "#9F7AEA"
                              : "transparent",
                        }}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            experience: 62,
                          })
                        }
                      >
                        <span className="text-xs text-white">2-4</span>
                      </div>
                      <span className="text-sm text-gray-400">Advanced</span>
                    </div>
                    <div className="text-center">
                      <div
                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-2 mx-auto border-2 border-transparent transition-colors duration-200 cursor-pointer"
                        style={{
                          borderColor:
                            formData.experience >= 75
                              ? "#9F7AEA"
                              : "transparent",
                        }}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            experience: 88,
                          })
                        }
                      >
                        <span className="text-xs text-white">4+</span>
                      </div>
                      <span className="text-sm text-gray-400">Expert</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    className="border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 transition-colors"
                    onClick={() => setActiveSection("skills")}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center"
                    onClick={() => setActiveSection("complexity")}
                  >
                    Next <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Complexity Section */}
            {activeSection === "complexity" && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-white mb-4">
                  How complex should your project be?
                </h2>
                <p className="text-gray-400 mb-8">
                  Choose a complexity level that matches your goals and
                  available time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <button
                    type="button"
                    className={`relative p-6 rounded-xl transition-all ${
                      formData.complexity === "simple"
                        ? "bg-secondary text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, complexity: "simple" })
                    }
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-black bg-opacity-30 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🔰</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Simple</h3>
                      <p className="text-sm opacity-80">
                        Single-feature projects with minimal complexity, ideal
                        for beginners.
                      </p>
                      <ul className="text-left text-sm mt-4 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>1-2 day completion</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>2-3 core components</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>Minimal state management</span>
                        </li>
                      </ul>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`relative p-6 rounded-xl transition-all ${
                      formData.complexity === "medium"
                        ? "bg-secondary text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, complexity: "medium" })
                    }
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-black bg-opacity-30 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚒️</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Medium</h3>
                      <p className="text-sm opacity-80">
                        Multi-feature projects with moderate complexity.
                      </p>
                      <ul className="text-left text-sm mt-4 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>1-2 week completion</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>5-7 components</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>State management needed</span>
                        </li>
                      </ul>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`relative p-6 rounded-xl transition-all ${
                      formData.complexity === "complex"
                        ? "bg-secondary text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, complexity: "complex" })
                    }
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-black bg-opacity-30 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🚀</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Complex</h3>
                      <p className="text-sm opacity-80">
                        Full-featured applications with advanced functionality.
                      </p>
                      <ul className="text-left text-sm mt-4 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>2+ week completion</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>10+ components</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span>Advanced state & API</span>
                        </li>
                      </ul>
                    </div>
                  </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    className="border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 transition-colors"
                    onClick={() => setActiveSection("experience")}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!formData.complexity}
                    onClick={() => setActiveSection("projectType")}
                  >
                    Next <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Project Type Section */}
            {activeSection === "projectType" && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-white mb-4">
                  What type of project are you interested in?
                </h2>
                <p className="text-gray-400 mb-8">
                  Choose a category that aligns with your portfolio goals.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {projectTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      className={`p-4 rounded-xl text-center transition-all ${
                        formData.projectType === type.value
                          ? "bg-secondary text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, projectType: type.value })
                      }
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-4">
                  Industry Focus{" "}
                  <span className="text-sm font-normal text-gray-400">
                    (Optional)
                  </span>
                </h3>
                <p className="text-gray-400 mb-4">
                  Selecting an industry will make your project more relevant to
                  specific sectors.
                </p>

                <div className="mb-6">
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  >
                    <option value="">All industries (no specific focus)</option>
                    {industries.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    className="border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 transition-colors"
                    onClick={() => setActiveSection("complexity")}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!formData.projectType}
                    onClick={() => setActiveSection("time")}
                  >
                    Next <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Time Commitment Section */}
            {activeSection === "time" && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-white mb-4">
                  How much time can you commit?
                </h2>
                <p className="text-gray-400 mb-8">
                  We'll tailor the project scope to match your available time.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <button
                    type="button"
                    className={`p-5 rounded-xl text-center transition-all ${
                      formData.timeCommitment === "small"
                        ? "bg-secondary text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, timeCommitment: "small" })
                    }
                  >
                    <div className="w-12 h-12 rounded-full bg-black bg-opacity-30 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">Quick Project</h3>
                    <p className="text-sm opacity-80">1-5 hours</p>
                    <p className="mt-3 text-sm">
                      Perfect for a weekend project
                    </p>
                  </button>

                  <button
                    type="button"
                    className={`p-5 rounded-xl text-center transition-all ${
                      formData.timeCommitment === "medium"
                        ? "bg-secondary text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, timeCommitment: "medium" })
                    }
                  >
                    <div className="w-12 h-12 rounded-full bg-black bg-opacity-30 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">Medium Project</h3>
                    <p className="text-sm opacity-80">10-20 hours</p>
                    <p className="mt-3 text-sm">Good for a week-long project</p>
                  </button>

                  <button
                    type="button"
                    className={`p-5 rounded-xl text-center transition-all ${
                      formData.timeCommitment === "large"
                        ? "bg-secondary text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, timeCommitment: "large" })
                    }
                  >
                    <div className="w-12 h-12 rounded-full bg-black bg-opacity-30 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🏗️</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">Large Project</h3>
                    <p className="text-sm opacity-80">20+ hours</p>
                    <p className="mt-3 text-sm">
                      For an in-depth portfolio piece
                    </p>
                  </button>
                </div>

                {/* Final Summary */}
                {formData.skills.length > 0 &&
                  formData.complexity &&
                  formData.projectType &&
                  formData.timeCommitment && (
                    <div className="mt-10 p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 border-opacity-30">
                      <h3 className="text-white font-bold mb-2">
                        Project Summary
                      </h3>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li className="flex items-start">
                          <span className="font-medium text-gray-400 mr-2 w-24">
                            Skills:
                          </span>
                          <span>
                            {formData.skills.slice(0, 3).join(", ")}
                            {formData.skills.length > 3 &&
                              ` +${formData.skills.length - 3} more`}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium text-gray-400 mr-2 w-24">
                            Experience:
                          </span>
                          <span>{getExperienceLabel()}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium text-gray-400 mr-2 w-24">
                            Complexity:
                          </span>
                          <span>
                            {formData.complexity.charAt(0).toUpperCase() +
                              formData.complexity.slice(1)}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium text-gray-400 mr-2 w-24">
                            Project Type:
                          </span>
                          <span>
                            {
                              projectTypes.find(
                                (t) => t.value === formData.projectType
                              )?.label
                            }
                          </span>
                        </li>
                        {formData.industry && (
                          <li className="flex items-start">
                            <span className="font-medium text-gray-400 mr-2 w-24">
                              Industry:
                            </span>
                            <span>
                              {
                                industries.find(
                                  (i) => i.value === formData.industry
                                )?.label
                              }
                            </span>
                          </li>
                        )}
                        <li className="flex items-start">
                          <span className="font-medium text-gray-400 mr-2 w-24">
                            Time:
                          </span>
                          <span>
                            {formData.timeCommitment === "small" &&
                              "Quick (1-5 hours)"}
                            {formData.timeCommitment === "medium" &&
                              "Medium (10-20 hours)"}
                            {formData.timeCommitment === "large" &&
                              "Large (20+ hours)"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    className="border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 transition-colors"
                    onClick={() => setActiveSection("projectType")}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-secondary text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      loading ||
                      formData.skills.length === 0 ||
                      !formData.complexity ||
                      !formData.projectType ||
                      !formData.timeCommitment
                    }
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Generating Ideas...
                      </>
                    ) : (
                      <>
                        <ArrowRight size={18} className="mr-2" />
                        Generate Project Ideas
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* CSS for Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #9f7aea;
          cursor: pointer;
          border: 3px solid #111827;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Generate;
