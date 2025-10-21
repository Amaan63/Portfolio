'use client';

import React from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Briefcase, Clock, MapPin, Star } from 'lucide-react';
import { workExperience } from '@/data/experience'; // Adjust the import path as needed

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
        ease: [0.33, 1, 0.68, 1], // cubic-bezier for easeOut
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
        ease: [0.33, 1, 0.68, 1], // cubic-bezier for easeOut
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-black text-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold text-6xl mb-4">
            <Briefcase size={60} className="text-cyan-400" />
            Work Experience
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">My Professional Journey</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Building experience through real-world projects and collaborations.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Animated Timeline Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400/50 via-purple-500/50 to-pink-500/50"
            style={{ originY: 0 }}
            initial="hidden"
            variants={timelineVariants}
            animate={isInView ? 'visible' : 'hidden'}
          />

          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
            {workExperience.map((exp, index) => (
              <motion.div key={exp.id} className="relative mb-12" variants={itemVariants}>
                <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 mt-1.5 z-10">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${exp.gradient}`}></div>
                  </div>

                  {/* Experience Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pl-10 md:pl-0 md:pr-10' : 'pl-10'}`}>
                    <div
                      className={`relative p-6 rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur-sm group transition-all duration-300 hover:border-cyan-400/50`}
                    >
                      {/* Glow effect on hover */}
                      <div
                        className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${exp.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg`}
                      ></div>

                      <div className="relative">
                        {/* Card Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <img src={exp.logo} alt={`${exp.company} Logo`} className="w-14 h-14 rounded-lg shadow-md" />
                          <div>
                            <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                            <p className={`font-semibold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>{exp.company}</p>
                            <div className="text-xs text-gray-400 mt-1 flex items-center gap-4">
                              <span><Clock size={12} className="inline mr-1" />{exp.duration}</span>
                              <span><MapPin size={12} className="inline mr-1" />{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description & Details */}
                        <p className="text-gray-300 text-sm mb-4">{exp.description}</p>

                        <h4 className="font-semibold text-gray-200 mb-2">Key Achievements:</h4>
                        <ul className="space-y-1.5 text-sm text-gray-400">
                          {exp.achievements.slice(0, 3).map((ach, i) => ( // Show first 3 achievements
                            <li key={i} className="flex items-start gap-2">
                              <Star size={14} className="text-yellow-400 mt-0.5 shrink-0" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span key={tech} className="px-2.5 py-1 bg-white/5 text-cyan-300 text-xs font-medium rounded-full border border-white/10">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;