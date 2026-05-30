import { motion } from "framer-motion";
import { Music, Youtube, FileText } from "lucide-react";

const sampleSongs = [
  // Recorded audio
  { id: 1, title: "Amazing Grace", artist: "PBM Worship Team", description: "Recorded praise.", type: "audio", fileUrl: "/songs/amazing-grace.mp3" },
  { id: 2, title: "Called to Serve", artist: "PBM Worship Team", description: "Live studio recording.", type: "audio", fileUrl: "/songs/called-to-serve.mp3" },
  { id: 3, title: "Living in Community", artist: "PBM Worship Team", description: "Worship session.", type: "audio", fileUrl: "/songs/living-in-community.mp3" },

  // YouTube
  { id: 4, title: "Holy Spirit Fall", artist: "PBM Worship Team", description: "Live worship performance.", type: "youtube", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 5, title: "Grace Unmerited", artist: "PBM Worship Team", description: "Recorded sermon song.", type: "youtube", link: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ" },
  { id: 6, title: "Bearing Good Fruit", artist: "PBM Worship Team", description: "Praise and worship.", type: "youtube", link: "https://www.youtube.com/watch?v=oHg5SJYRHA0" },

  // PDFs
  { id: 7, title: "Song Lyrics Book", artist: "PBM Worship Team", description: "Lyrics and chords.", type: "pdf", fileUrl: "/songs/song-lyrics.pdf" },
  { id: 8, title: "Worship Setlist", artist: "PBM Worship Team", description: "Setlist PDF.", type: "pdf", fileUrl: "/songs/setlist.pdf" },
];

function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
  return m ? m[1] : null;
}

export default function Songs() {
  return (
    <section id="songs" className="py-24 bg-[#0d1b2a] relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-[#e6c860] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
              Worship Media
            </span>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-4">
              Recorded, YouTube & PDF Songs
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              This is a static preview showing recorded audio, YouTube links, and PDF resources. You can replace these with backend data later.
            </p>
          </div>

          {/* Grouped Sections */}
          <div className="space-y-8">
            {/* Recorded */}
            <div>
              <h3 className="text-xl text-[#c9a84c] font-semibold mb-4">Recorded Songs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleSongs.filter((s) => s.type === "audio").map((song) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="bg-[#0a0f1e] border border-[#c9a84c]/20 rounded-3xl p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-cinzel font-bold text-white">{song.title}</h4>
                        <p className="text-gray-300 text-sm">{song.artist}</p>
                        <p className="text-gray-300 text-sm mt-2">{song.description}</p>
                      </div>

                      <div>
                        <audio controls className="w-full max-w-sm rounded-2xl bg-[#10202f] p-2">
                          <source src={song.fileUrl} type="audio/mpeg" />
                        </audio>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* YouTube */}
            <div>
              <h3 className="text-xl text-[#c9a84c] font-semibold mb-4">YouTube Songs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleSongs.filter((s) => s.type === "youtube").map((song) => {
                  const id = getYouTubeId(song.link);
                  const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
                  return (
                    <motion.a
                      key={song.id}
                      href={song.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="block bg-[#0a0f1e] border border-[#c9a84c]/20 rounded-2xl overflow-hidden"
                    >
                      <div className="h-40 bg-black/20 overflow-hidden">
                        {thumb ? <img src={thumb} alt={song.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300">No preview</div>}
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-cinzel font-bold text-white">{song.title}</h4>
                        <p className="text-gray-300 text-sm">{song.artist}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* PDFs */}
            <div>
              <h3 className="text-xl text-[#c9a84c] font-semibold mb-4">PDF Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleSongs.filter((s) => s.type === "pdf").map((song) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="bg-[#0a0f1e] border border-[#c9a84c]/20 rounded-3xl p-6 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-lg font-cinzel font-bold text-white">{song.title}</h4>
                      <p className="text-gray-300 text-sm">{song.artist}</p>
                    </div>
                    <a href={song.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-4 py-2 text-sm font-semibold text-[#0d1b2a]">
                      <FileText size={16} />
                      View PDF
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

