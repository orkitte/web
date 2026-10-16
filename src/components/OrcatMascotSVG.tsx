import React from 'react';

export type OrcatCoat = 'classic';
export type OrcatHat =
  | 'none'
  | 'sailor'
  | 'crown'
  | 'goggles'
  | 'party'
  | 'viking'
  | 'tophat'
  | 'chef'
  | 'shades'
  | 'headphones'
  | 'hibiscus';
export type OrcatEyes = 'classic' | 'wink' | 'stars' | 'hearts' | 'squint' | 'laser';
export type OrcatMouth = 'classic' | 'smile' | 'fish' | 'coin' | 'bubbles';
export type OrcatOutfit =
  | 'none'
  | 'bowtie_blue'
  | 'bowtie_red'
  | 'gold_chain'
  | 'scarf';
export type OrcatProp = 'none' | 'diamond' | 'trident' | 'surfboard' | 'boba' | 'rocket';
export type OrcatFrame = 'coin' | 'diecut' | 'sunset' | 'abyss' | 'minimal' | 'none';
export type OrcatPose = 'leap' | 'surf' | 'dive' | 'guard' | 'happy';

export interface OrcatMascotSVGProps {
  size?: number;
  coat?: string;
  hat?: OrcatHat;
  eyes?: OrcatEyes;
  mouth?: OrcatMouth;
  outfit?: OrcatOutfit;
  prop?: OrcatProp;
  frame?: OrcatFrame;
  pose?: OrcatPose;
  withCoinBadge?: boolean;
  withStickerBorder?: boolean;
  isBlinking?: boolean;
  className?: string;
  id?: string;
}

