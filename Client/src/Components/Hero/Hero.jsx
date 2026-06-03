import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background glow and effects */}
      <div className="absolute inset-0 bg-[#FFFDF5] z-0"></div>
      {/* Warm gold dual glow — spiritual atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#c9a84c]/8 rounded-full blur-[170px] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 left-1/3 w-[700px] h-[700px] bg-[#c9a84c]/12 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Animated Particles/Noise placeholder overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 mix-blend-overlay pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[#7A5C00] font-cinzel uppercase tracking-[0.3em] text-sm md:text-base block mb-4">
            Where Faith Meets Community
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold text-[#1E1535] mb-6 leading-tight drop-shadow-lg">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] to-[#f0c040]">
              PBM Church
            </span>
          </h1>
          <p className="text-[#33275A] text-lg md:text-xl max-w-2xl mx-auto mb-10 font-lato leading-relaxed">
            Experience the transformative power of God's love in a community
            that embraces you just as you are. Join us in worship, fellowship,
            and growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0c040] text-[#0a0f1e] font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(201,168,76,0.6)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Join Worship
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        {/* <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-[#c9a84c] flex flex-col items-center hover:text-[#f0c040] transition-colors"
        >
          <span className="uppercase tracking-widest text-xs mb-2">Scroll</span>
          <ChevronDown size={24} />
        </motion.a> */}
      </motion.div>
    </section>
  );
}
