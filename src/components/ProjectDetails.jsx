import React, { useState } from "react";
import {
  ArrowLeft,
  Clock,
  Copy,
  Check,
  Star,
  Heart,
  ChevronRight,
  BookOpen,
  ExternalLink,
  Layers,
  Code,
  AlertTriangle,
  GitBranch,
} from "lucide-react";

const ProjectDetails = ({ project, onBack, favorite, handleFavorite }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get color based on difficulty
  const getDifficultyColor = (difficulty) => {
    if (difficulty === "Simple") return "bg-green-600";
    if (difficulty === "Medium") return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="max-w-6xl mx-auto pt-16 pb-12 px-4">
      <button
        className="flex items-center text-gray-400 hover:text-white mb-6"
        onClick={onBack}
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to all projects
      </button>

      {/* Project Header */}
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 mb-6">
        <div className="bg-secondary p-6 relative">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {project.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-purple-200 text-sm">
                <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full">
                  {project.difficulty}
                </span>
                <span className="flex items-center bg-black bg-opacity-30 px-3 py-1 rounded-full">
                  <Clock size={14} className="mr-1" />
                  {project.estimatedTime}
                </span>
                <span className="bg-black bg-opacity-30 px-3 py-1 rounded-full">
                  {project.type}
                </span>
              </div>
            </div>

            <div className="flex mt-4 md:mt-0 gap-2">
              <button
                className="flex items-center text-white px-3 rounded-lg transition-colors text-sm"
                onClick={() => handleFavorite(project.id)}
              >
                <Heart
                  size={16}
                  className={`mr-1 ${
                    favorite.includes(project.id)
                      ? "fill-rose-500 text-rose-500"
                      : ""
                  }`}
                />
                {favorite.includes(project.id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Description and Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-800 pb-2">
              Project Overview
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {project.description}
            </p>

            {project.overview && (
              <p className="text-gray-300 leading-relaxed mt-4">
                {project.overview}
              </p>
            )}

            {/* Employer Appeal (if available) */}
            {project.employerAppeal && (
              <div className="mt-4 bg-opacity-20 border border-secondary p-4 rounded-lg">
                <div className="flex items-start">
                  <Star
                    size={18}
                    className="text-yellow-500 mr-3 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-gray-300">
                    <span className="font-medium text-purple-300">
                      Employer Appeal:
                    </span>{" "}
                    {project.employerAppeal}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-800 pb-2">
              Key Features
            </h2>
            <ul className="space-y-2 text-gray-300">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start bg-gray-800 bg-opacity-20 p-3 rounded-lg"
                >
                  <div className="bg-secondary rounded-full w-6 h-6 flex items-center justify-center text-white text-xs mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-800 pb-2">
              <Layers size={18} className="inline mr-2" />
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {project.techStack.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gray-800 text-gray-300 p-3 rounded-lg text-sm flex items-center justify-center text-center"
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* Display core libraries if available */}
            {project.coreLibraries && project.coreLibraries.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-3">
                  Recommended Libraries
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.coreLibraries.map((lib, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 bg-opacity-30 p-3 rounded-lg"
                    >
                      <h4 className="text-white font-medium">{lib.name}</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        {lib.purpose}
                      </p>
                      {lib.url && (
                        <a
                          href={lib.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 text-sm mt-1 inline-block"
                        >
                          <ExternalLink size={12} className="inline mr-1" />
                          Documentation
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Learning Opportunities */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-800 pb-2">
              <BookOpen size={18} className="inline mr-2" />
              Learning Opportunities
            </h2>
            <ul className="space-y-2 text-gray-300">
              {project.learningOpportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight
                    size={18}
                    className="mr-2 text-purple-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-800 pb-2">
                <AlertTriangle size={18} className="inline mr-2" />
                Potential Challenges
              </h2>
              <ul className="space-y-2 text-gray-300">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight
                      size={18}
                      className="mr-2 text-purple-400 flex-shrink-0 mt-0.5"
                    />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Implementation Steps */}
          {project.implementationSteps &&
            project.implementationSteps.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-800 pb-2">
                  <Code size={18} className="inline mr-2" />
                  Implementation Guide
                </h2>
                <div className="space-y-4">
                  {project.implementationSteps.map((phase, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 bg-opacity-20 rounded-lg overflow-hidden"
                    >
                      <div className="bg-gray-800 p-3">
                        <h3 className="text-white font-medium flex items-center">
                          <div className="bg-secondary rounded-full w-6 h-6 flex items-center justify-center text-white text-xs mr-3">
                            {index + 1}
                          </div>
                          {phase.phase}
                          {phase.estimatedTime && (
                            <span className="ml-2 text-sm text-gray-400 flex items-center">
                              <Clock size={12} className="mr-1" />
                              {phase.estimatedTime}
                            </span>
                          )}
                        </h3>
                      </div>
                      <div className="p-3">
                        <p className="text-gray-300 mb-3">
                          {phase.description}
                        </p>
                        {phase.tasks && (
                          <ul className="space-y-1">
                            {phase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start">
                                <ChevronRight
                                  size={16}
                                  className="mr-2 text-purple-400 flex-shrink-0 mt-0.5"
                                />
                                <span className="text-gray-300">{task}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* GitHub Structure */}
          {project.githubStructure && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-800 pb-2">
                <GitBranch size={18} className="inline mr-2" />
                GitHub Structure
              </h2>
              <div className="bg-gray-800 bg-opacity-30 p-4 rounded-lg">
                <pre className="text-gray-300 whitespace-pre-line font-mono text-sm overflow-x-auto">
                  {project.githubStructure}
                </pre>
              </div>
            </div>
          )}

          {/* Resources */}
          {project.resources && project.resources.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-800 pb-2">
                <ExternalLink size={18} className="inline mr-2" />
                Helpful Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors group"
                  >
                    <h3 className="text-secondary group-hover:text-purple-300 font-medium mb-1">
                      {resource.title}
                    </h3>
                    {resource.type && (
                      <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded mb-2">
                        {resource.type}
                      </span>
                    )}
                    <p className="text-gray-400 text-sm">
                      {resource.description ||
                        "Useful resource for this project"}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8 border-t border-gray-800 pt-6">
            <button
              className="flex items-center bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() =>
                handleCopy(
                  `Project: ${project.title}\nDifficulty: ${
                    project.difficulty
                  }\nTime: ${project.estimatedTime}\nDescription: ${
                    project.description
                  }\nTech Stack: ${project.techStack.join(
                    ", "
                  )}\nFeatures:\n${project.features
                    .map((f) => `- ${f}`)
                    .join("\n")}`
                )
              }
            >
              {copied ? (
                <Check size={18} className="mr-2" />
              ) : (
                <Copy size={18} className="mr-2" />
              )}
              {copied ? "Copied!" : "Copy Details"}
            </button>

            <button
              className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => handleFavorite(project.id)}
            >
              <Heart
                size={18}
                className={`mr-2 ${
                  favorite.includes(project.id)
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
              />
              {favorite.includes(project.id) ? "Favorited" : "Favorite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
