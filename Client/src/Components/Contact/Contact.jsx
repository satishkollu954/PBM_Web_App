// Contact.jsx

import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../UI/Accordion";

import { MapPin, Instagram, Youtube, Clock, Phone } from "lucide-react";

const CHURCH_LOCATIONS = [
  {
    name: "Nagullanka Church",
    address: "Nagullanka, Andhra Pradesh, India",
    embedUrl:
      "https://maps.google.com/maps?q=16.522144929668684,81.8708120576718&z=15&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=16.522144929668684,81.8708120576718",
  },
  {
    name: "Marteru Church",
    address: "Marteru, Andhra Pradesh, India",
    embedUrl:
      "https://maps.google.com/maps?q=16.619979972510027,81.73781285343578&z=15&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=16.619979972510027,81.73781285343578",
  },
];

export default function Contact() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",

    phoneNumber: "",

    email: "",

    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Remove Error While Typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validate
  const validateForm = () => {
    let newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter valid 10 digit phone number";
    }

    // Email Optional
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/contact/create`,
        formData,
      );

      toast.success(response.data.message);

      // Reset Form
      setFormData({
        name: "",

        phoneNumber: "",

        email: "",

        message: "",
      });

      setErrors({});
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FFFDF5] relative">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#7A5C00] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
            Reach Out
          </span>

          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#1E1535] mb-6">
            Get in Touch
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className="bg-white border border-[#c9a84c]/40 p-8 rounded-2xl backdrop-blur-sm shadow-xl"
          >
            <h3 className="text-2xl font-cinzel font-bold text-[#1E1535] mb-6">
              Send a Message
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm text-[#33275A] font-semibold">
                  Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full bg-white border rounded p-3 text-[#1E1535] focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-500"
                      : "border-[#c9a84c]/50 focus:border-[#c9a84c]"
                  }`}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm text-[#33275A] font-semibold">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`w-full bg-white border rounded p-3 text-[#1E1535] focus:outline-none transition-colors ${
                    errors.phoneNumber
                      ? "border-red-500"
                      : "border-[#c9a84c]/50 focus:border-[#c9a84c]"
                  }`}
                />

                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-[#33275A] font-semibold">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className={`w-full bg-white border rounded p-3 text-[#1E1535] focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#c9a84c]/50 focus:border-[#c9a84c]"
                  }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm text-[#33275A] font-semibold">
                  Message
                </label>

                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="w-full bg-white border border-[#c9a84c]/50 rounded p-3 text-[#1E1535] focus:outline-none focus:border-[#c9a84c] transition-colors"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 rounded bg-gradient-to-r from-[#c9a84c] to-[#f0c040] text-[#0a0f1e] font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_15px_rgba(201,168,76,0.4)] transition-all disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className="flex flex-col gap-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="bg-white border border-[#c9a84c]/40 p-6 rounded-xl text-center">
                <Phone className="text-[#c9a84c] mx-auto mb-3" size={28} />

                <h4 className="font-cinzel text-[#1E1535] font-bold mb-1">
                  Phone
                </h4>

                <p className="text-sm text-[#33275A]">+91 9948478889</p>
              </div>

              {/* Services */}
              <div className="bg-white border border-[#c9a84c]/40 p-6 rounded-xl text-center">
                <Clock className="text-[#c9a84c] mx-auto mb-3" size={28} />

                <h4 className="font-cinzel text-[#1E1535] font-bold mb-3">
                  Services
                </h4>

                <div className="text-left space-y-3">
                  <div>
                    <p className="text-xs text-[#7A5C00] font-cinzel font-bold uppercase tracking-wide mb-1">
                      Nagullanka
                    </p>
                    <p className="text-sm text-[#33275A]">
                      Fri: 10:00 AM & 1:30 PM
                      <br />
                      Sun: 11:00 AM & 1:30 PM
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7A5C00] font-cinzel font-bold uppercase tracking-wide mb-1">
                      Marteru
                    </p>
                    <p className="text-sm text-[#33275A]">
                      Sat: 10:00 AM & 1:00 PM
                      <br />
                      Sun: 7:30 AM & 10:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="bg-white border border-[#c9a84c]/40 p-6 rounded-xl flex justify-center gap-6">
              <a href="#" className="text-[#33275A] hover:text-[#c9a84c]">
                <Instagram size={24} />
              </a>

              <a href="#" className="text-[#33275A] hover:text-[#c9a84c]">
                <Youtube size={24} />
              </a>
            </div>

            {/* FAQ */}
            <div className="bg-white border border-[#c9a84c]/40 p-8 rounded-xl flex-1">
              <h3 className="text-xl font-cinzel font-bold text-[#1E1535] mb-6">
                Frequently Asked Questions
              </h3>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[#1E1535]">
                    What should I wear?
                  </AccordionTrigger>

                  <AccordionContent className="text-[#33275A]">
                    Come as you are! Everyone is welcome.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-[#1E1535]">
                    Is there a kids program?
                  </AccordionTrigger>

                  <AccordionContent className="text-[#33275A]">
                    Yes, we have special programs for children during Sunday
                    services.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-[#1E1535]">
                    Do you stream online?
                  </AccordionTrigger>

                  <AccordionContent className="text-[#33275A]">
                    Yes, all our services are streamed live on YouTube.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        </div>

        {/* Church Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="text-[#7A5C00] font-cinzel uppercase tracking-[0.2em] text-sm font-bold block mb-3">
              Find Us
            </span>
            <h3 className="text-3xl font-cinzel font-bold text-[#1E1535]">
              Our Locations
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CHURCH_LOCATIONS.map((church) => (
              <div
                key={church.name}
                className="bg-white border border-[#c9a84c]/40 rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Card header */}
                <div className="p-5 flex items-center gap-3 border-b border-[#c9a84c]/20">
                  <MapPin className="text-[#c9a84c] shrink-0" size={20} />
                  <h4 className="font-cinzel font-bold text-[#1E1535] text-lg">
                    {church.name}
                  </h4>
                </div>

                {/* Embedded map */}
                <iframe
                  src={church.embedUrl}
                  title={`Map for ${church.name}`}
                  className="w-full h-[280px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />

                {/* Address + directions */}
                <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-sm text-[#33275A] leading-relaxed">
                    {church.address}
                  </p>
                  <a
                    href={church.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-5 py-2 rounded bg-gradient-to-r from-[#c9a84c] to-[#f0c040] text-[#0a0f1e] font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_15px_rgba(201,168,76,0.4)] transition-all"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}








