import React, { useState } from "react";
import {
  BookOpen,
  Code,
  Globe,
  Search,
  X,
  ExternalLink,
  ThumbsUp,
} from "lucide-react";
import {
  figma,
  github,
  freecode,
  stack,
  node,
  odin,
  tailwind,
  tricks,
  mentor,
  mdn,
  firebase,
  react,
} from "../assets";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedResources, setSavedResources] = useState([]);

  const categories = [
    { id: "all", name: "All Resources", icon: <BookOpen size={18} /> },
    { id: "frontend", name: "Frontend", icon: <Code size={18} /> },
    { id: "backend", name: "Backend", icon: <Globe size={18} /> },
    { id: "design", name: "Design", icon: <BookOpen size={18} /> },
    { id: "tools", name: "Tools", icon: <BookOpen size={18} /> },
    { id: "learning", name: "Learning", icon: <BookOpen size={18} /> },
  ];

  const resourcesList = [
    {
      id: 1,
      title: "Frontend Mentor",
      description:
        "Improve your front-end coding skills by building real projects",
      url: "https://www.frontendmentor.io/",
      image: mentor,
      categories: ["frontend", "design"],
      popular: true,
    },
    {
      id: 2,
      title: "MDN Web Docs",
      description: "Resources for developers, by developers",
      url: "https://developer.mozilla.org/",
      image: mdn,
      categories: ["frontend", "backend"],
      popular: true,
    },
    {
      id: 3,
      title: "CSS Tricks",
      description:
        "Daily articles about CSS, HTML, JavaScript, and all things related to web design and development",
      url: "https://css-tricks.com/",
      image: tricks,
      categories: ["frontend", "design"],
      popular: false,
    },
    {
      id: 4,
      title: "GitHub",
      description: "Where the world builds software",
      url: "https://github.com/",
      image: github,
      categories: ["tools"],
      popular: true,
    },
    {
      id: 5,
      title: "freeCodeCamp",
      description: "Learn to code for free",
      url: "https://www.freecodecamp.org/",
      image: freecode,
      categories: ["learning", "frontend", "backend"],
      popular: true,
    },
    {
      id: 6,
      title: "The Odin Project",
      description: "Open source coding curriculum",
      url: "https://www.theodinproject.com/",
      image: odin,
      categories: ["learning"],
      popular: false,
    },
    {
      id: 7,
      title: "Node.js Documentation",
      description: "Official Node.js documentation",
      url: "https://nodejs.org/en/docs/",
      image: node,
      categories: ["backend"],
      popular: false,
    },
    {
      id: 8,
      title: "React Documentation",
      description: "Official React documentation",
      url: "https://reactjs.org/docs/getting-started.html",
      image: react,
      categories: ["frontend"],
      popular: true,
    },
    {
      id: 9,
      title: "Firebase Documentation",
      description: "Documentation for Firebase services",
      url: "https://firebase.google.com/docs",
      image: firebase,
      categories: ["backend", "tools"],
      popular: false,
    },
    {
      id: 10,
      title: "Figma",
      description: "Collaborative interface design tool",
      url: "https://www.figma.com/",
      image: figma,
      categories: ["design", "tools"],
      popular: true,
    },
    {
      id: 11,
      title: "Stack Overflow",
      description: "Where developers learn, share, & build careers",
      url: "https://stackoverflow.com/",
      image: stack,
      categories: ["tools"],
      popular: true,
    },
    {
      id: 12,
      title: "Tailwind CSS",
      description:
        "Rapidly build modern websites without ever leaving your HTML",
      url: "https://tailwindcss.com/",
      image: tailwind,
      categories: ["frontend", "design"],
      popular: true,
    },
  ];

  const toggleSaveResource = (resourceId) => {
    if (savedResources.includes(resourceId)) {
      setSavedResources(savedResources.filter((id) => id !== resourceId));
    } else {
      setSavedResources([...savedResources, resourceId]);
    }
  };

  const filteredResources = resourcesList.filter((resource) => {
    const matchesCategory =
      activeCategory === "all" || resource.categories.includes(activeCategory);
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularResources = resourcesList.filter((resource) => resource.popular);

  return (
    <div className="bg-black min-h-screen font-primary">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto pt-28 pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Developer <span className="text-secondary">Resources</span>
        </h1>
        <p className="mt-4 text-gray-400 text-center max-w-2xl mx-auto text-lg">
          Curated resources to help you build better projects and improve your
          development skills
        </p>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-primary rounded-xl p-6 shadow-lg">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for resources..."
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

          <div className="flex overflow-x-auto hide-scrollbar py-2 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? "bg-secondary text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Resources Section */}
      {activeCategory === "all" && !searchQuery && (
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Popular Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularResources.slice(0, 3).map((resource) => (
              <div
                key={resource.id}
                className="bg-primary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] border border-gray-800"
              >
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {resource.title}
                    </h3>
                    <button
                      className="text-gray-400 hover:text-purple-400"
                      onClick={() => toggleSaveResource(resource.id)}
                    >
                      <ThumbsUp
                        size={20}
                        className={
                          savedResources.includes(resource.id)
                            ? "text-secondary fill-secondary"
                            : ""
                        }
                      />
                    </button>
                  </div>
                  <p className="text-gray-400 mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-secondary hover:text-purple-400"
                  >
                    Visit Resource
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Resources Section */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-white mb-6">
          {activeCategory === "all"
            ? "All Resources"
            : categories.find((c) => c.id === activeCategory)?.name}
        </h2>

        {filteredResources.length === 0 ? (
          <div className="bg-primary rounded-xl p-8 text-center">
            <p className="text-gray-400 text-lg">
              No resources found matching your criteria.
            </p>
            <button
              className="mt-4 text-secondary hover:text-purple-400"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-primary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] border border-gray-800"
              >
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {resource.title}
                    </h3>
                    <button
                      className="text-gray-400 hover:text-purple-400"
                      onClick={() => toggleSaveResource(resource.id)}
                    >
                      <ThumbsUp
                        size={20}
                        className={
                          savedResources.includes(resource.id)
                            ? "text-secondary fill-secondary"
                            : ""
                        }
                      />
                    </button>
                  </div>
                  <p className="text-gray-400 mb-4">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-secondary hover:text-purple-400"
                  >
                    Visit Resource
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CSS for Animations */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Resources;
