import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Menu, X } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";

export default function Navbar() {
  const navigate = useNavigate();

  const [cookies, , removeCookie] = useCookies(["isAdminLoggedIn"]);

  const [scrolled, setScrolled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

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

  // Logout
  const handleLogout = () => {
    removeCookie("isAdminLoggedIn", {
      path: "/",
    });

    navigate("/");
  };

  // Navbar Links
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
      name: "Books",
      path: "/books",
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
          ? "bg-[#0a0f1e]/90 backdrop-blur-md border-b border-[#c9a84c]/20 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-cinzel font-bold text-[#c9a84c]">
          <span className="mr-2">&#10013;</span>
          PBM Church
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-white hover:text-[#c9a84c] text-sm uppercase tracking-wider transition-colors relative group"
                >
                  {link.name}

                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c9a84c] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
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
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-[#c9a84c] text-lg uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

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
