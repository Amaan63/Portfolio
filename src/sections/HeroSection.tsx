"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Code, Coffee, Download, Zap } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandSpotify, IconBrandTwitter } from "@tabler/icons-react";
import heroImage from "@/assets/Images/Peter.jpeg";
import Image from "next/image";

// Define a type for our dot's random properties for better TypeScript support
type DotConfig = {
  left: string;
  top: string;
  duration: number;
  delay: number;
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Create state to hold the dot configurations
  const [dots, setDots] = useState<DotConfig[]>([]);

  const roles = [
    "Full Stack Developer",
    "Java Enthusiast",
    "React Explorer",
    "Problem Solver",
    "Coffee Addict ☕",
  ];

  // ✅ FIX: Generate random dot values ONLY on the client to prevent hydration errors
  useEffect(() => {
    const newDots = [...Array(80)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
    setDots(newDots);
  }, []); // The empty array [] ensures this effect runs only once on the client

  // Role switching interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const handleHireMe = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00f5ff", "#8b5cf6", "#f59e0b", "#10b981"],
    });
  };

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-black scroll-mt-24"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{ left: dot.left, top: dot.top }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-green-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-green-400 font-medium">
                Available for opportunities
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🚀
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hey, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Amaan
              </span>
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
                className="inline-block ml-4"
              >
                👋
              </motion.span>
            </motion.h1>

            {/* Dynamic Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 h-16 flex items-center justify-center lg:justify-start"
            >
              <div className="text-2xl lg:text-3xl text-gray-300">
                <span className="text-cyan-400 font-mono text-lg">&lt;</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRole}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 90 }}
                    transition={{ duration: 0.5 }}
                    className="font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mx-2"
                  >
                    {roles[currentRole]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-cyan-400 font-mono text-lg">/&gt;</span>
              </div>
            </motion.div>

            <motion.p
              className="text-gray-400 max-w-lg text-lg leading-relaxed mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Passionate about creating scalable applications with clean code.
              When not debugging, you'll find me exploring new frameworks or
              brewing the perfect cup of coffee ☕
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-6 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={handleHireMe}
                className="group relative bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Zap size={20} />
                  Let's Build Something Amazing
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>

              <motion.a
                href="/Resume.pdf"
                target="_blank"
                download="AmaanSayyed-Resume.pdf"
                className="flex items-center gap-3 border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(34, 211, 238, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { icon: IconBrandGithub, href: "https://github.com/Amaan63", color: "hover:text-white", bg: "hover:bg-gray-800" },
                { icon: IconBrandLinkedin, href: "https://linkedin.com/in/amaansayyed63", color: "hover:text-blue-400", bg: "hover:bg-blue-500/20" },
                { icon: IconBrandTwitter, href: "https://twitter.com/amaansayyed63", color: "hover:text-blue-300", bg: "hover:bg-blue-400/20" },
                { icon: IconBrandSpotify, href: "#vibes", color: "hover:text-green-400", bg: "hover:bg-green-500/20" },
              ].map(({ icon: Icon, href, color, bg }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : ""}
                  className={`text-gray-400 ${color} ${bg} transition-all p-3 rounded-full backdrop-blur-sm border border-white/10`}
                  whileHover={{ y: -8, scale: 1.2, rotate: 5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced 3D Hero Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${mousePosition.y * 15}deg)`,
            }}
          >
            <div className="relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-md p-8 rounded-3xl border border-gray-700/50 shadow-2xl">
                <Image
                  src={heroImage}
                  alt="Amaan Sayyed"
                  width={600}
                  height={600}
                  className="max-w-sm mx-auto rounded-2xl shadow-2xl"
                  placeholder="blur"
                />
                {/* Floating Tech Icons */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-4 rounded-2xl shadow-xl"
                >
                  <Code size={24} />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-2xl shadow-xl"
                >
                  <Coffee size={24} />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 -right-8 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-3 rounded-full shadow-xl"
                >
                  <Zap size={20} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <div className="w-8 h-14 border-2 border-cyan-400/60 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div
            className="w-2 h-4 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-3"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <p className="text-cyan-400 text-xs mt-2 font-medium">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
