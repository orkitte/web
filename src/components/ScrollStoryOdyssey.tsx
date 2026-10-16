import React, { useEffect, useRef, useState } from 'react';
import {
  STORY_CHAPTERS,
  getStoryStateByProgress,
} from '../utils/orcatLogic';
import { OrcatMascotSVG } from './OrcatMascotSVG';
import {
  ArrowDown,
  Gauge,
  Thermometer,
  Sun,
  ShieldCheck,
  Compass,
  Sparkles,
  Zap,
  Lock,
} from 'lucide-react';

export const ScrollStoryOdyssey: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [manualChapter, setManualChapter] = useState<number | null>(null);
  const [isStoryInView, setIsStoryInView] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 900;
      const totalScrollable = Math.max(1, rect.height - windowHeight * 0.55);
      const scrolled = -rect.top + windowHeight * 0.25;
      const ratio = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setScrollProgress(ratio);
      setManualChapter(null);

      // Story section is actively in viewport for floating mobile telemetry
      const inView = rect.top < 120 && rect.bottom > 220;
      setIsStoryInView(inView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const effectiveProgress =
    manualChapter !== null ? (manualChapter + 0.15) / STORY_CHAPTERS.length : scrollProgress;
  const storyState = getStoryStateByProgress(effectiveProgress);
  const { physics } = storyState;

  const handleSelectChapter = (index: number) => {
    setManualChapter(index);
    setScrollProgress((index + 0.15) / STORY_CHAPTERS.length);
    const target = chapterRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Interpolate continuous background color from 0m (Surface) down to 1000m (Base Seabed)
  // Surface: Sky/Surface Cyan (#0284C7) to Deep Blue (#0B2A72)
  // Seabed: Midnight Indigo (#0A2569) to Rich Dark Navy (#06133B) - NEVER black!
  const depthFactor = storyState.depthMeters / 1000;
  const sunOpacity = Math.max(0, (physics.sunlightPercent / 100) * 0.85);

  const topR = Math.round(2 + depthFactor * 8);
  const topG = Math.round(132 - depthFactor * 95);
  const topB = Math.round(199 - depthFactor * 94);

  const botR = Math.round(11 - depthFactor * 5);
  const botG = Math.round(42 - depthFactor * 23);
  const botB = Math.round(114 - depthFactor * 55);

  return (
    <section
      id="story"
      ref={sectionRef}
      aria-labelledby="story-heading"
      className="relative text-white py-20 lg:py-28 border-t border-b border-[#0284C7]/30 transition-colors duration-700 ease-out overflow-x-clip"
      style={{
        background: `linear-gradient(180deg, 
          rgba(${topR}, ${topG}, ${topB}, 1) 0%, 
          rgba(${botR}, ${botG}, ${botB}, 1) 100%)`,
      }}
    >
      {/* ================= CARTOONIZED FLOWING AQUATIC LAYERS ================= */}
      {/* 1. Surface Rolling Cartoon Waves (fades as user scrolls deep) */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-24 overflow-hidden transition-opacity duration-500 z-0"
        style={{ opacity: Math.max(0, 1 - depthFactor * 2) }}
      >
        <svg
          viewBox="0 0 1440 90"
          className="w-[200%] h-full animate-wave-ribbon text-white/20 fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,36 C240,65 480,12 720,40 C960,68 1200,18 1440,36 L1440,0 L0,0 Z" />
        </svg>
        <svg
          viewBox="0 0 1440 90"
          className="absolute top-0 left-0 w-[200%] h-full animate-wave-drift text-cyan-200/25 fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,24 C320,55 640,0 960,35 C1280,68 1440,24 1440,24 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* 2. Dual-Layer Caustics Webbing & Volumetric Crepuscular God Rays */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 z-0"
        style={{ opacity: sunOpacity }}
      >
        {/* Layer A: Radial Sun Caustics Shimmer */}
        <div
          className="w-full h-full animate-caustics"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 0%, rgba(255, 255, 255, 0.45) 0%, transparent 60%), radial-gradient(ellipse at 75% 10%, rgba(123, 198, 255, 0.35) 0%, transparent 50%)',
          }}
        />

        {/* Layer C: Piercing Volumetric God Rays from Surface */}
        <svg
          viewBox="0 0 1200 700"
          className="absolute top-0 left-0 w-full h-[650px] opacity-45 mix-blend-screen"
          preserveAspectRatio="none"
        >
          <polygon points="100,0 260,600 180,600 60,0" fill="url(#sunRayGrad)" />
          <polygon points="380,0 580,680 480,680 320,0" fill="url(#sunRayGrad)" />
          <polygon points="760,0 980,620 880,620 700,0" fill="url(#sunRayGrad)" />
          <polygon points="1020,0 1180,560 1110,560 980,0" fill="url(#sunRayGrad)" />
          <defs>
            <linearGradient id="sunRayGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="45%" stopColor="#7BC6FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0055FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 3. Distant Marine Life Silhouettes (Giant Whale & Manta Ray) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Distant Cartoon Blue Whale Silhouette (Upper/Mid Depth) */}
        <div className="absolute top-[17%] w-full animate-whale-glide opacity-25">
          <svg width="220" height="75" viewBox="0 0 220 75" fill="none">
            {/* Whale Body */}
            <path
              d="M190 38 C170 12, 90 8, 30 25 C10 32, 0 45, 0 45 C0 45, 20 62, 70 65 C120 68, 175 55, 190 38 Z"
              fill="#38BDF8"
              fillOpacity="0.8"
            />
            {/* Belly Texture */}
            <path
              d="M30 45 C70 58, 130 58, 170 42 C130 52, 70 52, 30 45 Z"
              fill="#E0F2FE"
              fillOpacity="0.6"
            />
            {/* Whale Tail Fluke */}
            <polygon points="185,38 215,20 205,38 218,54" fill="#0284C7" />
            {/* Pectoral Flipper */}
            <path d="M65 48 C60 62, 75 70, 85 58 Z" fill="#0284C7" />
            {/* Eye Dot */}
            <circle cx="28" cy="34" r="2.5" fill="#FFFFFF" />
            <circle cx="27" cy="34" r="1.2" fill="#0369A1" />
          </svg>
        </div>

        {/* Distant Spotted Manta Ray Silhouette (Mid Depth) */}
        <div className="absolute top-[43%] w-full animate-manta-drift opacity-25">
          <svg width="130" height="70" viewBox="0 0 130 70" fill="none">
            {/* Wings & Body */}
            <path
              d="M65 10 C85 10, 125 35, 130 42 C115 45, 80 50, 65 52 C50 50, 15 45, 0 42 C5 35, 45 10, 65 10 Z"
              fill="#818CF8"
              fillOpacity="0.75"
            />
            {/* Cephalic Horns */}
            <path d="M60 10 C58 4, 62 0, 64 6 M70 10 C72 4, 68 0, 66 6" stroke="#C7D2FE" strokeWidth="2" />
            {/* Whip Tail */}
            <path d="M65 52 Q64 62, 68 70" stroke="#C7D2FE" strokeWidth="2" strokeLinecap="round" />
            {/* Gentle Wing Spots */}
            <circle cx="50" cy="32" r="2" fill="#FFFFFF" fillOpacity="0.6" />
            <circle cx="80" cy="32" r="2" fill="#FFFFFF" fillOpacity="0.6" />
            <circle cx="65" cy="36" r="2.5" fill="#FFFFFF" fillOpacity="0.6" />
            <circle cx="56" cy="42" r="1.8" fill="#FFFFFF" fillOpacity="0.5" />
            <circle cx="74" cy="42" r="1.8" fill="#FFFFFF" fillOpacity="0.5" />
          </svg>
        </div>
      </div>

      {/* 4. Multi-Tier Realistic Ocean Bubbles */}
      {/* 4A. Micro-Fizz Effervescent Trails (Tiny 2-4px rapid sparkling fizz) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Fizz Trail 1: Upper-left */}
        <div className="absolute top-[12%] left-[7%] flex flex-col items-center gap-3 animate-micro-fizz">
          <div className="w-1.5 h-1.5 rounded-full bg-white/95 shadow-[0_0_8px_#BAE6FD]" />
          <div className="w-1 h-1 ml-2 rounded-full bg-cyan-200/90" />
          <div className="w-2 h-2 -ml-1 rounded-full bg-white/90 shadow-[0_0_6px_#38BDF8]" />
          <div className="w-1 h-1 ml-1 rounded-full bg-sky-100/80" />
        </div>

        {/* Fizz Trail 2: Mid-right current wake */}
        <div
          className="absolute top-[42%] left-[86%] flex flex-col items-center gap-2.5 animate-micro-fizz"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="w-2 h-2 rounded-full bg-white/95 shadow-[0_0_8px_#BAE6FD]" />
          <div className="w-1 h-1 ml-2.5 rounded-full bg-cyan-100/90" />
          <div className="w-1.5 h-1.5 -ml-1 rounded-full bg-white/80" />
          <div className="w-1 h-1 ml-1 rounded-full bg-sky-200/85" />
        </div>

        {/* Fizz Trail 3: Deep seabed ascent */}
        <div
          className="absolute top-[68%] left-[26%] flex flex-col items-center gap-3 animate-micro-fizz"
          style={{ animationDelay: '2.3s' }}
        >
          <div className="w-1 h-1 rounded-full bg-teal-100/90" />
          <div className="w-2 h-2 ml-1.5 rounded-full bg-cyan-200/90 shadow-[0_0_8px_#2DD4BF]" />
          <div className="w-1.5 h-1.5 -ml-1 rounded-full bg-white/85" />
        </div>
      </div>

      {/* 4B. Medium Hydrodynamic Wobble Bubbles (12-18px with crescent specular arc) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
        style={{
          transform: `translateY(-${Math.round(scrollProgress * 180)}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Wobble Bubble 1: Upper-left */}
        <div
          className="absolute top-[9%] left-[18%] w-10 h-10 rounded-full border border-white/60 bg-gradient-to-br from-cyan-300/25 via-sky-400/10 to-transparent backdrop-blur-[1px] shadow-[inset_0_0_8px_rgba(255,255,255,0.4)] animate-bubble-wobble"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="absolute top-1.5 left-2 w-3 h-1.5 rounded-full bg-white/90 -rotate-25 blur-[0.3px]" />
          <span className="absolute bottom-1.5 right-2 w-1.5 h-1 rounded-full bg-white/45" />
        </div>

        {/* Wobble Bubble 2: Mid-right */}
        <div
          className="absolute top-[32%] left-[76%] w-12 h-12 rounded-full border border-white/65 bg-gradient-to-br from-cyan-200/30 via-sky-500/10 to-transparent backdrop-blur-[1px] shadow-[inset_0_0_10px_rgba(255,255,255,0.45)] animate-bubble-wobble"
          style={{ animationDelay: '1.6s' }}
        >
          <span className="absolute top-2 left-2.5 w-3.5 h-2 rounded-full bg-white/95 -rotate-25 blur-[0.4px]" />
          <span className="absolute bottom-2 right-2.5 w-2 h-1 rounded-full bg-white/50" />
        </div>

        {/* Wobble Bubble 3: Mid-depth center */}
        <div
          className="absolute top-[50%] left-[16%] w-9 h-9 rounded-full border border-white/50 bg-gradient-to-br from-teal-200/25 via-cyan-500/10 to-transparent backdrop-blur-[1px] shadow-[inset_0_0_6px_rgba(255,255,255,0.35)] animate-bubble-wobble"
          style={{ animationDelay: '3.1s' }}
        >
          <span className="absolute top-1 left-1.5 w-2.5 h-1.5 rounded-full bg-white/90 -rotate-20 blur-[0.3px]" />
          <span className="absolute bottom-1 right-1.5 w-1 h-1 rounded-full bg-white/40" />
        </div>

        {/* Wobble Bubble 4: Deep Seabed ascent */}
        <div
          className="absolute top-[78%] left-[34%] w-11 h-11 rounded-full border border-cyan-300/50 bg-gradient-to-br from-cyan-400/20 via-sky-600/10 to-transparent backdrop-blur-[1px] shadow-[inset_0_0_9px_rgba(56,189,248,0.4)] animate-bubble-wobble"
          style={{ animationDelay: '2.2s' }}
        >
          <span className="absolute top-1.5 left-2 w-3 h-1.5 rounded-full bg-white/90 -rotate-25 blur-[0.4px]" />
          <span className="absolute bottom-1.5 right-2 w-1.5 h-1 rounded-full bg-cyan-200/50" />
        </div>
      </div>

      {/* 4C. Giant Glassy "Breather" Domes (30-46px slow ascent, dual-glint refraction) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
        style={{
          transform: `translateY(-${Math.round(scrollProgress * 280)}px)`,
          transition: 'transform 0.18s ease-out',
        }}
      >
        {/* Giant Breather Dome 1: Upper Ocean right */}
        <div
          className="absolute top-[16%] left-[89%] w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/70 bg-gradient-to-br from-cyan-200/30 via-sky-500/15 to-transparent backdrop-blur-[2px] shadow-[inset_0_0_16px_rgba(255,255,255,0.6),0_0_14px_rgba(56,189,248,0.3)] animate-giant-dome"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="absolute top-2.5 left-3 w-5 h-2.5 rounded-full bg-white/95 -rotate-30 blur-[0.5px]" />
          <span className="absolute top-4 left-6 w-1.5 h-1.5 rounded-full bg-white/80" />
          <span className="absolute bottom-2.5 right-3 w-4 h-2 rounded-full bg-cyan-200/60 blur-[0.4px]" />
        </div>

        {/* Giant Breather Dome 2: Deep Abyss left */}
        <div
          className="absolute top-[74%] left-[6%] w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-cyan-300/60 bg-gradient-to-br from-teal-200/25 via-blue-700/15 to-transparent backdrop-blur-[2px] shadow-[inset_0_0_14px_rgba(255,255,255,0.5),0_0_16px_rgba(45,212,191,0.3)] animate-giant-dome"
          style={{ animationDelay: '3.6s' }}
        >
          <span className="absolute top-2.5 left-3 w-4.5 h-2 rounded-full bg-white/95 -rotate-30 blur-[0.5px]" />
          <span className="absolute top-3.5 left-5 w-1.5 h-1.5 rounded-full bg-white/75" />
          <span className="absolute bottom-2.5 right-3 w-3 h-1.5 rounded-full bg-teal-200/50" />
        </div>
      </div>

      {/* 4D. Parallax Ambient Buoyant Bubbles */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
        style={{
          transform: `translateY(-${Math.round(scrollProgress * 220)}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="absolute top-[24%] left-[84%] w-6 h-6 rounded-full border-2 border-white/50 bg-cyan-200/20 animate-bubble-rise" style={{ animationDelay: '1.2s' }}>
          <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
        <div className="absolute top-[40%] left-[24%] w-8 h-8 rounded-full border-2 border-white/50 bg-sky-200/15 animate-bubble-rise" style={{ animationDelay: '2.4s' }}>
          <span className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white/90" />
        </div>
        <div className="absolute top-[60%] left-[80%] w-7 h-7 rounded-full border-2 border-white/60 bg-cyan-200/20 animate-bubble-rise" style={{ animationDelay: '0.7s' }}>
          <span className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
        <div className="absolute top-[90%] left-[28%] w-8 h-8 rounded-full border-2 border-white/50 bg-cyan-200/20 animate-bubble-rise" style={{ animationDelay: '1.5s' }}>
          <span className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white/85" />
        </div>
      </div>

      {/* 5. Fluid Cartoon Water Current Flow Lines (Continuous Liquid Curves - No Dotted Lines) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 z-0">
        <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="currentGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0" />
              <stop offset="25%" stopColor="#7DD3FC" stopOpacity="0.5" />
              <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="currentGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#818CF8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="currentGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0" />
              <stop offset="25%" stopColor="#60A5FA" stopOpacity="0.4" />
              <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-100,180 C300,120 600,240 1300,160"
            fill="none"
            stroke="url(#currentGrad1)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-wave-drift"
          />
          <path
            d="M-100,450 C400,520 700,380 1300,460"
            fill="none"
            stroke="url(#currentGrad2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-wave-ribbon"
          />
          <path
            d="M-100,720 C250,680 800,760 1300,690"
            fill="none"
            stroke="url(#currentGrad3)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-wave-drift"
          />
        </svg>
      </div>

      {/* 6. Swimming Cartoon Fish Pods (Drifting across mid depths) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Pod 1: Swimming leftward at upper-mid depth */}
        <div className="absolute top-[26%] w-full animate-swim-fish-left opacity-60">
          <div className="flex items-center gap-6">
            <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
              <path d="M38 14 C30 5, 12 6, 4 14 C12 22, 30 23, 38 14 Z" fill="#38BDF8" />
              <polygon points="34,14 46,6 44,14 46,22" fill="#0284C7" />
              <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
              <circle cx="11" cy="12" r="1.5" fill="#0F172A" />
            </svg>
            <svg width="34" height="20" viewBox="0 0 48 28" fill="none" className="-mt-3">
              <path d="M38 14 C30 5, 12 6, 4 14 C12 22, 30 23, 38 14 Z" fill="#FACC15" />
              <polygon points="34,14 46,6 44,14 46,22" fill="#EAB308" />
              <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
              <circle cx="11" cy="12" r="1.5" fill="#0F172A" />
            </svg>
            <svg width="40" height="24" viewBox="0 0 48 28" fill="none" className="mt-2">
              <path d="M38 14 C30 5, 12 6, 4 14 C12 22, 30 23, 38 14 Z" fill="#38BDF8" />
              <polygon points="34,14 46,6 44,14 46,22" fill="#0284C7" />
              <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
              <circle cx="11" cy="12" r="1.5" fill="#0F172A" />
            </svg>
          </div>
        </div>

        {/* Pod 2: Swimming rightward at lower-mid depth */}
        <div className="absolute top-[56%] w-full animate-swim-fish-right opacity-50">
          <div className="flex items-center gap-5">
            <svg width="42" height="26" viewBox="0 0 48 28" fill="none">
              <path d="M38 14 C30 5, 12 6, 4 14 C12 22, 30 23, 38 14 Z" fill="#818CF8" />
              <polygon points="34,14 46,6 44,14 46,22" fill="#4F46E5" />
              <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
              <circle cx="11" cy="12" r="1.5" fill="#0F172A" />
            </svg>
            <svg width="30" height="18" viewBox="0 0 48 28" fill="none" className="mt-3">
              <path d="M38 14 C30 5, 12 6, 4 14 C12 22, 30 23, 38 14 Z" fill="#38BDF8" />
              <polygon points="34,14 46,6 44,14 46,22" fill="#0284C7" />
              <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
              <circle cx="11" cy="12" r="1.5" fill="#0F172A" />
            </svg>
          </div>
        </div>
      </div>

      {/* 7. Drifting Cute Cartoon Jellyfish (Mesopelagic / Bathypelagic Twilight) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[42%] left-[4%] animate-jellyfish opacity-65">
          <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
            <path
              d="M5 45 C5 15, 65 15, 65 45 C65 52, 5 52, 5 45 Z"
              fill="#38BDF8"
              fillOpacity="0.4"
              stroke="#7DD3FC"
              strokeWidth="2"
            />
            <circle cx="22" cy="38" r="3.5" fill="#F472B6" fillOpacity="0.6" />
            <circle cx="48" cy="38" r="3.5" fill="#F472B6" fillOpacity="0.6" />
            <circle cx="28" cy="32" r="2.5" fill="#FFFFFF" />
            <circle cx="28" cy="32" r="1.2" fill="#0C4A6E" />
            <circle cx="42" cy="32" r="2.5" fill="#FFFFFF" />
            <circle cx="42" cy="32" r="1.2" fill="#0C4A6E" />
            <path
              d="M32 38 Q35 42, 38 38"
              stroke="#0C4A6E"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M15 50 Q10 65, 18 80 T15 90"
              stroke="#BAE6FD"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M28 50 Q32 68, 25 82 T28 92"
              stroke="#E0F2FE"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M42 50 Q38 68, 45 82 T42 92"
              stroke="#E0F2FE"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M55 50 Q60 65, 52 80 T55 90"
              stroke="#BAE6FD"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div
          className="absolute top-[70%] right-[4%] animate-jellyfish opacity-55"
          style={{ animationDelay: '2.5s' }}
        >
          <svg width="60" height="80" viewBox="0 0 70 90" fill="none">
            <path
              d="M5 45 C5 15, 65 15, 65 45 C65 52, 5 52, 5 45 Z"
              fill="#A78BFA"
              fillOpacity="0.35"
              stroke="#C4B5FD"
              strokeWidth="2"
            />
            <circle cx="22" cy="38" r="3" fill="#F472B6" fillOpacity="0.6" />
            <circle cx="48" cy="38" r="3" fill="#F472B6" fillOpacity="0.6" />
            <circle cx="28" cy="32" r="2" fill="#FFFFFF" />
            <circle cx="42" cy="32" r="2" fill="#FFFFFF" />
            <path
              d="M18 50 Q12 65, 20 80"
              stroke="#DDD6FE"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M35 50 Q32 68, 38 85"
              stroke="#EDE9FE"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M52 50 Q58 65, 50 80"
              stroke="#DDD6FE"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 8. Marine Snow Drift (in Mesopelagic Twilight Zone) */}
      {storyState.depthMeters >= 180 && storyState.depthMeters < 650 && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 z-0">
          <div className="absolute w-2 h-2 rounded-full bg-blue-100 top-10 left-[15%] animate-ping" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-200 top-36 left-[40%] animate-pulse" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-100 top-20 left-[75%] animate-ping" />
          <div className="absolute w-1 h-1 rounded-full bg-white top-60 left-[85%] animate-pulse" />
        </div>
      )}

      {/* 9. Deep-Sea Bioluminescence Nodes (in Bathypelagic Midnight Abyss) */}
      {storyState.depthMeters >= 550 && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute w-3 h-3 rounded-full bg-cyan-400 blur-[2px] top-28 left-[10%] animate-bio-pulse" />
          <div
            className="absolute w-4 h-4 rounded-full bg-teal-300 blur-[3px] top-72 left-[80%] animate-bio-pulse"
            style={{ animationDelay: '1.2s' }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-cyan-300 blur-[1px] bottom-36 left-[30%] animate-bio-pulse"
            style={{ animationDelay: '2.4s' }}
          />
          <div
            className="absolute w-5 h-5 rounded-full bg-blue-400 blur-[4px] bottom-16 left-[65%] animate-bio-pulse"
            style={{ animationDelay: '0.8s' }}
          />
        </div>
      )}

      {/* 10. Seabed Hydrothermal Bubble Vents & Swaying Kelp Forest */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 overflow-hidden flex items-end justify-between px-4 sm:px-12 opacity-90 z-0">
        {/* Left Kelp Stalk 1 */}
        <div className="animate-kelp-left w-14 h-40">
          <svg viewBox="0 0 60 160" className="w-full h-full" fill="none">
            <path d="M30 160 Q15 120, 35 80 T25 0" stroke="#0D9488" strokeWidth="6" strokeLinecap="round" />
            <path d="M30 130 Q5 115, 10 95 Q30 110, 30 125" fill="#14B8A6" opacity="0.8" />
            <path d="M32 90 Q55 75, 48 55 Q30 70, 32 85" fill="#0D9488" opacity="0.9" />
            <path d="M28 50 Q8 35, 15 18 Q30 35, 28 45" fill="#2DD4BF" opacity="0.75" />
          </svg>
        </div>

        {/* Seabed Hydrothermal Vent Chimney (Left) */}
        <div className="relative w-16 h-28 flex flex-col items-center justify-end">
          {/* Effervescent Multi-Stage Rising Vent Bubbles */}
          <div className="absolute -top-10 w-2 h-2 rounded-full bg-cyan-200 animate-vent-bubble" />
          <div className="absolute -top-6 w-3 h-3 rounded-full bg-teal-200 animate-vent-bubble" style={{ animationDelay: '1.2s' }} />
          <div className="absolute -top-16 w-2.5 h-2.5 rounded-full bg-white animate-vent-bubble" style={{ animationDelay: '2.1s' }} />
          <div className="absolute -top-24 w-3.5 h-3.5 rounded-full border border-white/60 bg-cyan-300/30 animate-vent-bubble" style={{ animationDelay: '2.8s' }} />
          {/* Mineral Chimney */}
          <svg viewBox="0 0 60 70" className="w-full h-16" fill="none">
            <polygon points="12,70 18,18 42,18 48,70" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
            <ellipse cx="30" cy="18" rx="12" ry="5" fill="#06133B" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="30" cy="18" r="4" fill="#38BDF8" opacity="0.8" className="animate-ping" />
          </svg>
        </div>

        {/* Left Kelp Stalk 2 */}
        <div className="animate-kelp-right w-12 h-32 hidden sm:block">
          <svg viewBox="0 0 60 160" className="w-full h-full" fill="none">
            <path d="M30 160 Q45 120, 25 80 T35 20" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
            <path d="M28 120 Q50 105, 45 88 Q28 100, 28 115" fill="#059669" opacity="0.85" />
            <path d="M25 75 Q5 60, 12 42 Q28 55, 25 70" fill="#10B981" opacity="0.8" />
          </svg>
        </div>

        {/* Center Seabed Dunes */}
        <div className="flex-1 h-10 bg-gradient-to-t from-[#06133B] via-[#06133B]/60 to-transparent flex items-end justify-center pb-2">
          {/* Cartoon Sea Star on Floor */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#F43F5E" className="opacity-70 mx-4">
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        </div>

        {/* Right Kelp Stalk 1 */}
        <div className="animate-kelp-left w-12 h-36 hidden sm:block">
          <svg viewBox="0 0 60 160" className="w-full h-full" fill="none">
            <path d="M30 160 Q18 115, 38 75 T28 15" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
            <path d="M32 110 Q52 95, 46 78 Q30 90, 32 105" fill="#10B981" opacity="0.85" />
            <path d="M28 65 Q8 50, 15 32 Q30 45, 28 60" fill="#34D399" opacity="0.8" />
          </svg>
        </div>

        {/* Seabed Hydrothermal Vent Chimney (Right) */}
        <div className="relative w-16 h-28 flex flex-col items-center justify-end">
          <div className="absolute -top-8 w-2 h-2 rounded-full bg-cyan-100 animate-vent-bubble" style={{ animationDelay: '0.4s' }} />
          <div className="absolute -top-14 w-2.5 h-2.5 rounded-full bg-cyan-200 animate-vent-bubble" style={{ animationDelay: '1.1s' }} />
          <div className="absolute -top-20 w-3 h-3 rounded-full bg-white animate-vent-bubble" style={{ animationDelay: '2.2s' }} />
          <div className="absolute -top-28 w-4 h-4 rounded-full border border-white/70 bg-cyan-200/25 animate-vent-bubble" style={{ animationDelay: '3.1s' }} />
          <svg viewBox="0 0 60 70" className="w-full h-16" fill="none">
            <polygon points="14,70 20,22 40,22 46,70" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
            <ellipse cx="30" cy="22" rx="10" ry="4" fill="#06133B" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="30" cy="22" r="3.5" fill="#38BDF8" opacity="0.8" className="animate-ping" />
          </svg>
        </div>

        {/* Right Kelp Stalk 2 */}
        <div className="animate-kelp-right w-16 h-44">
          <svg viewBox="0 0 60 160" className="w-full h-full" fill="none">
            <path d="M30 160 Q42 120, 22 80 T32 0" stroke="#0D9488" strokeWidth="6" strokeLinecap="round" />
            <path d="M28 135 Q52 118, 48 98 Q28 112, 28 130" fill="#14B8A6" opacity="0.85" />
            <path d="M24 95 Q2 78, 10 58 Q26 72, 24 90" fill="#0D9488" opacity="0.9" />
            <path d="M30 55 Q52 38, 45 20 Q28 35, 30 50" fill="#2DD4BF" opacity="0.75" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Section Heading (Clean editorial presentation, horizontal strip moved to vertical floating HUD) */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs text-[#BAE6FD] font-semibold mb-3">
            <Compass className="w-4 h-4 text-[#7BC6FF]" />
            <span>Realistic Ocean Odyssey</span>
            <span aria-hidden="true">·</span>
            <span>Physics-Driven Depth</span>
            <span aria-hidden="true">·</span>
            <span>Vector Mascot Story</span>
          </div>
          <h2
            id="story-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]"
            style={{ textWrap: 'balance' }}
          >
            Follow Orcat from the Sunny Surface to the Deep Vault.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            Scroll down to dive with Orcat. Watch how the real physics of water pressure, light absorption, and temperature transform the ocean as you explore our fair token story.
          </p>
        </div>

        {/* Chapter Quick Jump Navigation */}
        <div
          role="tablist"
          aria-label="Story Chapters"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-2 bg-[#06133B]/70 backdrop-blur-md border border-white/15 rounded-2xl mb-12 shadow-inner"
        >
          {STORY_CHAPTERS.map((chap, idx) => {
            const isActive = storyState.activeChapterIndex === idx;
            return (
              <button
                key={chap.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectChapter(idx)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0055FF] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold truncate">
                  {chap.indexLabel}: {chap.waterZone.split(' ')[0]}
                </span>
                <span className="font-mono-tabular text-xs opacity-85 ml-2">
                  -{chap.depthMeters}m
                </span>
              </button>
            );
          })}
        </div>

        {/* Scrollytelling Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Sticky Submarine Cockpit & Cartoonized Vertical Floating HUD */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start z-20 bg-[#06133B]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 transition-all duration-300">
            {/* Cockpit Status Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/15">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                </span>
                <div>
                  <p className="text-[10px] tracking-wider uppercase font-bold text-[#7BC6FF]">
                    Bathysphere Dive Station
                  </p>
                  <p data-testid="active-water-zone" className="text-base font-extrabold text-white">
                    {storyState.chapter.waterZone}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-[#7BC6FF]">Current Depth</p>
                <p data-testid="active-depth-meter" className="text-xl font-black font-mono-tabular text-cyan-300">
                  -{storyState.depthMeters}m
                </p>
              </div>
            </div>

            {/* Bathysphere Observation Port (Live Swimming Mascot) */}
            <div
              className="relative h-56 rounded-2xl border-2 border-cyan-400/30 overflow-hidden flex flex-col items-center justify-center p-4 transition-colors duration-500 shadow-inner"
              style={{
                backgroundColor:
                  storyState.depthMeters < 200
                    ? '#0284C7'
                    : storyState.depthMeters < 600
                    ? '#0A2569'
                    : '#06133B',
              }}
            >
              {/* Dynamic Wave Grid Background */}
              <svg
                viewBox="0 0 400 160"
                className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 80 Q 50 30, 100 80 T 200 80 T 300 80 T 400 80"
                  fill="none"
                  stroke="#7BC6FF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 0 120 Q 65 95, 130 120 T 260 120 T 400 120"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Swimming Mascot with Dynamic Wave Physics */}
              <div
                className="transition-transform duration-200 ease-out"
                style={{
                  transform: `translateY(${Math.sin(storyState.swimProgress * Math.PI * 3) * 10}px) rotate(${storyState.orcatTiltDeg}deg)`,
                }}
              >
                <OrcatMascotSVG
                  size={175}
                  withCoinBadge={false}
                  pose={storyState.chapter.orcatAction}
                />
              </div>

              <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[11px] text-white/90 font-medium">
                <span>{storyState.chapter.indexLabel}</span>
                <span className="font-mono-tabular">
                  {Math.round(storyState.swimProgress * 100)}% Descent
                </span>
              </div>
            </div>

            {/* Continuous Depth Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5 font-mono-tabular">
                <span>Surface (0m)</span>
                <span>Base Vault (-1,000m)</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/15">
                <div
                  className="h-full bg-gradient-to-r from-[#38BDF8] via-[#0055FF] to-cyan-300 transition-all duration-150"
                  style={{ width: `${Math.max(6, Math.round(storyState.swimProgress * 100))}%` }}
                />
              </div>
            </div>

            {/* ================= CARTOONIZED VERTICAL FLOATING HUD GAUGES ================= */}
            <div className="space-y-2.5 pt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#7BC6FF] flex items-center justify-between">
                <span>Ocean Physics Telemetry</span>
                <span className="font-mono-tabular text-slate-400">Live Sensory Rail</span>
              </div>

              {/* 1. Cartoon Hydrostatic Pressure Barometer */}
              <div className="bg-[#0A1E4A]/80 backdrop-blur-md border border-cyan-400/30 hover:border-cyan-400/60 rounded-2xl p-3 flex items-center gap-3 shadow-md transition-all">
                <div className="relative w-11 h-11 shrink-0 rounded-xl bg-cyan-950/70 border border-cyan-400/40 flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 40 40" className="w-9 h-9">
                    <path
                      d="M 8 28 A 14 14 0 1 1 32 28"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="3"
                    />
                    <path
                      d="M 27 10 A 14 14 0 0 1 32 28"
                      fill="none"
                      stroke="#F43F5E"
                      strokeWidth="3"
                    />
                    <line
                      x1="20"
                      y1="20"
                      x2="20"
                      y2="8"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: '20px 20px',
                        transform: `rotate(${Math.round(-75 + (physics.pressureAtm / 101) * 150)}deg)`,
                        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    />
                    <circle cx="20" cy="20" r="3.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] text-cyan-200 font-semibold">
                    <span>Pressure</span>
                    <span className="text-[10px] text-cyan-300 font-mono-tabular">
                      {physics.pressureAtm < 15 ? 'Surface Atm' : physics.pressureAtm < 60 ? 'Compressed' : 'Abyssal Crush'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-extrabold text-white font-mono-tabular">
                      {physics.pressureAtm} atm
                    </span>
                    <span className="text-xs text-cyan-300 font-mono-tabular">
                      {physics.pressurePsi} psi
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Cartoon Glass Thermometer Capsule */}
              <div className="bg-[#0A1E4A]/80 backdrop-blur-md border border-amber-400/30 hover:border-amber-400/60 rounded-2xl p-3 flex items-center gap-3 shadow-md transition-all">
                <div className="relative w-11 h-11 shrink-0 rounded-xl bg-amber-950/60 border border-amber-400/40 flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 40 40" className="w-9 h-9">
                    <rect x="17" y="6" width="6" height="22" rx="3" fill="#1E293B" stroke="#FDE68A" strokeWidth="1.5" />
                    <circle
                      cx="20"
                      cy="30"
                      r="6"
                      fill={physics.temperatureCelsius > 16 ? '#F97316' : physics.temperatureCelsius > 7 ? '#38BDF8' : '#818CF8'}
                      stroke="#FDE68A"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="18.5"
                      y={Math.round(28 - Math.max(4, Math.min(20, ((physics.temperatureCelsius - 3) / 22) * 20)))}
                      width="3"
                      height={Math.round(Math.max(4, Math.min(20, ((physics.temperatureCelsius - 3) / 22) * 20)))}
                      rx="1.5"
                      fill={physics.temperatureCelsius > 16 ? '#FB923C' : physics.temperatureCelsius > 7 ? '#38BDF8' : '#818CF8'}
                      style={{ transition: 'all 0.3s ease-out' }}
                    />
                    <line x1="18" y1="8" x2="18" y2="24" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] text-amber-200 font-semibold">
                    <span>Water Temp</span>
                    <span className="text-[10px] text-amber-300 font-mono-tabular">
                      {physics.temperatureCelsius > 18 ? 'Tropical Warm' : physics.temperatureCelsius > 8 ? 'Thermocline' : 'Abyssal Chill'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-extrabold text-white font-mono-tabular">
                      {physics.temperatureCelsius}°C
                    </span>
                    <span className="text-xs text-amber-300 font-mono-tabular">
                      {physics.temperatureFahrenheit}°F
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Cartoon Sunlight Radiometer / Lux Bulb */}
              <div className="bg-[#0A1E4A]/80 backdrop-blur-md border border-yellow-400/30 hover:border-yellow-400/60 rounded-2xl p-3 flex items-center gap-3 shadow-md transition-all">
                <div className="relative w-11 h-11 shrink-0 rounded-xl bg-yellow-950/60 border border-yellow-400/40 flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 40 40" className="w-9 h-9">
                    <circle
                      cx="20"
                      cy="20"
                      r="7"
                      fill={physics.sunlightPercent > 10 ? '#FACC15' : physics.sunlightPercent > 0.5 ? '#818CF8' : '#06B6D4'}
                      style={{
                        filter: physics.sunlightPercent > 5 ? 'drop-shadow(0 0 6px #FACC15)' : 'drop-shadow(0 0 4px #06B6D4)',
                        transition: 'all 0.4s ease-out',
                      }}
                    />
                    <g opacity={Math.max(0.15, physics.sunlightPercent / 100)} stroke="#FDE047" strokeWidth="2" strokeLinecap="round">
                      <line x1="20" y1="6" x2="20" y2="9" />
                      <line x1="20" y1="31" x2="20" y2="34" />
                      <line x1="6" y1="20" x2="9" y2="20" />
                      <line x1="31" y1="20" x2="34" y2="20" />
                      <line x1="10" y1="10" x2="12" y2="12" />
                      <line x1="28" y1="28" x2="30" y2="30" />
                      <line x1="10" y1="30" x2="12" y2="28" />
                      <line x1="28" y1="12" x2="30" y2="10" />
                    </g>
                    <circle cx="18" cy="19" r="1" fill="#0F172A" />
                    <circle cx="22" cy="19" r="1" fill="#0F172A" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] text-yellow-200 font-semibold">
                    <span>Sunlight Lux</span>
                    <span className="text-[10px] text-yellow-300 font-mono-tabular">
                      {physics.sunlightPercent > 5 ? 'Solar Light' : physics.sunlightPercent > 0 ? 'Twilight Dim' : '0% Bioluminescent'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-extrabold text-white font-mono-tabular">
                      {physics.sunlightPercent}%
                    </span>
                    <span className="text-xs text-yellow-300 font-semibold truncate">
                      {physics.sunlightPercent > 5 ? 'Solar' : physics.sunlightPercent > 0 ? 'Twilight' : 'Abyssal'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Cartoon Ocean Zone Sonar Radar Scope */}
              <div className="bg-[#0A1E4A]/80 backdrop-blur-md border border-emerald-400/30 hover:border-emerald-400/60 rounded-2xl p-3 flex items-center gap-3 shadow-md transition-all">
                <div className="relative w-11 h-11 shrink-0 rounded-xl bg-emerald-950/60 border border-emerald-400/40 flex items-center justify-center shadow-inner overflow-hidden">
                  <svg viewBox="0 0 40 40" className="w-9 h-9">
                    <circle cx="20" cy="20" r="14" fill="none" stroke="#34D399" strokeWidth="1" opacity="0.5" />
                    <circle cx="20" cy="20" r="9" fill="none" stroke="#34D399" strokeWidth="1" opacity="0.7" />
                    <circle cx="20" cy="20" r="4" fill="none" stroke="#34D399" strokeWidth="1" opacity="0.8" />
                    <g className="animate-sonar-sweep">
                      <line x1="20" y1="20" x2="34" y2="20" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 20 20 L 34 20 A 14 14 0 0 0 30 10 Z" fill="#34D399" fillOpacity="0.35" />
                    </g>
                    <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] text-emerald-200 font-semibold">
                    <span>Ocean Zone</span>
                    <span className="text-[10px] text-emerald-300 font-mono-tabular">
                      -{physics.depthMeters}m
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-extrabold text-white truncate">
                      {physics.zoneName.split(' ')[0]}
                    </span>
                    <span className="text-xs text-emerald-300 font-mono-tabular">
                      -{physics.depthMeters}m
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-world Hydrodynamic Metric Strip */}
            <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Water Clarity</span>
                <span className="font-bold text-white text-right truncate max-w-[190px]">
                  {physics.waterClarity}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>{storyState.chapter.keyFactLabel}</span>
                <span className="font-semibold text-white font-mono-tabular text-right">
                  {storyState.chapter.keyFactValue}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Interactive Story Chapters with Animated Vector Concepts (No JPGs) */}
          <div className="lg:col-span-7 space-y-12">
            {STORY_CHAPTERS.map((chap, idx) => {
              const isCurrent = storyState.activeChapterIndex === idx;

              return (
                <article
                  key={chap.id}
                  ref={(el) => {
                    chapterRefs.current[idx] = el;
                  }}
                  onClick={() => handleSelectChapter(idx)}
                  className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-300 border backdrop-blur-md ${
                    isCurrent
                      ? 'bg-[#06133B]/75 border-[#38BDF8] shadow-2xl scale-[1.01]'
                      : 'bg-[#06133B]/40 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#7BC6FF] font-medium mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{chap.indexLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{chap.waterZone}</span>
                    </div>
                    <span className="font-mono-tabular">Depth: -{chap.depthMeters}m</span>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug"
                    style={{ textWrap: 'balance' }}
                  >
                    {chap.title}
                  </h3>

                  <p className="mt-3 text-base sm:text-lg text-white font-medium leading-relaxed">
                    {chap.simpleSummary}
                  </p>

                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {chap.simpleDetail}
                  </p>

                  {/* ================= VECTOR ANIMATED STORY CONCEPTS (ZERO IMAGES) ================= */}
                  <div className="mt-6 rounded-2xl overflow-hidden border border-white/20 relative aspect-[16/9] bg-gradient-to-b from-black/40 to-black/80 flex items-center justify-center p-6 shadow-inner">
                    {/* Concept 01: Surface Leap & Fair Launch Sunburst */}
                    {idx === 0 && (
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        {/* Sunburst refraction and sky glow */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(ellipse at 85% 0%, rgba(254, 240, 138, 0.4) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 75%), linear-gradient(180deg, #0284C7 0%, #0369A1 60%, #082F49 100%)',
                          }}
                        />

                        {/* Surface Water Line & Rolling Foam Waves */}
                        <svg
                          viewBox="0 0 600 120"
                          className="absolute top-0 left-0 w-full h-24 opacity-60 pointer-events-none"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id="foamWaveGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                              <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 35 C 75 15, 150 45, 225 30 C 300 15, 375 45, 450 30 C 525 15, 575 35, 600 25 L 600 0 L 0 0 Z"
                            fill="url(#foamWaveGrad)"
                          />
                        </svg>

                        {/* Dynamic Foaming Splash Arcs */}
                        <svg
                          viewBox="0 0 400 200"
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          {/* Left Splash Arc */}
                          <path
                            d="M 140 150 Q 100 100, 70 80 Q 95 110, 155 155"
                            fill="rgba(255,255,255,0.7)"
                          />
                          {/* Right Splash Arc */}
                          <path
                            d="M 260 150 Q 300 95, 330 75 Q 305 110, 245 155"
                            fill="rgba(255,255,255,0.7)"
                          />
                          {/* Water Droplet Particles */}
                          <circle cx="65" cy="70" r="3.5" fill="#FFFFFF" opacity="0.9" />
                          <circle cx="85" cy="55" r="2.5" fill="#BAE6FD" opacity="0.8" />
                          <circle cx="335" cy="65" r="3.5" fill="#FFFFFF" opacity="0.9" />
                          <circle cx="315" cy="50" r="2.5" fill="#BAE6FD" opacity="0.8" />
                          <circle cx="200" cy="40" r="2" fill="#FFFFFF" opacity="0.75" />
                        </svg>

                        {/* Leaping Orcat with Joyful Dynamic Tilt */}
                        <div className="relative z-10 flex flex-col items-center animate-bounce">
                          <OrcatMascotSVG size={150} withCoinBadge={false} pose="leap" />
                          <div className="flex items-center gap-3 -mt-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-200 animate-ping" />
                            <span className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#BAE6FD] animate-pulse" />
                            <span className="w-2 rounded-full bg-cyan-200 animate-ping" />
                          </div>
                        </div>

                        {/* Companion Swimming Pod Fish */}
                        <div className="absolute bottom-5 right-8 flex items-center gap-2 pointer-events-none opacity-85">
                          <svg width="34" height="20" viewBox="0 0 48 28" fill="none">
                            <path d="M38 14 C30 5, 12 6, 4 14 C12 22, 30 23, 38 14 Z" fill="#FACC15" />
                            <polygon points="34,14 46,6 44,14 46,22" fill="#EAB308" />
                            <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
                            <circle cx="11" cy="12" r="1.5" fill="#0F172A" />
                          </svg>
                          <svg width="26" height="16" viewBox="0 0 48 28" fill="none" className="-mt-3">
                            <path d="M38 14 C30 5, 12 6, 4 14 C12 22, 30 23, 38 14 Z" fill="#38BDF8" />
                            <polygon points="34,14 46,6 44,14 46,22" fill="#0284C7" />
                            <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
                          </svg>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 right-5 text-[11px] font-bold text-amber-200 bg-amber-950/70 border border-amber-400/40 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                          ☀️ 100% Fair Launch Daylight
                        </div>
                        <div className="absolute bottom-3 left-5 text-[11px] font-bold text-cyan-200 bg-[#06133B]/80 border border-cyan-400/30 px-3 py-1 rounded-full backdrop-blur-md">
                          🌊 Surface Breach · Sunny Epipelagic (0m)
                        </div>
                      </div>
                    )}

                    {/* Concept 02: Base Layer 2 Hyper-Warp Slipstream */}
                    {idx === 1 && (
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        {/* Futuristic Warp Tunnel & Speed Streaks */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#0A2260] to-[#0055FF]/40" />

                        {/* Horizontal Warp Streaks & Perspective Rays */}
                        <svg
                          viewBox="0 0 600 240"
                          className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id="warpSpeedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#0055FF" stopOpacity="0" />
                              <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.8" />
                              <stop offset="85%" stopColor="#FFFFFF" stopOpacity="1" />
                              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <line x1="-50" y1="40" x2="650" y2="40" stroke="url(#warpSpeedGrad)" strokeWidth="1.5" />
                          <line x1="-50" y1="75" x2="650" y2="75" stroke="url(#warpSpeedGrad)" strokeWidth="3" />
                          <line x1="-50" y1="120" x2="650" y2="120" stroke="url(#warpSpeedGrad)" strokeWidth="1" />
                          <line x1="-50" y1="165" x2="650" y2="165" stroke="url(#warpSpeedGrad)" strokeWidth="2.5" />
                          <line x1="-50" y1="200" x2="650" y2="200" stroke="url(#warpSpeedGrad)" strokeWidth="1.5" />
                        </svg>

                        {/* Surfing Orcat in High-Speed Hydro-Slipstream */}
                        <div className="relative z-10 flex items-center gap-6">
                          <div className="animate-float-slow transition-transform">
                            <OrcatMascotSVG size={150} withCoinBadge={false} pose="surf" prop="surfboard" />
                          </div>

                          {/* Floating Holographic Base Ecosystem Energy Badges */}
                          <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2 bg-[#0055FF]/90 border border-cyan-300/60 rounded-2xl px-3 py-1.5 shadow-[0_0_15px_rgba(0,85,255,0.6)] backdrop-blur-md">
                              <span className="w-5 h-5 rounded-full bg-white text-[#0055FF] flex items-center justify-center font-black text-xs">
                                🔵
                              </span>
                              <span className="font-mono text-xs font-black text-white">Base L2</span>
                            </div>
                            <div className="flex items-center gap-2 bg-[#0A1E4A]/90 border border-cyan-400/40 rounded-2xl px-3 py-1 shadow-md">
                              <span className="text-yellow-300 text-xs">⚡</span>
                              <span className="font-mono text-[11px] font-bold text-cyan-200">&lt; $0.01 Gas</span>
                            </div>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 right-5 text-[11px] font-bold text-cyan-200 bg-[#0055FF]/80 border border-cyan-300/50 px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                          ⚡ Warp Speed: 2,000+ TPS
                        </div>
                        <div className="absolute bottom-3 left-5 text-[11px] font-mono font-bold text-[#BAE6FD] bg-[#06133B]/85 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md">
                          Instant Finality · Zero Congestion (-200m)
                        </div>
                      </div>
                    )}

                    {/* Concept 03: Ascending Mathematical Bonding Curve Observatory */}
                    {idx === 2 && (
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#06133B] via-[#0A2569]/80 to-[#030C26]" />

                        {/* Luminous Coordinate Grid & Exponential Curve Canvas */}
                        <svg viewBox="0 0 540 220" className="absolute inset-0 w-full h-full pointer-events-none">
                          <defs>
                            <linearGradient id="curveAreaGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                              <stop offset="60%" stopColor="#0055FF" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="#0A2569" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="curveNeonStroke" x1="0" y1="1" x2="1" y2="0">
                              <stop offset="0%" stopColor="#0055FF" />
                              <stop offset="60%" stopColor="#38BDF8" />
                              <stop offset="100%" stopColor="#FACC15" />
                            </linearGradient>
                          </defs>

                          {/* Coordinate Grid Lines */}
                          <line x1="50" y1="180" x2="490" y2="180" stroke="#334155" strokeWidth="1.5" />
                          <line x1="50" y1="125" x2="490" y2="125" stroke="#1E293B" strokeWidth="1" opacity="0.6" />
                          <line x1="50" y1="70" x2="490" y2="70" stroke="#1E293B" strokeWidth="1" opacity="0.6" />

                          {/* Mathematical Curve Area Fill */}
                          <path
                            d="M 50 180 Q 260 170, 480 40 L 480 180 Z"
                            fill="url(#curveAreaGlow)"
                          />

                          {/* Ascending Bonding Curve Line */}
                          <path
                            d="M 50 180 Q 260 170, 480 40"
                            fill="none"
                            stroke="url(#curveNeonStroke)"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />

                          {/* Milestone Progress Nodes along Curve */}
                          {/* 25% Node */}
                          <circle cx="160" cy="174" r="5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
                          <text x="145" y="196" fill="#94A3B8" fontSize="10" fontWeight="bold">25% Wave</text>

                          {/* 50% Node */}
                          <circle cx="280" cy="155" r="5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
                          <text x="265" y="142" fill="#94A3B8" fontSize="10" fontWeight="bold">50% Mid</text>

                          {/* 75% Node */}
                          <circle cx="390" cy="105" r="5.5" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="1.5" />
                          <text x="375" y="92" fill="#60A5FA" fontSize="10" fontWeight="bold">75% Apex</text>

                          {/* 100% Graduation Goal Beacon */}
                          <circle cx="480" cy="40" r="10" fill="#FACC15" className="animate-ping" opacity="0.5" />
                          <circle cx="480" cy="40" r="8" fill="#FACC15" stroke="#FFFFFF" strokeWidth="2" />
                          <text x="375" y="32" fill="#FACC15" fontSize="11" fontWeight="extrabold">
                            100% DEX Lock →
                          </text>
                        </svg>

                        {/* Crowned Orcat Ascending at the Apex */}
                        <div className="relative z-10 flex items-center gap-3">
                          <div className="animate-float-slow">
                            <OrcatMascotSVG size={140} withCoinBadge={false} pose="happy" hat="crown" prop="diamond" />
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 right-5 text-[11px] font-bold text-amber-300 bg-[#06133B]/90 border border-amber-400/40 px-3 py-1 rounded-full backdrop-blur-md">
                          📈 100% Algorithmic Price Discovery
                        </div>
                        <div className="absolute bottom-3 left-5 text-[11px] font-bold text-cyan-200 bg-[#0055FF]/80 border border-cyan-300/40 px-3 py-1 rounded-full backdrop-blur-md">
                          🛡️ Transparent Bonding Curve · Zero Team Tokens (-600m)
                        </div>
                      </div>
                    )}

                    {/* Concept 04: The Locked Seabed Vault & Vaporized Keys */}
                    {idx === 3 && (
                      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        {/* Midnight Abyssal Atmosphere */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#06133B] via-[#040D26] to-[#010410]" />

                        {/* Seabed Floor with Bioluminescent Corals */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0F172A] to-transparent border-b-4 border-[#0055FF]/60 pointer-events-none" />

                        {/* Guardian Orcat & Heavy Titanium Vault Door */}
                        <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 p-2">
                          {/* Badass Guardian Orcat with Gold Chain & Dark Shades */}
                          <div className="animate-float-slow">
                            <OrcatMascotSVG size={145} withCoinBadge={false} pose="guard" outfit="gold_chain" hat="shades" />
                          </div>

                          {/* High-Security Heavy Vault Door Assembly */}
                          <div className="relative flex flex-col items-center">
                            {/* Vault Door Housing */}
                            <div className="relative w-36 h-36 rounded-3xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 border-4 border-amber-400/80 shadow-[0_0_30px_rgba(250,204,21,0.25)] flex flex-col items-center justify-center p-3">
                              {/* Rotating Cyan Indicator Ring */}
                              <div className="absolute inset-2 rounded-2xl border border-cyan-400/50 animate-pulse pointer-events-none" />

                              {/* Vault Heavy Wheel */}
                              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 border-2 border-white flex items-center justify-center shadow-lg">
                                <Lock className="w-8 h-8 text-slate-950 drop-shadow" />
                              </div>

                              <span className="mt-2 text-[10px] font-mono font-black text-amber-200 tracking-wider uppercase">
                                1B Locked
                              </span>
                            </div>

                            {/* Dissolving Golden LP Key with Underwater Flame/Embers */}
                            <div className="mt-2 flex items-center gap-1.5 text-xs font-extrabold text-cyan-300 bg-black/60 border border-cyan-400/40 px-3 py-1 rounded-full shadow-inner">
                              <span className="animate-pulse">🔥</span>
                              <span>Keys Burned Forever</span>
                            </div>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 right-5 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full backdrop-blur-md">
                          ✓ Permanent Liquidity Lock
                        </div>
                        <div className="absolute bottom-3 left-5 text-[11px] font-mono font-bold text-slate-300 bg-[#06133B]/90 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md">
                          🔒 100% LP Tokens Burned · Contract Renounced (-1000m)
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chapter Key Facts Footer */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <span>
                      {chap.keyFactLabel}: <strong className="text-white">{chap.keyFactValue}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#7BC6FF] font-semibold">
                      {idx < STORY_CHAPTERS.length - 1 ? (
                        <>
                          Descend to Next Zone <ArrowDown className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          Vault Locked at -1000m <ShieldCheck className="w-3.5 h-3.5" />
                        </>
                      )}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Floating Bathysphere Dock (Pinned while scrolling ocean on small screens) */}
      {isStoryInView && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-[#06133B]/95 backdrop-blur-xl border border-cyan-400/40 rounded-2xl p-3 shadow-2xl flex items-center justify-between animate-bubble-pop">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
              <OrcatMascotSVG size={36} withCoinBadge={false} pose={storyState.chapter.orcatAction} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">Dive Station</span>
              </div>
              <p className="text-xs font-extrabold text-white truncate max-w-[130px]">{storyState.chapter.waterZone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-[#7BC6FF]">Depth</p>
              <p className="text-sm font-black font-mono-tabular text-cyan-300">-{storyState.depthMeters}m</p>
            </div>
            <div className="bg-white/10 rounded-xl px-2 py-1 text-right text-[10px] font-mono-tabular text-slate-200 border border-white/10">
              <p>{physics.pressureAtm} atm</p>
              <p>{physics.temperatureCelsius}°C</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
