import React from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

interface Track {
  id: number;
  name: string;
  artist: string;
  image?: string;
}

interface TopTracksListProps {
  tracks: Track[];
  currentTrack: number;
  onTrackSelect: (index: number) => void;
}

const TopTracksList: React.FC<TopTracksListProps> = ({
  tracks,
  currentTrack,
  onTrackSelect,
}) => {
  // Duplicate tracks to create a "simulated" infinite scroll effect with a scrollbar
  // We repeat the list many times so the user can scroll for a long time
  const loopedTracks = Array(20).fill(tracks).flat();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 w-full"
    >
      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
        <Music className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
        Top 10 On Repeat
      </h4>

      <div className="relative w-full">
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
          {loopedTracks.map((track, idx) => {
            // Calculate original index for selection logic
            const originalIndex = idx % tracks.length;
            return (
              <div
                key={`${track.id}-${idx}`}
                onClick={() => onTrackSelect(originalIndex)}
                className={`flex-shrink-0 w-40 sm:w-48 lg:w-56 p-3 rounded-xl transition-colors cursor-pointer snap-start group ${currentTrack === originalIndex
                    ? "bg-white/10 border border-white/10"
                    : "hover:bg-white/5 border border-transparent"
                  }`}
              >
                <img
                  src={track.image}
                  alt={track.name}
                  className="w-full aspect-square rounded-lg object-cover mb-3 shadow-md group-hover:scale-105 transition-transform"
                />
                <div
                  className={`text-sm sm:text-base font-medium truncate ${currentTrack === originalIndex
                      ? "text-green-400"
                      : "text-gray-200"
                    }`}
                >
                  {track.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 truncate">
                  {track.artist}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default TopTracksList;
