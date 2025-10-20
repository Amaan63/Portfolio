"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Handle Scroll for header blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 GSAP intro animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate TO a visible state
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Animate the nav ref TO a visible state
    tl.to(
      navRef.current, // Target the parent nav directly
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },

    );
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", icon: "🏠", color: "text-cyan-400" },
    { label: "About", href: "#about", icon: "👨‍💻", color: "text-purple-400" },
    { label: "Experience", href: "#experience", icon: "💼", color: "text-green-400" },
    { label: "Skills", href: "#skills", icon: "⚡", color: "text-yellow-400" },
    { label: "Projects", href: "#projects", icon: "🚀", color: "text-pink-400" },
    { label: "HackerRank", href: "#hackerrank", icon: "🏆", color: "text-orange-400" },
    { label: "Vibes", href: "#vibes", icon: "🎵", color: "text-indigo-400" },
    { label: "Contact", href: "#contact", icon: "📱", color: "text-red-400" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
        ? "bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 🔹 Logo */}
          <motion.div
            ref={logoRef}
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="flex items-center gap-3 cursor-pointer opacity-0" // ✅ CHANGE: Added opacity-0
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl opacity-30 blur-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                maan.dev
              </span>
              <div className="text-xs text-gray-400">Portfolio v3.0</div>
            </div>
          </motion.div>

          {/* 🔹 Desktop Nav */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-3 py-2 border border-white/20 opacity-0"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                // ✅ CHANGES ARE HERE 👇
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium relative group opacity-80 hover:opacity-100 hover:bg-white/10 ${link.color}`}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {/* The color class is no longer needed here */}
                <span className="text-lg">{link.icon}</span>
                <span className="hidden lg:block">{link.label}</span>
              </motion.a>
            ))}
          </nav>


          {/* 🔹 Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>

        {/* 🔹 Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="lg:hidden mt-4 bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <div className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium relative group opacity-80 hover:opacity-100 hover:bg-white/10 ${link.color}`}
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );

};
export default Header;