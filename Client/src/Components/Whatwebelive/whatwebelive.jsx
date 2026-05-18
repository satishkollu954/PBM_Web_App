import { motion } from "framer-motion";
import { Heart, Sun, Anchor } from "lucide-react";

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
            <h2 className="text-[#c9a84c] font-cinzel  tracking-[0.2em] text-4xl md:text-5xl font-bold block mb-6">
             What We Belive
            </h2>
            {/* <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6">
              Our Story & Purpose
            </h2> */}
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
               "God created the creation necessary for all mankind, and then He made man in His own image and after His likeness.
                God created human beings for His glory, but man showed disobedience to God and learned to rely on his own will rather than God's will.
                Even so, God did not leave us to our own desires. Knowing that every human being is wallowing in sin, He sacrificed His beloved Son for our sake.
                Just as God loved His children and granted His Son, His Son loved His brothers and sisters so much that He gave His very life for them."
            </p>
          </div>

          {/* Beliefs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div
              variants={itemVariants}
              className="bg-[#0a0f1e] border border-[#c9a84c]/20 p-8 rounded-xl backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-14 h-14 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/20 transition-colors">
                <Anchor className="text-[#c9a84c]" size={28} />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
                Forgiveness
              </h3>
              <p className="text-gray-400 leading-relaxed">
                The journey of a new believer is a beautiful path of grace, 
                where forgiveness is received through 
                faith and every step is guided by love, prayer, and divine promises.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#0a0f1e] border border-[#c9a84c]/20 p-8 rounded-xl backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-14 h-14 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/20 transition-colors">
                <Sun className="text-[#c9a84c]" size={28} />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
                Repentence
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Repentance is a sincere change of heart and mind, 
                where we turn away from wrong choices and embrace 
                a new life of forgiveness and grace.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#0a0f1e] border border-[#c9a84c]/20 p-8 rounded-xl backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-14 h-14 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/20 transition-colors">
                <Heart className="text-[#c9a84c]" size={28} />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
                Salvation
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Salvation is God's gift of deliverance from sin, 
                bringing a transformed life today and the promise of eternal life through faith.
              </p>
            </motion.div>
          </div>

          {/* Pastor Message */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-[#0a0f1e] to-[#0d1b2a] border border-[#c9a84c]/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#c9a84c]/10 rounded-full blur-[60px] pointer-events-none"></div>

            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-2 border-[#c9a84c] p-1">
              <div className="w-full h-full bg-[#1a2333] rounded-full flex items-center justify-center text-[#c9a84c] font-cinzel text-xl">
                Photo
              </div>
            </div>

            <div className="flex-1 text-center md:text-left z-10">
              <h3 className="text-2xl font-cinzel font-bold text-white mb-2">
                A Message from Our Pastor
              </h3>
              <h4 className="text-[#c9a84c] mb-6">Pastor David Emmanuel</h4>
              <p className="text-gray-300 italic mb-6 text-lg leading-relaxed relative">
                <span className="text-4xl text-[#c9a84c]/30 absolute -top-4 -left-6 font-serif">
                  "
                </span>
                We are thrilled that you found us. Whether you are seeking
                answers, looking for a spiritual home, or simply passing
                through, our prayer is that you experience the profound peace
                and undeniable presence of God here.
                <span className="text-4xl text-[#c9a84c]/30 absolute -bottom-6 -right-2 font-serif">
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
