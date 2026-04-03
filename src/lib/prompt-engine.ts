import type { InkMode, Vertical, Composition } from '@/types/database';
import type { Palette } from '@/types/database';
import { DEFAULT_STYLE_BLOCK, DEFAULT_EXCLUSIONS_BLOCK, COMPOSITION_DESCRIPTIONS, COMPOSITION_LABELS } from './constants';

export interface PromptParams {
  inkMode: InkMode;
  vertical: Vertical;
  composition: Composition;
  subject: string;
  accentColours: string[];
  palette: Palette | null;
  styleBlock?: string;
  exclusionsBlock?: string;
  detailLevel?: number; // 20-100
}

export type PlatformVariant = 'universal' | 'midjourney' | 'recraft' | 'freepik' | 'dalle' | 'stable_diffusion';

export const PLATFORM_LABELS: Record<PlatformVariant, string> = {
  universal: 'Universal',
  midjourney: 'Midjourney',
  recraft: 'Recraft',
  freepik: 'Freepik',
  dalle: 'DALL-E / ChatGPT',
  stable_diffusion: 'Stable Diffusion',
};

export const PLATFORM_CHAR_LIMITS: Record<PlatformVariant, number | null> = {
  universal: null,
  midjourney: 6000,
  recraft: null,
  freepik: 1000,
  dalle: 4000,
  stable_diffusion: 2000,
};

// ── Condensed style blocks by detail level ──

const STYLE_MINIMAL = 'Editorial ink illustration, gestural brushpen linework, black ink on white paper, variable line weight, organic imperfect lines, 1:5.5 head-to-body ratio, hair as distinguishing feature, simple faces, Pentel Pocket Brush Pen quality, Monocle/New Yorker editorial feel.';

const STYLE_STANDARD = 'Hand-drawn editorial ink illustration with confident, gestural brushpen linework. Black ink on white paper. Variable line weight: heavier on outer contours (3-4px), lighter on interior details (1-1.5px). Pressure transitions organically within strokes. Lines occasionally trail off at edges. Human figures ~1:5.5 ratio, hair as primary identifier. Simple faces, 3-4 finger gestural hands. Clothing as silhouette contours, furniture as outline only. Pentel Pocket Brush Pen on cartridge paper. The feel of a skilled editorial illustrator working for Monocle or The New Yorker.';

const EXCLUSIONS_MINIMAL = 'No gradients, shadows, 3D, photorealism, vector lines, patterns on clothing, filled backgrounds.';

const EXCLUSIONS_STANDARD = 'No gradients. No drop shadows. No ambient occlusion. No glow effects. No 3D rendering. No photorealistic elements. No smooth uniform vector lines. No filled backgrounds. No patterns on clothing. No wood grain or fabric texture. Must look hand-drawn by a human, not AI-generated.';

// ── Midjourney condensed (~150 words) ──

const STYLE_MIDJOURNEY = 'Hand-drawn editorial ink illustration, confident gestural brushpen linework, black ink on white paper. Variable line weight: thick outer contours 3-4px, thin interior details 1-1.5px, organic pressure transitions within strokes. Lines slightly imperfect, strokes occasionally trail off. Human figures 1:5.5 ratio, hair as primary distinguisher between characters — wavy strokes, solid black mass, bun shapes, tight curls, unique per figure. Simple dot/line eyes, minimal nose, optional mouth. 3-4 finger gestural hands. Clothing as silhouette contours, no interior detail. Furniture recognizable from outline only, no fill. Plants as quick leaf shapes in pots. Pentel Pocket Brush Pen on smooth cartridge paper quality. Overall feel: skilled editorial illustrator for Monocle magazine or The New Yorker, drawn in 15 minutes, confident and warm, hand visible in every stroke.';

// ── Section builders ──

