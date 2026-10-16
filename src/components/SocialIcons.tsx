/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function TelegramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function XIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SocialLinksProps {
  telegramUrl?: string;
  xUrl?: string;
  variant?: 'icons' | 'pills' | 'footer';
  className?: string;
}

export function SocialLinks({
  telegramUrl = 'https://t.me/orcat_base',
  xUrl = 'https://x.com/orcat_base',
  variant = 'icons',
  className = '',
}: SocialLinksProps) {
  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        {telegramUrl && (
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#229ED9]/10 hover:bg-[#229ED9] text-[#229ED9] hover:text-white border border-[#229ED9]/30 hover:border-[#229ED9] text-xs sm:text-sm font-bold transition-all shadow-xs group"
          >
            <TelegramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Telegram</span>
          </a>
        )}
        {xUrl && (
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-300 hover:border-slate-900 text-xs sm:text-sm font-bold transition-all shadow-xs group"
          >
            <XIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>X.com</span>
          </a>
        )}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-4 text-xs font-semibold text-slate-300 ${className}`}>
        {telegramUrl && (
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Orcat Telegram"
            className="hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <TelegramIcon className="w-3.5 h-3.5 text-[#229ED9]" />
            <span>Telegram</span>
          </a>
        )}
        {xUrl && (
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Orcat on X"
            className="hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <XIcon className="w-3.5 h-3.5 text-white" />
            <span>X.com</span>
          </a>
        )}
      </div>
    );
  }

  // Default: sleek rounded icons for navbar
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {telegramUrl && (
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Orcat Telegram Community"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-[#229ED9] hover:bg-blue-50/80 transition-colors cursor-pointer"
        >
          <TelegramIcon className="w-4 h-4" />
        </a>
      )}
      {xUrl && (
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Orcat on X"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <XIcon className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}
