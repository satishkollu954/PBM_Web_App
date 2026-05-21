import { useState, useMemo, useEffect } from "react";

import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

import { BookOpen, ChevronDown, Search } from "lucide-react";

const tabs = ["All Books", "Topics", "Authors", "Dates"];

const sortOptions = ["Alphabetical", "Newest First", "Oldest First"];

export default function Books() {
  const [booksData, setBooksData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("All Books");

  const [sortBy, setSortBy] = useState("Alphabetical");

  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:3005/api/books/all");

      setBooksData(response.data.data);
    } catch (err) {
      console.log(err);

      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Filters
  const topics = [...new Set(booksData.map((book) => book.topic))];

  const authors = [...new Set(booksData.map((book) => book.author))];

  const years = [...new Set(booksData.map((book) => book.year))].sort(
    (a, b) => b - a,
  );

  // Search + Sort
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = [...booksData];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.topic.toLowerCase().includes(query),
      );
    }

    // Sort
    switch (sortBy) {
      case "Alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));

        break;

      case "Newest First":
        filtered.sort((a, b) => b.year - a.year);

        break;

      case "Oldest First":
        filtered.sort((a, b) => a.year - b.year);

        break;

      default:
        break;
    }

    return filtered;
  }, [booksData, searchQuery, sortBy]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.5,
      },
    },
  };

  // Loading
  if (loading) {
    return (
      <section className="min-h-screen bg-[#0d1b2a] flex items-center justify-center">
        <p className="text-white text-xl">Loading books...</p>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="min-h-screen bg-[#0d1b2a] flex items-center justify-center">
        <p className="text-red-400 text-xl">{error}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0d1b2a] pt-28 pb-16 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#c9a84c] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
            Library
          </span>

          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-4">
            Books
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our collection of books to deepen your faith and grow in the
            knowledge of God's Word.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#c9a84c]/20 pb-4">
            {/* Tabs */}
            <nav className="flex items-center gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm uppercase tracking-wider font-medium pb-2 border-b-2 transition-colors ${
                    activeTab === tab
                      ? "text-[#c9a84c] border-[#c9a84c]"
                      : "text-gray-400 border-transparent hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Search + Sort */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={16}
                />

                <input
                  type="search"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#0a0f1e] border border-[#c9a84c]/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]/60 transition-colors w-48"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0a0f1e] border border-[#c9a84c]/20 rounded-lg text-gray-300 text-sm"
                >
                  <span className="text-white">{sortBy}</span>

                  <ChevronDown size={14} />
                </button>

                {showSortDropdown && (
                  <ul className="absolute right-0 top-full mt-2 bg-[#0a0f1e] border border-[#c9a84c]/20 rounded-lg shadow-xl z-10 overflow-hidden min-w-[160px]">
                    {sortOptions.map((option) => (
                      <li
                        key={option}
                        onClick={() => {
                          setSortBy(option);

                          setShowSortDropdown(false);
                        }}
                        className={`px-4 py-2.5 text-sm cursor-pointer ${
                          sortBy === option
                            ? "text-[#c9a84c] bg-[#c9a84c]/10"
                            : "text-gray-300 hover:bg-[#c9a84c]/5 hover:text-white"
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* All Books */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "All Books" && (
              <motion.div
                key="all-books"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={containerVariants}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
              >
                {filteredAndSortedBooks.map((book) => (
                  <motion.article
                    key={book._id}
                    variants={itemVariants}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-lg shadow-black/30">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <h3 className="text-white font-cinzel font-semibold text-sm leading-tight mb-1 group-hover:text-[#c9a84c] transition-colors">
                      {book.title}
                    </h3>

                    <p className="text-gray-400 text-xs leading-snug">
                      {book.subtitle}
                    </p>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty */}
          {activeTab === "All Books" && filteredAndSortedBooks.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="mx-auto text-gray-600 mb-4" size={48} />

              <p className="text-gray-400 text-lg">No books found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
