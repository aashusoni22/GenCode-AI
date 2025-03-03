import React from "react";
import { Navbar } from "./components";
import { Outlet } from "react-router-dom";
import DeveloperChatbot from "./components/DeveloperChatbot";

const App = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Outlet />
      <DeveloperChatbot />
    </div>
  );
};

export default App;
