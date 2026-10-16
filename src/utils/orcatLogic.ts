export interface StoryChapter {
  id: number;
  indexLabel: string;
  title: string;
  simpleSummary: string;
  simpleDetail: string;
  depthMeters: number;
  waterZone: string;
  keyFactLabel: string;
  keyFactValue: string;
  orcatAction: 'leap' | 'dive' | 'surf' | 'guard';
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 0,
    indexLabel: 'Chapter 01',
    title: 'Half Cat. Half Whale. 100% Friend.',
    simpleSummary: 'Cats love fish. Whales rule the sea. One day, a chubby tuxedo cat jumped into the ocean and became Orcat.',
    simpleDetail: 'No complicated crypto words here. Orcat is a simple, happy mascot built for regular people who love cute art, good jokes, and a welcoming pod.',
    depthMeters: 0,
    waterZone: 'Sunlight Surface Zone',
    keyFactLabel: 'Species',
    keyFactValue: 'Felis Orcinus (Chubby Tuxedo Pod)',
    orcatAction: 'leap',
  },
  {
    id: 1,
    indexLabel: 'Chapter 02',
    title: 'Swimming Fast on the Base Blockchain.',
    simpleSummary: 'Orcat lives on Base. That means sending tokens is super fast and costs less than a penny.',
    simpleDetail: 'Old blockchains charge high fees just to join the fun. Base is bright blue, safe, and easy to use—just like Orcat’s home ocean.',
    depthMeters: 250,
    waterZone: 'Base Blue Current',
    keyFactLabel: 'Home Network',
    keyFactValue: 'Base L2 (Coinbase Ecosystem)',
    orcatAction: 'surf',
  },
  {
    id: 2,
    indexLabel: 'Chapter 03',
    title: 'Fair Launch on a Bonding Curve.',
    simpleSummary: 'Everyone starts at the exact same line. No secret team tokens, no pre-sale, and no hidden tricks.',
    simpleDetail: 'Orcat launches on a public bonding curve. Every person buys from the same open curve at the same time. When the curve fills up to 100%, the pool moves to the open market automatically.',
    depthMeters: 600,
    waterZone: 'Bonding Curve Stream',
    keyFactLabel: 'Launch Rule',
    keyFactValue: '0% Team · 0% Presale · 100% Fair Curve',
    orcatAction: 'dive',
  },
  {
    id: 3,
    indexLabel: 'Chapter 04',
    title: 'One Billion Supply & Locked Liquidity.',
    simpleSummary: 'There are exactly 1,000,000,000 Orcat tokens. Once the curve finishes, the liquidity is locked forever.',
    simpleDetail: 'Nobody can print more tokens, and nobody can pull the trading pool out. The treasure chest stays locked at the bottom of the sea so the whole pod can swim safely.',
    depthMeters: 1000,
    waterZone: 'Locked Vault Seabed',
    keyFactLabel: 'Total Supply',
    keyFactValue: '1,000,000,000 ORCAT (Fixed Forever)',
    orcatAction: 'guard',
  },
];

export interface BondingCurveState {
  progressPercent: number;
  phaseName: string;
  stageHeadline: string;
  plainExplanation: string;
  curveSupplyAllocated: number;
  dexReserveSupply: number;
  isGraduated: boolean;
  liquidityStatus: string;
  svgPointX: number;
  svgPointY: number;
}

export const TOTAL_ORCAT_SUPPLY = 1_000_000_000;
export const CURVE_POOL_SUPPLY = 800_000_000;
export const DEX_LIQUIDITY_SUPPLY = 200_000_000;

export function clampNumber(val: number, min: number, max: number): number {
  if (Number.isNaN(val)) return min;
  return Math.min(Math.max(val, min), max);
}

/**
 * Computes deterministic state for the interactive Bonding Curve explainer.
 * Note: No token price is shown because Orcat is pre-launch (CA: TBA) on a fair bonding curve.
 */
