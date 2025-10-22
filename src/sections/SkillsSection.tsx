'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap } from 'lucide-react';
import { skillCategories, SkillCategoryGroup } from '@/data/skills';

const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(skillsRef, { once: true, amount: 0.2 });

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 lg:py-20 bg-black text-white scroll-mt-20"
      ref={skillsRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
            <Zap size={48} className="text-cyan-400 sm:w-12 sm:h-12" />
            <h2 className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold text-3xl sm:text-4xl lg:text-5xl">
              Skills & Tech Stack
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            My arsenal of tools and technologies—continually expanding and honed through real-world experience.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {skillCategories.map((category: SkillCategoryGroup, i) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                className="group bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${category.color} text-black shrink-0`}
                  >
                    <Icon />
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl text-white">
                    {category.name}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4 flex-1">
                  {category.skills.map((skill, idx) => (
                    <div key={skill.title} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={skill.logo}
                            alt={`${skill.title} logo`}
                            className={`w-5 h-5 sm:w-6 sm:h-6 object-contain ${["GitHub", "Express"].includes(skill.title) ? "invert" : ""}`}
                            onError={(e) => {
                              // Fallback icon if CDN fails
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <span className="text-sm sm:text-base font-medium text-gray-200">
                            {skill.title}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-mono text-gray-400">
                          {skill.value}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.value}%` } : {}}
                          transition={{
                            delay: i * 0.15 + idx * 0.05,
                            duration: 1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default SkillsSection;
