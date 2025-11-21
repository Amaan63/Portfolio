"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Coffee,
  Music,
  Gamepad2,
  Github,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";
import { IconBrandSpotify } from "@tabler/icons-react";

interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: string;
  image?: string;
  mood: "focus" | "chill" | "motivated" | "intense" | "other";
}

interface Playlist {
  totalTracks: number;
  tracks: Track[];
}

const VibesSection: React.FC = () => {
  const [spotifyPlaylist, setSpotifyPlaylist] = useState<Playlist | null>(null);
  const [githubCommits, setGithubCommits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const vibesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(vibesRef, { once: true });

  // progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && spotifyPlaylist) {
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
  }, [isPlaying, spotifyPlaylist]);

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Spotify
        const spotifyRes = await fetch("/api/spotify/top-tracks");
        if (!spotifyRes.ok) throw new Error("Failed to fetch Spotify data");
        const spotifyData = await spotifyRes.json();

        const formattedPlaylist = {
          totalTracks: spotifyData.total,
          tracks: spotifyData.tracks?.slice(0, 10).map((track: any, index: number) => ({
            id: index,
            name: track.name,
            artist: track.artist,
            album: track.album,
            duration: `${Math.floor(track.duration_ms / 60000)}:${String(
              Math.floor((track.duration_ms % 60000) / 1000)
            ).padStart(2, "0")}`,
            mood: "chill",
            image: track.image,
          })),
        };
        setSpotifyPlaylist(formattedPlaylist);

        // Fetch GitHub
        const githubRes = await fetch("/api/github/stats");
        if (githubRes.ok) {
          const githubData = await githubRes.json();
          setGithubCommits(githubData.commits);
        }
        console.log(githubCommits);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError("Unable to fetch your vibes 😢");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const vibeCards = [
    {
      icon: <Coffee size={28} />,
      title: "Coffee Powered",
      description: "Fueling the code, one cup at a time.",
      gradient: "from-amber-500 to-orange-600",
      stat: "☕ 1,825 cups",
    },
    {
      icon: <Music size={28} />,
      title: "Lo-Fi Addict",
      description: "Beats to debug to, 24/7.",
      gradient: "from-purple-500 to-pink-600",
      stat: "🎵 12k+ mins",
    },
    {
      icon: <Gamepad2 size={28} />,
      title: "Gaming Breaks",
      description: "Resetting the brain with quick matches.",
      gradient: "from-blue-500 to-cyan-600",
      stat: "🎮 47 wins",
    },
    {
      icon: <Github size={28} />,
      title: "Open Source",
      description: "Contributing to the ecosystem.",
      gradient: "from-gray-600 to-gray-800",
      stat: `🐙 ${githubCommits} total commits`,
    },
  ];

  if (loading)
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center min-h-[400px]">
        <div className="text-center text-gray-300 animate-pulse">
          Loading your Spotify vibes 🎧...
        </div>
      </section>
    );

  if (error)
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center min-h-[400px]">
        <div className="text-center text-red-400 bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-red-500/30">
          {error} <br /> <span className="text-sm text-gray-400 mt-2 block">Check your .env.local or try refreshing.</span>
        </div>
      </section>
    );

  const currentTrackData =
    spotifyPlaylist?.tracks?.[currentTrack] || {
      name: "No track playing",
      artist: "",
      album: "",
      duration: "0:00",
      image: undefined,
    };

  return (
    <section
      id="vibes"
      className="py-16 md:py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white scroll-mt-20"
      ref={vibesRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent font-semibold text-base md:text-lg mb-3">
            <Sparkles size={20} className="text-green-400" />
            Good Vibes Only
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            When I'm Not Coding
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Life’s too short for bad code and boring music 🎵
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* Left Column: Vibe Cards (Span 5) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {vibeCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[200px] hover:bg-white/10 transition-all"
              >
                <div>
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${card.gradient} text-white mb-4 shadow-lg`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                {/* Small stat pill in card */}
                <div className="mt-4 text-xs text-cyan-400 font-mono bg-white/5 rounded-full px-3 py-1 self-start border border-white/5">
                  {card.stat}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Spotify Player (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
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
                    My Coding Playlist • {spotifyPlaylist?.totalTracks || 0} songs
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
                  <p className="text-gray-300 text-lg mb-1">
                    {currentTrackData.artist}
                  </p>
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
                  onClick={() =>
                    setCurrentTrack(
                      currentTrack === 0
                        ? (spotifyPlaylist?.tracks.length || 1) - 1
                        : currentTrack - 1
                    )
                  }
                >
                  <SkipBack size={28} />
                </button>
                <button
                  className="bg-green-500 hover:bg-green-400 text-black p-5 rounded-full transition-all shadow-lg hover:shadow-green-500/20 hover:scale-105 active:scale-95"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
                <button
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
                  onClick={() =>
                    setCurrentTrack(
                      (currentTrack + 1) %
                      (spotifyPlaylist?.tracks.length || 1)
                    )
                  }
                >
                  <SkipForward size={28} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Top 10 List (Compact) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
        >
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Music size={18} className="text-purple-400" />
            Top 10 On Repeat
          </h4>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x animate-infinite-scroll">
            {spotifyPlaylist?.tracks.map((track, idx) => (
              <div
                key={idx}
                onClick={() => { setCurrentTrack(idx); setIsPlaying(true); }}
                className={`flex-shrink-0 w-48 p-3 rounded-xl transition-colors cursor-pointer snap-start group ${currentTrack === idx ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5 border border-transparent'}`}
              >
                <img src={track.image} alt={track.name} className="w-full aspect-square rounded-lg object-cover mb-3 shadow-md group-hover:scale-105 transition-transform" />
                <div className={`text-sm font-medium truncate ${currentTrack === idx ? 'text-green-400' : 'text-gray-200'}`}>{track.name}</div>
                <div className="text-xs text-gray-500 truncate">{track.artist}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* This Year in Numbers */}
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
                {githubCommits > 0 ? githubCommits : "47"}
              </div>
              <div className="text-gray-400">GitHub Commits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">23</div>
              <div className="text-gray-400">New Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VibesSection;
