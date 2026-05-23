import { motion } from "framer-motion";
import { Heart, Sun, Anchor } from "lucide-react";
import pastorImage from "../../assets/pastor.jpeg";

export default function Whatwebelive() {
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
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 70 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <section id="whaatwebelive" className="py-24 bg-[#0d1b2a] relative">
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
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={headingVariants}
              className="text-[#c9a84c] font-cinzel tracking-[0.3em] text-5xl md:text-6xl font-bold block mb-6 drop-shadow-lg"
            >
              What We Believe
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={textVariants}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light italic"
            >
              "God created the creation necessary for all mankind, and then He made man in His own image and after His likeness.
              God created human beings for His glory, but man showed disobedience to God and learned to rely on his own will rather than God's will.
              Even so, God did not leave us to our own desires. Knowing that every human being is wallowing in sin, He sacrificed His beloved Son for our sake.
              Just as God loved His children and granted His Son, His Son loved His brothers and sisters so much that He gave His very life for them."
            </motion.p>
          </div>

          {/* Beliefs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="bg-[#0a0f1e] border border-[#c9a84c]/20 p-8 rounded-xl backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-14 h-14 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/20 transition-colors">
                <Anchor className="text-[#c9a84c]" size={28} />
              </div>
              <h3 className="text-3xl font-cinzel font-bold text-white mb-4 tracking-wide">
                Forgiveness
              </h3>
              <p className="text-gray-300 leading-relaxed font-light text-base">
                The journey of a new believer is a beautiful path of grace, 
                where forgiveness is received through 
                faith and every step is guided by love, prayer, and divine promises.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              transition={{ delay: 0.1 }}
              className="bg-[#0a0f1e] border border-[#c9a84c]/20 p-8 rounded-xl backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-14 h-14 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/20 transition-colors">
                <Sun className="text-[#c9a84c]" size={28} />
              </div>
              <h3 className="text-3xl font-cinzel font-bold text-white mb-4 tracking-wide">
                Repentence
              </h3>
              <p className="text-gray-300 leading-relaxed font-light text-base">
                Repentance is a sincere change of heart and mind, 
                where we turn away from wrong choices and embrace 
                a new life of forgiveness and grace.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              transition={{ delay: 0.2 }}
              className="bg-[#0a0f1e] border border-[#c9a84c]/20 p-8 rounded-xl backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-14 h-14 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/20 transition-colors">
                <Heart className="text-[#c9a84c]" size={28} />
              </div>
              <h3 className="text-3xl font-cinzel font-bold text-white mb-4 tracking-wide">
                Salvation
              </h3>
              <p className="text-gray-300 leading-relaxed font-light text-base">
                Salvation is God's gift of deliverance from sin, 
                bringing a transformed life today and the promise of eternal life through faith.
              </p>
            </motion.div>
          </div>

          {/* Pastor Message */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={itemVariants}
            className="bg-gradient-to-r from-[#0a0f1e] to-[#0d1b2a] border border-[#c9a84c]/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#c9a84c]/10 rounded-full blur-[60px] pointer-events-none"></div>

            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-2 border-[#c9a84c] p-1">
              <img
                src={pastorImage}
                alt="Bro. Pratap Kumar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left z-10">
              <h3 className="text-3xl font-cinzel font-bold text-white mb-2 tracking-wide">
                A Message from Our Pastor
              </h3>
              <h4 className="text-[#c9a84c] mb-6 text-xl font-cinzel tracking-widest">Bro. Pratap Kumar</h4>
              <p className="text-gray-200 italic mb-6 text-lg leading-relaxed relative font-light">
                <span className="text-5xl text-[#c9a84c]/40 absolute -top-6 -left-8 font-serif">
                  "
                </span>
                We are thrilled that you found us. Whether you are seeking
                answers, looking for a spiritual home, or simply passing
                through, our prayer is that you experience the profound peace
                and undeniable presence of God here.
                <span className="text-5xl text-[#c9a84c]/40 absolute -bottom-8 -right-2 font-serif">
                  "
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
