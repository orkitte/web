/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OrcatMascotSVG } from './OrcatMascotSVG';
import { SocialLinks, TelegramIcon, XIcon } from './SocialIcons';
import { siteConfig } from '../config/env';
import { Copy, Check, ArrowUpRight, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

const COMING_SOON_QUOTES = [
  "B&W Mafia boss reporting for duty. 🕶️🐾",
  "Breach coordinates locked on Base. Meooow. 📡🌊",
  "Sharpening claws for the fair launch. ⚔️🖤",
  "3 AM zoomies in the pre-launch waters! ⚡🚀",
  "No presale, no team bags. Pure pod power. 🐋🛡️",
  "Whales think they're ready. They're not. 😼📦",
  "Got that tuxedo drip ready for Tribfi. 🖤🤍",
  "Apex predator resting before the big breach. 💤🪙",
  "1B fixed supply. Zero funny business. 💎✨",
  "Paws steady on Base network! 🚀🌕",
];

interface ComingSoonViewProps {
  onBypassPreview?: () => void;
}

export function ComingSoonView({ onBypassPreview }: ComingSoonViewProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);

  const currentQuote = COMING_SOON_QUOTES[quoteIndex % COMING_SOON_QUOTES.length];

  const handleMascotClick = () => {
    setClickCount((c) => c + 1);
    setQuoteIndex((prev) => {
      let next = Math.floor(Math.random() * COMING_SOON_QUOTES.length);
      while (next === prev && COMING_SOON_QUOTES.length > 1) {
        next = Math.floor(Math.random() * COMING_SOON_QUOTES.length);
      }
      return next;
    });
  };

  const handleCopyCA = () => {
    const textToCopy = siteConfig.hasContractAddress
      ? siteConfig.contractAddress
      : 'ORCAT on Base — CA: TBA (Fair Launch on Tribfi)';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] relative overflow-hidden">
      {/* Ambient Ocean Gradient Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% -10%, rgba(56, 189, 248, 0.15) 0%, rgba(0, 85, 255, 0.05) 45%, transparent 75%)',
        }}
      />

      {/* Floating Island Navigation Dock */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-[1100px] bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_48px_-12px_rgba(15,23,42,0.12)] rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4 ring-1 ring-white/60">
          {/* Brand Logo & Cute Community Tag */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span
              className="font-display font-extrabold tracking-tight text-[#0F172A] text-xl sm:text-2xl select-none leading-none py-1 px-1"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              $ORCAT
            </span>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/70 shadow-xs rotate-[-1deg]">
              <span className="text-xs text-[#0055FF]">🐾</span>
              <span className="font-cute text-sm sm:text-base text-[#0055FF] font-bold tracking-tight select-none leading-none">
                "B&W Meowing Mafia on Base"
              </span>
            </div>
          </div>

          {/* Status Badge + Socials */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="hidden sm:inline">Fair Launch Imminent</span>
              <span className="sm:hidden">Coming Soon</span>
            </div>

            {/* Social Icons (Telegram & X.com only) */}
            {siteConfig.enableSocials && (
              <SocialLinks
                telegramUrl={siteConfig.socials.telegram}
                xUrl={siteConfig.socials.x}
                variant="icons"
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Hero Stage */}
      <main className="flex-1 flex flex-col justify-center items-center pt-28 pb-16 px-6 relative z-10 max-w-[1100px] mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          {/* Pre-launch Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0055FF] text-xs sm:text-sm font-bold tracking-tight mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0055FF]" />
            <span>Fair Launch on Tribfi Bonding Curve · Base Network</span>
          </div>

          {/* Heading */}
          <h1
            className="font-display font-extrabold tracking-tight text-[#0F172A] leading-[1.08] text-center"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              textWrap: 'balance',
            }}
          >
            The Meowing Mafia is Preparing to Breach.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl text-center">
            Half Cat. Half Whale. Launching fairly on Base with 100% locked liquidity, zero team tokens, and zero presale.
          </p>

          {/* Key Launch Metrics */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-700">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              🔵 Base Blockchain
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs font-mono-tabular">
              🪙 1,000,000,000 Fixed Supply
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              🔒 100% Locked Liquidity
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
              🚫 0% Pre-mine · Zero Team Bags
            </span>
          </div>

          {/* Mascot Centerpiece with Centered Speech Bubble */}
          <div className="relative mt-24 sm:mt-28 mb-8 flex flex-col items-center">
            {/* Centered Speech Bubble */}
            <div className="absolute bottom-[calc(100%+14px)] left-0 right-0 flex justify-center z-30 pointer-events-none">
              <div
                key={quoteIndex}
                className="w-max max-w-[320px] sm:max-w-[420px] animate-bubble-pop"
              >
                <div className="relative bg-white/95 backdrop-blur-md border-2 border-[#0055FF] shadow-[0_16px_36px_-8px_rgba(0,85,255,0.25)] rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-2.5 sm:py-3 text-center">
                  <p className="font-cute text-base sm:text-lg font-bold text-[#0055FF] leading-snug tracking-tight select-none">
                    {currentQuote}
                  </p>
                  <div className="absolute -bottom-2 left-[calc(50%-8px)] w-4 h-4 bg-white border-b-2 border-r-2 border-[#0055FF] rotate-45" />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleMascotClick}
              aria-label="Pet Orcat mascot to hear it meow"
              className="group relative block rounded-full focus:outline-none cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              <OrcatMascotSVG
                size={340}
                withCoinBadge={true}
                pose={clickCount % 2 === 1 ? 'happy' : 'leap'}
                className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] animate-float-slow drop-shadow-xl"
              />
            </button>

            <button
              type="button"
              onClick={handleMascotClick}
              className="mt-3 text-xs sm:text-sm font-bold text-slate-400 hover:text-[#0055FF] transition-colors text-center select-none cursor-pointer"
            >
              Click me!
            </button>
          </div>

          {/* Contract Address Status Card */}
          <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.08)] mt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold flex items-center gap-1.5 text-[#0055FF]">
                <ShieldCheck className="w-4 h-4" />
                Base Verified Contract
              </span>
              <span>Fair Launch Anti-Snipe</span>
            </div>

            <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono-tabular text-xs sm:text-sm">
              <span className="truncate font-bold text-[#0F172A]">
                {siteConfig.hasContractAddress
                  ? `CA: ${siteConfig.contractAddress}`
                  : 'CA: TBA (Announced at Launch)'}
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyCA}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0055FF] hover:bg-[#0044CC] text-white text-xs font-bold transition-colors whitespace-nowrap cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
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
                  className="p-1.5 rounded-xl bg-slate-200/80 hover:bg-[#0055FF] hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Community & Trade Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {siteConfig.enableSocials && siteConfig.socials.telegram && (
              <a
                href={siteConfig.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#229ED9] hover:bg-[#1D8BC0] text-white font-bold text-sm sm:text-base transition-colors shadow-sm"
              >
                <TelegramIcon className="w-4 h-4 text-white" />
                <span>Join Telegram Pod</span>
              </a>
            )}

            {siteConfig.enableSocials && siteConfig.socials.x && (
              <a
                href={siteConfig.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm sm:text-base transition-colors shadow-sm"
              >
                <XIcon className="w-4 h-4 text-white" />
                <span>Follow on X.com</span>
              </a>
            )}

            {siteConfig.tribfiUrl && (
              <a
                href={siteConfig.tribfiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-slate-300 hover:border-[#0055FF] text-[#0055FF] font-bold text-sm sm:text-base transition-colors shadow-xs"
              >
                <span>Tribfi Trading Page</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#061539] text-slate-300 py-10 border-t border-[#1E3A8A] mt-auto relative z-10">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span
              className="font-display font-extrabold text-white text-lg tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              $ORCAT
            </span>
            <p className="mt-1 text-xs text-slate-400">
              Fair launch meme token on Base network. Zero promises, 100% ocean vibes.
            </p>
          </div>

          {/* Socials (Telegram & X.com only) */}
          {siteConfig.enableSocials && (
            <SocialLinks
              telegramUrl={siteConfig.socials.telegram}
              xUrl={siteConfig.socials.x}
              variant="footer"
            />
          )}

          {/* Developer Preview Bypass Button (if onBypassPreview provided) */}
          {onBypassPreview && (
            <button
              type="button"
              onClick={onBypassPreview}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Preview Full Website →
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
