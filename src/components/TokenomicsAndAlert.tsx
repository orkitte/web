import React from 'react';

export const TokenomicsAndAlert: React.FC = () => {
  return (
    <section
      id="tokenomics"
      aria-labelledby="tokenomics-heading"
      className="py-20 lg:py-28 bg-[#F8FAFC] text-[#0F172A] border-b border-slate-200"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs text-[#0055FF] font-semibold mb-3">
            <span>Simple Numbers</span>
            <span aria-hidden="true">·</span>
            <span>Zero Hidden Rules</span>
            <span aria-hidden="true">·</span>
            <span>Built on Base</span>
          </div>
          <h2
            id="tokenomics-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]"
            style={{ textWrap: 'balance' }}
          >
            Four Simple Facts Everyone Can Understand.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            You don’t need a finance degree to understand Orcat. Everything is written in plain sight before launch.
          </p>
        </div>

        {/* Asymmetric Bento Grid (col-span-2 + col-span-1) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Span 2 */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#0055FF]">
                01. Fixed Token Supply
              </span>
              <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold font-mono-tabular text-[#0F172A]">
                1,000,000,000 ORCAT
              </h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-xl">
                One billion tokens in total. That is the maximum that will ever exist. Nobody can mint extra tokens later, and there are zero buy or sell taxes when you trade.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span>Mint Authority: Disabled</span>
              <span aria-hidden="true">·</span>
              <span>Buy/Sell Tax: 0%</span>
              <span aria-hidden="true">·</span>
              <span>Team Allocation: 0%</span>
            </div>
          </div>

          {/* Card 2: Span 1 */}
          <div className="lg:col-span-1 bg-[#0055FF] text-white rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#BAE6FD]">
                02. Home Blockchain
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                100% Native on Base
              </h3>
              <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
                Base is fast, low-cost, and backed by the biggest ecosystem in crypto. Swapping costs pennies and confirms in seconds.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-white/15 text-xs text-[#BAE6FD] font-mono-tabular">
              Chain ID: 8453 · Base Mainnet
            </div>
          </div>

          {/* Card 3: Span 1 */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#0055FF]">
                03. Fair Price Discovery
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-[#0F172A]">
                Bonding Curve Launch
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                There is no private presale and no fixed starting price. Everyone buys from the exact same public bonding curve at launch.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-slate-100 text-xs text-slate-500">
              Price Info: Discovered Live by the Pod
            </div>
          </div>

          {/* Card 4: Span 2 */}
          <div className="lg:col-span-2 bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#7BC6FF]">
                04. Permanent Pool Safety
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                Locked Liquidity &amp; Burned LP Keys
              </h3>
              <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-xl">
                As soon as the bonding curve reaches 100%, the liquidity pool automatically moves to the DEX and locks forever. The LP keys are burned so the pool can never be rugged.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-[#7BC6FF]">
              <span>Fair Launch on Tribfi</span>
              <span aria-hidden="true">·</span>
              <span>Liquidity Lock: Permanent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
