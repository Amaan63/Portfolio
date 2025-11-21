import React from "react";
import { motion } from "framer-motion";
import { IconBrandSpotify } from "@tabler/icons-react";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";

interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: string;
  image?: string;
}

interface SpotifyPlayerProps {
  playlist: { totalTracks: number; tracks: Track[] } | null;
  currentTrack: number;
  isPlaying: boolean;
  progress: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  playlist,
  currentTrack,
  isPlaying,
  progress,
  onPlayPause,
  onNext,
  onPrev,
}) => {
  const currentTrackData = playlist?.tracks?.[currentTrack] || {
    name: "No track playing",
    artist: "",
    album: "",
    duration: "0:00",
    image: undefined,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-center"
    >
      {/* Player Header */}
      <div className="flex items-center gap-5 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="relative shrink-0"
        >
          <IconBrandSpotify size={48} className="text-green-400" />
          <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 blur-md animate-pulse"></div>
        </motion.div>
        <div>
          <h3 className="font-bold text-xl">Currently Vibing To</h3>
          <p className="text-gray-400 text-sm">
            My Coding Playlist • {playlist?.totalTracks || 0} songs
          </p>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex items-center gap-6 mb-8">
        {currentTrackData.image ? (
          <motion.img
            key={currentTrackData.image}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={currentTrackData.image}
            alt={currentTrackData.name}
            className="w-24 h-24 rounded-2xl shadow-lg object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center text-4xl">
            🎵
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-2xl truncate mb-1">
            {currentTrackData.name}
          </h4>
          <p className="text-gray-300 text-lg mb-1">{currentTrackData.artist}</p>
          <p className="text-gray-500 text-sm uppercase tracking-wider">
            {currentTrackData.album}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
          <span>{Math.floor((progress / 100) * 180)}s</span>
          <span>{currentTrackData.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-10">
        <button
          className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
          onClick={onPrev}
        >
          <SkipBack size={28} />
        </button>
        <button
          className="bg-green-500 hover:bg-green-400 text-black p-5 rounded-full transition-all shadow-lg hover:shadow-green-500/20 hover:scale-105 active:scale-95"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <Pause size={28} fill="currentColor" />
          ) : (
            <Play size={28} fill="currentColor" className="ml-1" />
          )}
        </button>
        <button
          className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
          onClick={onNext}
        >
          <SkipForward size={28} />
        </button>
      </div>
    </motion.div>
  );
};

export default SpotifyPlayer;
