import React, { useState } from 'react';
import {
  calculateBondingCurveState,
  TOTAL_ORCAT_SUPPLY,
} from '../utils/orcatLogic';
import { OrcatMascotSVG } from './OrcatMascotSVG';
import { Check, Copy, Lock, HelpCircle, Sliders, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/env';

const PRESET_MILESTONES = [
  { label: '0% Start Line', value: 0 },
  { label: '25% Early Splash', value: 25 },
  { label: '65% Rising Wave', value: 65 },
  { label: '100% DEX Lock', value: 100 },
];

export const BondingCurveSimulator: React.FC = () => {
  const [curvePercent, setCurvePercent] = useState<number>(65);
  const [copiedCA, setCopiedCA] = useState<boolean>(false);

  const curveState = calculateBondingCurveState(curvePercent);

  const handleCopyTBA = () => {
    const textToCopy = siteConfig.hasContractAddress
      ? siteConfig.contractAddress
      : 'ORCAT on Base — Contract Address: TBA (Fair Launch on Tribfi)';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy);
    }
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2500);
  };

  return (
    <section
      id="fair-launch"
      aria-labelledby="fair-launch-heading"
      className="py-20 lg:py-28 bg-[#F8FAFC] text-[#0F172A] border-b border-slate-200"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header with Trade on Tribfi.fun Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#0055FF] font-semibold mb-3">
              <span>Fair Launch Mechanics</span>
              <span aria-hidden="true">·</span>
              <span>Trading on Tribfi</span>
              <span aria-hidden="true">·</span>
              <span>100% Transparent</span>
            </div>
            <h2
              id="fair-launch-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              What is a Bonding Curve? Move the Wave to See.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Orcat has <strong>no pre-set price</strong> and <strong>no secret investors</strong>. Instead, it launches on a fair bonding curve on Base. Drag the slider below to see how the pool fills up and locks liquidity forever.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={siteConfig.tribfiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#0055FF] border-2 border-[#0055FF] text-white font-bold text-sm sm:text-base hover:bg-transparent hover:text-[#0055FF] transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Trade on Tribfi.fun</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Interactive Simulator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Columns: Interactive SVG Bonding Curve Canvas + Slider */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-500">Simulated Curve Stage</span>
                  <h3
                    data-testid="curve-phase-name"
                    className="text-xl sm:text-2xl font-extrabold text-[#0055FF]"
                  >
                    {curveState.phaseName}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Curve Completion</span>
                  <p
                    data-testid="curve-progress-value"
                    className="text-2xl sm:text-3xl font-extrabold font-mono-tabular text-[#0F172A]"
                  >
                    {curveState.progressPercent}%
                  </p>
                </div>
              </div>

              {/* SVG Bonding Curve Graph with Riding Orcat */}
              <div className="relative bg-[#F0F6FF] border border-[#BAE6FD] rounded-2xl p-4 overflow-hidden">
                <svg
                  viewBox="0 0 600 260"
                  className="w-full h-56 sm:h-64 overflow-visible"
                  role="img"
                  aria-label={`Bonding curve chart at ${curveState.progressPercent}% completion`}
                >
                  <defs>
                    <linearGradient id="curveAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0055FF" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#0055FF" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Subtle Grid Lines */}
                  <line x1="40" y1="220" x2="560" y2="220" stroke="#CBD5E1" strokeWidth="2" />
                  <line x1="40" y1="130" x2="560" y2="130" stroke="#E2E8F0" strokeDasharray="6 6" strokeWidth="1.5" />
                  <line x1="40" y1="36" x2="560" y2="36" stroke="#93C5FD" strokeDasharray="6 6" strokeWidth="1.5" />

                  {/* Graduation Line Label */}
                  <text x="46" y="28" fill="#0055FF" fontSize="11" fontWeight="700">
                    100% Graduation Goal → Liquidity Locked Forever on DEX
                  </text>

                  {/* Full Background Curve Path */}
                  <path
                    d="M 40 220 Q 320 210, 560 36"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  {/* Filled Active Area Under Curve */}
                  <path
                    d={`M 40 220 Q ${Math.round(40 + (curveState.svgPointX - 40) * 0.55)} 215, ${curveState.svgPointX} ${curveState.svgPointY} L ${curveState.svgPointX} 220 Z`}
                    fill="url(#curveAreaGrad)"
                  />

                  {/* Active Progress Stroke */}
                  <path
                    d={`M 40 220 Q ${Math.round(40 + (curveState.svgPointX - 40) * 0.55)} 215, ${curveState.svgPointX} ${curveState.svgPointY}`}
                    fill="none"
                    stroke="#0055FF"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  {/* Active Point Marker on Curve */}
                  <circle
                    cx={curveState.svgPointX}
                    cy={curveState.svgPointY}
                    r="10"
                    fill="#0055FF"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                  />

                  {/* Labels along bottom */}
                  <text x="40" y="244" fill="#64748B" fontSize="11" fontWeight="600">
                    0% (Fair Launch Start)
                  </text>
                  <text x="435" y="244" fill="#0F172A" fontSize="11" fontWeight="700">
                    100% (DEX Liquidity Lock)
                  </text>
                </svg>

                {/* Mini Floating Orcat Badge at Current Stage */}
                <div className="mt-2 flex items-center justify-between gap-4 bg-white/90 backdrop-blur px-4 py-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 shrink-0">
                      <OrcatMascotSVG
                        size={44}
                        withCoinBadge={ true }
                        pose={curveState.isGraduated ? 'happy' : 'surf'}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">
                        {curveState.stageHeadline}
                      </p>
                      <p className="text-xs text-slate-600">
                        Pool Status: <strong className="text-[#0055FF]">{curveState.liquidityStatus}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Controls: Range Slider + Preset Milestone Buttons */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="bonding-curve-slider"
                  className="text-sm font-bold text-[#0F172A] flex items-center gap-2"
                >
                  <Sliders className="w-4 h-4 text-[#0055FF]" />
                  Slide to Test Bonding Curve Progress
                </label>
                <span className="text-xs font-mono-tabular text-slate-500">
                  {curveState.progressPercent}% / 100%
                </span>
              </div>

              <input
                id="bonding-curve-slider"
                type="range"
                min={0}
                max={100}
                step={1}
                value={curvePercent}
                onChange={(e) => setCurvePercent(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0055FF]"
              />

              {/* Milestone Quick Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {PRESET_MILESTONES.map((preset) => {
                  const active = curveState.progressPercent === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setCurvePercent(preset.value)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 border ${
                        active
                          ? 'bg-[#0055FF] text-white border-[#0055FF]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Plain-English Explanation + Tokenomics Facts & CA TBA Box */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
              <div className="text-xs text-[#0055FF] font-semibold mb-2">
                Plain English Breakdown
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F172A]">
                What happens at {curveState.progressPercent}%?
              </h3>
              <p
                data-testid="curve-plain-explanation"
                className="mt-3 text-base text-slate-600 leading-relaxed"
              >
                {curveState.plainExplanation}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Fixed Supply</span>
                  <span className="text-sm font-bold font-mono-tabular text-[#0F172A]">
                    {TOTAL_ORCAT_SUPPLY.toLocaleString()} ORCAT
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Claimed on Curve So Far</span>
                  <span
                    data-testid="curve-allocated-supply"
                    className="text-sm font-bold font-mono-tabular text-[#0055FF]"
                  >
                    {curveState.curveSupplyAllocated.toLocaleString()} ORCAT
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Reserved for Locked DEX Pool</span>
                  <span className="text-sm font-bold font-mono-tabular text-[#0F172A]">
                    {curveState.dexReserveSupply.toLocaleString()} ORCAT
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Starting Token Price</span>
                  <span className="text-sm font-semibold text-slate-800">
                    None (Discovered on Curve)
                  </span>
                </div>
              </div>
            </div>

            {/* Official Contract Address (CA: TBA) Card */}
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-[#7BC6FF] mb-2">
                <span>Base Blockchain Contract</span>
                <span>Fair Launch Protection</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {siteConfig.hasContractAddress
                  ? `Contract Address: ${siteConfig.formattedCA}`
                  : 'Contract Address (CA): TBA'}
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {siteConfig.hasContractAddress
                  ? 'Official verified ORCAT contract on the Base blockchain. Copy the address below to trade or verify.'
                  : 'Why is the CA marked TBA? So bots cannot snipe early and scammers cannot copy it before launch. Everyone gets the official Base address at the exact same moment.'}
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-mono-tabular text-xs sm:text-sm text-white truncate">
                  {siteConfig.hasContractAddress
                    ? `CA: ${siteConfig.contractAddress}`
                    : 'CA: TBA · Base Network · Fair Bonding Curve'}
                </div>
                <button
                  type="button"
                  onClick={handleCopyTBA}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0055FF] hover:bg-[#0044CC] text-white transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedCA ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{siteConfig.hasContractAddress ? 'Copied Address' : 'Copied Status'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{siteConfig.hasContractAddress ? 'Copy CA' : 'Copy CA Status'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
