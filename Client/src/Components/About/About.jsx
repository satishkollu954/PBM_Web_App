import { motion } from "framer-motion";
import { Eye, Target, Star } from "lucide-react";
import pbmnglImage from "../../assets/pbmngl.jpeg";
import pbmmrtImage from "../../assets/pbmmrt.jpeg";

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

  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.15 },
    },
  };

  const photoSectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const photoCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
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
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={headingVariants}
              className="text-[#c9a84c] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3"
            >
              Who We Are
            </motion.span>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={headingVariants}
              className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6"
            >
              Our Story & Purpose
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants}
              className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
            >
              PBM Church is more than just a place to attend on Sundays. We are
              a family of believers dedicated to living out the Gospel in our
              daily lives. Our doors are open to everyone, regardless of where
              they are on their spiritual journey.
            </motion.p>
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={photoSectionVariants}
            className="rounded-2xl p-8 md:p-12 flex flex-col items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#c9a84c]/10 rounded-full blur-[60px] pointer-events-none"></div>

            <div className="w-full grid gap-6">
              <motion.div
                variants={photoCardVariants}
                className="w-full h-44 md:h-56 rounded-3xl overflow-hidden border border-[#c9a84c]/30 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
              >
                <img
                  src={pbmnglImage}
                  alt="Photo from pbmngl"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                variants={photoCardVariants}
                className="w-full h-44 md:h-56 rounded-3xl overflow-hidden border border-[#c9a84c]/30 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
              >
                <img
                  src={pbmmrtImage}
                  alt="Photo from pbmmrt"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                variants={photoCardVariants}
                className="text-center md:text-left px-2"
              >
                <h3 className="text-xl md:text-2xl font-cinzel font-bold text-white mb-3 tracking-wide">
                  Photo Memories
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                  These images capture joyful moments from our church family gatherings in Marteru and Nagullanka. They reflect our togetherness, celebration, and the warm fellowship that defines PBM.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
