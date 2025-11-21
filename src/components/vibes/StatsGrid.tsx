import React from "react";
import { motion } from "framer-motion";

interface StatsGridProps {
  githubCommits: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({ githubCommits }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-black/20 backdrop-blur-sm rounded-3xl p-10 border border-white/10"
    >
      <h3 className="text-2xl font-bold text-center mb-10">
        This Year in Numbers
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-bold text-green-400 mb-2">12.8K</div>
          <div className="text-gray-400">Minutes of Music</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-blue-400 mb-2">1.8K</div>
          <div className="text-gray-400">Cups of Coffee</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-purple-400 mb-2">
            {githubCommits > 0 ? githubCommits : "..."}
          </div>
          <div className="text-gray-400">GitHub Commits</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-cyan-400 mb-2">23</div>
          <div className="text-gray-400">New Technologies</div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsGrid;
