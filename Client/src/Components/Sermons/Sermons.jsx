import { useState } from "react";
import { motion } from "framer-motion";
import { Youtube, Headphones } from "lucide-react";

export default function Sermons() {
  const [selectedMedia, setSelectedMedia] = useState("audio");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Sample sermon data - you can replace with API data later
  const sermons = [
    {
      id: 1,
      title: "The Power of Faith",
      speaker: "Bro. Pratap Kumar",
      date: "May 19, 2024",
      description: "A powerful message about trusting in God's promises and walking by faith, not by sight.",
      type: "audio", // 'audio' or 'youtube' or 'both'
      audioUrl: "/sermons/faith.mp3",
      youtubeLink: null,
    },
    {
      id: 2,
      title: "Grace Unmerited",
      speaker: "Bro. Pratap Kumar",
      date: "May 12, 2024",
      description: "Understanding God's grace and how it transforms our lives through His unending love.",
      type: "youtube",
      audioUrl: null,
      youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Living in Community",
      speaker: "Bro. Pratap Kumar",
      date: "May 5, 2024",
      description: "How authentic fellowship strengthens our faith and builds up the body of Christ.",
      type: "audio",
      audioUrl: "/sermons/community.mp3",
      youtubeLink: null,
    },
    {
      id: 4,
      title: "Surrendering Control",
      speaker: "Bro. Pratap Kumar",
      date: "April 28, 2024",
      description: "Learning to let go and trust God with every aspect of our lives.",
      type: "both",
      audioUrl: "/sermons/surrender.mp3",
      youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 5,
      title: "Bearing Good Fruit",
      speaker: "Bro. Pratap Kumar",
      date: "April 21, 2024",
      description: "Growing in character and displaying the fruit of the Spirit in our daily lives.",
      type: "youtube",
      audioUrl: null,
      youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 6,
      title: "Called to Serve",
      speaker: "Bro. Pratap Kumar",
      date: "April 14, 2024",
      description: "Understanding our calling and purpose in serving others with humility and love.",
      type: "both",
      audioUrl: "/sermons/serve.mp3",
      youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  const filteredSermons = sermons.filter((sermon) =>
    selectedMedia === "audio" ? sermon.audioUrl : sermon.youtubeLink
  );

  return (
    <section id="sermons" className="py-24 bg-[#0d1b2a] relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={headingVariants}
              className="text-[#e6c860] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3"
            >
              Hear the Word
            </motion.span>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={headingVariants}
              className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6"
            >
              Sermons & Messages
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={headingVariants}
              transition={{ delay: 0.15 }}
              className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Listen to inspiring messages and teachings that will deepen your faith and understanding of God's Word.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <button
              type="button"
              onClick={() => setSelectedMedia("audio")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedMedia === "audio"
                  ? "bg-[#c9a84c] text-[#0d1b2a]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Audio
            </button>
            <button
              type="button"
              onClick={() => setSelectedMedia("youtube")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedMedia === "youtube"
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              YouTube
            </button>
          </div>

          {/* Sermons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <motion.div
                key={sermon.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={itemVariants}
                className="bg-gradient-to-br from-[#0a0f1e] to-[#1a2a3a] border border-[#c9a84c]/20 rounded-2xl overflow-hidden hover:border-[#c9a84c]/40 transition-all duration-300 group"
              >
                {/* Sermon Card Header */}
                <div className="bg-gradient-to-r from-[#c9a84c]/20 to-[#0d1b2a] p-6 relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#c9a84c]/10 rounded-full blur-xl group-hover:bg-[#c9a84c]/20 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-cinzel font-bold text-white mb-2 line-clamp-2">
                      {sermon.title}
                    </h3>
                    <p className="text-[#c9a84c] text-sm font-semibold">{sermon.speaker}</p>
                    <p className="text-gray-300 text-xs mt-1">{sermon.date}</p>
                  </div>
                </div>

                {/* Sermon Content */}
                <div className="p-6 space-y-6">
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {sermon.description}
                  </p>

                  {/* Media Badge */}
                  <div className="flex gap-2">
                    {(sermon.type === "audio" || sermon.type === "both") && (
                      <span className="inline-flex items-center gap-1 bg-[#c9a84c]/20 text-[#c9a84c] px-3 py-1 rounded-full text-xs font-semibold">
                        <Headphones size={14} />
                        Audio
                      </span>
                    )}
                    {(sermon.type === "youtube" || sermon.type === "both") && (
                      <span className="inline-flex items-center gap-1 bg-red-900/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">
                        <Youtube size={14} />
                        Video
                      </span>
                    )}
                  </div>

                  {/* Audio Player - Only show for audio type */}
                  {(sermon.type === "audio" || sermon.type === "both") && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#c9a84c]">
                        <Headphones size={18} />
                        <span className="text-sm font-semibold">Listen to Message</span>
                      </div>
                      <audio
                        controls
                        className="w-full h-8 rounded-lg bg-[#0a0f1e] accent-[#c9a84c]"
                      >
                        <source src={sermon.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  {/* YouTube Button - Only show for youtube type */}
                  {(sermon.type === "youtube" || sermon.type === "both") && (
                    <a
                      href={sermon.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-cinzel font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Youtube size={20} />
                      <span>Watch on YouTube</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

