import React, { useState } from 'react';
import {
  OrcatMascotSVG,
  OrcatHat,
  OrcatEyes,
  OrcatMouth,
  OrcatOutfit,
  OrcatProp,
  OrcatFrame,
  OrcatPose,
} from './OrcatMascotSVG';
import { calculatePodMood } from '../utils/orcatLogic';
import {
  Fish,
  Waves,
  Heart,
  Sparkles,
  RotateCcw,
  Download,
  Stamp,
  FileImage,
  Check,
  Crown,
  Eye,
  Smile,
  Shirt,
  Gem,
  CircleDot,
  Anchor,
  Glasses,
  PartyPopper,
  Shield,
  Briefcase,
  Utensils,
  Headphones,
  Flower2,
  Zap,
  Laugh,
  Coins,
  Bookmark,
  Link,
  Wind,
  Compass,
  Coffee,
  Flame,
  Sun,
  Layers,
  Circle,
  Ban,
  SmilePlus,
} from 'lucide-react';

interface FloatingParticle {
  id: number;
  label: string;
  xPercent: number;
}

interface ItemOption<T> {
  id: T;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  speech?: string;
  desc?: string;
}

const HATS: ItemOption<OrcatHat>[] = [
  { id: 'none', label: 'Natural Ears', icon: Sparkles, speech: 'Back to natural tuxedo cat ears!' },
  { id: 'sailor', label: 'Sailor Cap', icon: Anchor, speech: 'Ahoy! Sailing the Base ocean with the pod!' },
  { id: 'crown', label: 'King Crown', icon: Crown, speech: 'All hail the Orcat Sea King!' },
  { id: 'goggles', label: 'Dive Goggles', icon: Glasses, speech: 'Dive goggles on, ready for deep waters!' },
  { id: 'party', label: 'Party Hat', icon: PartyPopper, speech: 'Celebration time for the Orcat community!' },
  { id: 'viking', label: 'Viking Horns', icon: Shield, speech: 'Raid the green ocean candles!' },
  { id: 'tophat', label: 'Gentleman Hat', icon: Briefcase, speech: 'Very dapper and distinguished gentleman cat!' },
  { id: 'chef', label: 'Sushi Chef', icon: Utensils, speech: 'Master chef serving fresh Base treats!' },
  { id: 'shades', label: 'Pixel Shades', icon: Glasses, speech: 'Deal with it! 8-bit crypto cool!' },
  { id: 'headphones', label: 'Cat Headphones', icon: Headphones, speech: 'Vibing to Base ocean lo-fi beats!' },
  { id: 'hibiscus', label: 'Island Flower', icon: Flower2, speech: 'Tropical ocean holiday vibes!' },
];

const EYES: ItemOption<OrcatEyes>[] = [
  { id: 'classic', label: 'Curious Eyes', icon: Eye },
  { id: 'wink', label: 'Playful Wink', icon: Smile },
  { id: 'stars', label: 'Moon Stars', icon: Sparkles },
  { id: 'hearts', label: 'Heart Eyes', icon: Heart },
  { id: 'squint', label: 'Happy Squint', icon: SmilePlus },
  { id: 'laser', label: 'Laser Beams', icon: Zap },
];

const MOUTHS: ItemOption<OrcatMouth>[] = [
  { id: 'classic', label: 'Classic :3 Smile', icon: Smile },
  { id: 'smile', label: 'Big Open Smile', icon: Laugh },
  { id: 'fish', label: 'Snacking on Fish', icon: Fish },
  { id: 'coin', label: 'Biting Gold Coin', icon: Coins },
  { id: 'bubbles', label: 'Blowing Bubbles', icon: CircleDot },
];

