// src/Components/NotFound/NotFound.jsx

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#081120] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#c9a84c]/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c9a84c]/10 blur-3xl rounded-full"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative z-10 text-center max-w-3xl"
      >
        {/* 404 */}
        <h1 className="text-[120px] md:text-[180px] font-black text-[#c9a84c] leading-none">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
          Page Not Found
        </h2>

        {/* Message */}
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          The page you are looking for does not exist or may have been moved.
          <br />
          God’s love never gets lost, but this page did.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {/* Home */}
          <Link
            to="/"
            className="bg-[#c9a84c] hover:bg-[#d8b45a] text-[#081120] font-bold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg"
          >
            <Home size={20} />
            Back To Home
          </Link>
        </div>

        {/* Bible Verse */}
        <div className="mt-16 border-t border-[#c9a84c]/10 pt-8">
          <p className="text-[#c9a84c] italic text-lg">
            “For I know the plans I have for you,” declares the Lord.
          </p>

          <p className="text-gray-500 mt-2">Jeremiah 29:11</p>
        </div>
      </motion.div>
    </section>
  );
}
