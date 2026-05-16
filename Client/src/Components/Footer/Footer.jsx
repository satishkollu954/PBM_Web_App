import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050811] pt-8 pb-4 border-t-2 border-[#c9a84c]/50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#c9a84c]/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="text-xl font-cinzel font-bold text-[#c9a84c] flex items-center mb-4"
            >
              <span className="mr-2 text-2xl">&#10013;</span>
              PBM Church
            </a>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              A community of faith, hope, and love. Gathering to worship,
              scattering to serve, growing in grace together.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#0d1b2a] border border-[#c9a84c]/20 flex items-center justify-center text-gray-400 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#0d1b2a] border border-[#c9a84c]/20 flex items-center justify-center text-gray-400 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#0d1b2a] border border-[#c9a84c]/20 flex items-center justify-center text-gray-400 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#0d1b2a] border border-[#c9a84c]/20 flex items-center justify-center text-gray-400 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Address branches */}
          <div>
            <h4 className="text-white font-cinzel font-bold mb-6 text-lg">
              Nagulanka Branch
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  📍
                </div>

                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    123 Sacred Light Ave,
                    <br />
                    Graceville, GL 45678
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  ☎
                </div>

                <p className="text-gray-300 text-sm">(555) 123-4567</p>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  ✉
                </div>

                <p className="text-gray-300 text-sm">hello@gracechurch.com</p>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  🕒
                </div>

                <p className="text-gray-300 text-sm">
                  Sunday Services:
                  <br />
                  9:00 AM & 11:30 AM
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-cinzel font-bold mb-6 text-lg">
              Marteru Branch
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  📍
                </div>

                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    123 Sacred Light Ave,
                    <br />
                    Graceville, GL 45678
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  ☎
                </div>

                <p className="text-gray-300 text-sm">(555) 123-4567</p>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  ✉
                </div>

                <p className="text-gray-300 text-sm">hello@gracechurch.com</p>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  🕒
                </div>

                <p className="text-gray-300 text-sm">
                  Sunday Services:
                  <br />
                  9:00 AM & 11:30 AM
                </p>
              </li>
            </ul>
          </div>

          {/* Daily Verse Card */}
          <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xl hover:border-[#c9a84c]/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] text-xl mb-6">
              ♡
            </div>

            <h3 className="text-2xl font-cinzel text-white mb-6">
              Daily Verse
            </h3>

            <p className="text-gray-300 italic leading-7 text-sm max-w-sm">
              "Your word is a lamp to my feet and a light to my path."
            </p>

            <p className="mt-6 text-[#c9a84c] font-bold tracking-widest uppercase">
              Psalm 119:105
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} PBM Church. All rights reserved.
          </p>
          <div className="text-center md:text-right">
            <p className="text-[#c9a84c] font-cinzel italic">
              "For I know the plans I have for you..." — Jeremiah 29:11
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
