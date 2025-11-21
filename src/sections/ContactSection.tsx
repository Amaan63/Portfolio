"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useInView } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contactRef, { once: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setFormData({ name: "", email: "", subject: "", message: "" });
      alert("Thanks for reaching out! Check your email 🚀");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-black text-white"
      ref={contactRef}
    >
      <div className="max-w-[1800px] w-full mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold text-lg mb-4">
            <Send size={20} className="text-cyan-400" />
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's Create Something Amazing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Got a project in mind? Want to collaborate? Or just want to say hi?
            Drop me a message and let's chat! ☕
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>

              <div className="space-y-6">
                {[
                  {
                    icon: <Mail size={20} />,
                    label: "Email",
                    value: "amaansayed63@gmail.com",
                    href: "mailto:amaansayed63@gmail.com",
                  },
                  {
                    icon: <Phone size={20} />,
                    label: "Phone",
                    value: "+91 8433829855",
                    href: "tel:+918433829855",
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: "Location",
                    value: "Mumbai, India",
                    href: "#",
                  },
                ].map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all group"
                    whileHover={{ x: 10 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white">
                      {contact.icon}
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{contact.label}</p>
                      <p className="font-medium group-hover:text-cyan-400 transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-gray-400 mb-4">Find me on</p>

                <div className="flex gap-4">
                  {[
                    {
                      icon: FaGithub,
                      href: "https://github.com/Amaan63",
                      color: "hover:text-white",
                    },
                    {
                      icon: FaLinkedin,
                      href: "https://linkedin.com/in/amaansayyed63",
                      color: "hover:text-blue-400",
                    },
                    {
                      icon: FaTwitter,
                      href: "https://twitter.com/amaansayyed63",
                      color: "hover:text-blue-400",
                    },
                    {
                      icon: FaInstagram,
                      href: "#",
                      color: "hover:text-pink-400",
                    },
                  ].map(({ icon: Icon, href, color }, index) => (
                    <motion.a
                      key={index}
                      href={href}
                      target="_blank"
                      className={`p-3 bg-gray-800 rounded-lg text-gray-400 ${color} transition-all`}
                      whileHover={{ y: -5, scale: 1.1 }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Send Message</h3>

            <div className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white"
                    placeholder="Your awesome name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white"
                  placeholder="Let's build something cool!"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors text-white resize-none"
                  placeholder="Tell me about your amazing project idea..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
