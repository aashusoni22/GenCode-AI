import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Rocket, Lightbulb, Code } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section with Animation */}
      <section className="max-w-7xl mx-auto text-white py-20 pt-28 px-6 md:px-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="font-primary animate-fadeIn">
          <span className="inline-block bg-[#3B3363] bg-opacity-30 text-[#8B5CF6] px-4 py-1 rounded-full text-sm font-medium mb-4">
            For Junior Developers
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Find Your Next
            <span className="block text-[#8B5CF6] mt-2">Portfolio Project</span>
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            AI-powered project ideas for frontend developers, personalized to
            your skills, experience, and goals.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/generate"
              className="font-secondary inline-block bg-[#8B5CF6] text-white font-medium py-3 px-8 rounded-lg hover:bg-[#7C3AED] transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/20"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="font-secondary inline-block bg-transparent border border-[#3B3363] text-white font-medium py-3 px-8 rounded-lg hover:bg-[#3B3363] hover:bg-opacity-20 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="bg-primary rounded-lg p-6 md:p-10 shadow-xl shadow-black/20 relative overflow-hidden">
          {/* Animated gradient overlay */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#8B5CF6] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#8B5CF6] opacity-10 rounded-full blur-3xl"></div>

          {/* Code visualization */}
          <div className="space-y-4 relative z-10">
            <div className="bg-[#3B3363] h-6 w-3/5 rounded"></div>
            <div className="bg-[#2A2844] h-6 w-4/5 rounded"></div>
            <div className="bg-[#3B3363] h-6 w-2/4 rounded"></div>
            <div className="bg-[#2A2844] h-6 w-11/12 rounded"></div>
            <div className="bg-[#3B3363] h-6 w-2/3 rounded"></div>
            <div className="mt-8 bg-[#8B5CF6] h-6 w-2/5 rounded opacity-80"></div>
            <div className="bg-[#8B5CF6] h-6 w-3/5 rounded opacity-60"></div>
            <div className="bg-[#8B5CF6] h-6 w-1/2 rounded opacity-80"></div>
          </div>

          {/* Tags */}
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="text-xs bg-[#8B5CF6] bg-opacity-20 text-white px-2 py-1 rounded">
              HTML
            </span>
            <span className="text-xs bg-[#8B5CF6] bg-opacity-20 text-white px-2 py-1 rounded">
              CSS
            </span>
            <span className="text-xs bg-[#8B5CF6] bg-opacity-20 text-white px-2 py-1 rounded">
              React
            </span>
          </div>
        </div>
      </section>

      {/* Featured Projects Banner */}
      <section className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-white font-primary font-medium">
              Popular project categories:
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-[#3B3363] text-gray-300 rounded-full text-sm hover:bg-[#3B3363] cursor-pointer transition-colors">
                E-commerce
              </span>
              <span className="px-4 py-2 bg-[#3B3363] text-gray-300 rounded-full text-sm hover:bg-[#3B3363] cursor-pointer transition-colors">
                Dashboards
              </span>
              <span className="px-4 py-2 bg-[#3B3363] text-gray-300 rounded-full text-sm hover:bg-[#3B3363] cursor-pointer transition-colors">
                API Integration
              </span>
              <span className="px-4 py-2 bg-[#3B3363] text-gray-300 rounded-full text-sm hover:bg-[#3B3363] cursor-pointer transition-colors">
                UI Components
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 md:px-16">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#3B3363] bg-opacity-30 text-[#8B5CF6] px-4 py-1 rounded-full text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl font-primary font-bold text-white">
            How It Works
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Our streamlined process helps you discover the perfect project for
            your portfolio in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 font-secondary">
          {/* Step 1 */}
          <div className="bg-primary p-8 rounded-lg border border-[#3B3363] border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5CF6]/5">
            <div className="bg-[#3B3363] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Rocket className="text-2xl text-[#8B5CF6]" />
            </div>

            <h3 className="text-xl font-primary font-bold mb-4 text-white">
              Select Skills
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Choose your technology stack and experience level to customize
              your project recommendations.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-block bg-[#1f2937] px-2 py-1 rounded text-xs text-gray-400">
                React
              </span>
              <span className="inline-block bg-[#1f2937] px-2 py-1 rounded text-xs text-gray-400">
                Tailwind
              </span>
              <span className="inline-block bg-[#1f2937] px-2 py-1 rounded text-xs text-gray-400">
                TypeScript
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-primary p-8 rounded-lg border border-[#3B3363] border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5CF6]/5">
            <div className="bg-[#3B3363] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Lightbulb className="text-2xl text-[#8B5CF6]" />
            </div>

            <h3 className="text-xl font-primary font-bold mb-4 text-white">
              Generate Ideas
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Our AI analyzes your skills and preferences to create tailored
              project suggestions for your portfolio.
            </p>

            <div className="mt-6 bg-[#1f2937] p-3 rounded text-sm text-gray-400 font-mono">
              Analyzing 100+ project patterns...
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-primary p-8 rounded-lg border border-[#3B3363] border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5CF6]/5">
            <div className="bg-[#3B3363] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Code className="text-2xl text-[#8B5CF6]" />
            </div>

            <h3 className="text-xl font-primary font-bold mb-4 text-white">
              Build & Learn
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Get detailed specifications and guidance to help you build
              impressive portfolio projects.
            </p>

            <div className="mt-6 bg-[#1f2937] h-4 w-full rounded overflow-hidden">
              <div className="bg-[#8B5CF6] h-full w-3/4"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Project completion: 75%
            </p>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 md:px-16 rounded-lg">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#3B3363] bg-opacity-30 text-[#8B5CF6]  px-4 py-1 rounded-full text-sm font-medium mb-4">
            The Data
          </span>
          <h2 className="text-4xl font-primary font-bold text-white">
            Why This Matters
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Building the right projects can dramatically improve your chances of
            landing your dream developer job.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="bg-primary p-8 rounded-lg text-center border border-[#3B3363] border-opacity-20 hover:border-opacity-50 hover:transform hover:-translate-y-1 transition-transform duration-300">
            <p className="text-6xl font-primary font-bold text-[#8B5CF6] mb-4">
              86<span className="text-3xl">%</span>
            </p>
            <h3 className="text-xl font-primary font-bold mb-3 text-white">
              of hiring managers
            </h3>
            <p className="font-secondary text-gray-400">
              consider portfolios more important than resumes for frontend
              roles.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-primary p-8 rounded-lg text-center border border-[#3B3363] border-opacity-20 hover:border-opacity-50 transition-all">
            <p className="text-6xl font-primary font-bold text-[#8B5CF6] mb-4">
              3<span className="text-3xl">x</span>
            </p>
            <h3 className="text-xl font-primary font-bold mb-3 text-white">
              more interview callbacks
            </h3>
            <p className="font-secondary text-gray-400">
              for developers with unique, high-quality portfolio projects.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-primary p-8 rounded-lg text-center border border-[#3B3363] border-opacity-20 hover:border-opacity-50 hover:transform hover:-translate-y-1 transition-transform duration-300">
            <p className="text-6xl font-primary font-bold text-[#8B5CF6] mb-4">
              72<span className="text-3xl">%</span>
            </p>
            <h3 className="text-xl font-primary font-bold mb-3 text-white">
              of junior developers
            </h3>
            <p className="font-secondary text-gray-400">
              struggle to come up with portfolio project ideas that showcase
              their skills.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 md:px-16">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#3B3363] bg-opacity-30 text-[#8B5CF6] px-4 py-1 rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl font-primary font-bold text-white">
            Developer Success Stories
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            See how other developers have leveraged our platform to land their
            dream jobs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-primary p-8 rounded-lg border border-[#3B3363] border-opacity-10 hover:border-opacity-30 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#3B3363] w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-xl">JD</span>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <h3 className="font-bold text-white text-lg mr-2">
                    Jamie D.
                  </h3>
                  <span className="text-white text-sm px-2 py-1 rounded-full bg-[#8B5CF6] bg-opacity-10">
                    Hired
                  </span>
                </div>
                <p className="text-sm text-[#8B5CF6] mb-2">
                  Frontend Developer @ TechCorp
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="font-secondary text-gray-400 text-lg italic">
              "Thanks to DevProject, I built an e-commerce dashboard that
              showcased my React skills. I landed three interviews in my first
              week!"
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-[#1f2937] text-xs px-2 py-1 rounded text-gray-400">
                React
              </span>
              <span className="bg-[#1f2937] text-xs px-2 py-1 rounded text-gray-400">
                Redux
              </span>
              <span className="bg-[#1f2937] text-xs px-2 py-1 rounded text-gray-400">
                Tailwind
              </span>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-primary p-8 rounded-lg border border-[#3B3363] border-opacity-10 hover:border-opacity-30 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#3B3363] w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-xl">ML</span>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <h3 className="font-bold text-white text-lg mr-2">
                    Maria L.
                  </h3>
                  <span className="text-white text-sm px-2 py-1 rounded-full bg-[#8B5CF6] bg-opacity-10">
                    Hired
                  </span>
                </div>
                <p className="text-sm text-[#8B5CF6] mb-2">Bootcamp Graduate</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="font-secondary text-gray-400 text-lg italic">
              "As a career-switcher, I had no idea what to build. DevProject
              gave me projects that actually impressed senior developers in
              interviews."
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-[#1f2937] text-xs px-2 py-1 rounded text-gray-400">
                JavaScript
              </span>
              <span className="bg-[#1f2937] text-xs px-2 py-1 rounded text-gray-400">
                Node.js
              </span>
              <span className="bg-[#1f2937] text-xs px-2 py-1 rounded text-gray-400">
                Express
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-16 bg-primary mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block bg-[#3B3363] bg-opacity-30 text-[#8B5CF6] px-4 py-1 rounded-full text-sm font-medium mb-6">
              Get Started Today
            </span>
            <h2 className="text-4xl md:text-5xl font-primary font-bold mb-8 text-white leading-tight">
              Ready to build your{" "}
              <span className="text-[#8B5CF6]">standout</span> portfolio?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Join hundreds of developers who have found their perfect portfolio
              projects with DevProject Generator.
            </p>
            <Link
              to="/generate"
              className="inline-block bg-[#8B5CF6] text-white font-secondary font-medium py-4 px-10 rounded-lg hover:bg-[#7C3AED] transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/20 text-lg"
            >
              Start Building Now
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl font-primary font-bold text-white">
                1,200+
              </p>
              <p className="text-gray-400 font-secondary">Projects Generated</p>
            </div>
            <div>
              <p className="text-2xl font-primary font-bold text-white">300+</p>
              <p className="text-gray-400 font-secondary">Job Offers</p>
            </div>
            <div>
              <p className="text-2xl font-primary font-bold text-white">25+</p>
              <p className="text-gray-400 font-secondary">Tech Stacks</p>
            </div>
            <div>
              <p className="text-2xl font-primary font-bold text-white">
                4.9/5
              </p>
              <p className="text-gray-400 font-secondary">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="font-secondary py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DevProject Generator. All rights
              reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
