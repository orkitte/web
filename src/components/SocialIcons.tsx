/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function CommunityChatIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
}

// Backwards compatibility alias so any other component still importing TelegramIcon works seamlessly
export const TelegramIcon = CommunityChatIcon;

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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0055FF]/10 hover:bg-[#0055FF] text-[#0055FF] hover:text-white border border-[#0055FF]/30 hover:border-[#0055FF] text-xs sm:text-sm font-bold transition-all shadow-xs group"
          >
            <CommunityChatIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Community</span>
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
            aria-label="Orcat Community Chat"
            className="hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <CommunityChatIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>Community</span>
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
          aria-label="Orcat Community Chat"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-[#0055FF] hover:bg-blue-50/80 transition-colors cursor-pointer"
        >
          <CommunityChatIcon className="w-4 h-4" />
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