export const OrcatMascotSVG: React.FC<OrcatMascotSVGProps> = ({
  size = 320,
  hat = 'none',
  eyes = 'classic',
  mouth = 'classic',
  outfit = 'none',
  prop = 'none',
  frame = 'coin',
  pose = 'leap',
  withCoinBadge,
  withStickerBorder = false,
  isBlinking = false,
  className = '',
  id,
}) => {
  // Backwards compatibility: if withCoinBadge is explicitly provided, determine frame
  const effectiveFrame: OrcatFrame =
    withCoinBadge === false && frame === 'coin' ? 'none' : frame;

  // Orcat is strictly a black & white tuxedo cat / orca hybrid
  const coatColors = {
    body: '#1D1E22',
    stroke: '#0A0A0D',
    belly: '#FFFFFF',
    innerEar: '#FDA4AF',
  };

  const poseTransform =
    pose === 'dive'
      ? 'rotate(14 250 230)'
      : pose === 'surf'
      ? 'rotate(-6 250 230) translate(0 -6)'
      : pose === 'guard'
      ? 'rotate(0 250 230) scale(1.03)'
      : pose === 'happy'
      ? 'rotate(-10 250 230) translate(0 -12)'
      : 'rotate(0 250 230)';

  return (
    <svg
      id={id}
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Orcat mascot — half tuxedo cat, half orca whale"
    >
      <defs>
        {/* Gradients for Frames */}
        <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>
        <linearGradient id="abyssGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B132B" />
          <stop offset="100%" stopColor="#1C2541" />
        </linearGradient>
        <linearGradient id="goldChainGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Die Cut Filter for Sticker Preview */}
        <filter id="stickerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Frame / Background Layer */}
      {effectiveFrame === 'coin' && (
        <g>
          <circle cx="250" cy="250" r="238" fill="#0055FF" stroke="#003BB5" strokeWidth="6" />
          <circle cx="250" cy="250" r="214" fill="#0055FF" stroke="#7BC6FF" strokeWidth="12" />
        </g>
      )}

      {effectiveFrame === 'sunset' && (
        <g>
          <circle cx="250" cy="250" r="236" fill="url(#sunsetGrad)" stroke="#FDA4AF" strokeWidth="8" />
          <circle cx="250" cy="250" r="216" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.4" />
        </g>
      )}

      {effectiveFrame === 'abyss' && (
        <g>
          <circle cx="250" cy="250" r="236" fill="url(#abyssGrad)" stroke="#06B6D4" strokeWidth="6" />
          <circle cx="250" cy="250" r="214" stroke="#38BDF8" strokeWidth="3" fill="none" opacity="0.6" />
        </g>
      )}

      {effectiveFrame === 'minimal' && (
        <g>
          <circle cx="250" cy="250" r="236" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="8" />
          <circle cx="250" cy="250" r="216" stroke="#E2E8F0" strokeWidth="3" fill="none" />
        </g>
      )}

      {effectiveFrame === 'diecut' && (
        <circle cx="250" cy="250" r="236" fill="#F8FAFC" stroke="#FFFFFF" strokeWidth="16" filter="url(#stickerShadow)" />
      )}

      {/* Water Splashes & Wave Curls (when in coin or water frames) */}
      {(effectiveFrame === 'coin' || effectiveFrame === 'sunset' || effectiveFrame === 'abyss') && (
        <g stroke={effectiveFrame === 'sunset' ? '#FDE047' : '#7BC6FF'} strokeLinecap="round" strokeLinejoin="round">
          <path d="M148 310 C125 292, 114 306, 126 318 C134 326, 148 318, 148 310 Z" fill="#0055FF" strokeWidth="6.5" />
          <path d="M156 346 C134 338, 128 352, 139 360 C147 364, 157 354, 156 346 Z" fill="#0055FF" strokeWidth="6.5" />
          <path d="M312 346 C318 320, 336 314, 336 329 C336 341, 320 351, 312 346 Z" fill="#0055FF" strokeWidth="6.5" />
          <path d="M362 316 C370 296, 386 298, 382 310 C379 318, 367 321, 362 316 Z" fill="#0055FF" strokeWidth="6.5" />
          <path d="M368 346 C378 334, 392 338, 386 348 C382 354, 371 352, 368 346 Z" fill="#0055FF" strokeWidth="6.5" />
          <path d="M144 374 C166 389, 196 382, 188 358 C184 344, 198 342, 212 362 C230 386, 260 390, 278 370" strokeWidth="8.5" fill="none" />
          <path d="M258 398 C288 400, 316 382, 328 366 C336 378, 356 380, 376 366" strokeWidth="8.5" fill="none" />
        </g>
      )}

      {/* Main Character Layer Group with Pose Transform */}
      <g transform={poseTransform}>
        {/* Optional Thick White Die-Cut Silhouette Border for Stickers */}
        {withStickerBorder && (
          <path
            d="M155 246
               C166 196, 212 160, 258 154
               L270 116 L296 146
               C312 145, 326 146, 338 149
               L364 118 L372 162
               C398 184, 404 224, 384 264
               C364 304, 312 338, 252 338
               C202 338, 170 312, 152 278
               C138 274, 114 274, 102 262
               C94 254, 108 244, 124 244
               C122 226, 126 206, 138 214
               C146 220, 148 236, 155 246 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="32"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {/* Surfboard (Underbody) */}
        {prop === 'surfboard' && (
          <g transform="translate(110, 310) rotate(-14)">
            <ellipse cx="140" cy="22" rx="130" ry="20" fill="#0055FF" stroke="#003BB5" strokeWidth="6" />
            <path d="M15 22 H265" stroke="#FFFFFF" strokeWidth="5" />
            <path d="M130 5 L145 22 L130 39" fill="#7BC6FF" />
          </g>
        )}

        {/* Dorsal Fin on Back */}
        <path
          d="M202 182 C184 150, 196 138, 238 158"
          fill={coatColors.body}
          stroke={coatColors.stroke}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Chubby Oval Whale-Cat Torso + Tail Fluke */}
        <path
          d="M155 246
             C166 196, 212 160, 258 154
             L270 116 L296 146
             C312 145, 326 146, 338 149
             L364 118 L372 162
             C398 184, 404 224, 384 264
             C364 304, 312 338, 252 338
             C202 338, 170 312, 152 278
             C138 274, 114 274, 102 262
             C94 254, 108 244, 124 244
             C122 226, 126 206, 138 214
             C146 220, 148 236, 155 246 Z"
          fill={coatColors.body}
          stroke={coatColors.stroke}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Ears */}
        <path d="M276 132 L288 142 L274 140 Z" fill={coatColors.innerEar} opacity="0.6" />
        <path d="M358 132 L348 144 L364 142 Z" fill={coatColors.innerEar} opacity="0.6" />

        {/* Crisp Orca Belly + Tuxedo Cat Blaze */}
        <path
          d="M188 292
             C182 280, 194 268, 218 272
             C244 276, 268 258, 286 222
             C304 196, 314 166, 324 166
             C333 166, 338 194, 356 212
             C376 228, 384 246, 370 274
             C350 310, 304 334, 252 334
             C216 334, 194 320, 184 306
             C198 308, 212 302, 206 294
             C200 288, 191 294, 188 292 Z"
          fill={coatColors.belly}
        />

        {/* Outer Contour Stroke */}
        <path
          d="M155 246
             C166 196, 212 160, 258 154
             L270 116 L296 146
             C312 145, 326 146, 338 149
             L364 118 L372 162
             C398 184, 404 224, 384 264
             C364 304, 312 338, 252 338
             C202 338, 170 312, 152 278
             C138 274, 114 274, 102 262
             C94 254, 108 244, 124 244
             C122 226, 126 206, 138 214
             C146 220, 148 236, 155 246 Z"
          fill="none"
          stroke={coatColors.stroke}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Side Far Flipper */}
        <path
          d="M376 254 C388 274, 384 302, 370 300 C358 298, 358 278, 368 264"
          fill={coatColors.body}
          stroke={coatColors.stroke}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Front Left Pectoral Flipper */}
        <path
          d="M256 238 C242 264, 240 290, 256 292 C272 294, 282 268, 280 242"
          fill={coatColors.body}
          stroke={coatColors.stroke}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ===================== EYES & EXPRESSIONS ===================== */}
        {isBlinking || eyes === 'wink' ? (
          <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round">
            <path d="M284 190 Q296 198 308 190" />
            {eyes === 'wink' ? (
              <g>
                <circle cx="354" cy="188" r="10.5" fill="#FFFFFF" />
                <circle cx="354" cy="188" r="5.5" fill="#0A0A0D" />
                <circle cx="356" cy="186" r="2.5" fill="#FFFFFF" />
              </g>
            ) : (
              <path d="M342 188 Q354 196 364 188" />
            )}
          </g>
        ) : eyes === 'stars' ? (
          <g>
            {/* Sparkling Gold Star Eyes */}
            <path d="M296 178 L300 186 L308 190 L300 194 L296 202 L292 194 L284 190 L292 186 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
            <path d="M354 176 L358 184 L366 188 L358 192 L354 200 L350 192 L342 188 L350 184 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          </g>
        ) : eyes === 'hearts' ? (
          <g fill="#F43F5E">
            <path d="M296 198 C286 188, 280 180, 290 178 C296 177, 296 182, 296 184 C296 182, 296 177, 302 178 C312 180, 306 188, 296 198 Z" />
            <path d="M354 196 C344 186, 338 178, 348 176 C354 175, 354 180, 354 182 C354 180, 354 175, 360 176 C370 178, 364 186, 354 196 Z" />
          </g>
        ) : eyes === 'squint' ? (
          <g stroke="#0A0A0D" strokeWidth="6" strokeLinecap="round" fill="none">
            <path d="M286 192 Q296 182 306 192" />
            <path d="M344 190 Q354 180 364 190" />
          </g>
        ) : eyes === 'laser' ? (
          /* Pupils in glowing Base Electric Blue */
          <g>
            <circle cx="296" cy="190" r="11" fill="#0052FF" />
            <circle cx="296" cy="190" r="7" fill="#38BDF8" />
            <circle cx="296" cy="190" r="3.5" fill="#FFFFFF" />
            <circle cx="354" cy="188" r="10.5" fill="#0052FF" />
            <circle cx="354" cy="188" r="6.5" fill="#38BDF8" />
            <circle cx="354" cy="188" r="3.5" fill="#FFFFFF" />
          </g>
        ) : (
          /* Classic cute eyes */
          <g>
            <circle cx="296" cy="190" r="11.5" fill="#FFFFFF" />
            <circle cx="296" cy="190" r="6" fill="#0A0A0D" />
            <circle cx="298" cy="188" r="2.5" fill="#FFFFFF" />
            <circle cx="354" cy="188" r="10.5" fill="#FFFFFF" />
            <circle cx="354" cy="188" r="5.5" fill="#0A0A0D" />
            <circle cx="356" cy="186" r="2.2" fill="#FFFFFF" />
          </g>
        )}

        {/* Cute Cat Nose inside White Blaze */}
        <ellipse cx="326" cy="198" rx="5.5" ry="3.8" fill="#0A0A0D" />

        {/* ===================== MOUTH & EATING ===================== */}
        {mouth === 'smile' ? (
          <path d="M312 204 Q326 220 340 204 Z" fill="#F43F5E" stroke="#0A0A0D" strokeWidth="4" />
        ) : mouth === 'fish' ? (
          <g transform="translate(326, 206) rotate(6)">
            {/* Small fish clamped snugly in mouth */}
            <path d="M-22 -2 C-10 -9, 14 -7, 24 -1 C14 6, -10 6, -22 -2 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.5" />
            <polygon points="-22,-2 -30,-8 -30,4" fill="#64748B" stroke="#0F172A" strokeWidth="2" />
            <circle cx="18" cy="-2" r="2" fill="#0F172A" />
          </g>
        ) : mouth === 'coin' ? (
          <g transform="translate(326, 206) rotate(-5)">
            {/* Gold Base coin clamped in mouth */}
            <circle cx="0" cy="0" r="12" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="9.5" stroke="#FDE68A" strokeWidth="1.5" fill="none" />
            <text x="-4" y="4" fill="#78350F" fontSize="11" fontWeight="900">B</text>
          </g>
        ) : mouth === 'bubbles' ? (
          <g>
            <path d="M312 206 C316 214, 324 212, 326 204 C328 212, 338 214, 342 204" fill="none" stroke="#0A0A0D" strokeWidth="5" strokeLinecap="round" />
            <circle cx="342" cy="202" r="4.5" fill="#38BDF8" fillOpacity="0.6" stroke="#0284C7" strokeWidth="1.5" />
            <circle cx="356" cy="190" r="6.5" fill="#38BDF8" fillOpacity="0.6" stroke="#0284C7" strokeWidth="2" />
            <circle cx="370" cy="172" r="8.5" fill="#38BDF8" fillOpacity="0.6" stroke="#0284C7" strokeWidth="2" />
          </g>
        ) : (
          /* Classic :3 W-smile */
          <path
            d="M312 206 C316 214, 324 212, 326 204 C328 212, 338 214, 342 204"
            fill="none"
            stroke="#0A0A0D"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Two Crisp White Whiskers on Left Dark Cheek */}
        <path d="M258 206 L278 205" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M262 220 L279 213" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />

        {/* Two Black Whiskers on Right Side */}
        <path d="M388 188 L406 182" stroke="#0A0A0D" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M390 198 L409 201" stroke="#0A0A0D" strokeWidth="5.5" strokeLinecap="round" />

        {/* ===================== OUTFITS & NECKWEAR (SNUGLY POSITIONED) ===================== */}
        {outfit === 'bowtie_blue' && (
          <g transform="translate(326, 226)">
            <polygon points="-16,-9 0,0 -16,9" fill="#0055FF" stroke="#003BB5" strokeWidth="2.5" />
            <polygon points="16,-9 0,0 16,9" fill="#0055FF" stroke="#003BB5" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4.5" fill="#38BDF8" stroke="#003BB5" strokeWidth="2" />
          </g>
        )}

        {outfit === 'bowtie_red' && (
          <g transform="translate(326, 226)">
            <polygon points="-16,-9 0,0 -16,9" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
            <polygon points="16,-9 0,0 16,9" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4.5" fill="#FECACA" stroke="#991B1B" strokeWidth="2" />
          </g>
        )}

        {outfit === 'gold_chain' && (
          <g transform="translate(290, 224)">
            <path d="M0 0 Q36 28 72 0" stroke="url(#goldChainGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="36" cy="24" r="11" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
            <text x="30" y="28" fill="#78350F" fontSize="11" fontWeight="900">B</text>
          </g>
        )}

        {outfit === 'scarf' && (
          <g transform="translate(275, 218)">
            <path d="M10 5 C30 25, 60 25, 80 5" stroke="#0055FF" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M60 16 L65 48" stroke="#0055FF" strokeWidth="14" strokeLinecap="square" />
            <line x1="28" y1="12" x2="34" y2="18" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="48" y1="17" x2="54" y2="21" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="58" y1="36" x2="72" y2="36" stroke="#FFFFFF" strokeWidth="4" />
          </g>
        )}

        {/* ===================== PROPS & HELD ITEMS (HELD SECURELY IN FLIPPER) ===================== */}
        {prop === 'diamond' && (
          <g transform="translate(254, 275)">
            <polygon points="16,0 32,10 16,30 0,10" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
            <polygon points="16,0 32,10 16,14 0,10" fill="#BAE6FD" />
            <line x1="16" y1="14" x2="16" y2="30" stroke="#0284C7" strokeWidth="2" />
            <circle cx="34" cy="4" r="2" fill="#FFFFFF" />
            <circle cx="-2" cy="16" r="1.5" fill="#FFFFFF" />
          </g>
        )}

        {prop === 'trident' && (
          <g transform="translate(256, 275) rotate(18)">
            <line x1="0" y1="50" x2="0" y2="-80" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
            <path d="M-12 -60 C-12 -42, 12 -42, 12 -60" stroke="#F59E0B" strokeWidth="5" fill="none" />
            <polygon points="0,-88 -5,-70 5,-70" fill="#FDE047" stroke="#D97706" strokeWidth="2" />
            <polygon points="-12,-68 -16,-52 -8,-52" fill="#FDE047" stroke="#D97706" strokeWidth="2" />
            <polygon points="12,-68 8,-52 16,-52" fill="#FDE047" stroke="#D97706" strokeWidth="2" />
          </g>
        )}

        {prop === 'boba' && (
          <g transform="translate(252, 270)">
            <rect x="0" y="8" width="22" height="28" rx="4" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.5" />
            <line x1="11" y1="0" x2="11" y2="12" stroke="#9333EA" strokeWidth="4" strokeLinecap="round" />
            <circle cx="6" cy="28" r="2.5" fill="#451A03" />
            <circle cx="15" cy="30" r="2.5" fill="#451A03" />
            <circle cx="10" cy="24" r="2.5" fill="#451A03" />
          </g>
        )}

        {prop === 'rocket' && (
          <g transform="translate(236, 245) rotate(-32)">
            <polygon points="12,0 0,28 24,28" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
            <rect x="3" y="28" width="18" height="22" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
            <circle cx="12" cy="38" r="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            <polygon points="12,50 6,62 18,62" fill="#F97316" />
          </g>
        )}

        {/* ===================== HATS & HEADGEAR (SNUGLY POSITIONED ON FOREHEAD CURVE) ===================== */}
        {hat === 'sailor' && (
          /* Calibrated: base sits right on the cranial curve at y=146 */
          <g transform="translate(286, 118) rotate(5)">
            <ellipse cx="32" cy="28" rx="32" ry="11" fill="#FFFFFF" stroke="#0A0A0D" strokeWidth="4.5" />
            <path d="M8 24 C8 8, 56 8, 56 24 Z" fill="#FFFFFF" stroke="#0A0A0D" strokeWidth="4.5" />
            <path d="M12 24 H52" stroke="#0055FF" strokeWidth="5.5" />
            <circle cx="32" cy="8" r="4.5" fill="#0055FF" stroke="#0A0A0D" strokeWidth="2.5" />
          </g>
        )}

        {hat === 'crown' && (
          /* Calibrated: sits directly between the cat ears along y=148 */
          <g transform="translate(288, 114) rotate(4)">
            <path d="M6 34 L2 10 L18 22 L30 6 L42 22 L58 10 L54 34 Z" fill="#FACC15" stroke="#0A0A0D" strokeWidth="4.5" strokeLinejoin="round" />
            <circle cx="30" cy="24" r="3.5" fill="#0055FF" />
            <circle cx="18" cy="22" r="2.8" fill="#EF4444" />
            <circle cx="42" cy="22" r="2.8" fill="#10B981" />
          </g>
        )}

        {hat === 'goggles' && (
          /* Calibrated: lenses centered directly over left eye (296, 190) and right eye (354, 188) */
          <g>
            {/* Dark elastic strap around head */}
            <path d="M260 190 L276 190" stroke="#0A0A0D" strokeWidth="5" strokeLinecap="round" />
            <path d="M374 186 L388 186" stroke="#0A0A0D" strokeWidth="5" strokeLinecap="round" />
            {/* Left lens */}
            <rect x="276" y="176" width="40" height="28" rx="10" fill="#38BDF8" fillOpacity="0.85" stroke="#0A0A0D" strokeWidth="4.5" />
            {/* Right lens */}
            <rect x="334" y="174" width="40" height="28" rx="10" fill="#38BDF8" fillOpacity="0.85" stroke="#0A0A0D" strokeWidth="4.5" />
            {/* Bridge */}
            <path d="M316 186 H334" stroke="#0A0A0D" strokeWidth="5" strokeLinecap="round" />
            {/* Glare specular lines */}
            <line x1="284" y1="182" x2="294" y2="182" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="342" y1="180" x2="352" y2="180" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Snorkel tube curving alongside cheek */}
            <path d="M268 188 L254 200 C248 218, 268 226, 274 222" stroke="#F97316" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          </g>
        )}

        {hat === 'party' && (
          /* Calibrated: cone base rests snug on the head at y=148 */
          <g transform="translate(300, 93) rotate(8)">
            <polygon points="18,0 0,55 36,55" fill="#EC4899" stroke="#831843" strokeWidth="3.5" />
            <path d="M4 42 Q18 36 32 42" stroke="#FACC15" strokeWidth="3.5" fill="none" />
            <path d="M8 26 Q18 22 28 26" stroke="#38BDF8" strokeWidth="3.5" fill="none" />
            <circle cx="18" cy="0" r="5.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          </g>
        )}

        {hat === 'viking' && (
          /* Calibrated: helm band sits directly on the forehead */
          <g transform="translate(288, 110) rotate(4)">
            <path d="M4 38 C4 18, 56 18, 56 38 Z" fill="#64748B" stroke="#0F172A" strokeWidth="4.5" />
            <line x1="4" y1="38" x2="56" y2="38" stroke="#334155" strokeWidth="5.5" />
            {/* Left horn */}
            <path d="M8 28 C-8 20, -12 2, -2 0 C-4 12, 10 20, 12 26" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.8" />
            {/* Right horn */}
            <path d="M52 28 C68 20, 72 2, 62 0 C64 12, 50 20, 48 26" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.8" />
          </g>
        )}

        {hat === 'tophat' && (
          /* Calibrated: brim rests directly on the skull curve */
          <g transform="translate(288, 98) rotate(4)">
            <rect x="10" y="8" width="40" height="42" fill="#0F172A" stroke="#020617" strokeWidth="3.5" />
            <ellipse cx="30" cy="50" rx="34" ry="8" fill="#0F172A" stroke="#020617" strokeWidth="3.5" />
            <rect x="10" y="38" width="40" height="8" fill="#0055FF" />
          </g>
        )}

        {hat === 'chef' && (
          /* Calibrated: toque band wraps head snugly */
          <g transform="translate(288, 98) rotate(4)">
            <path d="M10 40 C-4 32, -4 10, 16 12 C20 -4, 42 -4, 46 12 C64 10, 64 32, 50 40 Z" fill="#FFFFFF" stroke="#0A0A0D" strokeWidth="3.5" />
            <rect x="10" y="38" width="40" height="12" fill="#FFFFFF" stroke="#0A0A0D" strokeWidth="3" />
          </g>
        )}

        {hat === 'shades' && (
          /* Calibrated: glasses positioned directly over pupils at y=190 without hovering */
          <g>
            {/* Left temple arm */}
            <path d="M266 188 L276 188" stroke="#0A0A0D" strokeWidth="4.5" strokeLinecap="round" />
            {/* Left lens (centered at 296, 190) */}
            <rect x="276" y="178" width="40" height="24" rx="3" fill="#0F172A" stroke="#020617" strokeWidth="2.5" />
            <rect x="280" y="181" width="7" height="6" fill="#FFFFFF" />
            {/* Bridge */}
            <rect x="316" y="186" width="18" height="6" fill="#0F172A" />
            {/* Right lens (centered at 354, 188) */}
            <rect x="334" y="176" width="40" height="24" rx="3" fill="#0F172A" stroke="#020617" strokeWidth="2.5" />
            <rect x="338" y="179" width="7" height="6" fill="#FFFFFF" />
            {/* Right temple arm */}
            <path d="M374 186 L384 184" stroke="#0A0A0D" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}

        {hat === 'headphones' && (
          /* Calibrated: padded ear cups clamp snugly over sides of head */
          <g transform="translate(268, 116) rotate(4)">
            <path d="M10 38 C10 4, 88 4, 88 38" stroke="#0055FF" strokeWidth="7" fill="none" strokeLinecap="round" />
            <rect x="2" y="32" width="14" height="24" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
            <rect x="82" y="32" width="14" height="24" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
            {/* Glowing cat ear headphone accents */}
            <polygon points="26,10 34,2 38,12" fill="#38BDF8" />
            <polygon points="62,12 66,2 74,10" fill="#38BDF8" />
          </g>
        )}

        {hat === 'hibiscus' && (
          /* Calibrated: tucked behind right ear base at (362, 136) */
          <g transform="translate(362, 136)">
            <circle cx="0" cy="-9" r="9" fill="#F43F5E" />
            <circle cx="9" cy="0" r="9" fill="#F43F5E" />
            <circle cx="0" cy="9" r="9" fill="#F43F5E" />
            <circle cx="-9" cy="0" r="9" fill="#F43F5E" />
            <circle cx="0" cy="0" r="4.5" fill="#FACC15" />
          </g>
        )}

        {/* ===================== FRONT-LAYERED BASE ELECTRIC LASER LIGHT BEAMS ===================== */}
        {/* Layered in FRONT of all cat face elements, whiskers, and flippers */}
        {eyes === 'laser' && (
          <g className="pointer-events-none">
            {/* Outer Radiant Glow Aura (Royal Base Blue) */}
            <line x1="296" y1="190" x2="520" y2="165" stroke="#0052FF" strokeWidth="22" strokeLinecap="round" strokeOpacity="0.38" />
            <line x1="354" y1="188" x2="530" y2="178" stroke="#0052FF" strokeWidth="22" strokeLinecap="round" strokeOpacity="0.38" />

            {/* Mid Electric Cyan Energy Beam */}
            <line x1="296" y1="190" x2="520" y2="165" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.88" />
            <line x1="354" y1="188" x2="530" y2="178" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" strokeOpacity="0.88" />

            {/* Pure White Core Energy Beam */}
            <line x1="296" y1="190" x2="520" y2="165" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <line x1="354" y1="188" x2="530" y2="178" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

            {/* Base Diamond Starburst Eye Flares at Pupils */}
            <polygon points="296,176 300,190 296,204 292,190" fill="#FFFFFF" />
            <polygon points="282,190 296,186 310,190 296,194" fill="#FFFFFF" />
            <circle cx="296" cy="190" r="5" fill="#38BDF8" />
            <circle cx="296" cy="190" r="3" fill="#FFFFFF" />

            <polygon points="354,174 358,188 354,202 350,188" fill="#FFFFFF" />
            <polygon points="340,188 354,184 368,188 354,192" fill="#FFFFFF" />
            <circle cx="354" cy="188" r="4.5" fill="#38BDF8" />
            <circle cx="354" cy="188" r="2.8" fill="#FFFFFF" />
          </g>
        )}
      </g>
    </svg>
  );
};
