import React, { useState, useMemo, useEffect } from 'react';
import {
  Tv,
  X,
  Search,
  Sparkles,
  Flame,
  Droplets,
  Store,
  FlaskConical,
  Sliders,
  Clock,
  Eye,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Share2,
  Play,
  RotateCcw,
  Film,
  BookOpen
} from 'lucide-react';
import { TEA_VIDEOS, VIDEO_CATEGORIES } from '../data/teaVideos';
import { trackEvent } from '../utils/analytics';

export default function TeaVideoAcademyModal({
  isOpen,
  onClose,
  onBrewWithVideo,
  initialVideoId = null
}) {
  const [selectedVideo, setSelectedVideo] = useState(() => {
    if (initialVideoId) {
      const found = TEA_VIDEOS.find((v) => v.id === initialVideoId || v.youtubeId === initialVideoId);
      if (found) return found;
    }
    return TEA_VIDEOS.find((v) => v.featured) || TEA_VIDEOS[0];
  });

  // viewMode: 'library' | 'player'
  // If user opens with a specific video deep link, open player. Otherwise default to full library catalog.
  const [viewMode, setViewMode] = useState(() => (initialVideoId ? 'player' : 'library'));
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync if initialVideoId changes dynamically
  useEffect(() => {
    if (initialVideoId) {
      const found = TEA_VIDEOS.find((v) => v.id === initialVideoId || v.youtubeId === initialVideoId);
      if (found) {
        setSelectedVideo(found);
        setViewMode('player');
      }
    }
  }, [initialVideoId]);

  // Filtered videos based on category and search
  const filteredVideos = useMemo(() => {
    return TEA_VIDEOS.filter((video) => {
      const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        video.title.toLowerCase().includes(q) ||
        video.creator.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  // Handle Play Video Click
  const handleWatchVideo = (video) => {
    setSelectedVideo(video);
    setViewMode('player');
    trackEvent('video_academy_watch_click', { videoId: video.id, title: video.title });
  };

  // Handle Load Recipe / Steep With Video
  const handleBrewClick = (video) => {
    if (video.recipeSync && onBrewWithVideo) {
      onBrewWithVideo(video.recipeSync);
      trackEvent('video_academy_brew_sync', { videoId: video.id, recipe: video.recipeSync.methodName });
      onClose();
    }
  };

  // Share current video link
  const handleShareVideo = (video) => {
    const url = `${window.location.origin}${window.location.pathname}?video=${video.id || video.youtubeId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
      trackEvent('video_academy_share_copied', { videoId: video.id });
    }
  };

  // Category Icon Mapping
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'gongfu':
        return <Sparkles className="w-3.5 h-3.5 text-sage-300" />;
      case 'matcha':
        return <Flame className="w-3.5 h-3.5 text-emerald-400" />;
      case 'green_white':
        return <Droplets className="w-3.5 h-3.5 text-cyan-400" />;
      case 'chai_black':
        return <Store className="w-3.5 h-3.5 text-amber-400" />;
      case 'water_science':
        return <FlaskConical className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-sage-300" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-academy-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-[#09150E] border-2 border-sage-500/40 shadow-2xl overflow-hidden text-cream-light">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#07130B] via-[#0B1E12] to-[#08170E] border-b border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-sage-300 shadow-lg shadow-emerald-500/20 shrink-0">
              <Tv className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-sage-300">
                  Tea Academy
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600/20 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  {TEA_VIDEOS.length} Masterclasses
                </span>
              </div>
              <h2 id="video-academy-title" className="font-serif text-lg sm:text-xl font-bold text-cream-light leading-tight">
                Masterclass Video Hub
              </h2>
            </div>
          </div>

          {/* Navigation View Switcher (Library vs Player) */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('library')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'library'
                    ? 'bg-sage-400 text-slate-950 shadow-md font-extrabold'
                    : 'text-cream-soft hover:text-white'
                }`}
                title="Browse Full Video Catalog"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Library ({filteredVideos.length})</span>
              </button>
              
              <button
                type="button"
                onClick={() => setViewMode('player')}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'player'
                    ? 'bg-sage-400 text-slate-950 shadow-md font-extrabold'
                    : 'text-cream-soft hover:text-white'
                }`}
                title="Watch Selected Video"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Theater Player</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-cream-soft hover:text-white border border-white/10 transition shrink-0"
              title="Close Tea Academy"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar space-y-8 text-cream-light">
          
          {/* ========================================================================= */}
          {/* VIEW MODE 1: FULL MASTERCLASS LIBRARY CATALOG                            */}
          {/* ========================================================================= */}
          {viewMode === 'library' && (
            <div className="space-y-6 animate-fade-in">
              {/* Academy Hero Introduction Banner */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#07130B] via-[#0E2617] to-[#07150C] border border-sage-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-sage-300 font-mono text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30">
                      Curated Masterclasses
                    </span>
                    <span className="text-xs font-mono text-cream-soft/70">
                      Tea Masters • Historic Gardens • Botanical Science
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-light leading-snug">
                    Fine Tea Masterclasses & Steeping Guides
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-soft/80 font-sans">
                    Explore {TEA_VIDEOS.length} hand-picked video tutorials covering Gongfu ceremony, Matcha whisking, water chemistry, and historic tea terroirs. Every masterclass synchronizes directly with our guided steeping timers.
                  </p>
                </div>

                {selectedVideo && (
                  <button
                    type="button"
                    onClick={() => setViewMode('player')}
                    className="px-4 py-2.5 rounded-2xl btn-tactile-tea text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition shrink-0 self-stretch sm:self-auto justify-center"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Featured ({selectedVideo.creator})</span>
                  </button>
                )}
              </div>

              {/* Filter Bar & Search */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                    {VIDEO_CATEGORIES.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      const count = cat.id === 'all' 
                        ? TEA_VIDEOS.length 
                        : TEA_VIDEOS.filter(v => v.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition whitespace-nowrap border shrink-0 ${
                            isActive
                              ? 'bg-sage-400 text-slate-950 border-sage-300 shadow-md font-black'
                              : 'bg-white/[0.04] text-cream-soft hover:text-white border-white/10 hover:bg-white/[0.08]'
                          }`}
                        >
                          {getCategoryIcon(cat.id)}
                          <span>{cat.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isActive ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-black/40 text-cream-soft/60'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Input */}
                  <div className="relative min-w-[240px]">
                    <Search className="w-4 h-4 text-cream-soft/50 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search masterclasses..."
                      className="w-full pl-9 pr-8 py-2 bg-black/50 border border-white/10 rounded-xl text-xs font-mono text-cream-light placeholder:text-cream-soft/40 focus:outline-none focus:border-sage-400 transition"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cream-soft/50 hover:text-cream-light"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Video Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVideos.map((video) => {
                    const isCurrent = selectedVideo?.id === video.id;
                    return (
                      <div
                        key={video.id}
                        onClick={() => handleWatchVideo(video)}
                        className={`group relative rounded-3xl bg-[#0B1B11] border transition overflow-hidden cursor-pointer flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                          isCurrent
                            ? 'border-sage-400 ring-2 ring-sage-400/40'
                            : 'border-white/10 hover:border-sage-500/40'
                        }`}
                      >
                        {/* Thumbnail Container */}
                        <div className="relative aspect-video w-full overflow-hidden bg-black">
                          <img
                            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                            alt={video.title}
                            loading="lazy"
                            onError={(e) => {
                              if (!e.currentTarget.dataset.fallback) {
                                e.currentTarget.dataset.fallback = 'true';
                                e.currentTarget.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
                              }
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                          />
                          
                          {/* Duration Badge */}
                          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md text-white font-mono text-[10px] font-bold flex items-center gap-1 border border-white/10">
                            <Clock className="w-2.5 h-2.5 text-sage-300" />
                            <span>{video.duration}</span>
                          </div>

                          {/* Featured Pill */}
                          {video.featured && (
                            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-emerald-500/90 backdrop-blur-md text-white font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Featured Masterclass</span>
                            </div>
                          )}

                          {/* Hover Play Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            {/* Creator Row */}
                            <div className="flex items-center gap-2 mb-1.5">
                              {video.creatorAvatar && (
                                <img
                                  src={video.creatorAvatar}
                                  alt={video.creator}
                                  className="w-5 h-5 rounded-full object-cover border border-white/20"
                                />
                              )}
                              <span className="text-[11px] font-mono font-bold text-sage-300 truncate">
                                {video.creator}
                              </span>
                              {video.creatorBadge && (
                                <span className="text-[9px] font-mono text-cream-soft/60 truncate">
                                  • {video.creatorBadge}
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h4 className="font-serif text-sm font-bold text-cream-light group-hover:text-sage-300 transition line-clamp-2 leading-snug">
                              {video.title}
                            </h4>

                            {/* Description snippet */}
                            <p className="text-xs text-cream-soft/75 line-clamp-2 mt-1 font-sans">
                              {video.description}
                            </p>
                          </div>

                          {/* Bottom Action Footer */}
                          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                            <span className="text-[10px] font-mono text-cream-soft/60">
                              {video.views} Views
                            </span>

                            <div className="flex items-center gap-1.5">
                              {video.recipeSync && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleBrewClick(video);
                                  }}
                                  className="px-2 py-1 rounded-lg bg-sage-400/20 hover:bg-sage-400 hover:text-slate-950 text-sage-300 text-[10px] font-bold border border-sage-400/40 transition flex items-center gap-1"
                                  title="Load this steeping recipe into the timer"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  <span>Steep 1:{video.recipeSync.ratio}</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleWatchVideo(video);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold border border-white/15 transition flex items-center gap-1"
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>Watch</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredVideos.length === 0 && (
                  <div className="py-12 text-center p-8 rounded-3xl bg-black/40 border border-white/10 space-y-3">
                    <Tv className="w-10 h-10 text-cream-soft/40 mx-auto" />
                    <h5 className="font-serif text-lg font-bold text-cream-light">
                      No matching video masterclasses found
                    </h5>
                    <p className="text-xs text-cream-soft/60">
                      Try clearing your search query or selecting another category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW MODE 2: THEATER PLAYER & BREW SYNC                                  */}
          {/* ========================================================================= */}
          {viewMode === 'player' && selectedVideo && (
            <div className="space-y-6 animate-fade-in">
              {/* Back to Library Button Bar */}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode('library')}
                  className="px-4 py-2 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-cream-light hover:text-sage-300 border border-white/15 text-xs font-mono font-bold flex items-center gap-2 transition active:scale-95 shadow"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← Back to Masterclass Library ({TEA_VIDEOS.length} Videos)</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cream-soft/70 hidden sm:inline">Now Playing:</span>
                  <span className="px-2.5 py-1 rounded-full bg-sage-400/20 text-sage-300 font-mono text-xs font-bold border border-sage-400/40">
                    {selectedVideo.creator}
                  </span>
                </div>
              </div>

              {/* Main Theater Player Container */}
              <div
                id="academy-theater-player"
                className="rounded-3xl bg-[#0B1A10] border border-sage-500/30 p-4 sm:p-6 shadow-2xl space-y-5"
              >
                {/* 16:9 Responsive YouTube Embed */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-white/10">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                {/* Video Info Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pt-2">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-sage-400/20 text-sage-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-sage-400/30">
                        {selectedVideo.category.toUpperCase().replace('_', ' ')}
                      </span>
                      <span className="text-xs font-mono text-cream-soft/70">
                        {selectedVideo.duration} • {selectedVideo.views} Views
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-light leading-snug">
                      {selectedVideo.title}
                    </h3>

                    <div className="flex items-center gap-2.5 pt-1">
                      {selectedVideo.creatorAvatar && (
                        <img
                          src={selectedVideo.creatorAvatar}
                          alt={selectedVideo.creator}
                          className="w-7 h-7 rounded-full object-cover border border-white/20 shadow"
                        />
                      )}
                      <div>
                        <div className="text-xs font-mono font-bold text-cream-light">
                          {selectedVideo.creator}
                        </div>
                        {selectedVideo.creatorBadge && (
                          <div className="text-[10px] font-mono text-sage-300">
                            {selectedVideo.creatorBadge}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-cream-soft/80 font-sans leading-relaxed pt-2">
                      {selectedVideo.description}
                    </p>
                  </div>

                  {/* Sync Recipe with Steeping Timer Box */}
                  {selectedVideo.recipeSync && (
                    <div className="w-full md:w-80 rounded-2xl bg-black/60 border border-sage-500/40 p-4 space-y-3 shadow-lg shrink-0">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-sage-300 font-extrabold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-sage-300" />
                          <span>Dialed-In Steeping Recipe</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          Ready to Sync
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="font-bold text-cream-light">
                          {selectedVideo.recipeSync.methodName}
                        </div>
                        <div className="text-stone-300 text-[11px]">
                          Target Ratio: <span className="text-sage-300 font-bold">1:{selectedVideo.recipeSync.ratio}</span> • Temp: <span className="text-cyan-300 font-bold">{selectedVideo.recipeSync.waterTempF}°F ({selectedVideo.recipeSync.waterTempC}°C)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full">
                        <button
                          onClick={() => handleBrewClick(selectedVideo)}
                          className="flex-1 py-2.5 px-4 rounded-xl btn-tactile-tea text-white font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Steep With This Video</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleShareVideo(selectedVideo)}
                          className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-cream-soft hover:text-white border border-white/10 transition"
                          title={copiedLink ? 'Link Copied!' : 'Share Video Link'}
                        >
                          {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Up Next / Explore More Masterclasses Carousel Grid */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-cream-light flex items-center gap-2">
                    <Film className="w-4 h-4 text-sage-300" />
                    <span>Up Next • More Masterclasses in the Academy</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setViewMode('library')}
                    className="text-sage-300 hover:underline text-xs font-mono font-bold flex items-center gap-1"
                  >
                    <span>View All {TEA_VIDEOS.length} Masterclasses</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {TEA_VIDEOS.filter(v => v.id !== selectedVideo.id).slice(0, 4).map((v) => (
                    <div
                      key={v.id}
                      onClick={() => handleWatchVideo(v)}
                      className="p-3 rounded-2xl bg-[#09170E] border border-white/10 hover:border-sage-400/40 cursor-pointer transition group shadow-md flex gap-3 items-center"
                    >
                      <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-black shrink-0">
                        <img
                          src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                          alt={v.title}
                          onError={(e) => {
                            if (!e.currentTarget.dataset.fallback) {
                              e.currentTarget.dataset.fallback = 'true';
                              e.currentTarget.src = `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`;
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-4 h-4 text-sage-300 fill-current" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-mono text-sage-300 truncate">{v.creator}</div>
                        <h5 className="font-serif text-xs font-bold text-cream-light line-clamp-2 group-hover:text-sage-300 leading-tight">
                          {v.title}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sourcing / Attribution Disclosure Footer */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-cream-soft/60">
            <span>
              All video streams hosted directly via YouTube. Zero video storage overhead or server egress cost.
            </span>
            <span className="text-sage-300 font-bold">
              © {new Date().getFullYear()} LooseLeaf • Tea Video Academy
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
