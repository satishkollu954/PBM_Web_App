import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/sermons/all`;



const ITEMS_PER_PAGE = 8;

export default function Sermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* -----------------------------------
     FETCH SERMONS
  ----------------------------------- */
  useEffect(() => {
    const loadSermons = async () => {
      try {
        const response = await fetch(API_URL);

        const data = await response.json();

        if (data.success) {
          setSermons(data.data);
        } else {
          setSermons([]);
        }
      } catch (error) {
        console.log(error);
        setSermons([]);
      } finally {
        setLoading(false);
      }
    };

    loadSermons();
  }, []);

  /* -----------------------------------
     SEARCH FILTER
  ----------------------------------- */
  const filteredSermons = useMemo(() => {
    return sermons.filter((sermon) =>
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [sermons, searchTerm]);

  /* -----------------------------------
     PAGINATION
  ----------------------------------- */
  const totalPages = Math.ceil(filteredSermons.length / ITEMS_PER_PAGE);

  const paginatedSermons = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredSermons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSermons, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#faf8f2] via-[#f8f5ef] to-[#f2ece0] py-20 px-4">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-12 bg-gray-300 rounded-xl w-72 mx-auto mb-6" />

          <div className="h-6 bg-gray-300 rounded w-[500px] max-w-full mx-auto mb-12" />

          <div className="h-14 bg-gray-300 rounded-2xl max-w-2xl mx-auto mb-14" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-[24px] overflow-hidden shadow-lg"
              >
                <div className="h-[200px] bg-gray-300" />

                <div className="p-5">
                  <div className="h-6 bg-gray-300 rounded mb-4" />

                  <div className="h-11 bg-gray-300 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-[#faf8f2] via-[#f8f5ef] to-[#f2ece0]">
      <div className="max-w-7xl mx-auto mt-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-[#7A5C00] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
            Word of GOD
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-[#1E1535]">
            Sermons Library
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 leading-relaxed">
            Discover inspiring sermons and powerful spiritual messages that
            strengthen faith and bring you closer to God.
          </p>
        </div>

        {/* SEARCH */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />

            <input
              type="text"
              placeholder="Search sermons by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl py-4 pl-14 pr-5 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredSermons.length === 0 ? (
          <div className="bg-white rounded-[30px] p-16 text-center shadow-xl border border-gray-100">
            <div className="text-7xl mb-5">📖</div>

            <h2 className="text-4xl font-bold text-[#1E1535] mb-4">
              No Sermons Found
            </h2>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              No sermons matched your search. Try using another keyword.
            </p>
          </div>
        ) : (
          <>
            {/* TOP BAR */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E1535]">
                Latest Sermons
              </h2>

              <div className="bg-white px-5 py-3 rounded-xl shadow-md border border-gray-100 text-gray-600 font-medium">
                Showing{" "}
                <span className="font-bold text-[#1E1535]">
                  {paginatedSermons.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-[#1E1535]">
                  {filteredSermons.length}
                </span>{" "}
                Sermons
              </div>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {paginatedSermons.map((sermon, index) => (
                <motion.div
                  key={sermon._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group bg-white rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 w-full max-w-[520px] mx-auto"
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden">
                    <img
                      src={sermon.thumbnailImage}
                      alt={sermon.title}
                      className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#1E1535] leading-snug line-clamp-2 min-h-[55px]">
                      {sermon.title}
                    </h3>

                    {/* BUTTON */}
                    <button
                      onClick={() => window.open(sermon.youtubeLink, "_blank")}
                      className="mt-5 w-full bg-[#c9a84c] hover:bg-[#b8953e] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl"
                    >
                      Watch
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-16 flex-wrap">
                {/* PREVIOUS */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white shadow-md hover:shadow-xl text-[#1E1535]"
                  }`}
                >
                  <ChevronLeft size={18} />
                  Prev
                </button>

                {/* PAGE NUMBERS */}
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-12 h-12 rounded-xl font-semibold transition ${
                        currentPage === page
                          ? "bg-[#c9a84c] text-white shadow-lg"
                          : "bg-white text-[#1E1535] shadow-md hover:shadow-xl"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* NEXT */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white shadow-md hover:shadow-xl text-[#1E1535]"
                  }`}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
