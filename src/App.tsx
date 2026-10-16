/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OrcatMascotSVG } from './components/OrcatMascotSVG';
import { ScrollStoryOdyssey } from './components/ScrollStoryOdyssey';
import { BondingCurveSimulator } from './components/BondingCurveSimulator';
import { OrcatPlayground } from './components/OrcatPlayground';
import { TokenomicsAndAlert } from './components/TokenomicsAndAlert';
import { ArrowDown, Check, Copy, ArrowUpRight, Menu, X, Eye, ExternalLink } from 'lucide-react';
import { siteConfig } from './config/env';
import { ComingSoonView } from './components/ComingSoonView';
import { SocialLinks } from './components/SocialIcons';

const ORCAT_QUOTES: string[] = [
  "B&W Mafia boss reporting for duty. 🕶️🐾",
  "Whales think they own the sea. Then I meowed. 🐋⚔️",
  "Apex predator, but with tiny pink toe beans. 🐾🌊",
  "3 AM zoomies across the liquidity pool! ⚡🚀",
  "Just knocked a whale's sell order off the table. 😼📦",
  "Dorsal fin sharp, claws sharper. Meooow. 🔪🖤",
  "I don't chase mice. I hunt green candles. 📈🐋",
  "Hissed at the dip. Now it's swimming up! 🌊👀",
  "Full killer whale stealth mode: activated. 🕶️🌊",
  "Echolocation detected massive pod vibes on Base. 📡✨",
  "Chubby cheeks, apex instincts. Deal with it. 😼🖤",
  "Sleeping on the warm blockchain ledger all day. 💤🪙",
  "Whale hunters don't need permission to breach! 🐋💥",
  "Got that black & white tuxedo drip on Base. 🖤🤍",
  "If it doesn't fit, I still sit. Even in the DEX. 📦🍣",
  "Purring at 40 knots underwater. ⚡🐾",
  "We don't dump, we coordinate the pod. 🌊🤝",
  "Blep in the face of market volatility! 👅🌊",
  "Half kitty, half apex leviathan, zero rugs. 🐋🛡️",
  "Paws steady, fin locked, swimming to the moon! 🚀🌕",
  "Call me Don Orcat. The ocean pays its tribute. 🕶️🐾",
  "Breached the surface just to hiss at the bears. 🐻🌊",
  "1B fixed supply, 100% pure marine swagger. 💎✨",
  "Zero fishy business in my ocean pod. 🐟🚫",
];

