import { motion } from "framer-motion";
import { Eye, Target, Star, Quote } from "lucide-react";

export default function Vision() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="vision" className="py-24 bg-[#FFFDF5] relative">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#c9a84c]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[#7A5C00] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
              Where We Are Going
            </span>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#1E1535] mb-6">
              Vision, Mission & Values
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Vision */}
            <motion.div
              variants={itemVariants}
              className="relative group p-1 rounded-2xl bg-gradient-to-b from-[#c9a84c]/30 to-transparent hover:from-[#c9a84c]/50 transition-all duration-300"
            >
              <div className="bg-white h-full rounded-xl p-8 backdrop-blur-sm border border-[#c9a84c]/40">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c9a84c]/20 to-transparent rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="text-[#c9a84c]" size={32} />
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-[#1E1535] mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  To see our city transformed by the power of the Gospel,
                  creating a community where every individual experiences the
                  profound grace and light of Jesus Christ.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              variants={itemVariants}
              className="relative group p-1 rounded-2xl bg-gradient-to-b from-[#c9a84c]/30 to-transparent hover:from-[#c9a84c]/50 transition-all duration-300"
            >
              <div className="bg-white h-full rounded-xl p-8 backdrop-blur-sm border border-[#c9a84c]/40">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c9a84c]/20 to-transparent rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="text-[#c9a84c]" size={32} />
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-[#1E1535] mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  To lead people into a growing relationship with Jesus Christ
                  through passionate worship, deep biblical teaching, and
                  intentional community service.
                </p>
              </div>
            </motion.div>

            {/* Core Values */}
            <motion.div
              variants={itemVariants}
              className="relative group p-1 rounded-2xl bg-gradient-to-b from-[#c9a84c]/30 to-transparent hover:from-[#c9a84c]/50 transition-all duration-300"
            >
              <div className="bg-white h-full rounded-xl p-8 backdrop-blur-sm border border-[#c9a84c]/40">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c9a84c]/20 to-transparent rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="text-[#c9a84c]" size={32} />
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-[#1E1535] mb-4">
                  Core Values
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Biblical Truth, Authentic Community, Relentless Grace,
                  Sacrificial Love, and Spirit-led Living are the pillars that
                  guide our every action.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bible Verse */}
          <motion.div
            variants={itemVariants}
            className="text-center relative py-12"
          >
            <Quote className="text-[#c9a84c]/20 w-32 h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <h3 className="text-2xl md:text-4xl font-cinzel text-[#1E1535] leading-relaxed max-w-4xl mx-auto relative z-10">
              "Your word is a lamp for my feet, a light on my path."
            </h3>
            <p className="text-[#c9a84c] font-cinzel mt-6 text-xl tracking-widest relative z-10">
              — Psalm 119:105
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}







