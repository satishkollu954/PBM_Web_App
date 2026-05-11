import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050811] pt-20 pb-10 border-t-2 border-[#c9a84c]/50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#c9a84c]/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="text-2xl font-cinzel font-bold text-[#c9a84c] flex items-center mb-4"
            >
              <span className="mr-2 text-3xl">&#10013;</span>
              PBM Church
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
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

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-cinzel font-bold mb-6 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Home",
                "About Us",
                "Sermons",
                "Events",
                "Articles",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="text-gray-400 hover:text-[#c9a84c] text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h4 className="text-white font-cinzel font-bold mb-6 text-lg">
              Ministries
            </h4>
            <ul className="space-y-3">
              {[
                "Grace Kids",
                "Youth Ministry",
                "Men's Fellowship",
                "Women of Grace",
                "Worship Team",
                "Community Outreach",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#c9a84c] text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-cinzel font-bold mb-6 text-lg">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <strong className="text-white block mb-1">Address:</strong>
                123 Grace Avenue
                <br />
                Cityville, ST 12345
              </li>
              <li>
                <strong className="text-white block mb-1">Email:</strong>
                hello@gracelightchurch.com
              </li>
              <li>
                <strong className="text-white block mb-1">Phone:</strong>
                (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
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
