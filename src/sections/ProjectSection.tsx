'use client';

import React, { useState, useRef, useMemo } from 'react';
import { projects, Project } from '@/data/projects';
import ProjectImageModal from '@/components/Project/ProjectImageModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Camera,
  Code,
  ExternalLink,
  Github,
  Zap,
  Stars,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LOAD_STEP = 3;

const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [displayCount, setDisplayCount] = useState<number>(LOAD_STEP);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersContainerRef = useRef<HTMLDivElement>(null);
  const filterButtonsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const loadMoreBtnRef = useRef<HTMLDivElement>(null);

  // Dynamic Filter Generation
  const filters = useMemo(() => {
    const technologySet = new Set(
      projects
        .map(p =>
          p.technology?.charAt(0).toUpperCase() +
          p.technology?.slice(1).toLowerCase()
        )
        .filter(Boolean)
    );
    return ['All', ...Array.from(technologySet)];
  }, []);

  // Filter logic
  const filteredProjects = useMemo(() => {
    if (filter === 'All') {
      return projects;
    }
    return projects.filter(
      p =>
        p.technology.toLowerCase() === filter.toLowerCase() ||
        p.techStack.some(tech =>
          tech.toLowerCase().includes(filter.toLowerCase())
        )
    );
  }, [filter]);

  const displayedProjects = useMemo(
    () => filteredProjects.slice(0, displayCount),
    [filteredProjects, displayCount]
  );

  const hasMore = displayCount < filteredProjects.length;
  const remaining = filteredProjects.length - displayCount;

  // --- GSAP Animations (FIXED) ---

  // Title animation only
  useGSAP(
    () => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    },
    { scope: sectionRef }
  );

  // Filter buttons animation (FIXED - use children properly)
  useGSAP(
    () => {
      if (filterButtonsRef.current) {
        const buttons = filterButtonsRef.current.querySelectorAll('button');

        // Reset opacity first
        gsap.set(buttons, { opacity: 1 });

        // Then animate in on scroll
        gsap.from(buttons, {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.6,
          scrollTrigger: {
            trigger: filtersContainerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    },
    { scope: sectionRef }
  );

  // Animate cards
  useGSAP(
    () => {
      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children).filter(
          card => !card.classList.contains('gsap-animated')
        );

        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.05,
              duration: 0.5,
              delay: 0.1,
              ease: 'power3.out',
              onComplete() {
                cards.forEach(card => card.classList.add('gsap-animated'));
              },
            }
          );
        }
      }
    },
    { dependencies: [displayedProjects], scope: gridRef }
  );

  // Load more button animation
  useGSAP(
    () => {
      if (hasMore && loadMoreBtnRef.current) {
        gsap.from(loadMoreBtnRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    },
    { dependencies: [hasMore] }
  );

  // --- Event Handlers ---

  const openModal = (project: Project) => {
    if (project.imageNames && project.imageNames.length > 0) {
      setSelectedProject(project);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      document.body.style.overflow = 'auto';
    }, 400);
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + LOAD_STEP, filteredProjects.length));
  };

  const handleFilterChange = (newFilter: string) => {
    if (gridRef.current) {
      Array.from(gridRef.current.children).forEach(card =>
        card.classList.remove('gsap-animated')
      );
    }
    setFilter(newFilter);
    setDisplayCount(LOAD_STEP);
  };

  // Count projects per category
  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return projects.length;
    return projects.filter(
      p =>
        p.technology.toLowerCase() === cat.toLowerCase() ||
        p.techStack.some(tech =>
          tech.toLowerCase().includes(cat.toLowerCase())
        )
    ).length;
  };

  return (
    <>
      <section
        id="projects"
        className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden scroll-mt-20"
        ref={sectionRef}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-blue-600/5 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20" ref={titleRef}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 backdrop-blur-sm border border-cyan-400/30 px-4 py-2 rounded-full mb-4 sm:mb-6">
              <Rocket size={18} className="text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold text-xs sm:text-sm">
                Featured Projects
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Things I've{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Built with Passion
              </span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
              A showcase of projects that demonstrate my growth as a developer,
              from full-stack applications to creative solutions
            </p>
          </div>
          {/* Filter Section */}
          <div className="relative mb-12 sm:mb-16 lg:mb-20 z-20" ref={filtersContainerRef}>
            {/* Filter Buttons Container - FRAMER MOTION VERSION */}
            <motion.div
              ref={filterButtonsRef}
              className="relative z-30 flex flex-wrap justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, pointerEvents: "auto" }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {filters.map((filterName, index) => {
                const isActive = filter === filterName;
                const count = getCategoryCount(filterName);

                return (
                  <motion.button
                    key={filterName}
                    onClick={() => handleFilterChange(filterName)}
                    className={`relative px-5 sm:px-7 py-2 sm:py-3 rounded-full border-2 transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap overflow-hidden group flex items-center gap-2 ${isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-transparent shadow-lg shadow-purple-500/40'
                      : 'border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-white hover:shadow-md hover:shadow-cyan-500/20'
                      }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.08 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isActive && <Stars size={14} />}
                      <span>{filterName}</span>
                      <span
                        className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${isActive
                          ? 'bg-cyan-400/30 text-cyan-100'
                          : 'bg-gray-700/50 text-gray-300'
                          }`}
                      >
                        {count}
                      </span>
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 -z-10 blur-lg opacity-40 rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Active Filter Count */}
            <motion.div
              className="text-center mt-6 text-gray-400 text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Showing{' '}
              <span className="text-cyan-400 font-semibold">
                {displayedProjects.length}
              </span>{' '}
              of{' '}
              <span className="text-purple-400 font-semibold">
                {filteredProjects.length}
              </span>{' '}
              {filter === 'All' ? 'projects' : `${filter} projects`}
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 relative z-10"
          >

            {displayedProjects.map(project => (
              <div
                key={project.title}
                className="project-card group relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 cursor-pointer transform-gpu hover:-translate-y-2.5 hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col h-full"
                onClick={() => openModal(project)}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
                </div>

                {/* Project Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
                  {(project.imageNames?.length ?? 0) > 0 ? (
                    <>
                      <img
                        src={`${project.baseImageUrl}${project.imageNames![0]}`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 flex items-center gap-2 text-white">
                          <Camera size={16} />
                          <span className="text-sm font-medium">
                            +{project.imageNames!.length} images
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <Code size={48} className="text-gray-600" />
                    </div>
                  )}

                  {/* Technology Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500/90 to-purple-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-lg">
                      <Zap size={12} />
                      {project.technology}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 relative z-5">
                  <h3 className="text-lg sm:text-xl font-bold group-hover:text-cyan-400 transition-colors line-clamp-2 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack?.slice(0, 3).map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gradient-to-r from-gray-700/50 to-gray-800/50 text-xs rounded-md text-gray-300 font-medium border border-gray-600/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.techStack?.length ?? 0) > 3 && (
                        <span className="px-2 py-1 bg-gray-700/30 text-xs rounded-md text-gray-400 border border-gray-600/20">
                          +{(project.techStack?.length ?? 0) - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  {(project.badges?.length ?? 0) > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.badges!.slice(0, 2).map((badge, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-md text-xs font-medium border border-purple-400/30 hover:border-purple-400/60 transition-all"
                          >
                            <span className="text-sm">{badge.emoji}</span>
                            {badge.label}
                          </span>
                        ))}
                        {(project.badges?.length ?? 0) > 2 && (
                          <span className="px-2.5 py-1 bg-gray-700/30 text-xs text-gray-400 rounded-md border border-gray-600/20">
                            +{(project.badges?.length ?? 0) - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-700/50 mt-auto">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-2 rounded-lg font-medium text-sm hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-500/30"
                      >
                        Live Demo
                      </a>
                    ) : (
                      <div className="flex-1 bg-gray-700/50 text-gray-400 text-center py-2 rounded-lg font-medium text-sm border border-gray-600/50">
                        Coming Soon
                      </div>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="px-3 sm:px-4 py-2 border border-gray-600 rounded-lg hover:border-cyan-400 hover:bg-cyan-400/10 transition-all hover:scale-105 active:scale-95"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center" ref={loadMoreBtnRef}>
              <button
                onClick={handleLoadMore}
                className="relative group px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-white overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300 -z-10" />

                <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                  <Zap size={18} className="group-hover:animate-spin" />
                  Load {Math.min(LOAD_STEP, remaining)} More (
                  <span className="font-mono">{remaining}</span> remaining)
                </span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {displayedProjects.length === 0 && (
            <div className="text-center py-12">
              <Code size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                No projects found for this filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <ProjectImageModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsSection;
