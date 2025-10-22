'use client';

import React from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Briefcase, Clock, MapPin, Star, ChevronRight, TrendingUp } from 'lucide-react';
import { workExperience } from '@/data/experience';

const ExperienceSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Timeline animation
  const timelineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  // Item animation
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-black text-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <motion.div
              initial={{ rotate: 0 }}
              animate={isInView ? { rotate: 360 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Briefcase size={40} className="sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-cyan-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              Work Experience
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            My Professional Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
            Building experience through real-world projects and collaborations.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Animated Timeline Line */}
          <motion.div
            className="absolute left-[18px] sm:left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-cyan-400/50 via-purple-500/50 to-pink-500/50"
            style={{ originY: 0 }}
            initial="hidden"
            variants={timelineVariants}
            animate={isInView ? 'visible' : 'hidden'}
          />

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {workExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative mb-8 sm:mb-10 lg:mb-12"
                variants={itemVariants}
              >
                <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot with Pulse Effect */}
                  <div className="absolute left-[11px] sm:left-[23px] md:left-1/2 transform md:-translate-x-1/2 mt-2 sm:mt-2.5 z-10">
                    <motion.div
                      className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r ${exp.gradient} shadow-lg`}
                      whileHover={{ scale: 1.3 }}
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(34, 211, 238, 0.4)',
                          '0 0 0 10px rgba(34, 211, 238, 0)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                    </motion.div>
                  </div>

                  {/* Experience Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pl-12 sm:pl-16 md:pl-0 md:pr-8 lg:pr-12' : 'pl-12 sm:pl-16 md:pl-8 lg:pl-12'}`}>
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Card Background with Unique Hover */}
                      <div className="relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-2xl">

                        {/* Animated Background Particles on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br ${exp.gradient} rounded-full blur-3xl opacity-20 animate-pulse`} />
                          <div className={`absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl ${exp.gradient} rounded-full blur-3xl opacity-20 animate-pulse delay-75`} />
                        </div>

                        {/* Sliding Border Effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r ${exp.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          style={{
                            padding: '2px',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                          }}
                        />

                        <div className="relative z-10">
                          {/* Card Header */}
                          <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              className="shrink-0"
                            >
                              <img
                                src={exp.logo}
                                alt={`${exp.company} Logo`}
                                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl shadow-lg object-cover border-2 border-gray-700 group-hover:border-cyan-400/50 transition-colors duration-300"
                              />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-0.5 sm:mb-1 truncate">
                                {exp.position}
                              </h3>
                              <p className={`font-semibold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent text-sm sm:text-base mb-1 sm:mb-2`}>
                                {exp.company}
                              </p>
                              <div className="text-[10px] sm:text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                <span className="flex items-center gap-1">
                                  <Clock size={12} className="shrink-0" />
                                  {exp.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin size={12} className="shrink-0" />
                                  {exp.location}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                            {exp.description}
                          </p>

                          {/* Achievements */}
                          <div className="mb-3 sm:mb-4">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                              <TrendingUp size={14} className="text-cyan-400 sm:w-4 sm:h-4" />
                              <h4 className="font-semibold text-gray-200 text-xs sm:text-sm">Key Achievements</h4>
                            </div>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {exp.achievements.slice(0, 3).map((ach, i) => (
                                <motion.li
                                  key={i}
                                  className="flex items-start gap-2 text-xs sm:text-sm text-gray-400"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ delay: index * 0.2 + i * 0.1 }}
                                >
                                  <Star size={12} className="text-yellow-400 mt-0.5 sm:mt-1 shrink-0 sm:w-3.5 sm:h-3.5" />
                                  <span className="leading-relaxed">{ach}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div className="pt-3 sm:pt-4 border-t border-gray-700/50 group-hover:border-cyan-400/30 transition-colors duration-300">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <motion.span
                                  key={tech}
                                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-cyan-300 text-[10px] sm:text-xs font-medium rounded-full border border-gray-700 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-400/20 transition-all duration-300"
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                  transition={{ delay: index * 0.2 + techIndex * 0.05 }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Hover Arrow Indicator */}
                          <motion.div
                            className="absolute top-4 right-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline End Marker */}
        <motion.div
          className="flex justify-center mt-8 sm:mt-12"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-gray-700" />
            <span className="italic">More to come...</span>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-gray-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

