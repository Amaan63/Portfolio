'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Code2, Database, Wrench, Cpu, Globe, Terminal } from 'lucide-react';
import { skills, Skill } from '@/data/skills';

// --- Components ---

const BentoBox = ({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`
        relative overflow-hidden rounded-3xl 
        bg-gray-900/40 backdrop-blur-xl border border-white/10
        hover:border-white/20 transition-colors duration-500
        group
        ${className}
      `}
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hover Glow */}
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 blur-xl" />
      </div>

      <div className="relative z-10 h-full p-6 sm:p-8">
        {children}
      </div>
    </motion.div>
  );
};

const SkillPill = ({ skill }: { skill: Skill }) => (
  <div className="
    flex items-center gap-2 px-3 py-1.5 rounded-full 
    bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 
    transition-all duration-300 cursor-default
  ">
    <img
      src={skill.logo}
      alt={skill.title}
      className={`w-4 h-4 object-contain ${['GitHub', 'Express', 'Next.js'].includes(skill.title) ? 'invert' : ''}`}
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
    <span className="text-sm text-gray-300">{skill.title}</span>
  </div>
);

const SkillCard = ({ skill }: { skill: Skill }) => (
  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors gap-3 text-center h-full">
    <div className="p-3 rounded-xl bg-black/30">
      <img
        src={skill.logo}
        alt={skill.title}
        className={`w-8 h-8 object-contain ${['GitHub', 'Express', 'Next.js'].includes(skill.title) ? 'invert' : ''}`}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
    <span className="font-medium text-gray-200 text-sm">{skill.title}</span>
  </div>
);

// --- Main Section ---

const SkillsSection: React.FC = () => {
  // Organize Data
  const expertSkills = skills.filter(s => s.value >= 85).slice(0, 4);
  const languages = skills.filter(s => s.category === 'Languages');
  const frameworks = skills.filter(s => s.category === 'Frameworks & Libraries');
  const tools = skills.filter(s => s.category === 'Developer Tools' || s.category === 'Databases');

  return (
    <section id="skills" className="py-24 sm:py-32 bg-black text-white relative overflow-hidden scroll-mt-10">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Tech Stack.
            </span>
            <span className="block text-2xl sm:text-3xl font-normal text-gray-400 mt-2">
              My digital arsenal & capabilities.
            </span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* 1. The Core (Expert Skills) - Large Square */}
          <BentoBox className="md:col-span-6 lg:col-span-5 row-span-2 flex flex-col justify-between bg-gradient-to-br from-gray-900/80 to-purple-900/20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">Powerhouse</h3>
              </div>
              <p className="text-gray-400 mb-8">
                My strongest tools where I deliver the most impact. Mastered through extensive real-world application.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {expertSkills.map(skill => (
                <div key={skill.title} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <img
                    src={skill.logo}
                    alt={skill.title}
                    className={`w-8 h-8 object-contain ${['GitHub', 'Express', 'Next.js'].includes(skill.title) ? 'invert' : ''}`}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div>
                    <div className="font-bold text-white">{skill.title}</div>
                    <div className="text-xs text-purple-300">Expert</div>
                  </div>
                </div>
              ))}
            </div>
          </BentoBox>

          {/* 2. Languages - Wide Rectangle */}
          <BentoBox className="md:col-span-6 lg:col-span-7 flex flex-col" delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {languages.map(skill => (
                <SkillPill key={skill.title} skill={skill} />
              ))}
            </div>
          </BentoBox>

          {/* 3. Frameworks - Medium Square */}
          <BentoBox className="md:col-span-3 lg:col-span-4 row-span-2" delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Frameworks</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {frameworks.map(skill => (
                <SkillCard key={skill.title} skill={skill} />
              ))}
            </div>
          </BentoBox>

          {/* 4. Tools & DBs - Tall/Wide */}
          <BentoBox className="md:col-span-3 lg:col-span-3 row-span-2" delay={0.3}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                <Wrench size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Toolkit</h3>
            </div>
            <div className="space-y-3">
              {tools.map(skill => (
                <div key={skill.title} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={skill.logo}
                      alt={skill.title}
                      className={`w-5 h-5 object-contain ${['GitHub', 'Express', 'Next.js'].includes(skill.title) ? 'invert' : ''}`}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="text-sm font-medium text-gray-300">{skill.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </BentoBox>

        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
