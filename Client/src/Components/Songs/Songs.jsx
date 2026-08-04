import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Youtube, FileText, Search, Download } from "lucide-react";
import axios from "axios";

function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
  return m ? m[1] : null;
}

export default function Songs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/songs/all`);
        setSongs(res.data.data || []);
      } catch {
        setError("Failed to load songs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const filteredSongs = songs.filter((song) => {
    const matchesTab = activeTab === "all" || song.type === activeTab;
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const audioSongs = filteredSongs.filter((s) => s.type === "audio");
  const youtubeSongs = filteredSongs.filter((s) => s.type === "youtube");
  const pdfSongs = filteredSongs.filter((s) => s.type === "pdf");

  const tabs = [
    { value: "all", label: "All", icon: Music },
    { value: "audio", label: "Audio", icon: Music },
    { value: "youtube", label: "YouTube", icon: Youtube },
    { value: "pdf", label: "PDF", icon: FileText },
  ];

  return (
    <section id="songs" className="py-24 bg-[#FFFDF5] relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-[#7A5C00] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
              Worship Media
            </span>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#1E1535] mb-4">
              Songs & Resources
            </h2>
            <p className="text-[#33275A] text-lg max-w-3xl mx-auto leading-relaxed">
              Listen to recorded worship songs, watch YouTube performances, and download PDF resources.
            </p>
          </div>

          {/* Search & Filter Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center justify-center">
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1E1535]/40"
              />
              <input
                type="text"
                placeholder="Search songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c9a84c]/30 text-[#1E1535] rounded-full text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab.value
                        ? "bg-[#c9a84c] text-[#0d1b2a]"
                        : "bg-white border border-[#c9a84c]/30 text-[#1E1535]/70 hover:border-[#c9a84c]"
                    }`}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading / Error / Empty */}
          {loading && (
            <p className="text-center text-[#1E1535]/60 py-16">
              Loading songs...
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 py-16">{error}</p>
          )}
          {!loading && !error && filteredSongs.length === 0 && (
            <p className="text-center text-[#1E1535]/50 py-16">
              {songs.length === 0
                ? "No songs available yet. Check back soon!"
                : "No songs match your search."}
            </p>
          )}

          {/* Content */}
          {!loading && !error && filteredSongs.length > 0 && (
            <div className="space-y-10">
              {/* Audio Section */}
              {audioSongs.length > 0 && (
                <div>
                  <h3 className="text-xl text-[#c9a84c] font-semibold mb-4 flex items-center gap-2">
                    <Music size={20} /> Recorded Songs
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {audioSongs.map((song) => (
                      <motion.div
                        key={song._id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="bg-white border border-[#c9a84c]/40 rounded-3xl p-6"
                      >
                        <div className="flex flex-col gap-4">
                          <div>
                            <h4 className="text-lg font-cinzel font-bold text-[#1E1535]">
                              {song.title}
                            </h4>
                            <p className="text-[#33275A] text-sm">
                              {song.artist}
                            </p>
                            {song.description && (
                              <p className="text-[#33275A] text-sm mt-2">
                                {song.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <audio
                              controls
                              className="flex-1 rounded-2xl"
                            >
                              <source src={song.fileUrl} type="audio/mpeg" />
                            </audio>
                            <a
                              href={song.fileUrl}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-[#c9a84c]/10 hover:bg-[#c9a84c]/20 rounded-full text-[#c9a84c] transition-colors"
                              title="Download"
                            >
                              <Download size={18} />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube Section */}
              {youtubeSongs.length > 0 && (
                <div>
                  <h3 className="text-xl text-[#c9a84c] font-semibold mb-4 flex items-center gap-2">
                    <Youtube size={20} /> YouTube Songs
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {youtubeSongs.map((song) => {
                      const ytId = getYouTubeId(song.youtubeLink);
                      const thumb = ytId
                        ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                        : null;
                      return (
                        <motion.a
                          key={song._id}
                          href={song.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          className="block bg-white border border-[#c9a84c]/40 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="h-40 bg-black/10 overflow-hidden relative">
                            {thumb ? (
                              <img
                                src={thumb}
                                alt={song.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#33275A]">
                                No preview
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-red-600 rounded-full p-3 opacity-90">
                                <Youtube size={24} className="text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="text-lg font-cinzel font-bold text-[#1E1535]">
                              {song.title}
                            </h4>
                            <p className="text-[#33275A] text-sm">
                              {song.artist}
                            </p>
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PDF Section */}
              {pdfSongs.length > 0 && (
                <div>
                  <h3 className="text-xl text-[#c9a84c] font-semibold mb-4 flex items-center gap-2">
                    <FileText size={20} /> PDF Resources
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pdfSongs.map((song) => (
                      <motion.div
                        key={song._id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="bg-white border border-[#c9a84c]/40 rounded-3xl p-6 flex items-center justify-between"
                      >
                        <div>
                          <h4 className="text-lg font-cinzel font-bold text-[#1E1535]">
                            {song.title}
                          </h4>
                          <p className="text-[#33275A] text-sm">
                            {song.artist}
                          </p>
                          {song.description && (
                            <p className="text-[#33275A] text-xs mt-1">
                              {song.description}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={`https://docs.google.com/viewer?url=${encodeURIComponent(song.fileUrl)}&embedded=true`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-4 py-2 text-sm font-semibold text-[#0d1b2a] hover:bg-[#d8b45a] transition-colors"
                          >
                            <FileText size={16} />
                            View
                          </a>
                          <a
                            href={song.fileUrl}
                            download={`${song.title}.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-[#c9a84c] px-4 py-2 text-sm font-semibold text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
                          >
                            <Download size={16} />
                            Download
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}