function getInkModeDirective(mode: InkMode, colours: string[], palette: Palette | null): string {
  switch (mode) {
    case 'pure_ink':
      return 'Pure black ink on white paper. No colour whatsoever. No grey tones. Solid black fills only for hair and occasional clothing emphasis.';
    case 'single_register': {
      const colour = colours[0] || (palette?.vertical_space_hex ?? '#D4772E');
      return `Black ink base illustration with ONE accent colour (${colour}) applied as flat solid fill on maximum 20% of image area. Apply colour on ONLY one of: technology screens, OR one architectural plane, OR one clothing item. Never more than one category. Skin tones as flat warm fill when faces are prominent.`;
    }
    case 'double_register': {
      const primary = colours[0] || (palette?.vertical_space_hex ?? '#D4772E');
      const secondary = colours[1] || (palette?.vertical_people_hex ?? '#2D4272');
      return `Black ink base illustration with TWO accent colours. Primary colour (${primary}) at 15% of image area, secondary colour (${secondary}) at 10% of image area. The two colours should not touch or overlap.`;
    }
    case 'tinted_mono': {
      const tint = colours[0] || (palette?.vertical_tech_hex ?? '#3D6B4F');
      return `No black ink. Entire linework drawn in a single dark colour (${tint}). Fills in lighter tints of the same colour. Duotone effect. The illustration should feel monochromatic and cohesive.`;
    }
  }
}

function getVerticalContext(vertical: Vertical): string {
  switch (vertical) {
    case 'space': return 'The scene depicts a workplace/architectural space environment.';
    case 'people': return 'The scene focuses on people and human interaction.';
    case 'tech': return 'The scene highlights technology and digital equipment in a workplace.';
    case 'master':
    case 'custom': return '';
  }
}

// ── Structured prompt sections ──

export interface StructuredPrompt {
  style: string;
  subject: string;
  composition: string;
  colour: string;
  exclusions: string;
}

function getStyleByDetail(fullStyle: string, detail: number): string {
  if (detail < 40) return STYLE_MINIMAL;
  if (detail < 75) return STYLE_STANDARD;
  return fullStyle;
}

function getExclusionsByDetail(fullExclusions: string, detail: number): string {
  if (detail < 40) return EXCLUSIONS_MINIMAL;
  if (detail < 75) return EXCLUSIONS_STANDARD;
  return fullExclusions;
}

export function getStructuredSections(params: PromptParams): StructuredPrompt {
  const {
    inkMode, vertical, composition, subject, accentColours, palette,
    styleBlock = DEFAULT_STYLE_BLOCK,
    exclusionsBlock = DEFAULT_EXCLUSIONS_BLOCK,
    detailLevel = 100,
  } = params;

  const style = getStyleByDetail(styleBlock, detailLevel);

  const verticalCtx = getVerticalContext(vertical);
  const subjectParts: string[] = [];
  if (subject.trim()) subjectParts.push(subject.trim());
  if (verticalCtx) subjectParts.push(verticalCtx);
  const subjectText = subjectParts.join(' ') || 'Editorial illustration scene.';

  const compositionText = `${COMPOSITION_LABELS[composition]}: ${COMPOSITION_DESCRIPTIONS[composition]}`;
  const colourText = getInkModeDirective(inkMode, accentColours, palette);
  const exclusions = getExclusionsByDetail(exclusionsBlock, detailLevel);

  return { style, subject: subjectText, composition: compositionText, colour: colourText, exclusions };
}

// ── Universal (labeled) ──

export function assemblePrompt(params: PromptParams): string {
  const s = getStructuredSections(params);
  return [
    `── STYLE ──\n${s.style}`,
    `── SUBJECT ──\n${s.subject}`,
    `── COMPOSITION ──\n${s.composition}`,
    `── COLOUR ──\n${s.colour}`,
    `── EXCLUSIONS ──\n${s.exclusions}`,
  ].join('\n\n');
}

// ── Raw (no labels, for API calls) ──

export function assembleRawPrompt(params: PromptParams): string {
  const s = getStructuredSections(params);
  return [s.style, s.subject, s.composition, s.colour].join('\n\n');
}

// ── Platform-specific variants ──