export function calculateBondingCurveState(rawPercent: number): BondingCurveState {
  const progressPercent = Math.round(clampNumber(rawPercent, 0, 100));
  const normalized = progressPercent / 100;

  const curveSupplyAllocated = Math.round(CURVE_POOL_SUPPLY * normalized);
  const dexReserveSupply = DEX_LIQUIDITY_SUPPLY;
  const isGraduated = progressPercent >= 100;

  // Map normalized [0..1] onto SVG viewBox (width 600, height 260)
  // X goes from 40 to 560; Y follows a smooth quadratic curve from 220 up to 36
  const svgPointX = Math.round(40 + normalized * 520);
  const curveFactor = Math.pow(normalized, 1.65);
  const svgPointY = Math.round(220 - curveFactor * 184);

  if (progressPercent === 0) {
    return {
      progressPercent,
      phaseName: 'Starting Line',
      stageHeadline: 'The pool is ready for the first splash.',
      plainExplanation:
        'At 0%, the smart contract holds all 1,000,000,000 ORCAT. No insiders or VCs hold a single token before the doors open.',
      curveSupplyAllocated,
      dexReserveSupply,
      isGraduated,
      liquidityStatus: 'Held inside Bonding Curve Contract',
      svgPointX,
      svgPointY,
    };
  }

  if (progressPercent < 40) {
    return {
      progressPercent,
      phaseName: 'Early Splash Phase',
      stageHeadline: 'Early swimmers join the pod on the open curve.',
      plainExplanation:
        'As people swap into ORCAT, the smart contract automatically puts their Base ETH into the shared reserve box. Anyone can join or leave at any moment.',
      curveSupplyAllocated,
      dexReserveSupply,
      isGraduated,
      liquidityStatus: 'Accumulating in Curve Reserve',
      svgPointX,
      svgPointY,
    };
  }

  if (progressPercent < 85) {
    return {
      progressPercent,
      phaseName: 'Rising Wave Phase',
      stageHeadline: 'The pod grows bigger and the wave climbs higher.',
      plainExplanation:
        'More than halfway through the curve! Every single token is still bought from the same transparent math formula with zero team tax.',
      curveSupplyAllocated,
      dexReserveSupply,
      isGraduated,
      liquidityStatus: 'Growing toward DEX Graduation',
      svgPointX,
      svgPointY,
    };
  }

  if (progressPercent < 100) {
    return {
      progressPercent,
      phaseName: 'Final Crest Phase',
      stageHeadline: 'Almost at 100% curve completion.',
      plainExplanation:
        'The bonding curve is nearly full. As soon as it hits 100%, the contract automatically graduates ORCAT to a decentralized exchange on Base.',
      curveSupplyAllocated,
      dexReserveSupply,
      isGraduated,
      liquidityStatus: 'Preparing Automatic DEX Lock',
      svgPointX,
      svgPointY,
    };
  }

  return {
    progressPercent: 100,
    phaseName: 'Graduated & Locked Forever',
    stageHeadline: '100% Complete! Liquidity is locked and keys are burned.',
    plainExplanation:
      'The curve is full! All collected Base liquidity and the remaining 200,000,000 ORCAT reserve are permanently locked in the DEX pool forever.',
    curveSupplyAllocated: CURVE_POOL_SUPPLY,
    dexReserveSupply,
    isGraduated: true,
    liquidityStatus: '100% Locked & LP Keys Burned Forever',
    svgPointX,
    svgPointY,
  };
}

export interface OceanPhysicsTelemetry {
  depthMeters: number;
  pressureAtm: number;
  pressurePsi: number;
  temperatureCelsius: number;
  temperatureFahrenheit: number;
  sunlightPercent: number;
  zoneName: string;
  waterClarity: string;
  ambientBgGradient: string;
  particleType: 'bubbles' | 'marine-snow' | 'bioluminescence';
}

/**
 * Calculates realistic physical oceanic conditions according to depth:
 * - Hydrostatic pressure: P = 1.0 + depth / 10 atmospheres
 * - Optical light extinction (Beer-Lambert law): drops exponentially
 * - Thermocline profile: steep temperature drop from surface to seabed
 */
export function calculateOceanPhysics(depthMeters: number): OceanPhysicsTelemetry {
  const d = clampNumber(depthMeters, 0, 1000);
  const pressureAtm = +(1.0 + d / 10).toFixed(1);
  const pressurePsi = Math.round(pressureAtm * 14.696);
  const temperatureCelsius = +(3.2 + 21.3 * Math.exp(-d / 240)).toFixed(1);
  const temperatureFahrenheit = +(temperatureCelsius * 1.8 + 32).toFixed(1);
  const sunlightPercent = +(100 * Math.exp(-d / 55)).toFixed(d > 350 ? 2 : 1);

  let zoneName = 'Epipelagic (Sunlight Zone)';
  let waterClarity = 'High Solar Penetration · Golden Caustics';
  let ambientBgGradient = 'linear-gradient(180deg, #0284C7 0%, #0A2569 100%)';
  let particleType: 'bubbles' | 'marine-snow' | 'bioluminescence' = 'bubbles';

  if (d >= 600) {
    zoneName = 'Bathypelagic (Midnight Abyss)';
    waterClarity = '0% Solar Light · 100% Bioluminescent';
    ambientBgGradient = 'linear-gradient(180deg, #0A1E5C 0%, #06133B 100%)';
    particleType = 'bioluminescence';
  } else if (d >= 200) {
    zoneName = 'Mesopelagic (Twilight Zone)';
    waterClarity = 'Rapid Optical Extinction · Deep Indigo';
    ambientBgGradient = 'linear-gradient(180deg, #0A2E7A 0%, #081A4E 100%)';
    particleType = 'marine-snow';
  }

  return {
    depthMeters: d,
    pressureAtm,
    pressurePsi,
    temperatureCelsius,
    temperatureFahrenheit,
    sunlightPercent: Number(sunlightPercent),
    zoneName,
    waterClarity,
    ambientBgGradient,
    particleType,
  };
}