const OUTFITS: ItemOption<OrcatOutfit>[] = [
  { id: 'none', label: 'Natural Tuxedo', icon: Ban },
  { id: 'bowtie_blue', label: 'Base Blue Bowtie', icon: Bookmark },
  { id: 'bowtie_red', label: 'Gala Red Bowtie', icon: Bookmark },
  { id: 'gold_chain', label: 'Chunky Base Chain', icon: Link },
  { id: 'scarf', label: 'Cozy Knit Scarf', icon: Wind },
];

const PROPS: ItemOption<OrcatProp>[] = [
  { id: 'none', label: 'Free Flippers', icon: Ban },
  { id: 'diamond', label: 'Diamond Hands', icon: Gem },
  { id: 'trident', label: 'Golden Trident', icon: Compass },
  { id: 'surfboard', label: 'Base Surfboard', icon: Waves },
  { id: 'boba', label: 'Boba Milk Tea', icon: Coffee },
  { id: 'rocket', label: 'Moon Rocket', icon: Flame },
];

const FRAMES: ItemOption<OrcatFrame>[] = [
  { id: 'coin', label: 'Royal Base Coin', icon: Coins, desc: 'Classic blue coin medallion' },
  { id: 'diecut', label: 'Die-Cut Sticker', icon: Stamp, desc: 'White shadow sticker cut' },
  { id: 'sunset', label: 'Sunset Glow', icon: Sun, desc: 'Warm ocean sunset gradient' },
  { id: 'abyss', label: 'Cyber Abyss', icon: Shield, desc: 'Electric blue deep-sea ring' },
  { id: 'minimal', label: 'Minimal White', icon: Circle, desc: 'Clean white circle badge' },
  { id: 'none', label: 'Transparent', icon: Layers, desc: 'Clean cutout (no background)' },
];

const POSES: { id: OrcatPose; label: string }[] = [
  { id: 'leap', label: 'Leap' },
  { id: 'surf', label: 'Surf' },
  { id: 'dive', label: 'Dive' },
  { id: 'guard', label: 'Guard' },
  { id: 'happy', label: 'Happy' },
];

type CustomizerTab = 'hats' | 'eyes' | 'mouth' | 'outfit' | 'props' | 'frame';

