import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, Search } from "lucide-react";

const booksData = [
  {
    id: 1,
    title: "Walking with God",
    subtitle: "A Daily Devotional Guide",
    author: "Pastor PBM",
    topic: "Devotional",
    year: 2024,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
  },
  {
    id: 2,
    title: "The Power of Prayer",
    subtitle: "Unlocking Heaven's Gates",
    author: "Pastor PBM",
    topic: "Prayer",
    year: 2023,
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Faith Over Fear",
    subtitle: "Living Boldly in Uncertain Times",
    author: "Pastor PBM",
    topic: "Faith",
    year: 2023,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
  },
  {
    id: 4,
    title: "The Gospel of Grace",
    subtitle: "Understanding God's Unconditional Love",
    author: "Pastor PBM",
    topic: "Theology",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Kingdom Living",
    subtitle: "Principles for Godly Life",
    author: "Pastor PBM",
    topic: "Christian Living",
    year: 2022,
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Spiritual Warfare",
    subtitle: "Equipped for the Battle",
    author: "Pastor PBM",
    topic: "Faith",
    year: 2021,
    cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&h=400&fit=crop",
  },
  {
    id: 7,
    title: "The Heart of Worship",
    subtitle: "Encountering God's Presence",
    author: "Pastor PBM",
    topic: "Worship",
    year: 2021,
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Rooted in Christ",
    subtitle: "Building an Unshakeable Foundation",
    author: "Pastor PBM",
    topic: "Theology",
    year: 2020,
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
  },
  {
    id: 9,
    title: "Called to Serve",
    subtitle: "Discovering Your Purpose",
    author: "Pastor PBM",
    topic: "Christian Living",
    year: 2020,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
  },
  {
    id: 10,
    title: "Hope for the Hopeless",
    subtitle: "Finding Light in Darkness",
    author: "Pastor PBM",
    topic: "Devotional",
    year: 2019,
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
  },
];

const tabs = ["All Books", "Topics", "Authors", "Dates"];
const sortOptions = ["Alphabetical", "Newest First", "Oldest First"];

export default function Books() {
  const [activeTab, setActiveTab] = useState("All Books");
  const [sortBy, setSortBy] = useState("Alphabetical");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const topics = [...new Set(booksData.map((book) => book.topic))];
  const authors = [...new Set(booksData.map((book) => book.author))];
  const years = [...new Set(booksData.map((book) => book.year))].sort(
    (a, b) => b - a
  );

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = [...booksData];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.topic.toLowerCase().includes(query)
      );
    }

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
    }

    return filtered;
  }, [sortBy, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="min-h-screen bg-[#0d1b2a] pt-28 pb-16 relative">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-[#c9a84c] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
            Library
          </span>
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-4">
            Books
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our collection of books to deepen your faith and grow in
            the knowledge of God's Word.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#c9a84c]/20 pb-4">
            {/* Tabs */}
            <nav
              className="flex items-center gap-6"
              role="tablist"
              aria-label="Book filter tabs"
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm uppercase tracking-wider font-medium pb-2 border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                    activeTab === tab
                      ? "text-[#c9a84c] border-[#c9a84c]"
                      : "text-gray-400 border-transparent hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Search & Sort */}
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
                  aria-label="Search books"
                  className="pl-9 pr-4 py-2 bg-[#0a0f1e] border border-[#c9a84c]/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]/60 transition-colors w-48"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  onBlur={() =>
                    setTimeout(() => setShowSortDropdown(false), 150)
                  }
                  aria-haspopup="listbox"
                  aria-expanded={showSortDropdown}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0a0f1e] border border-[#c9a84c]/20 rounded-lg text-gray-300 text-sm hover:border-[#c9a84c]/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                >
                  <span className="text-gray-500 uppercase text-xs tracking-wider">
                    Sort
                  </span>
                  <span className="text-white">{sortBy}</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>
                {showSortDropdown && (
                  <ul
                    role="listbox"
                    className="absolute right-0 top-full mt-2 bg-[#0a0f1e] border border-[#c9a84c]/20 rounded-lg shadow-xl z-10 overflow-hidden min-w-[160px]"
                  >
                    {sortOptions.map((option) => (
                      <li
                        key={option}
                        role="option"
                        aria-selected={sortBy === option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSortDropdown(false);
                        }}
                        className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
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

        {/* Content based on active tab */}
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
                    key={book.id}
                    variants={itemVariants}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-lg shadow-black/30 group-hover:shadow-[#c9a84c]/10 transition-shadow duration-300">
                      <img
                        src={book.cover}
                        alt={`Cover of ${book.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

            {activeTab === "Topics" && (
              <motion.div
                key="topics"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={containerVariants}
                className="space-y-10"
              >
                {topics.map((topic) => (
                  <motion.div key={topic} variants={itemVariants}>
                    <h3 className="text-xl font-cinzel font-bold text-[#c9a84c] mb-5 flex items-center gap-3">
                      <BookOpen size={20} />
                      {topic}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {booksData
                        .filter((book) => book.topic === topic)
                        .map((book) => (
                          <article key={book.id} className="group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 shadow-lg shadow-black/30">
                              <img
                                src={book.cover}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                            <h4 className="text-white font-semibold text-sm leading-tight mb-1 group-hover:text-[#c9a84c] transition-colors">
                              {book.title}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              {book.subtitle}
                            </p>
                          </article>
                        ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "Authors" && (
              <motion.div
                key="authors"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={containerVariants}
                className="space-y-10"
              >
                {authors.map((author) => (
                  <motion.div key={author} variants={itemVariants}>
                    <h3 className="text-xl font-cinzel font-bold text-[#c9a84c] mb-5">
                      {author}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {booksData
                        .filter((book) => book.author === author)
                        .map((book) => (
                          <article key={book.id} className="group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 shadow-lg shadow-black/30">
                              <img
                                src={book.cover}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                            <h4 className="text-white font-semibold text-sm leading-tight mb-1 group-hover:text-[#c9a84c] transition-colors">
                              {book.title}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              {book.subtitle}
                            </p>
                          </article>
                        ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "Dates" && (
              <motion.div
                key="dates"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={containerVariants}
                className="space-y-10"
              >
                {years.map((year) => (
                  <motion.div key={year} variants={itemVariants}>
                    <h3 className="text-xl font-cinzel font-bold text-[#c9a84c] mb-5">
                      {year}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {booksData
                        .filter((book) => book.year === year)
                        .map((book) => (
                          <article key={book.id} className="group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 shadow-lg shadow-black/30">
                              <img
                                src={book.cover}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                            <h4 className="text-white font-semibold text-sm leading-tight mb-1 group-hover:text-[#c9a84c] transition-colors">
                              {book.title}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              {book.subtitle}
                            </p>
                          </article>
                        ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {activeTab === "All Books" && filteredAndSortedBooks.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 text-lg">
                No books found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
