import React, { useState } from "react";
import {
  ExternalLink,
  Heart,
  Share2,
  ChevronRight,
  Copy,
  Check,
  ArrowLeft,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import ProjectDetails from "./ProjectDetails";

const ProjectResults = ({
  formData,
  projects,
  onBack,
  onRegenerate,
  loading,
  setLoading,
}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleFavorite = (id) => {
    if (favorite.includes(id)) {
      setFavorite(favorite.filter((item) => item !== id));
    } else {
      setFavorite([...favorite, id]);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartOver = () => {
    const result = confirm("Are you sure you want to start over?");
    if (!result) {
      return;
    } else {
      localStorage.removeItem("generatedProjects");
      localStorage.removeItem("projectFormData");
      localStorage.removeItem("showResults");
      onBack();
    }
  };

  const handleRegenerate = () => {
    const result = confirm(
      "Are you sure you want to regenerate new project ideas?"
    );
    if (!result) {
      return;
    }

    localStorage.removeItem("generatedProjects");

    if (onRegenerate) {
      onRegenerate(formData);
    } else {
      localStorage.setItem("projectFormData", JSON.stringify(formData));
      localStorage.setItem("regenerateTrigger", "true");
      window.location.reload();
    }
  };

  if (selectedProject) {
    const project = projects.find((p) => p.id === selectedProject);
    return (
      <ProjectDetails
        project={project}
        onBack={() => setSelectedProject(null)}
        favorite={favorite}
        handleFavorite={handleFavorite}
      />
    );
  }

  // Main results view with project cards
  return (
    <div className="animate-fadeIn">
      <div className="max-w-6xl mx-auto mb-10 pt-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
              Your Project Ideas
            </h1>
            <p className="text-gray-400">
              Based on your skills and preferences, we've generated these
              project ideas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="text-white bg-gray-800 hover:bg-gray-700 duration-200 hover:scale-105 px-4 py-2 rounded-lg flex items-center"
              onClick={handleStartOver}
            >
              <RefreshCw size={16} className="mr-2" />
              Start Over
            </button>
            <button
              className="text-white bg-secondary hover:bg-secondary/80 hover:scale-105 duration-200 px-4 py-2 rounded-lg flex items-center"
              onClick={handleRegenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Regenerating...
                </>
              ) : (
                <>
                  <Sparkles size={16} className="mr-2" />
                  Regenerate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Skill summary */}
        <div className="bg-gray-900 rounded-lg p-4 mb-8 border border-gray-800">
          <div className="flex flex-wrap gap-y-2">
            <div className="w-full sm:w-1/2 md:w-1/4 flex items-center mb-2 sm:mb-0">
              <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
              <div className="text-sm">
                <span className="block text-gray-400">Skills</span>
                <span className="text-white" title={formData.skills.join(", ")}>
                  {formData.skills.slice(0, 2).join(", ")}
                  {formData.skills.length > 2 && "..."}
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 flex items-center mb-2 sm:mb-0">
              <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
              <div className="text-sm">
                <span className="block text-gray-400">Experience</span>
                <span className="text-white">
                  {formData.experience < 25 && "Beginner"}
                  {formData.experience >= 25 &&
                    formData.experience < 50 &&
                    "Intermediate"}
                  {formData.experience >= 50 &&
                    formData.experience < 75 &&
                    "Advanced"}
                  {formData.experience >= 75 && "Expert"}
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 flex items-center mb-2 sm:mb-0">
              <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
              <div className="text-sm">
                <span className="block text-gray-400">Complexity</span>
                <span className="text-white">
                  {formData.complexity &&
                    formData.complexity.charAt(0).toUpperCase() +
                      formData.complexity.slice(1)}
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 flex items-center">
              <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
              <div className="text-sm">
                <span className="block text-gray-400">Type</span>
                <span className="text-white">
                  {formData.projectType &&
                    formData.projectType.charAt(0).toUpperCase() +
                      formData.projectType.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto pb-16">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300 border border-gray-800"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">
                  {project.title}
                </h2>
                <button
                  className="text-gray-400 hover:text-rose-400"
                  onClick={() => handleFavorite(project.id)}
                >
                  <Heart
                    size={20}
                    className={
                      favorite.includes(project.id)
                        ? "fill-rose-500 text-rose-500"
                        : ""
                    }
                  />
                </button>
              </div>

              <div className="flex gap-2 mb-4">
                <span className="bg-secondary bg-opacity-40 text-white text-xs px-2 py-1 rounded-full">
                  {project.difficulty}
                </span>
                <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {project.estimatedTime}
                </span>
              </div>

              <p className="text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Tech Stack:</div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <button
                className="w-full bg-secondary hover:bg-secondary/80 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
                onClick={() => setSelectedProject(project.id)}
              >
                View Details
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectResults;