export default function App() {
  const [heroSplashCount, setHeroSplashCount] = useState<number>(0);
  const [heroCopied, setHeroCopied] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [heroQuote, setHeroQuote] = useState<string>("B&W Mafia boss reporting for duty. 🕶️🐾");
  const [quoteKey, setQuoteKey] = useState<number>(0);
  const [previewFullSite, setPreviewFullSite] = useState<boolean>(false);

  // If Coming Soon mode is enabled in .env and user hasn't bypassed preview
  if (siteConfig.isComingSoon && !previewFullSite) {
    return <ComingSoonView onBypassPreview={() => setPreviewFullSite(true)} />;
  }

  const handleMascotCoinClick = () => {
    setHeroSplashCount((c) => c + 1);
    setHeroQuote((prev) => {
      const candidates = ORCAT_QUOTES.filter((q) => q !== prev);
      return candidates[Math.floor(Math.random() * candidates.length)] || ORCAT_QUOTES[0];
    });
    setQuoteKey((k) => k + 1);
  };

  const handleCopyHeroCA = () => {
    const textToCopy = siteConfig.hasContractAddress
      ? siteConfig.contractAddress
      : 'ORCAT on Base — CA: TBA (Fair Launch on Tribfi)';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy);
    }
    setHeroCopied(true);
    setTimeout(() => setHeroCopied(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* ================= AWWWARDS-GRADE FRAMED / BOXED ISLAND NAVIGATION DOCK ================= */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-[1100px] bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_48px_-12px_rgba(15,23,42,0.12)] rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4 ring-1 ring-white/60">
          {/* Brand Logo & Cute Community Tag */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href="#"
              aria-label="Orcat Home"
              className="flex items-center shrink-0 transition-transform hover:scale-105 active:scale-95 py-1 px-1"
            >
              <span
                className="font-display font-extrabold tracking-tight text-[#0F172A] text-xl sm:text-2xl select-none leading-none"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                $ORCAT
              </span>
            </a>

            {/* Cute Community Tagline */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/70 shadow-xs rotate-[-1deg]">
              <span className="text-xs text-[#0055FF]">🐾</span>
              <span className="font-cute text-sm sm:text-base text-[#0055FF] font-bold tracking-tight select-none leading-none">
                "B&W Meowing Mafia on Base"
              </span>
            </div>
          </div>

          {/* Segmented Island Pill Nav */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 shadow-inner"
          >
            <a
              href="#story"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-[#0055FF] hover:bg-white hover:shadow-xs transition-all whitespace-nowrap"
            >
              Story
            </a>
            <a
              href="#fair-launch"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-[#0055FF] hover:bg-white hover:shadow-xs transition-all whitespace-nowrap"
            >
              Fair Launch
            </a>
            <a
              href="#tokenomics"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-[#0055FF] hover:bg-white hover:shadow-xs transition-all whitespace-nowrap"
            >
              Tokenomics
            </a>
            <a
              href="#playground"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-[#0055FF] hover:bg-white hover:shadow-xs transition-all whitespace-nowrap"
            >
              Playground
            </a>
          </nav>

          {/* Action Area: Socials (Telegram & X.com) + Buy on Tribfi CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {siteConfig.enableSocials && (
              <SocialLinks
                telegramUrl={siteConfig.socials.telegram}
                xUrl={siteConfig.socials.x}
                variant="icons"
                className="hidden sm:flex mr-0.5"
              />
            )}

            <a
              href={siteConfig.tribfiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-[#0055FF] border-2 border-[#0055FF] rounded-full hover:bg-transparent hover:text-[#0055FF] transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Buy on Tribfi</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden w-full max-w-[1100px] mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-4 shadow-2xl flex flex-col gap-2 transition-all">
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 hover:bg-[#0055FF]/10 hover:text-[#0055FF] transition-colors"
            >
              Story
            </a>
            <a
              href="#fair-launch"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 hover:bg-[#0055FF]/10 hover:text-[#0055FF] transition-colors"
            >
              Fair Launch
            </a>
            <a
              href="#tokenomics"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 hover:bg-[#0055FF]/10 hover:text-[#0055FF] transition-colors"
            >
              Tokenomics
            </a>
            <a
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 hover:bg-[#0055FF]/10 hover:text-[#0055FF] transition-colors"
            >
              Playground
            </a>
            {siteConfig.enableSocials && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-500">Official Socials:</span>
                <SocialLinks
                  telegramUrl={siteConfig.socials.telegram}
                  xUrl={siteConfig.socials.x}
                  variant="icons"
                />
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
              <span className="font-cute text-sm font-bold text-[#0055FF]">"B&W Meowing Mafia on Base"</span>
              <span className="font-mono-tabular">1,000,000,000 ORCAT</span>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Hero Section (Expanded height with generous vertical breathing room) */}
        <section className="relative pt-16 pb-28 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36 min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left 7 Columns: Simple, Bold Editorial Copy + Single Primary CTA */}
              <div className="lg:col-span-7">
                {/* Clean Unboxed Metadata with Typographic Separators */}
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#0055FF] mb-4">
                  <span>Base Blockchain</span>
                  <span aria-hidden="true">·</span>
                  <span>1,000,000,000 Supply</span>
                  <span aria-hidden="true">·</span>
                  <span>Fair Launch on Tribfi</span>
                </div>

                <h1
                  className="font-display font-extrabold tracking-tight text-[#0F172A] leading-[1.06]"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: 'clamp(2.5rem, 4.5vw, 4.25rem)',
                    textWrap: 'balance',
                  }}
                >
                  Half Cat. Half Whale. Swimming Together on Base.
                </h1>

                <p className="mt-5 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Meet <strong>Orcat</strong>—a chubby tuxedo cat who jumped into the blue ocean of Base. Launching fairly on a bonding curve with locked liquidity, zero team tokens, and simple rules everyone can understand.
                </p>

                {/* Primary CTA + CA TBA Copy Action */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#story"
                    className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#0055FF] hover:bg-[#0044CC] text-white font-bold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0"
                  >
                    Scroll the Orcat Story
                    <ArrowDown className="w-4 h-4" />
                  </a>

                  <div className="inline-flex items-stretch rounded-2xl bg-white border border-slate-300 hover:border-[#0055FF] transition-colors shadow-xs">
                    <button
                      type="button"
                      onClick={handleCopyHeroCA}
                      aria-label="Copy contract address"
                      className="inline-flex items-center gap-2 px-5 py-4 text-[#0F172A] font-mono-tabular font-bold text-xs sm:text-sm hover:text-[#0055FF] transition-colors whitespace-nowrap cursor-pointer rounded-l-2xl"
                    >
                      {heroCopied ? (
                        <>
                          <Check className="w-4 h-4 text-[#0055FF]" />
                          <span>{siteConfig.hasContractAddress ? 'CA Copied!' : 'CA: TBA (Copied)'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#0055FF]" />
                          <span>
                            {siteConfig.hasContractAddress
                              ? `CA: ${siteConfig.formattedCA}`
                              : 'CA: TBA · Fair Launch on Tribfi'}
                          </span>
                        </>
                      )}
                    </button>

                    <a
                      href={
                        siteConfig.hasContractAddress
                          ? `https://basescan.org/token/${siteConfig.contractAddress}`
                          : 'https://basescan.org'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View contract on Basescan"
                      title="View contract on Basescan"
                      className="inline-flex items-center justify-center px-4 text-slate-400 hover:text-[#0055FF] hover:bg-blue-50/80 transition-colors border-l border-slate-200 rounded-r-2xl cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: The Iconic Interactive Orcat Logo Medallion with Speech Bubble */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center pt-10 sm:pt-14">
                <div className="relative flex flex-col items-center">
                  {/* Cute Bubbly Speech Bubble Directly Centered Above the Cat & Coin */}
                  <div className="absolute bottom-[calc(100%+14px)] left-0 right-0 flex justify-center z-30 pointer-events-none">
                    <div
                      key={quoteKey}
                      className="w-max max-w-[320px] sm:max-w-[420px] animate-bubble-pop"
                    >
                      <div className="relative bg-white/95 backdrop-blur-md border-2 border-[#0055FF] shadow-[0_16px_36px_-8px_rgba(0,85,255,0.25)] rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-2.5 sm:py-3 text-center">
                        <p className="font-cute text-base sm:text-lg font-bold text-[#0055FF] leading-snug tracking-tight select-none">
                          {heroQuote}
                        </p>
                        {/* Downward Pointer Tail */}
                        <div className="absolute -bottom-2 left-[calc(50%-8px)] w-4 h-4 bg-white border-b-2 border-r-2 border-[#0055FF] rotate-45" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleMascotCoinClick}
                    aria-label="Pet Orcat logo to make it leap and meow"
                    className="group relative block rounded-full focus:outline-none cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                  >
                    <OrcatMascotSVG
                      size={360}
                      withCoinBadge={true}
                      pose={heroSplashCount % 2 === 1 ? 'happy' : 'leap'}
                      className="w-[290px] h-[290px] sm:w-[360px] sm:h-[360px] animate-float-slow drop-shadow-xl"
                    />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleMascotCoinClick}
                  className="mt-3 text-xs sm:text-sm font-bold text-slate-400 hover:text-[#0055FF] transition-colors text-center select-none cursor-pointer"
                >
                  Click me!
                </button>
              </div>
            </div>

            {/* Full-Width 4-Column Key Facts Strip Below Hero Split */}
            <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-slate-500">Total Supply</p>
                <p className="mt-1 text-xl sm:text-2xl font-extrabold font-mono-tabular text-[#0F172A]">
                  1,000,000,000
                </p>
                <p className="mt-0.5 text-xs text-slate-500">Fixed forever · 0% tax</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Blockchain Network</p>
                <p className="mt-1 text-xl sm:text-2xl font-extrabold text-[#0055FF]">
                  Base Network
                </p>
                <p className="mt-0.5 text-xs text-slate-500">Fast &amp; under $0.01 fees</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Launch Platform</p>
                <p className="mt-1 text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  Tribfi Bonding Curve
                </p>
                <p className="mt-0.5 text-xs text-slate-500">No presale · Locked LP</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Contract &amp; Price</p>
                <div className="mt-1 flex items-center gap-2">
                  <p
                    className="text-xl sm:text-2xl font-extrabold font-mono-tabular text-[#0F172A] truncate"
                    title={siteConfig.contractAddress || 'TBA'}
                  >
                    {siteConfig.hasContractAddress ? siteConfig.formattedCA : 'CA: TBA'}
                  </p>

                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyHeroCA}
                      aria-label="Copy contract address"
                      title="Copy contract address"
                      className="p-1 rounded-lg text-slate-400 hover:text-[#0055FF] hover:bg-blue-50/80 transition-colors cursor-pointer"
                    >
                      {heroCopied ? (
                        <Check className="w-4 h-4 text-[#0055FF]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <a
                      href={
                        siteConfig.hasContractAddress
                          ? `https://basescan.org/token/${siteConfig.contractAddress}`
                          : 'https://basescan.org'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View contract on Basescan"
                      title="View contract on Basescan"
                      className="p-1 rounded-lg text-slate-400 hover:text-[#0055FF] hover:bg-blue-50/80 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {siteConfig.hasContractAddress ? 'Verified on Basescan' : 'Discovered live on Tribfi'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Scroll-Driven 4-Chapter Story Odyssey */}
        <ScrollStoryOdyssey />

        {/* 2. Interactive Bonding Curve & Fair Launch Simulator (with Trade on Tribfi button) */}
        <BondingCurveSimulator />

        {/* 3. Tokenomics Bento Grid (Launch Alert section removed) */}
        <TokenomicsAndAlert />

        {/* 4. Interactive Orcat Habitat, Customizer & Merch Print Studio (Brought under Tokenomics) */}
        <OrcatPlayground />
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#061539] text-slate-300 py-12 border-t border-[#1E3A8A]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div
              className="flex items-center gap-2 text-xl font-extrabold text-white tracking-tight font-display"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              <div className="w-7 h-7 shrink-0">
                <OrcatMascotSVG size={28} withCoinBadge={true} pose="happy" />
              </div>
              <span>ORCAT</span>
            </div>
            <p className="mt-2 text-xs text-slate-400 max-w-md">
              Orcat is a community meme token on the Base blockchain with 1,000,000,000 supply and a bonding curve fair launch on Tribfi. Meme tokens are for fun and community entertainment, with no financial promises.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-xs font-semibold text-slate-300">
            {siteConfig.enableSocials && (
              <SocialLinks
                telegramUrl={siteConfig.socials.telegram}
                xUrl={siteConfig.socials.x}
                variant="footer"
              />
            )}

            <div className="flex flex-wrap items-center gap-5">
              <a href="#story" className="hover:text-white transition-colors">
                Story
              </a>
              <a href="#fair-launch" className="hover:text-white transition-colors">
                Fair Launch
              </a>
              <a href="#tokenomics" className="hover:text-white transition-colors">
                Tokenomics
              </a>
              <a href="#playground" className="hover:text-white transition-colors">
                Playground
              </a>
              <a
                href={siteConfig.tribfiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7BC6FF] hover:text-white font-bold transition-colors inline-flex items-center gap-1"
              >
                <span>Buy on Tribfi</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Developer Preview Banner (Active when Coming Soon is enabled in .env but bypassed for review) */}
      {siteConfig.isComingSoon && previewFullSite && (
        <aside
          aria-label="Developer Preview Status"
          className="fixed bottom-4 right-4 z-50 bg-[#0F172A]/95 backdrop-blur-md text-white border border-slate-700 shadow-2xl rounded-2xl px-4 py-2.5 flex items-center gap-3 text-xs ring-1 ring-white/10"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="font-semibold text-slate-200">
            Coming Soon mode is <strong>ON</strong> in .env
          </span>
          <button
            type="button"
            onClick={() => setPreviewFullSite(false)}
            className="px-3 py-1 rounded-xl bg-[#0055FF] hover:bg-[#0044CC] text-white font-bold transition-colors cursor-pointer"
          >
            Back to Coming Soon
          </button>
        </aside>
      )}
    </div>
  );
}
