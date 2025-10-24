'use client'; // Required for client-side hooks

import React, { useRef } from 'react';
import Image from 'next/image'; // Use Next.js Image component
import { motion, useInView, Variants } from 'framer-motion';
import {
  IconCertificate,
  IconExternalLink,
  IconSparkles,
  IconCalendarEvent, // Added Icon
  IconId,          // Added Icon
  IconAward,       // Added Icon
} from '@tabler/icons-react';
import { certificateData } from '@/data/certificate';

// Combine motion with Next.js Image
const MotionImage = motion(Image);


const CertificateSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Explicitly type variants
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  };

  // Stagger animation for elements inside the card
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({ // Custom prop 'i' for stagger delay
      opacity: 1,
      y: 0,
      transition: { delay: 0.4 + i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <motion.section
      id="certifications"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-black via-gray-900/50 to-black text-white overflow-hidden" // Subtle gradient background
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{}} // For staggerChildren
    >
      {/* Background Glows & Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-green-600/15 via-transparent to-transparent blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-emerald-700/10 via-transparent to-transparent blur-3xl opacity-40 animate-pulse animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 sm:mb-16 lg:mb-20"
          variants={headerVariants}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-600/10 backdrop-blur-sm border border-green-500/30 px-4 py-2 rounded-full mb-5 sm:mb-6">
            <IconCertificate size={18} className="text-green-400" />
            <span className="text-green-400 font-semibold text-xs sm:text-sm tracking-wide uppercase">
              Certifications
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 sm:mb-6 leading-tight">
            Validated Expertise
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Showcasing formal recognition of my skills and dedication to continuous professional development in data analytics.
          </p>
        </motion.div>

        {/* Enhanced Certificate Card */}
        <motion.div
          className="group relative mx-auto max-w-6xl bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-900/60 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl shadow-green-500/10 overflow-hidden perspective-1000"
          variants={cardVariants}
          whileHover={{
            scale: 1.02,
            y: -10,
            boxShadow: '0 30px 60px -15px rgba(16, 185, 129, 0.25)',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <div className="lg:flex items-stretch">

            {/* Left - Certificate Image */}
            <div className="lg:w-[55%] p-6 sm:p-8 flex items-center justify-center bg-black/40 lg:border-r border-white/10">
              <motion.div
                className="relative w-full aspect-[1.414/1] transform-style-3d"
                whileHover={{ rotateY: 10, rotateX: -5, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <MotionImage
                  src={certificateData.imageUrl} // Use direct path here
                  alt={certificateData.title}
                  width={certificateData.imageWidth}
                  height={certificateData.imageHeight}
                  className="absolute inset-0 w-full h-full rounded-xl shadow-2xl shadow-black/40 border border-white/5 object-cover"
                  priority
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            </div>

            {/* Right - Certificate Info */}
            <div className="lg:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <motion.h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight"
                custom={0} variants={contentVariants}
              >
                {certificateData.title}
              </motion.h3>

              <motion.p
                className="text-lg sm:text-xl font-semibold text-green-400 mb-5 sm:mb-6 flex items-center gap-2"
                custom={1} variants={contentVariants}
              >
                <IconSparkles size={20} />
                Issued by: {certificateData.issuer}
              </motion.p>

              <motion.p
                className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6" // Reduced margin bottom slightly
                custom={2} variants={contentVariants}
              >
                {certificateData.description}
              </motion.p>

              {/* --- NEW: Added Details Section --- */}
              <motion.div
                className="space-y-2 mb-8 text-sm text-gray-400 border-l-2 border-green-500/50 pl-4"
                custom={3} variants={contentVariants} // Adjusted stagger index
              >
                <p className="flex items-center gap-2">
                  <IconAward size={16} className="text-yellow-400" />
                  <span className="font-medium text-gray-200">Category:</span> {certificateData.category}
                </p>
                <p className="flex items-center gap-2">
                  <IconCalendarEvent size={16} className="text-cyan-400" />
                  <span className="font-medium text-gray-200">Issued:</span> {certificateData.dateIssued}
                </p>
                <p className="flex items-center gap-2">
                  <IconId size={16} className="text-purple-400" />
                  <span className="font-medium text-gray-200">ID:</span> {certificateData.certificationId}
                </p>
              </motion.div>
              {/* --- END: Added Details Section --- */}

              <motion.a
                href={certificateData.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex self-start items-center justify-center gap-2 px-6 sm:px-7 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                custom={4} variants={contentVariants} // Adjusted stagger index
              >
                <IconExternalLink size={20} />
                Verify Credential
              </motion.a>
            </div>
          </div>

          {/* Glow overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-green-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-3xl"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CertificateSection;