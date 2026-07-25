import { Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
export default function Footer() {
  const [dailyVerse, setDailyVerse] = useState({
    text: "Loading verse...",
    reference: "",
  });

  useEffect(() => {
    const verses = [
      "John 3:16",
      "Psalm 23:1",
      "Philippians 4:13",
      "Jeremiah 29:11",
      "Proverbs 3:5",
      "Joshua 1:9",
      "Romans 8:28",
      "Isaiah 41:10",
      "Psalm 119:105",
      "1 Peter 5:7",
      "Matthew 11:28",
      "Psalm 46:1",
      "Hebrews 11:1",
      "Colossians 3:23",
      "2 Timothy 1:7",
    ];

    const dayNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

    const reference = verses[dayNumber % verses.length];

    fetch(`https://bible-api.com/${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data) => {
        setDailyVerse({
          text: data.text?.trim() || "Verse unavailable",
          reference: data.reference || "",
        });
      })
      .catch((error) => {
        console.error("Bible API Error:", error);

        setDailyVerse({
          text: "The Lord is my shepherd; I shall not want.",
          reference: "Psalm 23:1",
        });
      });
  }, []);

  return (
    <footer className="bg-[#1C1608] pt-8 pb-4 border-t-2 border-[#c9a84c]/50 relative overflow-hidden">
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
            <p className="text-gray-300 text-xs leading-relaxed mb-4">
              A community of faith, hope, and love. Gathering to worship,
              scattering to serve, growing in grace together.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#3A3020] border border-[#c9a84c]/20 flex items-center justify-center text-gray-300 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#3A3020] border border-[#c9a84c]/20 flex items-center justify-center text-gray-300 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Address branches */}
          <div>
            <h4 className="text-white font-cinzel font-bold mb-6 text-lg">
              Nagullanka Branch
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  📍
                </div>

                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Nagullanka,
                    <br />
                    Andhra Pradesh, India
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  ☎
                </div>

                <p className="text-gray-300 text-sm">+91 9948478889</p>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  ✉
                </div>

                <p className="text-gray-300 text-sm">pbmchurch.app@gmail.com</p>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  🕒
                </div>

                <p className="text-gray-300 text-sm">
                  Friday Services:
                  <br />
                  10:00 AM & 1:30 PM
                </p>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  🕒
                </div>

                <p className="text-gray-300 text-sm">
                  Sunday Services:
                  <br />
                  11:00 AM & 1:30 PM
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
                    Marteru,
                    <br />
                    Andhra Pradesh, India
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  ☎
                </div>

                <p className="text-gray-300 text-sm">+91 9948478889</p>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  ✉
                </div>

                <p className="text-gray-300 text-sm">pbmchurch.app@gmail.com</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  🕒
                </div>
                <p className="text-gray-300 text-sm">
                  Saturday Services:
                  <br />
                  10:00 AM & 1:00 PM
                </p>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
                  🕒
                </div>

                <p className="text-gray-300 text-sm">
                  Sunday Services:
                  <br />
                  7:30 AM & 10:00 AM
                </p>
              </li>
            </ul>
          </div>

          {/* Daily Verse */}
          <div className="bg-[#2E2510] border border-[#c9a84c]/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xl hover:border-[#c9a84c]/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] text-xl mb-6">
              ♡
            </div>

            <h3 className="text-2xl font-cinzel text-white mb-6">
              Daily Verse
            </h3>

            <p className="text-gray-300 italic leading-7 text-sm max-w-sm">
              "{dailyVerse.text}"
            </p>

            <p className="mt-6 text-[#c9a84c] font-bold tracking-widest uppercase">
              {dailyVerse.reference}
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
