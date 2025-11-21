import React from "react";
import { motion } from "framer-motion";

interface VibeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  stat: string;
  index: number;
}

const VibeCard: React.FC<VibeCardProps> = ({
  icon,
  title,
  description,
  gradient,
  stat,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[200px] hover:bg-white/10 transition-all"
    >
      <div>
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} text-white mb-4 shadow-lg`}
        >
          {icon}
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
      {/* Small stat pill in card */}
      <div className="mt-4 text-xs text-cyan-400 font-mono bg-white/5 rounded-full px-3 py-1 self-start border border-white/5">
        {stat}
      </div>
    </motion.div>
  );
};

export default VibeCard;