export const OrcatPlayground: React.FC = () => {
  // Character Customizer State (Strictly Black & White Tuxedo/Orca)
  const [hat, setHat] = useState<OrcatHat>('sailor');
  const [eyes, setEyes] = useState<OrcatEyes>('classic');
  const [mouth, setMouth] = useState<OrcatMouth>('classic');
  const [outfit, setOutfit] = useState<OrcatOutfit>('none');
  const [prop, setProp] = useState<OrcatProp>('none');
  const [frame, setFrame] = useState<OrcatFrame>('coin');
  const [activePose, setActivePose] = useState<OrcatPose>('leap');
  const [withStickerBorder, setWithStickerBorder] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<CustomizerTab>('hats');

  // Cute Speech Bubble & Petting State
  const [customSpeech, setCustomSpeech] = useState<string>('Mrr-splash! Pick something stylish for me to wear!');
  const [fishCount, setFishCount] = useState<number>(3);
  const [splashCount, setSplashCount] = useState<number>(4);
  const [rubCount, setRubCount] = useState<number>(2);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [downloadNotice, setDownloadNotice] = useState<string>('');

  const moodState = calculatePodMood(fishCount, splashCount, rubCount);

  // Spawns floating bubbles or hearts
  const spawnParticle = (label: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const xPercent = 25 + Math.floor(Math.random() * 50);
    setParticles((prev) => [...prev.slice(-3), { id, label, xPercent }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((item) => item.id !== id));
    }, 900);
  };

  const handleFeedFish = () => {
    setFishCount((c) => c + 1);
    setActivePose('happy');
    setCustomSpeech('Nom nom! That fresh fish was delicious! 🐟');
    spawnParticle('+1 Yummy Fish! 🐟');
    setTimeout(() => setActivePose('leap'), 700);
  };

  const handleMakeSplash = () => {
    setSplashCount((c) => c + 1);
    setActivePose('surf');
    setCustomSpeech('Whoooosh! Big Base ocean wave splash! 🌊');
    spawnParticle('Splash! 🌊');
    setTimeout(() => setActivePose('leap'), 700);
  };

  const handleBellyRub = () => {
    setRubCount((c) => c + 1);
    setIsBlinking(true);
    setActivePose('guard');
    setCustomSpeech('Purrrrr-blub! Orcat loves chin scratches! ❤️');
    spawnParticle('Purr! ❤️');
    setTimeout(() => {
      setIsBlinking(false);
      setActivePose('leap');
    }, 700);
  };

  // One-click look randomizer
  const handleRandomizeLook = () => {
    const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const newHat = randomItem(HATS);
    setHat(newHat.id);
    setEyes(randomItem(EYES).id);
    setMouth(randomItem(MOUTHS).id);
    setOutfit(randomItem(OUTFITS).id);
    setProp(randomItem(PROPS).id);
    setFrame(randomItem(FRAMES).id);
    setActivePose(randomItem(POSES).id);
    setCustomSpeech(newHat.speech || 'Ta-da! How do you like my new outfit? ✨');
    spawnParticle('✨ Surprise Look!');
  };

  const handleResetLook = () => {
    setHat('none');
    setEyes('classic');
    setMouth('classic');
    setOutfit('none');
    setProp('none');
    setFrame('coin');
    setActivePose('leap');
    setWithStickerBorder(false);
    setCustomSpeech('Back to natural tuxedo Orcat!');
  };

  // High-Resolution PNG Exporter
  const handleDownloadImage = (isSticker: boolean = false) => {
    const svgEl = document.getElementById('orcat-master-svg');
    if (!svgEl) return;

    try {
      const svgXml = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([svgXml], { type: 'image/svg+xml;charset=utf-8' });
      const blobURL = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        const resolution = 2000;
        const canvas = document.createElement('canvas');
        canvas.width = resolution;
        canvas.height = resolution;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, resolution, resolution);

        const link = document.createElement('a');
        link.download = `orcat-${hat}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobURL);

        setDownloadNotice(isSticker ? 'Sticker Saved!' : 'Avatar Saved!');
        setTimeout(() => setDownloadNotice(''), 3000);
      };
      img.src = blobURL;
    } catch {
      setDownloadNotice('Download failed. Try SVG.');
      setTimeout(() => setDownloadNotice(''), 3000);
    }
  };

  // Vector SVG Exporter
  const handleDownloadSVG = () => {
    const svgEl = document.getElementById('orcat-master-svg');
    if (!svgEl) return;

    const svgXml = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgXml], { type: 'image/svg+xml;charset=utf-8' });
    const blobURL = URL.createObjectURL(svgBlob);

    const link = document.createElement('a');
    link.download = `orcat-${hat}-${Date.now()}.svg`;
    link.href = blobURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobURL);

    setDownloadNotice('Vector SVG Saved!');
    setTimeout(() => setDownloadNotice(''), 3000);
  };

  return (
    <section
      id="playground"
      aria-labelledby="playground-heading"
      className="py-20 lg:py-28 bg-[#F8FAFC] text-[#0F172A] border-b border-slate-200"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Playful Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#0055FF] font-semibold mb-3">
              <Sparkles className="w-4 h-4 text-[#0055FF]" />
              <span>Orcat Dressing Room</span>
              <span aria-hidden="true">·</span>
              <span>Tuxedo Black &amp; White</span>
              <span aria-hidden="true">·</span>
              <span>Free Avatar Creator</span>
            </div>
            <h2
              id="playground-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Dress Up Your Orcat &amp; Save Your Avatar.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Mix and match calibrated hats, eyewear, outfits, and props. Every item is perfectly positioned to fit Orcat’s tuxedo head and flippers. Pet your mascot and save your avatar with one tap!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleRandomizeLook}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#0055FF] hover:bg-[#0044CC] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Surprise Me!
            </button>
            <button
              type="button"
              onClick={handleResetLook}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 6 Columns: Interactive Habitat Stage */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-gradient-to-b from-[#0A2260] to-[#0055FF] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border-2 border-[#003BB5] shadow-xl">
              {/* Top Pet Status Row */}
              <div className="flex items-center justify-between text-xs z-10 relative">
                <div>
                  <span className="text-blue-200">Orcat Happiness</span>
                  <p className="text-base sm:text-lg font-mono-tabular font-extrabold text-white">
                    {moodState.happinessPercent}% Pod Joy
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-blue-200">Current Mood</span>
                  <p className="text-base sm:text-lg font-extrabold text-white">
                    {moodState.moodLabel}
                  </p>
                </div>
              </div>

              {/* Main Mascot Stage */}
              <div className="relative my-6 py-4 flex flex-col items-center justify-center min-h-[350px]">
                {/* Responsive Cute Speech Bubble */}
                <div
                  data-testid="orcat-speech-bubble"
                  className="mb-4 px-5 py-2.5 rounded-2xl bg-white text-[#0F172A] text-xs sm:text-sm font-bold shadow-md border border-slate-200 text-center max-w-sm transition-all"
                >
                  “{customSpeech}”
                </div>

                {/* Floating Heart / Reaction Particles */}
                {particles.map((p) => (
                  <span
                    key={p.id}
                    style={{ left: `${p.xPercent}%` }}
                    className="pointer-events-none absolute top-12 z-20 px-3 py-1.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold shadow-lg animate-bounce"
                  >
                    {p.label}
                  </span>
                ))}

                {/* Interactive Mascot Mascot Preview */}
                <button
                  type="button"
                  onClick={handleMakeSplash}
                  aria-label="Pet Orcat"
                  className="group relative focus:outline-none cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                >
                  <OrcatMascotSVG
                    id="orcat-master-svg"
                    size={280}
                    hat={hat}
                    eyes={eyes}
                    mouth={mouth}
                    outfit={outfit}
                    prop={prop}
                    frame={frame}
                    pose={activePose}
                    withStickerBorder={withStickerBorder}
                    isBlinking={isBlinking}
                    className="drop-shadow-2xl"
                  />
                </button>

                {/* Outfit Summary Badges */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-blue-100">
                  <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur">
                    Orca Tuxedo
                  </span>
                  {hat !== 'none' && (
                    <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur">
                      {HATS.find((h) => h.id === hat)?.label}
                    </span>
                  )}
                  {prop !== 'none' && (
                    <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur">
                      {PROPS.find((p) => p.id === prop)?.label}
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Petting Bar */}
              <div className="grid grid-cols-3 gap-2.5 z-10 relative pt-2 border-t border-white/15">
                <button
                  type="button"
                  onClick={handleFeedFish}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white text-[#0F172A] hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  <Fish className="w-4 h-4 text-[#0055FF]" />
                  <span>Feed Fish ({fishCount})</span>
                </button>
                <button
                  type="button"
                  onClick={handleMakeSplash}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#061539] text-white hover:bg-[#0A1F50] font-bold text-xs transition-colors cursor-pointer border border-[#7BC6FF]/30"
                >
                  <Waves className="w-4 h-4 text-[#7BC6FF]" />
                  <span>Make Wave ({splashCount})</span>
                </button>
                <button
                  type="button"
                  onClick={handleBellyRub}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#061539] text-white hover:bg-[#0A1F50] font-bold text-xs transition-colors cursor-pointer border border-[#7BC6FF]/30"
                >
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>Pet Me ({rubCount})</span>
                </button>
              </div>
            </div>

            {/* Quick Clean Downloads Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Save Your Creation
                </span>
                {downloadNotice && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {downloadNotice}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleDownloadImage(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#0055FF] hover:bg-[#0044CC] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <FileImage className="w-4 h-4" />
                  Avatar (PNG)
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadImage(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-300 hover:border-[#0055FF] text-[#0F172A] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <Stamp className="w-4 h-4 text-[#0055FF]" />
                  Sticker (PNG)
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSVG}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-300 hover:border-[#0055FF] text-[#0F172A] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#0055FF]" />
                  Vector (SVG)
                </button>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Wardrobe Picker */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#0055FF]">Mascot Wardrobe</span>
                <h3 className="text-xl font-extrabold text-[#0F172A]">
                  Pick Your Style
                </h3>
              </div>

              {/* Pose Picker */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {POSES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePose(p.id)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      activePose === p.id
                        ? 'bg-[#0055FF] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0F172A]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modern Segmented Navigation Tabs with Lucide Icons */}
            <div className="p-1 bg-slate-100/90 rounded-2xl mb-6">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                {[
                  { id: 'hats', label: 'Hats', icon: Crown },
                  { id: 'eyes', label: 'Face', icon: Eye },
                  { id: 'mouth', label: 'Mouth', icon: Smile },
                  { id: 'outfit', label: 'Outfits', icon: Shirt },
                  { id: 'props', label: 'Toys', icon: Gem },
                  { id: 'frame', label: 'Frame', icon: CircleDot },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as CustomizerTab)}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#0055FF] shadow-xs'
                          : 'text-slate-600 hover:text-[#0F172A]'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Options List */}
            <div className="min-h-[300px]">
              {/* Hats & Headgear */}
              {activeTab === 'hats' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {HATS.map((item) => {
                    const isSelected = hat === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setHat(item.id);
                          if (item.speech) setCustomSpeech(item.speech);
                        }}
                        className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs'
                            : 'bg-slate-50 text-[#0F172A] border-slate-200 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#0055FF] shadow-2xs'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Eyes & Expressions */}
              {activeTab === 'eyes' && (
                <div className="grid grid-cols-2 gap-2.5">
                  {EYES.map((item) => {
                    const isSelected = eyes === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setEyes(item.id);
                          if (item.id === 'laser') setCustomSpeech('Crypto bull laser vision activated!');
                        }}
                        className={`p-3.5 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs'
                            : 'bg-slate-50 text-[#0F172A] border-slate-200 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#0055FF] shadow-2xs'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{item.label}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Mouth & Eating */}
              {activeTab === 'mouth' && (
                <div className="grid grid-cols-2 gap-2.5">
                  {MOUTHS.map((item) => {
                    const isSelected = mouth === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMouth(item.id)}
                        className={`p-3.5 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs'
                            : 'bg-slate-50 text-[#0F172A] border-slate-200 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#0055FF] shadow-2xs'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{item.label}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Outfits */}
              {activeTab === 'outfit' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {OUTFITS.map((item) => {
                    const isSelected = outfit === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setOutfit(item.id)}
                        className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs'
                            : 'bg-slate-50 text-[#0F172A] border-slate-200 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#0055FF] shadow-2xs'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Toys & Props */}
              {activeTab === 'props' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PROPS.map((item) => {
                    const isSelected = prop === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setProp(item.id)}
                        className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs'
                            : 'bg-slate-50 text-[#0F172A] border-slate-200 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#0055FF] shadow-2xs'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Badge Frames */}
              {activeTab === 'frame' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2.5">
                    {FRAMES.map((item) => {
                      const isSelected = frame === item.id;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFrame(item.id)}
                          className={`p-3.5 rounded-2xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs'
                              : 'bg-slate-50 text-[#0F172A] border-slate-200 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#0055FF] shadow-2xs'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p>{item.label}</p>
                              <p className={isSelected ? 'text-blue-100 text-[10px]' : 'text-slate-400 text-[10px]'}>
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">White Sticker Contour</p>
                      <p className="text-xs text-slate-500">Adds die-cut white outline for stickers</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWithStickerBorder((v) => !v)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        withStickerBorder
                          ? 'bg-[#0055FF] text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {withStickerBorder ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
