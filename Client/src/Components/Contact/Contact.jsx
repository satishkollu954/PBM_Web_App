import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../UI/Accordion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Clock,
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#0a0f1e] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#c9a84c] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
            Reach Out
          </span>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6">
            Get in Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0d1b2a] border border-[#c9a84c]/20 p-8 rounded-2xl backdrop-blur-sm shadow-xl"
          >
            <h3 className="text-2xl font-cinzel font-bold text-white mb-6">
              Send a Message
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#0a0f1e] border border-[#c9a84c]/30 rounded p-3 text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-[#0a0f1e] border border-[#c9a84c]/30 rounded p-3 text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-semibold">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  className="w-full bg-[#0a0f1e] border border-[#c9a84c]/30 rounded p-3 text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-semibold">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-[#0a0f1e] border border-[#c9a84c]/30 rounded p-3 text-white focus:outline-none focus:border-[#c9a84c] transition-colors"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full mt-4 py-3 rounded bg-gradient-to-r from-[#c9a84c] to-[#f0c040] text-[#0a0f1e] font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_15px_rgba(201,168,76,0.4)] transition-all"
              >
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-[#c9a84c]/10">
              <h3 className="text-xl font-cinzel font-bold text-[#c9a84c] mb-4">
                Prayer Request
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Need prayer? Our team would be honored to pray for you. All
                requests are kept confidential.
              </p>
              <button className="text-white border border-white hover:border-[#c9a84c] hover:text-[#c9a84c] px-6 py-2 rounded text-xs uppercase tracking-widest font-bold transition-colors">
                Submit Request
              </button>
            </div>
          </motion.div>

          {/* Info & FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 p-6 rounded-xl text-center">
                <MapPin className="text-[#c9a84c] mx-auto mb-3" size={28} />
                <h4 className="font-cinzel text-white font-bold mb-1">
                  Location
                </h4>
                <p className="text-sm text-gray-400">
                  123 Grace Avenue
                  <br />
                  Cityville, ST 12345
                </p>
              </div>
              <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 p-6 rounded-xl text-center">
                <Clock className="text-[#c9a84c] mx-auto mb-3" size={28} />
                <h4 className="font-cinzel text-white font-bold mb-1">
                  Services
                </h4>
                <p className="text-sm text-gray-400">
                  Sundays at 10:00 AM
                  <br />
                  Wednesdays at 7:00 PM
                </p>
              </div>
            </div>

            {/* Socials */}
            <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 p-6 rounded-xl flex justify-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#c9a84c] transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c9a84c] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c9a84c] transition-colors"
              >
                <Youtube size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c9a84c] transition-colors"
              >
                <Twitter size={24} />
              </a>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 p-8 rounded-xl flex-1">
              <h3 className="text-xl font-cinzel font-bold text-white mb-6">
                Frequently Asked Questions
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-[#c9a84c]/20">
                  <AccordionTrigger className="text-white hover:text-[#c9a84c] text-left">
                    What should I wear?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    Come as you are! You'll see everything from suits and
                    dresses to jeans and t-shirts. We care about you, not your
                    wardrobe.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b-[#c9a84c]/20">
                  <AccordionTrigger className="text-white hover:text-[#c9a84c] text-left">
                    Is there a program for kids?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    Yes! We have Grace Kids programs during our Sunday services
                    for infants through 5th grade, staffed by background-checked
                    volunteers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b-[#c9a84c]/20">
                  <AccordionTrigger className="text-white hover:text-[#c9a84c] text-left">
                    How long are the services?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    Our Sunday services typically last about 75-90 minutes and
                    include contemporary worship and a biblical, practical
                    message.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-none">
                  <AccordionTrigger className="text-white hover:text-[#c9a84c] text-left">
                    Do you stream services online?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    Yes, all our Sunday services are streamed live on our
                    website and YouTube channel.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto h-[400px] bg-[#1a2333] rounded-2xl border border-[#c9a84c]/20 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="text-center z-10">
            <MapPin className="text-[#c9a84c] mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-cinzel font-bold text-white mb-2">
              Google Maps Integration
            </h3>
            <p className="text-gray-500">Map coordinates placeholder</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
