import React from "react";
import profile from "../assets/profile.png";

const About = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-white pt-28 pb-8 px-6 md:px-16">
        <h1 className="text-5xl font-primary font-bold leading-tight">
          About <span className="text-[#8B5CF6]">DevProject Generator</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 font-secondary max-w-3xl">
          Helping junior developers build impressive portfolios that land jobs.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto py-12 px-6 md:px-16">
        <div className="bg-primary rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-primary font-bold mb-6 text-white">
            Our Mission
          </h2>
          <p className="text-gray-400 font-secondary text-lg leading-relaxed mb-6">
            We believe that every developer deserves the chance to showcase
            their skills effectively. DevProject Generator was built to bridge
            the gap between learning to code and landing that first developer
            job.
          </p>
          <p className="text-gray-400 font-secondary text-lg leading-relaxed">
            By providing personalized, industry-relevant project ideas, we help
            junior developers create standout portfolios that demonstrate their
            true capabilities to potential employers.
          </p>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="max-w-7xl mx-auto py-12 px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* The Problem */}
          <div className="bg-primary rounded-lg p-8">
            <div className="bg-[#3B3363] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#8B5CF6]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-primary font-bold mb-4 text-white">
              The Challenge
            </h3>
            <p className="text-gray-400 font-secondary">
              Junior developers often struggle with "tutorial purgatory" and
              building generic projects that don't stand out. Generic to-do apps
              and weather widgets don't showcase a developer's full potential or
              creativity.
            </p>
          </div>

          {/* The Solution */}
          <div className="bg-primary rounded-lg p-8">
            <div className="bg-[#3B3363] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#8B5CF6]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-primary font-bold mb-4 text-white">
              Our Solution
            </h3>
            <p className="text-gray-400 font-secondary">
              DevProject Generator leverages AI to create personalized,
              industry-relevant project ideas based on your skills, experience
              level, and career goals. Each project comes with detailed
              specifications and guidance to help you build something truly
              impressive.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto py-12 px-6 md:px-16">
        <h2 className="text-4xl font-primary font-bold mb-12 text-white">
          Meet the Creator
        </h2>
        <div className="bg-primary rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-[#2A2A2A] w-32 h-32 rounded-full flex items-center justify-center">
            <img src={profile} alt="AS" />
          </div>
          <div>
            <h3 className="text-2xl font-primary font-bold text-white mb-2">
              Aashutosh Soni
            </h3>
            <p className="text-[#8B5CF6] font-secondary mb-4">
              Frontend Developer
            </p>
            <p className="text-gray-400 font-secondary max-w-2xl">
              As a passionate frontend developer, I created DevProject Generator
              to solve the problem I faced when building my own portfolio. With
              a background in UI/UX design and a love for creating helpful
              tools, I'm on a mission to help other junior developers showcase
              their talents and land their dream jobs.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-7xl mx-auto py-12 px-6 md:px-16">
        <h2 className="text-4xl font-primary font-bold mb-12 text-white">
          Our Tech Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="bg-[#3B3363] bg-opacity-20 h-16 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-[#8B5CF6]">React</span>
            </div>
            <p className="text-gray-400 font-secondary">Frontend Framework</p>
          </div>
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="bg-[#3B3363] bg-opacity-20 h-16 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-[#8B5CF6]">Tailwind</span>
            </div>
            <p className="text-gray-400 font-secondary">CSS Framework</p>
          </div>
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="bg-[#3B3363] bg-opacity-20 h-16 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-[#8B5CF6]">Express</span>
            </div>
            <p className="text-gray-400 font-secondary">Backend Framework</p>
          </div>
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="bg-[#3B3363] bg-opacity-20 h-16 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-[#8B5CF6]">OpenAI</span>
            </div>
            <p className="text-gray-400 font-secondary">AI Integration</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-16 bg-primary text-center mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-primary font-bold mb-8 text-white">
            Ready to create your next project?
          </h2>
          <button className="inline-block bg-[#8B5CF6] text-white font-secondary font-medium py-3 px-8 rounded-lg hover:bg-[#7C3AED] transition">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
