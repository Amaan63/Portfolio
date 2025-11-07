"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Coffee,
  Music,
  Gamepad2,
  Camera,
  Sparkles,
  SkipBack,
  SkipForward,
  Play,
  Pause,
} from "lucide-react";
import { IconBrandSpotify } from "@tabler/icons-react";

interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: string;
  mood: "focus" | "chill" | "motivated" | "intense" | "other";
}

interface Playlist {
  totalTracks: number;
  tracks: Track[];
}

const spotifyPlaylist: Playlist = {
  totalTracks: 5,
  tracks: [
    {
      id: 1,
      name: "Midnight Drive",
      artist: "Dreamwave",
      album: "Neon Nights",
      duration: "3:42",
      mood: "chill",
    },
    {
      id: 2,
      name: "Focus Flow",
      artist: "LoFi Beats",
      album: "Deep Coding Vibes",
      duration: "4:10",
      mood: "focus",
    },
    {
      id: 3,
      name: "Motivated Mode",
      artist: "Energize",
      album: "Morning Boost",
      duration: "3:58",
      mood: "motivated",
    },
    {
      id: 4,
      name: "Code Rush",
      artist: "Binary Sound",
      album: "Digital Pulse",
      duration: "3:21",
      mood: "intense",
    },
    {
      id: 5,
      name: "Tech Serenity",
      artist: "ByteWaves",
      album: "Ocean of Code",
      duration: "4:00",
      mood: "chill",
    },
  ],
};

const VibesSection: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const vibesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(vibesRef, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentTrack(
              (prevTrack) => (prevTrack + 1) % spotifyPlaylist.tracks.length
            );
            return 0;
          }
          return prev + 0.5;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const vibeCards = [
    {
      icon: <Coffee size={28} />,
      title: "Coffee Powered",
      description: "5+ cups daily for optimal coding performance",
      gradient: "from-amber-500 to-orange-600",
      stat: "☕ 1,825 cups this year",
    },
    {
      icon: <Music size={28} />,
      title: "Lo-Fi Addict",
      description: "Beats to code/debug to 24/7",
      gradient: "from-purple-500 to-pink-600",
      stat: "🎵 12,847 minutes listened",
    },
    {
      icon: <Gamepad2 size={28} />,
      title: "Gaming Breaks",
      description: "Quick games between complex algorithms",
      gradient: "from-blue-500 to-cyan-600",
      stat: "🎮 47 achievements unlocked",
    },
    {
      icon: <Camera size={28} />,
      title: "Tech Explorer",
      description: "Always curious about emerging technologies",
      gradient: "from-green-500 to-emerald-600",
      stat: "📚 23 courses completed",
    },
  ];

  const currentTrackData = spotifyPlaylist.tracks[currentTrack];

  return (
    <motion.section
      id="vibes"
      className="py-16 md:py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white scroll-mt-20"
      ref={vibesRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent font-semibold text-base md:text-lg mb-3">
            <Sparkles size={20} className="text-green-400" />
            Good Vibes Only
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            When I'm Not Coding
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-lg">
            Life’s too short for bad code and boring music 🎵
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Vibe Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {vibeCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative group bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:p-6 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${card.gradient} text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  {card.icon}
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 mb-3 leading-relaxed">
                  {card.description}
                </p>
                <div className="text-xs text-cyan-400 font-mono bg-white/10 rounded-full px-3 py-1 inline-block">
                  {card.stat}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Spotify Player */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="relative w-full"
          >
            <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <IconBrandSpotify size={40} className="text-green-400" />
                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 blur-md animate-pulse"></div>
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl">
                    Currently Vibing To
                  </h3>
                  <p className="text-gray-400 text-sm">
                    My Coding Playlist • {spotifyPlaylist.totalTracks} songs
                  </p>
                </div>
              </div>

              {/* Track Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <motion.div
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl shadow-lg"
                  animate={{
                    boxShadow: isPlaying
                      ? [
                        "0 0 0 0px rgba(168,85,247,0.4)",
                        "0 0 0 20px rgba(168,85,247,0)",
                      ]
                      : "0 0 0 0px rgba(168,85,247,0)",
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🎵
                </motion.div>

                <div className="flex-1 min-w-[150px]">
                  <h4 className="font-bold text-white text-base sm:text-lg">
                    {currentTrackData.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {currentTrackData.artist}
                  </p>
                  <p className="text-gray-500 text-xs">{currentTrackData.album}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>{Math.floor((progress / 100) * 222)} sec</span>
                  <span>{currentTrackData.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() =>
                    setCurrentTrack(
                      currentTrack === 0
                        ? spotifyPlaylist.tracks.length - 1
                        : currentTrack - 1
                    )
                  }
                >
                  <SkipBack size={20} />
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full transition-colors shadow-lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                </button>
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() =>
                    setCurrentTrack(
                      (currentTrack + 1) % spotifyPlaylist.tracks.length
                    )
                  }
                >
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            This Year in Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                12.8K
              </div>
              <div className="text-gray-400">Minutes of Music</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">1.8K</div>
              <div className="text-gray-400">Cups of Coffee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">47</div>
              <div className="text-gray-400">GitHub Commits</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">23</div>
              <div className="text-gray-400">New Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>


    </motion.section>
  );
};

export default VibesSection;
