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

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

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

    // Sub-filter by selected topic/author/year
    if (activeTab === "Topics" && selectedTopic) {
      filtered = filtered.filter((b) => b.topic === selectedTopic);
    } else if (activeTab === "Authors" && selectedAuthor) {
      filtered = filtered.filter((b) => b.author === selectedAuthor);
    } else if (activeTab === "Dates" && selectedYear) {
      filtered = filtered.filter((b) => String(b.year) === String(selectedYear));
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
  }, [booksData, searchQuery, sortBy, activeTab, selectedTopic, selectedAuthor, selectedYear]);

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
      <section className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
        <p className="text-[#1E1535] text-xl">Loading books...</p>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
        <p className="text-red-400 text-xl">{error}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFFDF5] pt-28 pb-16 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#7A5C00] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
            Library
          </span>

          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-[#1E1535] mb-4">
            Books
          </h1>

          <p className="text-[#33275A] text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our collection of books to deepen your faith and grow in the
            knowledge of God's Word.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#c9a84c]/40 pb-4">
            {/* Tabs */}
            <nav className="flex items-center gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSelectedTopic(null);
                    setSelectedAuthor(null);
                    setSelectedYear(null);
                  }}
                  className={`text-sm uppercase tracking-wider font-medium pb-2 border-b-2 transition-colors ${
                    activeTab === tab
                      ? "text-[#c9a84c] border-[#c9a84c]"
                      : "text-[#33275A] border-transparent hover:text-[#1E1535]"
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
                  className="pl-9 pr-4 py-2 bg-[#FFFDF5] border border-[#c9a84c]/40 rounded-lg text-[#1E1535] text-sm placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]/60 transition-colors w-48"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FFFDF5] border border-[#c9a84c]/40 rounded-lg text-[#33275A] text-sm"
                >
                  <span className="text-[#1E1535]">{sortBy}</span>

                  <ChevronDown size={14} />
                </button>

                {showSortDropdown && (
                  <ul className="absolute right-0 top-full mt-2 bg-[#FFFDF5] border border-[#c9a84c]/40 rounded-lg shadow-xl z-10 overflow-hidden min-w-[160px]">
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
                            : "text-[#33275A] hover:bg-[#c9a84c]/5 hover:text-[#1E1535]"
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
                    className="group cursor-pointer p-3 rounded-xl border border-transparent hover:border-[#c9a84c]/40 hover:bg-white hover:shadow-lg hover:shadow-[#c9a84c]/5 hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-lg shadow-[#c9a84c]/15">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <h3 className="text-[#1E1535] font-cinzel font-semibold text-sm leading-tight mb-1 group-hover:text-[#c9a84c] transition-colors">
                      {book.title}
                    </h3>

                    <p className="text-[#33275A] text-xs leading-snug">
                      {book.subtitle}
                    </p>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state for All Books */}
          {activeTab === "All Books" && filteredAndSortedBooks.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-[#33275A] text-lg">No books found</p>
            </div>
          )}

          {/* ── Topics Tab ── */}
          {activeTab === "Topics" && !selectedTopic && (
            <motion.div
              key="topics-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {topics.map((topic) => {
                const count = booksData.filter((b) => b.topic === topic).length;
                return (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className="bg-[#FFFDF5] border border-[#c9a84c]/40 rounded-xl p-5 text-left hover:border-[#c9a84c]/60 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                  >
                    <p className="text-[#1E1535] font-cinzel font-semibold group-hover:text-[#c9a84c] transition-colors">
                      {topic}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {count} book{count !== 1 ? "s" : ""}
                    </p>
                  </button>
                );
              })}
            </motion.div>
          )}
          {activeTab === "Topics" && selectedTopic && (
            <motion.div
              key="topics-books"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-[#c9a84c] text-sm mb-6 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
              >
                ← All Topics
              </button>
              <h3 className="text-[#1E1535] font-cinzel text-xl mb-6">{selectedTopic}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {filteredAndSortedBooks.map((book) => (
                  <article key={book._id} className="group cursor-pointer p-3 rounded-xl border border-transparent hover:border-[#c9a84c]/40 hover:bg-white hover:shadow-lg hover:shadow-[#c9a84c]/5 hover:-translate-y-1 transition-all duration-200">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-lg shadow-[#c9a84c]/15">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-[#1E1535] font-cinzel font-semibold text-sm leading-tight mb-1 group-hover:text-[#c9a84c] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-[#33275A] text-xs leading-snug">{book.subtitle}</p>
                  </article>
                ))}
              </div>
              {filteredAndSortedBooks.length === 0 && (
                <p className="text-[#33275A] text-center py-12">No books found in this topic.</p>
              )}
            </motion.div>
          )}

          {/* ── Authors Tab ── */}
          {activeTab === "Authors" && !selectedAuthor && (
            <motion.div
              key="authors-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {authors.map((author) => {
                const count = booksData.filter((b) => b.author === author).length;
                return (
                  <button
                    key={author}
                    onClick={() => setSelectedAuthor(author)}
                    className="bg-[#FFFDF5] border border-[#c9a84c]/40 rounded-xl p-5 text-left hover:border-[#c9a84c]/60 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                  >
                    <p className="text-[#1E1535] font-cinzel font-semibold group-hover:text-[#c9a84c] transition-colors">
                      {author}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {count} book{count !== 1 ? "s" : ""}
                    </p>
                  </button>
                );
              })}
            </motion.div>
          )}
          {activeTab === "Authors" && selectedAuthor && (
            <motion.div
              key="authors-books"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setSelectedAuthor(null)}
                className="text-[#c9a84c] text-sm mb-6 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
              >
                ← All Authors
              </button>
              <h3 className="text-[#1E1535] font-cinzel text-xl mb-6">{selectedAuthor}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {filteredAndSortedBooks.map((book) => (
                  <article key={book._id} className="group cursor-pointer p-3 rounded-xl border border-transparent hover:border-[#c9a84c]/40 hover:bg-white hover:shadow-lg hover:shadow-[#c9a84c]/5 hover:-translate-y-1 transition-all duration-200">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-lg shadow-[#c9a84c]/15">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-[#1E1535] font-cinzel font-semibold text-sm leading-tight mb-1 group-hover:text-[#c9a84c] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-[#33275A] text-xs leading-snug">{book.subtitle}</p>
                  </article>
                ))}
              </div>
              {filteredAndSortedBooks.length === 0 && (
                <p className="text-[#33275A] text-center py-12">No books found for this author.</p>
              )}
            </motion.div>
          )}

          {/* ── Dates Tab ── */}
          {activeTab === "Dates" && !selectedYear && (
            <motion.div
              key="dates-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {years.map((year) => {
                const count = booksData.filter((b) => b.year === year).length;
                return (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className="bg-[#FFFDF5] border border-[#c9a84c]/40 rounded-xl p-5 text-left hover:border-[#c9a84c]/60 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                  >
                    <p className="text-[#1E1535] font-cinzel font-semibold text-lg group-hover:text-[#c9a84c] transition-colors">
                      {year}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {count} book{count !== 1 ? "s" : ""}
                    </p>
                  </button>
                );
              })}
            </motion.div>
          )}
          {activeTab === "Dates" && selectedYear && (
            <motion.div
              key="dates-books"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setSelectedYear(null)}
                className="text-[#c9a84c] text-sm mb-6 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
              >
                ← All Years
              </button>
              <h3 className="text-[#1E1535] font-cinzel text-xl mb-6">{selectedYear}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {filteredAndSortedBooks.map((book) => (
                  <article key={book._id} className="group cursor-pointer p-3 rounded-xl border border-transparent hover:border-[#c9a84c]/40 hover:bg-white hover:shadow-lg hover:shadow-[#c9a84c]/5 hover:-translate-y-1 transition-all duration-200">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-lg shadow-[#c9a84c]/15">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-[#1E1535] font-cinzel font-semibold text-sm leading-tight mb-1 group-hover:text-[#c9a84c] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-[#33275A] text-xs leading-snug">{book.subtitle}</p>
                  </article>
                ))}
              </div>
              {filteredAndSortedBooks.length === 0 && (
                <p className="text-[#33275A] text-center py-12">No books found for this year.</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}









