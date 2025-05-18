import {
  LogIn,
  LogOut,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Code,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "../../lib/appwrite";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
      setUserMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-primary ${
        isScrolled || mobileMenuOpen
          ? "bg-gray-900 shadow-lg shadow-black/10 backdrop-blur-lg bg-opacity-80"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="relative rounded-full ">
                <Code className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="relative ml-2">
              <h1 className="text-white text-xl md:text-2xl font-bold group-hover:opacity-0 transition-opacity duration-300">
                GenCode-AI
              </h1>
              <h1 className="text-transparent bg-clip-text bg-secondary text-xl md:text-2xl font-bold absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                GenCode-AI
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav>
              <ul className="flex items-center gap-8">
                {[
                  { name: "Home", path: "/" },
                  { name: "Generate", path: "/generate" },
                  { name: "Resources", path: "/resources" },
                  // { name: "Community", path: "/community" },
                  { name: "Jobs", path: "/jobs" },
                  { name: "Pricing", path: "/pricing" },
                  { name: "About", path: "/about" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`relative py-2 group ${
                        isActive(item.path)
                          ? "text-white"
                          : "text-gray-300 hover:text-white transition-colors duration-200"
                      }`}
                    >
                      {item.name}
                      {isActive(item.path) && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary rounded-full"></span>
                      )}
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-700 hover:border-secondary/50 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">Account</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 border border-gray-700 ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </div>
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-3 text-sm text-rose-400 hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out border border-secondary 30 rounded-lg shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-secondary group-hover:translate-x-0 ease">
                  <LogIn className="w-4 h-4 mr-1" /> Sign Up
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Sign Up
                </span>
                <span className="relative invisible">Sign Up</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-lg shadow-xl border-t border-gray-800">
          <nav className="px-4 pt-2 pb-4">
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Generate", path: "/generate" },
                { name: "Resources", path: "/resources" },
                // { name: "Community", path: "/community" },
                { name: "Jobs", path: "/jobs" },
                { name: "Pricing", path: "/pricing" },
                { name: "About", path: "/about" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`block px-3 py-3 rounded-lg ${
                      isActive(item.path)
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-2 mt-2 border-t border-gray-800">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left px-3 py-3 text-rose-400 hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block w-full text-center px-3 py-3 text-white hover:bg-gray-800 rounded-lg transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full text-center px-3 py-3 text-white bg-gradient-to-r from-secondary to-secondary/80 rounded-lg hover:opacity-90 transition-opacity"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
