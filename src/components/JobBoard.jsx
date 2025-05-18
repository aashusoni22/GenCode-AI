import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Filter,
  X,
  ExternalLink,
  Building,
  Code,
  Loader,
  AlertCircle,
} from "lucide-react";
import { fetchJobListings } from "../lib/jobAPI";

const JobBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Canada");
  const [filters, setFilters] = useState({
    jobType: "all",
    experienceLevel: "all",
    remote: false,
    saved: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Job types for filtering
  const jobTypes = [
    { id: "all", name: "All Types" },
    { id: "fulltime", name: "Full-Time" },
    { id: "parttime", name: "Part-Time" },
    { id: "contract", name: "Contract" },
    { id: "internship", name: "Internship" },
  ];

  // Experience levels for filtering
  const experienceLevels = [
    { id: "all", name: "All Levels" },
    { id: "entry", name: "Entry Level" },
    { id: "junior", name: "Junior (1-3 years)" },
    { id: "mid", name: "Mid-Level (3-5 years)" },
    { id: "senior", name: "Senior (5+ years)" },
  ];

  // Load jobs from API on initial load
  useEffect(() => {
    loadJobs();

    // Load saved jobs from localStorage
    const savedJobsFromStorage = localStorage.getItem("savedJobs");
    if (savedJobsFromStorage) {
      setSavedJobs(JSON.parse(savedJobsFromStorage));
    }
  }, []);

  // Save jobs to localStorage when they change
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  const loadJobs = async (query = "Frontend Developer") => {
    setIsLoading(true);
    setError(null);

    try {
      const jobs = await fetchJobListings(
        query || "Frontend Developer",
        location,
        filters.remote
      );
      setJobListings(jobs);
      setInitialLoad(false);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setError("Failed to load job listings. Please try again later.");

      // Fall back to demo data if we're in development
      if (process.env.NODE_ENV === "development") {
        setJobListings([
          {
            id: "demo-1",
            title: "Frontend React Developer",
            company: "TechCorp Solutions",
            location: "San Francisco, CA",
            type: "fulltime",
            experienceLevel: "junior",
            salary: "$80,000 - $100,000",
            postedDate: "2 days ago",
            description:
              "We're looking for a talented Frontend Developer with React experience to join our growing team. You'll be working on building user interfaces for our flagship product.",
            requirements: [
              "1-3 years of experience with React",
              "Strong JavaScript skills",
              "Experience with modern frontend tooling",
              "Understanding of responsive design",
              "Familiarity with RESTful APIs",
            ],
            remote: true,
            applyUrl: "https://example.com/apply/1",
            logo: "/api/placeholder/100/100",
          },
          // Add more demo jobs as needed
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Search for jobs when query or filters change
  const handleSearch = () => {
    loadJobs(searchQuery);
  };

  // Toggle job saved status
  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      jobType: "all",
      experienceLevel: "all",
      remote: false,
      saved: false,
    });
    setSearchQuery("");
    setLocation("Canada");
    loadJobs("Frontend Developer");
  };

  // Filter jobs based on current filters
  const filteredJobs = jobListings.filter((job) => {
    // Match job type filter
    const matchesJobType =
      filters.jobType === "all" || job.type === filters.jobType;

    // Match experience level filter
    const matchesExperience =
      filters.experienceLevel === "all" ||
      job.experienceLevel === filters.experienceLevel;

    // Match saved filter
    const matchesSaved = !filters.saved || savedJobs.includes(job.id);

    return matchesJobType && matchesExperience && matchesSaved;
  });

  return (
    <div className="bg-black min-h-screen font-primary">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto pt-28 pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Developer <span className="text-secondary">Jobs</span>
        </h1>
        <p className="mt-4 text-gray-400 text-center max-w-2xl mx-auto text-lg">
          Find your next frontend or full-stack developer role to showcase your
          portfolio projects
        </p>
      </section>

      {/* Search and Filters Section */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search for jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="relative flex-grow md:flex-grow-0 md:w-1/3">
              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Location (city, state, country)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-secondary hover:bg-secondary/80 text-white px-6 py-2 rounded-lg flex items-center justify-center transition-colors md:w-auto"
            >
              Search Jobs
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors md:w-auto"
            >
              <Filter size={18} className="mr-2" />
              {showFilters ? "Hide Filters" : "Filters"}
            </button>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="bg-gray-800 p-4 rounded-lg mb-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Job Type Filter */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) =>
                      handleFilterChange("jobType", e.target.value)
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  >
                    {jobTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Level Filter */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Experience Level
                  </label>
                  <select
                    value={filters.experienceLevel}
                    onChange={(e) =>
                      handleFilterChange("experienceLevel", e.target.value)
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  >
                    {experienceLevels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remote Filter */}
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.remote}
                      onChange={(e) =>
                        handleFilterChange("remote", e.target.checked)
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-6 ${
                        filters.remote ? "bg-secondary" : "bg-gray-700"
                      } rounded-full flex items-center transition-colors p-1`}
                    >
                      <div
                        className={`bg-white rounded-full w-4 h-4 shadow transform transition-transform ${
                          filters.remote ? "translate-x-4" : ""
                        }`}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-300 text-sm">
                      Remote Only
                    </span>
                  </label>
                </div>

                {/* Saved Jobs Filter */}
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.saved}
                      onChange={(e) =>
                        handleFilterChange("saved", e.target.checked)
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-6 ${
                        filters.saved ? "bg-secondary" : "bg-gray-700"
                      } rounded-full flex items-center transition-colors p-1`}
                    >
                      <div
                        className={`bg-white rounded-full w-4 h-4 shadow transform transition-transform ${
                          filters.saved ? "translate-x-4" : ""
                        }`}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-300 text-sm">
                      Saved Jobs
                    </span>
                  </label>
                </div>
              </div>

              {/* Reset Filters Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                >
                  <X size={14} className="mr-1" />
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          {/* Current filter indicators */}
          <div className="flex flex-wrap gap-2">
            {filters.jobType !== "all" && (
              <div className="bg-gray-800 px-3 py-1 rounded-full text-sm text-white flex items-center">
                {jobTypes.find((type) => type.id === filters.jobType)?.name}
                <button
                  onClick={() => handleFilterChange("jobType", "all")}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {filters.experienceLevel !== "all" && (
              <div className="bg-gray-800 px-3 py-1 rounded-full text-sm text-white flex items-center">
                {
                  experienceLevels.find(
                    (level) => level.id === filters.experienceLevel
                  )?.name
                }
                <button
                  onClick={() => handleFilterChange("experienceLevel", "all")}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {filters.remote && (
              <div className="bg-gray-800 px-3 py-1 rounded-full text-sm text-white flex items-center">
                Remote Only
                <button
                  onClick={() => handleFilterChange("remote", false)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {filters.saved && (
              <div className="bg-gray-800 px-3 py-1 rounded-full text-sm text-white flex items-center">
                Saved Jobs
                <button
                  onClick={() => handleFilterChange("saved", false)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {location !== "Canada" && !initialLoad && (
              <div className="bg-gray-800 px-3 py-1 rounded-full text-sm text-white flex items-center">
                Location: {location}
                <button
                  onClick={() => {
                    setLocation("Canada");
                    handleSearch();
                  }}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isLoading
              ? "Loading Jobs..."
              : `${filteredJobs.length} Job${
                  filteredJobs.length === 1 ? "" : "s"
                } Found`}
          </h2>
          <div className="text-gray-400 text-sm">Results updated daily</div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
            <div className="flex flex-col items-center justify-center">
              <Loader size={36} className="text-secondary animate-spin mb-4" />
              <p className="text-gray-300">Searching for developer jobs...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
            <div className="flex flex-col items-center justify-center">
              <AlertCircle size={36} className="text-red-500 mb-4" />
              <p className="text-gray-300 mb-4">{error}</p>
              <button
                onClick={() => loadJobs()}
                className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* No results state */}
        {!isLoading && !error && filteredJobs.length === 0 && (
          <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
            <p className="text-gray-400 text-lg mb-4">
              No jobs found matching your criteria.
            </p>
            <button
              className="text-secondary hover:text-purple-400"
              onClick={resetFilters}
            >
              Reset filters and try again
            </button>
          </div>
        )}

        {/* Results list */}
        {!isLoading && !error && filteredJobs.length > 0 && (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-secondary transition-all group"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl font-bold text-white mb-1 md:mb-0">
                          {job.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSaveJob(job.id);
                          }}
                          className="self-start md:self-center text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <Bookmark
                            size={20}
                            className={
                              savedJobs.includes(job.id)
                                ? "text-secondary fill-secondary"
                                : ""
                            }
                          />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-3 text-gray-400 text-sm">
                        <div className="flex items-center">
                          <Building size={16} className="mr-1" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span>{job.postedDate}</span>
                        </div>
                        {job.remote && (
                          <span className="bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full text-xs">
                            Remote
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            job.type === "fulltime"
                              ? "bg-blue-900 text-blue-300"
                              : job.type === "parttime"
                              ? "bg-green-900 text-green-300"
                              : job.type === "contract"
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-pink-900 text-pink-300"
                          }`}
                        >
                          {jobTypes.find((type) => type.id === job.type)
                            ?.name || job.type}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            job.experienceLevel === "entry"
                              ? "bg-green-900 text-green-300"
                              : job.experienceLevel === "junior"
                              ? "bg-blue-900 text-blue-300"
                              : job.experienceLevel === "mid"
                              ? "bg-purple-900 text-purple-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {experienceLevels.find(
                            (level) => level.id === job.experienceLevel
                          )?.name || "Experience not specified"}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-300 mb-4">
                        <DollarSign size={16} className="mr-1 text-green-400" />
                        <span>{job.salary}</span>
                      </div>

                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {job.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">
                          Requirements:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {job.requirements.map((req, index) => (
                            <li
                              key={index}
                              className="flex items-start text-gray-300 text-sm"
                            >
                              <Code
                                size={14}
                                className="mr-2 text-purple-400 mt-1 flex-shrink-0"
                              />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-secondary hover:bg-secondary/80 text-white px-6 py-2 rounded-lg flex items-center justify-center transition-colors"
                        >
                          Apply Now
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(
                            job.company
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-gray-700 text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-lg flex items-center justify-center transition-colors"
                        >
                          Research Company
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Job Source Information */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">
            Where We Source Jobs From
          </h2>
          <p className="text-gray-300 mb-4">
            Our job listings are collected from multiple sources to give you the
            best opportunities for your skill set. Jobs are updated daily to
            ensure you have access to the latest openings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">
                Industry Job Boards
              </h3>
              <p className="text-gray-400 mb-3 text-sm">
                We partner with top tech job boards to bring you quality
                listings:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• LinkedIn Jobs</li>
                <li>• Indeed</li>
                <li>• AngelList</li>
                <li>• Stack Overflow Jobs</li>
                <li>• We Work Remotely</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">
                Direct Company Postings
              </h3>
              <p className="text-gray-400 mb-3 text-sm">
                We work directly with companies looking to hire junior
                developers:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Startups seeking talent</li>
                <li>• Tech companies with DEI initiatives</li>
                <li>• Companies with graduate programs</li>
                <li>• Agencies building bench strength</li>
                <li>• Remote-first organizations</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">
                Community Sourced
              </h3>
              <p className="text-gray-400 mb-3 text-sm">
                Our community helps surface opportunities:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• User referrals</li>
                <li>• Tech Discord communities</li>
                <li>• Reddit (r/forhire, r/remotejs, etc.)</li>
                <li>• Twitter #DevJobs hashtag</li>
                <li>• Tech meetup announcements</li>
              </ul>
            </div>
          </div>
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default JobBoard;
