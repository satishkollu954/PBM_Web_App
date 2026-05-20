import { motion } from "framer-motion";
import { Eye, Target, Star } from "lucide-react";

export default function About() {
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
    <section id="about" className="py-24 bg-[#0d1b2a] relative">
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
            <span className="text-[#c9a84c] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6">
              Our Story & Purpose
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              PBM Church is more than just a place to attend on Sundays. We are
              a family of believers dedicated to living out the Gospel in our
              daily lives. Our doors are open to everyone, regardless of where
              they are on their spiritual journey.
            </p>
          </div>

          {/* Vision, Mission & Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div
              variants={itemVariants}
              className="relative group p-1 rounded-2xl bg-gradient-to-b from-[#c9a84c]/30 to-transparent hover:from-[#c9a84c]/50 transition-all duration-300"
            >
              <div className="bg-[#0d1b2a] h-full rounded-xl p-8 backdrop-blur-sm border border-[#c9a84c]/10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c9a84c]/20 to-transparent rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="text-[#c9a84c]" size={32} />
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  To see our city transformed by the power of the Gospel,
                  creating a community where every individual experiences the
                  profound grace and light of Jesus Christ.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative group p-1 rounded-2xl bg-gradient-to-b from-[#c9a84c]/30 to-transparent hover:from-[#c9a84c]/50 transition-all duration-300"
            >
              <div className="bg-[#0d1b2a] h-full rounded-xl p-8 backdrop-blur-sm border border-[#c9a84c]/10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c9a84c]/20 to-transparent rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="text-[#c9a84c]" size={32} />
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  To lead people into a growing relationship with Jesus Christ
                  through passionate worship, deep biblical teaching, and
                  intentional community service.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative group p-1 rounded-2xl bg-gradient-to-b from-[#c9a84c]/30 to-transparent hover:from-[#c9a84c]/50 transition-all duration-300"
            >
              <div className="bg-[#0d1b2a] h-full rounded-xl p-8 backdrop-blur-sm border border-[#c9a84c]/10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c9a84c]/20 to-transparent rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="text-[#c9a84c]" size={32} />
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
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

          {/* Pastor Message */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-[#0a0f1e] to-[#0d1b2a] border border-[#c9a84c]/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#c9a84c]/10 rounded-full blur-[60px] pointer-events-none"></div>

            {/* <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-2 border-[#c9a84c] p-1">
              <div className="w-full h-full bg-[#1a2333] rounded-full flex items-center justify-center text-[#c9a84c] font-cinzel text-xl">
                Photo
              </div>
            </div> */}

            <div className="flex-1 text-center md:text-left z-10">
              {/* <h3 className="text-2xl font-cinzel font-bold text-white mb-2">
                A Message from Our Pastor
              </h3> */}
              {/* <h4 className="text-[#c9a84c] mb-6">Pastor David Emmanuel</h4> */}
              <p className="text-gray-300 italic mb-6 text-lg leading-relaxed relative">
                {/* <span className="text-4xl text-[#c9a84c]/30 absolute -top-4 -left-6 font-serif">
                  "
                </span>
                We are thrilled that you found us. Whether you are seeking
                answers, looking for a spiritual home, or simply passing
                through, our prayer is that you experience the profound peace
                and undeniable presence of God here.
                <span className="text-4xl text-[#c9a84c]/30 absolute -bottom-6 -right-2 font-serif">
                  "
                </span> */}
                Photo from marteru and nagullanka
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
