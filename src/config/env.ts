/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SiteConfig {
  isComingSoon: boolean;
  contractAddress: string;
  hasContractAddress: boolean;
  formattedCA: string;
  tribfiUrl: string;
  enableSocials: boolean;
  socials: {
    telegram: string;
    x: string;
  };
}

export function parseBooleanEnv(val: unknown, defaultVal = false): boolean {
  if (typeof val !== 'string') return defaultVal;
  const normalized = val.trim().toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
}

export function formatAddress(address: string): string {
  if (!address || address.trim().toUpperCase() === 'TBA') return 'TBA';
  const clean = address.trim();
  if (clean.length > 12) {
    return `${clean.slice(0, 6)}...${clean.slice(-4)}`;
  }
  return clean;
}

const defaultEnv: Record<string, string | undefined> =
  typeof import.meta !== 'undefined' && import.meta.env
    ? (import.meta.env as Record<string, string | undefined>)
    : typeof process !== 'undefined' && process.env
    ? (process.env as Record<string, string | undefined>)
    : {};

export function getSiteConfig(env: Record<string, string | undefined> = defaultEnv): SiteConfig {
  const isComingSoon = parseBooleanEnv(env.VITE_COMING_SOON_MODE, false);
  const rawCA = (env.VITE_CONTRACT_ADDRESS || '').trim();
  const hasContractAddress = rawCA.length > 0 && rawCA.toUpperCase() !== 'TBA';
  const contractAddress = hasContractAddress ? rawCA : '';
  const formattedCA = hasContractAddress ? formatAddress(rawCA) : 'TBA';
  const tribfiUrl = (env.VITE_TRIBFI_URL || 'https://tribfi.fun').trim();
  const enableSocials = parseBooleanEnv(env.VITE_ENABLE_SOCIALS, true);
  const telegram = (env.VITE_TELEGRAM_URL || 'https://t.me/orcat_base').trim();
  const x = (env.VITE_X_URL || 'https://x.com/orcat_base').trim();

  return {
    isComingSoon,
    contractAddress,
    hasContractAddress,
    formattedCA,
    tribfiUrl,
    enableSocials,
    socials: {
      telegram,
      x,
    },
  };
}

export const siteConfig = getSiteConfig();
