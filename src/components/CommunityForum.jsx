import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  ChevronRight,
  PlusCircle,
  User,
  ThumbsUp,
  MessageCircle,
  Clock,
  X,
  ArrowLeft,
  ArrowUp,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

const CommunityForum = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
  });

  // Sample categories
  const categories = [
    { id: "all", name: "All Posts" },
    { id: "general", name: "General Discussion" },
    { id: "projects", name: "Project Showcase" },
    { id: "questions", name: "Questions" },
    { id: "jobs", name: "Job Opportunities" },
    { id: "feedback", name: "Portfolio Feedback" },
  ];

  // Sample forum posts
  const forumPosts = [
    {
      id: 1,
      title: "How did you structure your e-commerce portfolio project?",
      author: "DevHopeful",
      category: "questions",
      content:
        "I'm working on an e-commerce project for my portfolio and I'm having trouble deciding how to structure it. Did you use context API or Redux for state management? Any tips on organizing the components?",
      date: "2 hours ago",
      likes: 24,
      comments: 15,
      featured: false,
      solved: false,
    },
    {
      id: 2,
      title: "Showcase: My dashboard project using React and D3",
      author: "DataVizDev",
      category: "projects",
      content:
        "I just finished my analytics dashboard project using React, D3, and Firebase. It includes real-time data updates, customizable widgets, and responsive design. I'd love to get some feedback on the UI and code structure!",
      date: "1 day ago",
      likes: 56,
      comments: 32,
      featured: true,
      solved: false,
    },
    {
      id: 3,
      title: "Anyone else having trouble with firebase authentication?",
      author: "FirebaseNewbie",
      category: "questions",
      content:
        "I'm trying to implement email/password and Google authentication with Firebase in my React app, but I keep getting errors. Has anyone else experienced this? Any solutions?",
      date: "3 days ago",
      likes: 18,
      comments: 24,
      featured: false,
      solved: true,
    },
    {
      id: 4,
      title: "Junior React Developer position at TechStartup (Remote)",
      author: "TechRecruiter",
      category: "jobs",
      content:
        "We're looking for a junior React developer to join our team. This is a remote position with flexible hours. Requirements: 1+ year of React experience, knowledge of modern JavaScript, and experience with RESTful APIs. Portfolio projects that demonstrate these skills are a plus!",
      date: "1 week ago",
      likes: 92,
      comments: 41,
      featured: true,
      solved: false,
    },
    {
      id: 5,
      title: "How I landed my first dev job with 3 portfolio projects",
      author: "SuccessStory",
      category: "general",
      content:
        "After 6 months of learning and building, I've just accepted my first job offer as a frontend developer! I want to share my journey and what worked for me. I'll break down the 3 projects that got me noticed and the interview process.",
      date: "2 weeks ago",
      likes: 215,
      comments: 63,
      featured: true,
      solved: false,
    },
    {
      id: 6,
      title: "Can someone review my portfolio website?",
      author: "FeedbackPlease",
      category: "feedback",
      content:
        "I've just finished my portfolio website and would love some constructive feedback before I start applying for jobs. I'm particularly concerned about the mobile responsiveness and project descriptions. Any tips would be appreciated!",
      date: "4 days ago",
      likes: 12,
      comments: 28,
      featured: false,
      solved: false,
    },
    {
      id: 7,
      title: "Best resources for learning TypeScript?",
      author: "JStoTS",
      category: "questions",
      content:
        "I've been working with JavaScript for a while now, and want to level up by learning TypeScript. What resources (courses, books, videos) would you recommend for someone with intermediate JS knowledge?",
      date: "1 week ago",
      likes: 31,
      comments: 42,
      featured: false,
      solved: false,
    },
    {
      id: 8,
      title: "Created a full-stack social media app with MERN stack",
      author: "MERNmaster",
      category: "projects",
      content:
        "Just finished building a full-stack social media application using MongoDB, Express, React, and Node.js. It features real-time messaging, image uploads, authentication, and more. Check it out and let me know what you think!",
      date: "3 days ago",
      likes: 47,
      comments: 18,
      featured: false,
      solved: false,
    },
  ];

  // Sample comments for a post
  const sampleComments = [
    {
      id: 1,
      author: "ReactExpert",
      content:
        "I've found that using Redux for large e-commerce projects works really well, especially when you have complex state that needs to be accessed by many components. For smaller projects, Context API is sufficient.",
      date: "2 hours ago",
      likes: 8,
    },
    {
      id: 2,
      author: "ShopifyDev",
      content:
        "Consider breaking down your components by feature rather than by page. For example, have a ProductCard component that can be reused in different contexts, like product listings and related items.",
      date: "1 hour ago",
      likes: 5,
    },
    {
      id: 3,
      author: "StateManager",
      content:
        "If you're using React Router, you might want to consider organizing your code by routes/pages first, then by features within each route. As for state management, I'd recommend starting with Context and hooks, then evaluate if you need Redux based on your app's complexity.",
      date: "45 minutes ago",
      likes: 12,
      isSolution: true,
    },
  ];

  // Filter posts based on category and search query
  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData);
    // Reset form and close it
    setFormData({
      title: "",
      content: "",
      category: "general",
    });
    setShowNewPostForm(false);
  };

  // If a post is selected, show its details and comments
  if (selectedPost) {
    const post = forumPosts.find((p) => p.id === selectedPost);

    return (
      <div className="bg-black min-h-screen font-primary">
        <div className="max-w-5xl mx-auto pt-28 pb-20 px-4">
          {/* Back button */}
          <button
            className="flex items-center text-gray-400 hover:text-white mb-6"
            onClick={() => setSelectedPost(null)}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to forum
          </button>

          {/* Post details */}
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.category === "questions"
                      ? "bg-blue-900 text-blue-300"
                      : post.category === "projects"
                      ? "bg-green-900 text-green-300"
                      : post.category === "jobs"
                      ? "bg-purple-900 text-purple-300"
                      : post.category === "feedback"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-gray-800 text-gray-300"
                  }`}
                >
                  {categories.find((c) => c.id === post.category)?.name}
                </span>
                {post.solved && (
                  <span className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-xs font-medium flex items-center">
                    <Award size={12} className="mr-1" />
                    Solved
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-white mb-2">
                {post.title}
              </h1>

              <div className="flex items-center text-gray-400 mb-6">
                <div className="flex items-center mr-4">
                  <User size={14} className="mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{post.date}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              <div className="flex items-center">
                <button className="flex items-center text-gray-400 hover:text-purple-400 mr-4">
                  <ThumbsUp size={16} className="mr-1" />
                  {post.likes}
                </button>
                <div className="flex items-center text-gray-400">
                  <MessageCircle size={16} className="mr-1" />
                  {post.comments} comments
                </div>
              </div>
            </div>
          </div>

          {/* Comments section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Comments</h2>

            <div className="space-y-4">
              {sampleComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`bg-gray-800 rounded-xl p-4 border ${
                    comment.isSolution ? "border-green-500" : "border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <User size={14} className="text-gray-400 mr-1" />
                      <span className="text-gray-300 font-medium">
                        {comment.author}
                      </span>
                      {comment.isSolution && (
                        <span className="ml-2 px-2 py-0.5 bg-green-900 text-green-300 rounded-full text-xs font-medium flex items-center">
                          <Award size={10} className="mr-1" />
                          Solution
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500 text-xs">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{comment.content}</p>
                  <div className="flex items-center">
                    <button className="flex items-center text-gray-500 hover:text-purple-400">
                      <ThumbsUp size={14} className="mr-1" />
                      {comment.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add comment form */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Add a Reply</h3>
            <form>
              <textarea
                rows="4"
                placeholder="Share your thoughts or answer the question..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ></textarea>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-primary">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto pt-28 pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Developer <span className="text-purple-500">Community</span>
        </h1>
        <p className="mt-4 text-gray-400 text-center max-w-2xl mx-auto text-lg">
          Connect with other developers, share your projects, and get help with
          your coding challenges
        </p>
      </section>

      {/* Forum Actions */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-2xl">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search forum discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

          {/* New Post Button */}
          <button
            onClick={() => setShowNewPostForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
          >
            <PlusCircle size={18} className="mr-2" />
            New Post
          </button>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex overflow-x-auto hide-scrollbar py-2 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* New Post Form Modal */}
      {showNewPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Create New Post</h2>
              <button
                onClick={() => setShowNewPostForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories
                    .filter((c) => c.id !== "all")
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="What's your post about?"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-1">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Share your thoughts, questions, or project details..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewPostForm(false)}
                  className="mr-2 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Featured Posts */}
      {activeCategory === "all" && !searchQuery && (
        <section className="max-w-5xl mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-2 text-yellow-500" size={20} />
            Featured Discussions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forumPosts
              .filter((post) => post.featured)
              .map((post) => (
                <div
                  key={post.id}
                  className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-purple-800 transition-all cursor-pointer"
                  onClick={() => setSelectedPost(post.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.category === "questions"
                            ? "bg-blue-900 text-blue-300"
                            : post.category === "projects"
                            ? "bg-green-900 text-green-300"
                            : post.category === "jobs"
                            ? "bg-purple-900 text-purple-300"
                            : post.category === "feedback"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        {categories.find((c) => c.id === post.category)?.name}
                      </span>
                      {post.solved && (
                        <span className="ml-2 px-3 py-1 bg-green-900 text-green-300 rounded-full text-xs font-medium flex items-center">
                          <Award size={12} className="mr-1" />
                          Solved
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {post.title}
                    </h3>

                    <div className="flex items-center text-gray-400 mb-4">
                      <div className="flex items-center mr-4">
                        <User size={14} className="mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center text-gray-400 mr-4">
                          <ThumbsUp size={14} className="mr-1" />
                          {post.likes}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MessageCircle size={14} className="mr-1" />
                          {post.comments}
                        </div>
                      </div>
                      <span className="text-purple-400 flex items-center text-sm">
                        Read more
                        <ChevronRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-white mb-6">
          {activeCategory === "all"
            ? "Recent Discussions"
            : categories.find((c) => c.id === activeCategory)?.name}
        </h2>

        {filteredPosts.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
            <p className="text-gray-400 text-lg mb-4">
              No posts found matching your criteria.
            </p>
            <button
              className="text-purple-500 hover:text-purple-400"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-600 transition-all cursor-pointer"
                onClick={() => setSelectedPost(post.id)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.category === "questions"
                            ? "bg-blue-900 text-blue-300"
                            : post.category === "projects"
                            ? "bg-green-900 text-green-300"
                            : post.category === "jobs"
                            ? "bg-purple-900 text-purple-300"
                            : post.category === "feedback"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        {categories.find((c) => c.id === post.category)?.name}
                      </span>
                      {post.solved && (
                        <span className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-xs font-medium flex items-center">
                          <Award size={12} className="mr-1" />
                          Solved
                        </span>
                      )}
                      {post.featured && (
                        <span className="px-3 py-1 bg-yellow-900 text-yellow-300 rounded-full text-xs font-medium flex items-center">
                          <Award size={12} className="mr-1" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {post.title}
                    </h3>

                    <div className="flex items-center text-gray-400 mb-3">
                      <div className="flex items-center mr-4">
                        <User size={14} className="mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 line-clamp-2 md:hidden">
                      {post.content}
                    </p>

                    <div className="flex items-center">
                      <div className="flex items-center text-gray-400 mr-4">
                        <ThumbsUp size={14} className="mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <MessageCircle size={14} className="mr-1" />
                        {post.comments}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-4 md:self-center">
                    <span className="text-purple-400 flex items-center text-sm">
                      Read more
                      <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CommunityForum;