export interface ScrollStoryState {
  activeChapterIndex: number;
  chapter: StoryChapter;
  depthMeters: number;
  swimProgress: number;
  orcatXPercent: number;
  orcatTiltDeg: number;
  physics: OceanPhysicsTelemetry;
}

export function getStoryStateByProgress(rawProgress: number): ScrollStoryState {
  const swimProgress = clampNumber(rawProgress, 0, 1);
  const rawIdx = Math.min(
    STORY_CHAPTERS.length - 1,
    Math.floor(swimProgress * STORY_CHAPTERS.length)
  );
  const chapter = STORY_CHAPTERS[rawIdx];
  const depthMeters = Math.round(swimProgress * 1000);
  // Horizontal wave motion between 15% and 85%
  const orcatXPercent = Math.round(15 + swimProgress * 70);
  const orcatTiltDeg = Math.round(Math.sin(swimProgress * Math.PI * 4) * 12);
  const physics = calculateOceanPhysics(depthMeters);

  return {
    activeChapterIndex: rawIdx,
    chapter,
    depthMeters,
    swimProgress,
    orcatXPercent,
    orcatTiltDeg,
    physics,
  };
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  normalizedValue: string;
}

export function validateWatchlistInput(
  rawInput: string,
  channel: 'telegram' | 'x' | 'wallet'
): ValidationResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Please enter your handle or Base wallet address first.',
      normalizedValue: '',
    };
  }

  if (channel === 'wallet') {
    const isHexAddress = /^0x[a-fA-F0-9]{6,40}$/.test(trimmed);
    const isBasename = /^[a-zA-Z0-9-]{3,30}\.base\.eth$/i.test(trimmed);
    if (!isHexAddress && !isBasename) {
      return {
        valid: false,
        error: 'Enter a valid Base address (starts with 0x...) or name.base.eth.',
        normalizedValue: trimmed,
      };
    }
    return { valid: true, normalizedValue: trimmed };
  }

  // Telegram or X handle
  const cleaned = trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
  if (!/^@[a-zA-Z0-9_]{3,32}$/.test(cleaned)) {
    return {
      valid: false,
      error: 'Enter a valid username (3 to 32 letters, numbers, or underscores).',
      normalizedValue: cleaned,
    };
  }

  return { valid: true, normalizedValue: cleaned };
}

export interface PodMoodState {
  totalInteractions: number;
  moodLabel: string;
  orcatSpeech: string;
  happinessPercent: number;
}

export function calculatePodMood(
  fishCount: number,
  splashCount: number,
  rubCount: number
): PodMoodState {
  const safeFish = Math.max(0, fishCount);
  const safeSplash = Math.max(0, splashCount);
  const safeRub = Math.max(0, rubCount);
  const totalInteractions = safeFish + safeSplash + safeRub;
  const happinessPercent = Math.min(100, 40 + totalInteractions * 8);

  if (totalInteractions === 0) {
    return {
      totalInteractions,
      moodLabel: 'Curious & Floating',
      orcatSpeech: 'Mrr-splash! Toss me a fish or make a wave!',
      happinessPercent,
    };
  }

  if (totalInteractions < 5) {
    return {
      totalInteractions,
      moodLabel: 'Purring in the Waves',
      orcatSpeech: 'Prrrr-blub! Base water feels warm today!',
      happinessPercent,
    };
  }

  if (totalInteractions < 10) {
    return {
      totalInteractions,
      moodLabel: 'Full Belly & Flipping',
      orcatSpeech: 'Meow-woosh! Doing a double whale flip for the pod!',
      happinessPercent,
    };
  }

  return {
    totalInteractions,
    moodLabel: 'Maximum Pod Zoomies',
    orcatSpeech: '1,000,000,000% HAPPY ORCAT! To the ocean surface and beyond!',
    happinessPercent: 100,
  };
}
