'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronDown,
} from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technology: string;
  techStack: string[];
  baseImageUrl?: string;
  imageNames?: string[];
  badges: { emoji: string; label: string }[];
  github: string;
  live?: string;
}

interface ProjectImageModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
}

const ProjectImageModal: React.FC<ProjectImageModalProps> = ({
  isOpen,
  project,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(true);

  const images = project?.imageNames ?? [];
  const totalImages = images.length;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % totalImages);
    setZoom(1);
  }, [totalImages]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + totalImages) % totalImages);
    setZoom(1);
  }, [totalImages]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setZoom(1);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 1));

  if (!isOpen || !project) return null;

  const currentImageUrl = `${project.baseImageUrl}${images[currentIndex]}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Modal Container - Centered and responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-5xl max-h-[95vh] bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-purple-500/20 flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button - top right corner */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-[60] p-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50 rounded-full transition-all duration-200 group"
          >
            <X size={20} className="text-white" />
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-sm border-b border-white/10"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs sm:text-sm text-gray-400">Gallery</span>
                  <span className="text-cyan-400 font-mono font-bold text-xs sm:text-sm">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-gray-600">/</span>
                  <span className="text-gray-400 font-mono text-xs sm:text-sm">
                    {String(totalImages).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Image Viewer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex-1 flex items-center justify-center overflow-hidden relative bg-black/30 min-h-[300px] sm:min-h-[500px]"
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-4">
              <motion.img
                key={currentIndex}
                src={currentImageUrl}
                alt={`${project.title} - Image ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain"
                style={{
                  transform: `scale(${zoom})`,
                  transition: 'transform 0.2s ease-out',
                }}
              />

              {/* Navigation Arrows */}
              {totalImages > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={goToPrevious}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={goToNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </motion.button>
                </>
              )}

              {/* Mobile Zoom Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden bg-black/70 backdrop-blur-md p-2 rounded-lg border border-white/10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-50 transition-all"
                >
                  <ZoomOut size={14} className="text-white" />
                </motion.button>
                <span className="px-2 text-xs text-white flex items-center font-mono">
                  {Math.round(zoom * 100)}%
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-50 transition-all"
                >
                  <ZoomIn size={14} className="text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <AnimatePresence>
            {showThumbnails && totalImages > 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-sm border-t border-white/10"
              >
                <div className="p-3 sm:p-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex
                          ? 'border-cyan-400 shadow-lg shadow-cyan-400/50 ring-2 ring-cyan-400/30'
                          : 'border-gray-600 hover:border-gray-500'
                          }`}
                      >
                        <img
                          src={`${project.baseImageUrl}${image}`}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {idx === currentIndex && (
                          <motion.div
                            layoutId="activeThumb"
                            className="absolute inset-0 bg-gradient-to-t from-cyan-400/30 to-transparent"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer - Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="px-4 sm:px-6 py-3 bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-sm border-t border-white/10 flex items-center justify-between gap-4"
          >
            {totalImages > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-xs sm:text-sm text-white"
              >
                <ChevronDown
                  size={14}
                  className={`transition-transform ${showThumbnails ? 'rotate-180' : ''
                    }`}
                />
                <span className="hidden sm:inline">Thumbnails</span>
              </motion.button>
            )}

            <div className="flex-1" />

          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectImageModal;
