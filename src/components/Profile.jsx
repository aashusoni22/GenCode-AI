import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { signOut } from "../lib/appwrite";
import {
  User,
  Code,
  Briefcase,
  Clock,
  CheckCircle,
  Edit,
  Save,
  LogOut,
  X,
  Award,
  Heart,
  FileText,
  Eye,
} from "lucide-react";

const Profile = () => {
  const { user, setUser, setIsLoggedIn, loading } = useAuthContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [userStats, setUserStats] = useState({
    projectsGenerated: 12,
    projectsCompleted: 3,
    favoriteSkill: "React",
    daysActive: 45,
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    level: "",
    github: "",
    portfolio: "",
  });

  useEffect(() => {
    if (user && !loading) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        level: user.developer_level || "",
        github: user.github || "",
        portfolio: user.portfolio || "",
      });

      // Placeholder for fetching favorite projects
      setFavoriteProjects([
        {
          id: 1,
          title: "Interactive Dashboard",
          description:
            "Build a responsive dashboard that displays real-time data visualizations with filtering options.",
          techStack: ["React", "Chart.js", "Tailwind CSS"],
        },
        {
          id: 2,
          title: "E-commerce Product Page",
          description:
            "Create a fully responsive product detail page with image gallery, product variations, and reviews.",
          techStack: ["React", "Next.js", "SASS"],
        },
        {
          id: 3,
          title: "Task Management App",
          description:
            "Develop a task management application with drag-and-drop boards, task assignment, and due dates.",
          techStack: ["React", "React DnD", "Firebase"],
        },
      ]);
    }
  }, [user, loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    // Here you would update the user profile in your database
    // using your API service (appwrite or custom endpoint)

    // Placeholder for updating user data
    console.log("Saving profile:", formData);

    // After successful save
    setIsEditing(false);
    // Update user context if needed
    // setUser({...user, ...formData});
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const removeFavoriteProject = (id) => {
    // Here you would also remove from your database
    setFavoriteProjects(
      favoriteProjects.filter((project) => project.id !== id)
    );
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return "text-emerald-400";
      case "intermediate":
        return "text-sky-400";
      case "advanced":
        return "text-purple-400";
      case "expert":
        return "text-rose-400";
      default:
        return "text-gray-400";
    }
  };

  const getLevelLabel = (level) => {
    switch (level) {
      case "beginner":
        return "Beginner";
      case "intermediate":
        return "Intermediate";
      case "advanced":
        return "Advanced";
      case "expert":
        return "Expert";
      default:
        return "Not Specified";
    }
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white">
          <div className="animate-spin h-10 w-10 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-primary pb-20 pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-primary rounded-xl overflow-hidden shadow-xl mb-8">
          <div className="bg-gradient-to-r from-secondary/70 to-secondary h-32 relative">
            {/* Edit Profile Button */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
              >
                <Edit size={18} />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
              >
                <X size={18} />
              </button>
            )}

            {/* Profile Avatar */}
            <div className="absolute -bottom-12 left-8">
              <div className="h-24 w-24 rounded-full bg-gray-800 border-4 border-primary flex items-center justify-center text-purple-400">
                <User size={40} />
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <h1 className="text-3xl font-bold text-white">
              {formData.username || "User Name"}
            </h1>
            <div className="flex items-center mt-1">
              <span className={`font-medium ${getLevelColor(formData.level)}`}>
                {getLevelLabel(formData.level)} Developer
              </span>
              <span className="mx-2 text-gray-600">•</span>
              <span className="text-gray-400">
                {formData.email || "email@example.com"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-primary rounded-xl shadow-lg p-6 mb-6">
              {isEditing ? (
                <form onSubmit={handleSaveProfile}>
                  <h2 className="text-xl font-bold text-white mb-6">
                    Edit Profile
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-400 mb-1"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-400 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-400 mb-1"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="level"
                        className="block text-sm font-medium text-gray-400 mb-1"
                      >
                        Developer Level
                      </label>
                      <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select level</option>
                        <option value="beginner">Beginner (0-1 years)</option>
                        <option value="intermediate">
                          Intermediate (1-3 years)
                        </option>
                        <option value="advanced">Advanced (3+ years)</option>
                        <option value="expert">Expert (5+ years)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="github"
                        className="block text-sm font-medium text-gray-400 mb-1"
                      >
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="portfolio"
                        className="block text-sm font-medium text-gray-400 mb-1"
                      >
                        Portfolio URL
                      </label>
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-4 w-full bg-secondary hover:bg-secondary/80 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-white mb-6">
                    Profile Info
                  </h2>

                  {formData.bio && (
                    <div className="mb-6">
                      <p className="text-gray-300 leading-relaxed">
                        {formData.bio}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <Code
                        size={18}
                        className="mr-3 text-purple-400 flex-shrink-0"
                      />
                      <span className="text-gray-400 mr-2">
                        Developer Level:
                      </span>
                      <span className={getLevelColor(formData.level)}>
                        {getLevelLabel(formData.level)}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <Clock
                        size={18}
                        className="mr-3 text-purple-400 flex-shrink-0"
                      />
                      <span className="text-gray-400 mr-2">Days Active:</span>
                      <span>{userStats.daysActive}</span>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <Briefcase
                        size={18}
                        className="mr-3 text-purple-400 flex-shrink-0"
                      />
                      <span className="text-gray-400 mr-2">
                        Projects Generated:
                      </span>
                      <span>{userStats.projectsGenerated}</span>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <CheckCircle
                        size={18}
                        className="mr-3 text-purple-400 flex-shrink-0"
                      />
                      <span className="text-gray-400 mr-2">
                        Projects Completed:
                      </span>
                      <span>{userStats.projectsCompleted}</span>
                    </div>

                    {formData.github && (
                      <a
                        href={formData.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        <svg
                          className="h-5 w-5 mr-3 text-purple-400 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.279 9.521 21.016C9.521 20.78 9.513 20.101 9.508 19.258C6.726 19.858 6.139 17.92 6.139 17.92C5.684 16.759 5.029 16.457 5.029 16.457C4.121 15.814 5.098 15.827 5.098 15.827C6.102 15.899 6.629 16.875 6.629 16.875C7.521 18.413 8.97 17.968 9.539 17.717C9.631 17.09 9.889 16.647 10.175 16.419C7.955 16.187 5.62 15.375 5.62 11.611C5.62 10.519 6.01 9.63 6.649 8.937C6.546 8.687 6.203 7.759 6.747 6.324C6.747 6.324 7.587 6.058 9.497 7.411C10.292 7.191 11.15 7.082 12 7.077C12.85 7.082 13.707 7.191 14.505 7.411C16.413 6.058 17.251 6.324 17.251 6.324C17.797 7.759 17.453 8.687 17.351 8.937C17.991 9.63 18.379 10.519 18.379 11.611C18.379 15.385 16.04 16.183 13.813 16.411C14.172 16.693 14.496 17.254 14.496 18.104C14.496 19.31 14.483 20.687 14.483 21.016C14.483 21.282 14.663 21.587 15.174 21.486C19.137 20.16 22 16.415 22 12C22 6.477 17.523 2 12 2Z" />
                        </svg>
                        <span>GitHub Profile</span>
                      </a>
                    )}

                    {formData.portfolio && (
                      <a
                        href={formData.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        <FileText
                          size={18}
                          className="mr-3 text-purple-400 flex-shrink-0"
                        />
                        <span>Portfolio Website</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-8 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-primary rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Skills</h2>
                {!isEditing && (
                  <button
                    onClick={() => navigate("/generate")}
                    className="text-sm text-secondary hover:text-secondary/80 transition-colors"
                  >
                    Add more
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="bg-secondary bg-opacity-40 text-white px-3 py-1 rounded-full text-sm">
                  React
                </span>
                <span className="bg-secondary bg-opacity-40 text-white px-3 py-1 rounded-full text-sm">
                  JavaScript
                </span>
                <span className="bg-secondary bg-opacity-40 text-white px-3 py-1 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="bg-secondary bg-opacity-40 text-white px-3 py-1 rounded-full text-sm">
                  Tailwind CSS
                </span>
                <span className="bg-secondary bg-opacity-40 text-white px-3 py-1 rounded-full text-sm">
                  Next.js
                </span>
                <span className="bg-secondary bg-opacity-40 text-white px-3 py-1 rounded-full text-sm">
                  Node.js
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Saved Projects & Stats */}
          <div className="lg:col-span-2">
            <div className="bg-primary rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Saved Projects</h2>
                <button
                  onClick={() => navigate("/generate")}
                  className="text-sm bg-secondary hover:bg-secondary/80 text-white px-3 py-1 rounded-lg transition-colors"
                >
                  Generate New
                </button>
              </div>

              {favoriteProjects.length > 0 ? (
                <div className="space-y-4">
                  {favoriteProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white">
                          {project.title}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            className="text-gray-400 hover:text-purple-400 transition-colors"
                            title="View Project Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            className="text-gray-400 hover:text-red-400 transition-colors"
                            title="Remove from Favorites"
                            onClick={() => removeFavoriteProject(project.id)}
                          >
                            <Heart
                              size={18}
                              className="fill-red-500 text-red-500"
                            />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mt-2 mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Heart size={40} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400 mb-2">No saved projects yet</p>
                  <p className="text-gray-500 text-sm">
                    Generate some projects and save your favorites!
                  </p>
                </div>
              )}
            </div>

            {/* Achievement Stats */}
            <div className="bg-primary rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Achievements
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-center">
                  <div className="h-12 w-12 rounded-full bg-secondary bg-opacity-40 flex items-center justify-center mr-4">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">First Steps</h3>
                    <p className="text-gray-400 text-sm">
                      Generated your first project
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-center">
                  <div className="h-12 w-12 rounded-full bg-secondary bg-opacity-40 flex items-center justify-center mr-4">
                    <Code size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Code Master</h3>
                    <p className="text-gray-400 text-sm">
                      Completed 3+ projects
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-center opacity-50">
                  <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                    <Briefcase size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Portfolio Builder</h3>
                    <p className="text-gray-400 text-sm">
                      Complete 10+ projects
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-center opacity-50">
                  <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                    <CheckCircle size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Dedication</h3>
                    <p className="text-gray-400 text-sm">
                      Active for 100+ days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
