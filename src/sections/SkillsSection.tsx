'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap } from 'lucide-react';
import { skillCategories, Skill } from '@/data/skills'; // Adjust import path as needed

const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(skillsRef, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="py-20 bg-black text-white scroll-mt-20" ref={skillsRef}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold text-6xl mb-4">
            <Zap size={60} className="text-cyan-400" />
            Skills & Tech Stack
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">My Arsenal of Tools</h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.15 }}
              className="bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className={`flex items-center gap-4 mb-6 text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                <span className={`text-3xl bg-gradient-to-r ${category.color} p-2 rounded-lg text-black`}>{category.icon}</span>
                <h3>{category.name}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.title}
                    className="group"
                  // Add onClick={() => setSelectedSkill(skill)} if you want to implement a modal/detail view
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <img src={skill.logo} alt={skill.title} className="w-6 h-6" />
                        <span className="font-medium text-sm text-gray-200">{skill.title}</span>
                      </div>
                      <span className="text-xs font-mono text-gray-400">{skill.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.value}%` } : {}}
                        transition={{
                          delay: categoryIndex * 0.15 + skillIndex * 0.05,
                          duration: 1,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;