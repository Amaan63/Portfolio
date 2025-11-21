"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Coffee,
  Music,
  Gamepad2,
  Github,
  Sparkles,
} from "lucide-react";
import VibeCard from "@/components/vibes/VibeCard";
import SpotifyPlayer from "@/components/vibes/SpotifyPlayer";
import TopTracksList from "@/components/vibes/TopTracksList";
import StatsGrid from "@/components/vibes/StatsGrid";

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

  return (
    <section
      id="vibes"
      className="py-16 md:py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white scroll-mt-20"
      ref={vibesRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:max-w-[1800px] w-full">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">

          {/* Left Column: Vibe Cards (Span 5) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
            {vibeCards.map((card, index) => (
              <VibeCard key={card.title} {...card} index={index} />
            ))}
          </div>

          {/* Right Column: Spotify Player (Span 7) */}
          <div className="lg:col-span-7 h-full">
            <SpotifyPlayer
              playlist={spotifyPlaylist}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              progress={progress}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onNext={() =>
                setCurrentTrack(
                  (currentTrack + 1) % (spotifyPlaylist?.tracks.length || 1)
                )
              }
              onPrev={() =>
                setCurrentTrack(
                  currentTrack === 0
                    ? (spotifyPlaylist?.tracks.length || 1) - 1
                    : currentTrack - 1
                )
              }
            />
          </div>
        </div>

        {/* Top 10 List (Compact) */}
        <TopTracksList
          tracks={spotifyPlaylist?.tracks || []}
          currentTrack={currentTrack}
          onTrackSelect={(index) => {
            setCurrentTrack(index);
            setIsPlaying(true);
          }}
        />

        {/* This Year in Numbers */}
        <StatsGrid githubCommits={githubCommits} />
      </div>
    </section>
  );
};

export default VibesSection;
