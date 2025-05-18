import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  X,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";

const DeveloperChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      type: "bot",
      content:
        "Hi there! I'm your AI Developer Assistant. Ask me anything about coding, technologies, career advice, or project help.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length,
      type: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual AI API call)
      const response = await generateAIResponse(input);

      // Add AI response
      const aiMessage = {
        id: messages.length + 1,
        type: "bot",
        content: response,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 1,
        type: "bot",
        content:
          "I'm sorry, but I encountered an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock AI response generation (replace with actual AI API)
  const generateAIResponse = async (query) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Basic response categories
    const responses = {
      greeting: [
        "Hello! How can I help you with your development journey today?",
        "Hi there! I'm ready to assist you with any coding or tech questions.",
      ],
      javascript: [
        "JavaScript is a powerful programming language used for web development. What specific aspect are you interested in?",
        "In modern JavaScript, we have features like arrow functions, destructuring, and async/await that make coding more efficient.",
      ],
      react: [
        "React is a popular JavaScript library for building user interfaces. It uses components and has a virtual DOM for efficient rendering.",
        "React Hooks like useState and useEffect have revolutionized how we write functional components.",
      ],
      career: [
        "For junior developers, building a strong portfolio and continuously learning are key to career growth.",
        "Networking, contributing to open-source, and staying updated with latest technologies can boost your career prospects.",
      ],
      project: [
        "When starting a new project, focus on solving a real problem and showcase your problem-solving skills.",
        "Choose technologies that align with your learning goals and the project requirements.",
      ],
      default: [
        "That's an interesting question! Could you provide more context?",
        "I'm here to help. Can you elaborate on what you'd like to know?",
      ],
    };

    // Simple keyword-based response selection
    const keywords = {
      greeting: ["hi", "hello", "hey"],
      javascript: ["javascript", "js", "ecmascript"],
      react: ["react", "hooks", "component"],
      career: ["career", "job", "interview"],
      project: ["project", "build", "create"],
    };

    // Find matching category
    const matchCategory =
      Object.entries(keywords).find(([, words]) =>
        words.some((word) => query.toLowerCase().includes(word))
      )?.[0] || "default";

    // Randomly select a response from the matched category
    const categoryResponses = responses[matchCategory];
    return categoryResponses[
      Math.floor(Math.random() * categoryResponses.length)
    ];
  };

  const handleCopyMessage = (message) => {
    navigator.clipboard.writeText(message.content);
    setCopiedMessageId(message.id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-primary">
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-secondary text-white p-4 rounded-full shadow-2xl hover:bg-secondary/80 transition-all group"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-pulse">
            AI
          </span>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 flex flex-col">
          {/* Header */}
          <div className="bg-secondary text-white p-4 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center">
              <Sparkles size={20} className="mr-2" />
              <h2 className="font-bold">AI Developer Assistant</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-secondary rounded-full p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 max-h-[400px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[80%] p-3 rounded-lg 
                    ${
                      message.type === "user"
                        ? "bg-secondary text-white"
                        : "bg-gray-800 text-gray-200"
                    }
                  `}
                >
                  <div className="flex items-center">
                    <span>{message.content}</span>
                    {message.type === "bot" && (
                      <button
                        onClick={() => handleCopyMessage(message)}
                        className="ml-2 text-gray-300 hover:text-white"
                      >
                        {copiedMessageId === message.id ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center py-2">
              <RefreshCw size={20} className="text-purple-400 animate-spin" />
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-800 bg-gray-950"
          >
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a development question..."
                className="flex-grow bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-secondary  text-white p-2 rounded-lg hover:bg-secondary/80 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeveloperChatbot;
