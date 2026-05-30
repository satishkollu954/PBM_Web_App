import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Menu, X, ChevronDown } from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { useCookies } from "react-cookie";

import pbmLogo from "../../assets/pbmlogo-2.jpeg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cookies, , removeCookie] = useCookies(["isAdminLoggedIn"]);

  const [scrolled, setScrolled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [resourcesOpen, setResourcesOpen] = useState(false);

  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const resourcesRef = useRef(null);

  // Check Login Status
  const isLoggedIn = cookies.isAdminLoggedIn;

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    removeCookie("isAdminLoggedIn", {
      path: "/",
    });

    navigate("/");
  };

  // Resources dropdown items
  const resourcesLinks = [
    { name: "Books", path: "/books" },
    { name: "Articles", path: "/articles" },
  ];

  // Navbar Links (Books removed — now under Resources dropdown)
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "About",
      path: "/about",
    },

    {
      name: "Sermons",
      path: "/sermons",
    },

    {
      name: "Songs",
      path: "/songs",
    },

    {
      name: "Events",
      path: "/events",
    },

    {
      name: "Contact",
      path: "/contact",
    },

    ...(isLoggedIn
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
          },
        ]
      : []),
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0f1e]/95 backdrop-blur-md border-b border-[#c9a84c]/20 py-2 shadow-lg shadow-black/20"
          : "bg-[#0a0f1e]/70 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-[#c9a84c] group">
          <img
            src={pbmLogo}
            alt="PBM Prayer Fellowship Logo"
            className={`transition-all duration-300 rounded-lg border border-[#c9a84c]/30 shadow-md group-hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] ${
              scrolled ? "h-11 w-11" : "h-14 w-14"
            } object-cover`}
          />
          <span className={`font-cinzel font-bold hidden sm:block transition-all duration-300 ${
            scrolled ? "text-lg" : "text-xl"
          }`}>
            PBM Fellowship
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm uppercase tracking-wider transition-colors relative group ${
                      isActive
                        ? "text-[#c9a84c] font-semibold"
                        : "text-white hover:text-[#c9a84c]"
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#c9a84c] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                  </Link>
                </li>
              );
            })}

            {/* Resources Dropdown */}
            <li ref={resourcesRef} className="relative">
              <button
                onClick={() => setResourcesOpen((prev) => !prev)}
                className="flex items-center gap-1 text-white hover:text-[#c9a84c] text-sm uppercase tracking-wider transition-colors relative group focus:outline-none"
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
              >
                Resources
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c9a84c] transition-all duration-300 group-hover:w-full"></span>
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-3 w-40 bg-[#0a0f1e] border border-[#c9a84c]/30 rounded-lg shadow-xl overflow-hidden z-50"
                    role="menu"
                  >
                    {resourcesLinks.map((item) => (
                      <li key={item.name} role="none">
                        <Link
                          to={item.path}
                          onClick={() => setResourcesOpen(false)}
                          role="menuitem"
                          className="block px-4 py-3 text-sm text-white uppercase tracking-wider hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-[#c9a84c] hover:bg-[#d8b45a] text-[#0d1b2a] px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#c9a84c]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="absolute top-full left-0 w-full bg-[#0a0f1e] border-b border-[#c9a84c]/20 shadow-lg md:hidden"
          >
            <ul className="flex flex-col items-center py-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg uppercase tracking-widest transition-colors ${
                        isActive
                          ? "text-[#c9a84c] font-semibold"
                          : "text-white hover:text-[#c9a84c]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}

              {/* Mobile Resources Dropdown */}
              <li className="flex flex-col items-center">
                <button
                  onClick={() => setMobileResourcesOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-white hover:text-[#c9a84c] text-lg uppercase tracking-widest focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={mobileResourcesOpen}
                >
                  Resources
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileResourcesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 flex flex-col items-center space-y-2 overflow-hidden"
                    >
                      {resourcesLinks.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            onClick={() => {
                              setIsOpen(false);
                              setMobileResourcesOpen(false);
                            }}
                            className="text-[#c9a84c]/80 hover:text-[#c9a84c] text-base uppercase tracking-widest transition-colors"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Mobile Logout */}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();

                    setIsOpen(false);
                  }}
                  className="bg-[#c9a84c] hover:bg-[#d8b45a] text-[#0d1b2a] px-6 py-2 rounded-lg font-semibold"
                >
                  Logout
                </button>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