export function assemblePlatformPrompt(params: PromptParams, platform: PlatformVariant): string {
  const s = getStructuredSections(params);
  const { inkMode, accentColours } = params;

  switch (platform) {
    case 'universal':
      return assemblePrompt(params);

    case 'midjourney': {
      // Condensed style, --no for exclusions, MJ parameters
      const noKeywords = 'gradient shadow drop-shadow 3d render photorealistic vector digital smooth symmetry anime cartoon blurry';
      const colourShort = inkMode === 'pure_ink' ? 'black ink only, no colour'
        : `accent colour ${accentColours[0]}`;
      return `${STYLE_MIDJOURNEY}\n\n${s.subject}\n\n${s.composition}\n\n${colourShort} --no ${noKeywords} --ar 1:1 --v 7 --style raw`;
    }

    case 'recraft': {
      // Full style with Recraft-specific formatting
      const colourInfo = inkMode === 'pure_ink'
        ? 'Primary colours: black #000000, background white #FFFFFF'
        : `Primary colours: black #000000, accent ${accentColours[0]}, background white #FFFFFF`;
      return `Style: digital_illustration, substyle: hand_drawn\n\n${s.style}\n\n${s.subject}\n\n${s.composition}\n\n${s.colour}\n\n${colourInfo}`;
    }

    case 'freepik': {
      // ~500 chars, condensed for Nano Banana / Flux models
      const colourTag = inkMode === 'pure_ink' ? 'pure black ink, no colour'
        : inkMode === 'tinted_mono' ? `monochrome ${accentColours[0]}`
        : `black ink with ${accentColours[0]} accent`;
      return `editorial ink illustration, gestural brushpen linework, black ink on white, ${s.subject}, variable line weight thick-to-thin, hand-drawn quality, Pentel brush pen feel, Monocle magazine style, ${COMPOSITION_LABELS[params.composition].toLowerCase()}, ${colourTag}, no gradients no shadows no 3D`;
    }

    case 'dalle': {
      // Natural language, conversational prose
      const colourDesc = inkMode === 'pure_ink'
        ? 'Use only black ink — no colour at all, just black and white.'
        : inkMode === 'single_register'
        ? `Use mostly black ink, with one flat accent colour (${accentColours[0]}) applied sparingly to about 20% of the image — on a screen, a wall, or a piece of clothing, but not on more than one category.`
        : inkMode === 'double_register'
        ? `Use mostly black ink with two accent colours: ${accentColours[0]} as the primary (15% coverage) and ${accentColours[1] || accentColours[0]} as secondary (10% coverage). They should not touch each other.`
        : `Draw the entire illustration in a single dark colour (${accentColours[0]}) instead of black, with lighter tints of the same colour for fills. Duotone effect.`;

      return `Create an illustration in a hand-drawn editorial ink style, as if drawn by a skilled illustrator for Monocle magazine or The New Yorker. Use confident, gestural brushpen linework on white paper. The line weight should vary naturally — heavier on outer contours of bodies and furniture, lighter on interior details like faces and fingers. Lines should be organic, slightly imperfect, with strokes that occasionally trail off at edges. This is not digital perfection — it's the confident hand of a professional illustrator using a Pentel Pocket Brush Pen.

${s.subject}

Composition: ${s.composition}

${colourDesc}

The illustration should look like it was drawn by hand with a brush pen, not generated by AI. No gradients, no shadows, no glow effects, no 3D rendering, no photorealistic elements, no patterns on clothing, no detailed textures on furniture.`;
    }

    case 'stable_diffusion': {
      // Split positive/negative, add quality tokens
      const positive = `masterpiece, best quality, professional illustration, ${s.style}\n\n${s.subject}\n\n${s.composition}\n\n${s.colour}`;
      const negKeywords = 'gradient, drop shadow, cast shadow, ambient occlusion, glow, 3d render, photorealistic, vector art, digital, smooth lines, uniform stroke, filled background, pattern on clothing, wood grain, fabric texture, text, watermark, signature, symmetry, geometric precision, blurry, low quality, amateur, childish, cartoon, anime, deformed, ugly';
      return `POSITIVE PROMPT:\n${positive}\n\nNEGATIVE PROMPT:\n${negKeywords}`;
    }

    default:
      return assemblePrompt(params);
  }
}
