'use client'; // Add this directive for components using client-side hooks like useRef and useInView

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Zap, GraduationCap, Heart, Code } from 'lucide-react'; // Assuming you use lucide-react for icons

// 1. Define a type for the bento card properties for type safety
interface BentoCardProps {
  title: string;
  subtitle?: string; // Subtitle is optional
  content: string;
  gradient: string;
  icon: React.ReactNode; // Type for JSX elements
  span: string;
}

// 2. Define the component as a React Functional Component (React.FC)
const AboutSection: React.FC = () => {
  // 3. Type the ref to be attached to an HTMLElement
  const aboutRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(aboutRef, { once: true, amount: 0.3 });

  // 4. Type the array of card data using the interface defined above
  const bentoCards: BentoCardProps[] = [
    {
      title: 'Code Warrior',
      subtitle: 'Java | Spring Boot | React',
      content:
        'Building scalable applications with clean architecture and modern practices.',
      gradient: 'from-red-500 to-orange-500',
      icon: <Code size={24} />,
      span: 'md:col-span-2',
    },
    {
      title: 'Problem Solver',
      content: 'Love turning complex challenges into elegant solutions.',
      gradient: 'from-blue-500 to-cyan-500',
      icon: <Zap size={24} />,
      span: 'md:col-span-1',
    },
    {
      title: 'Always Learning',
      content: 'Currently exploring microservices & cloud architecture.',
      gradient: 'from-purple-500 to-pink-500',
      icon: <GraduationCap size={24} />,
      span: 'md:col-span-1',
    },
    {
      title: 'Team Player',
      content: 'Collaboration and code reviews make us all better developers.',
      gradient: 'from-green-500 to-emerald-500',
      icon: <Heart size={24} />,
      span: 'md:col-span-2',
    },
  ];

  return (
    <section id="about" className="py-20 pt-20 bg-black text-white scroll-mt-24" ref={aboutRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          {/* Section Header */}
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <motion.div
              initial={{ rotate: 0 }}
              animate={isInView ? { rotate: 360 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <User size={40} className="sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-cyan-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              About Me
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            More than just a developer
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-6">
            Passionate about creating digital experiences that matter. When I'm
            not coding, you'll find me exploring new technologies or brewing the
            perfect cup of coffee.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`group relative ${card.span} h-48 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 overflow-hidden cursor-pointer`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
              ></div>
              <div className="relative p-6 h-full flex flex-col justify-between">
                <div>
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${card.gradient} text-white mb-4`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  {card.subtitle && (
                    <p className="text-sm text-gray-400 mb-2">
                      {card.subtitle}
                    </p>
                  )}
                </div>
                <p className="text-gray-300 text-sm">{card.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// It's good practice to provide a default export for components
export default AboutSection;

