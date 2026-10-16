import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBondingCurveState,
  getStoryStateByProgress,
  validateWatchlistInput,
  calculatePodMood,
  TOTAL_ORCAT_SUPPLY,
  CURVE_POOL_SUPPLY,
} from './orcatLogic.ts';

test('bonding curve state calculates phases and supply accurately', () => {
  const start = calculateBondingCurveState(0);
  assert.equal(start.progressPercent, 0);
  assert.equal(start.curveSupplyAllocated, 0);
  assert.equal(start.isGraduated, false);

  const mid = calculateBondingCurveState(50);
  assert.equal(mid.progressPercent, 50);
  assert.equal(mid.curveSupplyAllocated, CURVE_POOL_SUPPLY * 0.5);
  assert.equal(mid.isGraduated, false);
  assert.equal(mid.phaseName, 'Rising Wave Phase');

  const graduated = calculateBondingCurveState(100);
  assert.equal(graduated.progressPercent, 100);
  assert.equal(graduated.curveSupplyAllocated, CURVE_POOL_SUPPLY);
  assert.equal(graduated.curveSupplyAllocated + graduated.dexReserveSupply, TOTAL_ORCAT_SUPPLY);
  assert.equal(graduated.isGraduated, true);
});

test('story state maps scroll progress to chapters and ocean depth', () => {
  const surface = getStoryStateByProgress(0);
  assert.equal(surface.activeChapterIndex, 0);
  assert.equal(surface.depthMeters, 0);
  assert.equal(surface.chapter.orcatAction, 'leap');

  const deep = getStoryStateByProgress(0.95);
  assert.equal(deep.activeChapterIndex, 3);
  assert.equal(deep.depthMeters, 950);
  assert.equal(deep.chapter.orcatAction, 'guard');
});

test('watchlist validation enforces non-empty and valid handles or Base wallets', () => {
  const empty = validateWatchlistInput('   ', 'telegram');
  assert.equal(empty.valid, false);

  const validHandle = validateWatchlistInput('orcat_whale', 'x');
  assert.equal(validHandle.valid, true);
  assert.equal(validHandle.normalizedValue, '@orcat_whale');

  const badWallet = validateWatchlistInput('not_a_wallet', 'wallet');
  assert.equal(badWallet.valid, false);

  const validWallet = validateWatchlistInput('0x71C9A23B4F8E', 'wallet');
  assert.equal(validWallet.valid, true);
});

test('pod mood scales happiness and speech with interactions', () => {
  const idle = calculatePodMood(0, 0, 0);
  assert.equal(idle.totalInteractions, 0);
  assert.equal(idle.happinessPercent, 40);

  const active = calculatePodMood(4, 4, 3);
  assert.equal(active.totalInteractions, 11);
  assert.equal(active.happinessPercent, 100);
  assert.equal(active.moodLabel, 'Maximum Pod Zoomies');
});

test('ocean physics accurately computes pressure, temperature, and zones by depth', () => {
  const surface = getStoryStateByProgress(0).physics;
  assert.equal(surface.depthMeters, 0);
  assert.equal(surface.pressureAtm, 1.0);
  assert.equal(surface.sunlightPercent, 100);
  assert.equal(surface.zoneName, 'Epipelagic (Sunlight Zone)');
  assert.equal(surface.temperatureCelsius, 24.5);

  const twilight = getStoryStateByProgress(0.25).physics;
  assert.equal(twilight.depthMeters, 250);
  assert.equal(twilight.pressureAtm, 26.0);
  assert.equal(twilight.zoneName, 'Mesopelagic (Twilight Zone)');
  assert.ok(twilight.temperatureCelsius < 15);

  const abyss = getStoryStateByProgress(1.0).physics;
  assert.equal(abyss.depthMeters, 1000);
  assert.equal(abyss.pressureAtm, 101.0);
  assert.equal(abyss.sunlightPercent, 0);
  assert.equal(abyss.zoneName, 'Bathypelagic (Midnight Abyss)');
  assert.ok(abyss.temperatureCelsius < 4);
});

test('env config parses booleans and handles contract addresses safely', async () => {
  const { parseBooleanEnv, formatAddress, getSiteConfig } = await import('../config/env.ts');

  // Boolean parsing
  assert.equal(parseBooleanEnv('true'), true);
  assert.equal(parseBooleanEnv('TRUE'), true);
  assert.equal(parseBooleanEnv('1'), true);
  assert.equal(parseBooleanEnv('false'), false);
  assert.equal(parseBooleanEnv('0'), false);
  assert.equal(parseBooleanEnv(undefined, true), true);
  assert.equal(parseBooleanEnv(undefined, false), false);

  // Address formatting
  assert.equal(formatAddress(''), 'TBA');
  assert.equal(formatAddress('TBA'), 'TBA');
  assert.equal(formatAddress('0x1234567890abcdef1234567890abcdef12345678'), '0x1234...5678');
  assert.equal(formatAddress('short'), 'short');

  // Site config resolution
  const testConfig = getSiteConfig({
    VITE_COMING_SOON_MODE: 'true',
    VITE_CONTRACT_ADDRESS: '0x1234567890abcdef1234567890abcdef12345678',
    VITE_TRIBFI_URL: 'https://tribfi.fun/custom',
    VITE_ENABLE_SOCIALS: 'false',
    VITE_TELEGRAM_URL: 'https://t.me/custom_telegram',
    VITE_X_URL: 'https://x.com/custom_x',
  });

  assert.equal(testConfig.isComingSoon, true);
  assert.equal(testConfig.hasContractAddress, true);
  assert.equal(testConfig.formattedCA, '0x1234...5678');
  assert.equal(testConfig.tribfiUrl, 'https://tribfi.fun/custom');
  assert.equal(testConfig.enableSocials, false);
  assert.equal(testConfig.socials.telegram, 'https://t.me/custom_telegram');
  assert.equal(testConfig.socials.x, 'https://x.com/custom_x');
});

