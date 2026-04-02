export type ShotType = 'establishing' | 'action' | 'detail' | 'portrait' | 'convergence';
export type PhotoVertical = 'space' | 'people' | 'tech' | 'all';

export const SHOT_TYPES: Record<ShotType, { label: string; description: string; focal: string; aperture: string; angle: string }> = {
  establishing: {
    label: 'Establishing / Space',
    description: 'Wide environmental, open office or workspace overview',
    focal: '28-35mm', aperture: 'f/4-5.6', angle: 'Slightly elevated 10°',
  },
  action: {
    label: 'Action / People',
    description: 'Mid-range candid interaction between colleagues',
    focal: '50-75mm', aperture: 'f/2.8', angle: 'Eye level',
  },
  detail: {
    label: 'Detail / Surface',
    description: 'Close-up objects, materials, and textures',
    focal: '85-100mm', aperture: 'f/2.8', angle: 'Raking sidelight',
  },
  portrait: {
    label: 'Portrait / Environmental',
    description: 'Person in context, shallow depth of field',
    focal: '85mm', aperture: 'f/3.5', angle: 'Eye level',
  },
  convergence: {
    label: 'Convergence / Hero',
    description: 'All three verticals in one frame, layered depth',
    focal: '35-40mm', aperture: 'f/4', angle: 'Eye level, layered depth',
  },
};

export const ENVIRONMENT_ELEMENTS = [
  'Walnut wood (desks, shelving, panelling)',
  'Cognac leather (chairs, sofas, accessories)',
  'Brass fixtures (pendant lights, desk lamps, hardware)',
  'Terracotta ceramics (coffee cups, planters, vessels)',
  'Monstera / fiddle leaf fig (large statement plants)',
  'Trailing pothos (shelf/window plants)',
  'Fluted wood dividers',
  'Linen/textured fabrics',
] as const;

export const PEOPLE_OPTIONS = [
  { value: '0', label: 'No people (space/detail only)' },
  { value: '1', label: '1 person (portrait/environmental)' },
  { value: '2-3', label: '2-3 people (conversation/action)' },
  { value: '4-6', label: '4-6 people (team/establishing)' },
] as const;

export const DIVERSITY_OPTIONS = [
  { value: 'mixed', label: 'Mixed ethnicities' },
  { value: 'south_asian', label: 'Predominantly South Asian' },
  { value: 'custom', label: 'Custom' },
] as const;

export const AGE_OPTIONS = [
  { value: 'young', label: 'Young professionals (25-35)' },
  { value: 'mixed', label: 'Mixed ages (25-55)' },
  { value: 'senior', label: 'Senior leadership (45-60)' },
] as const;

export const COLOUR_INTEGRATION_OPTIONS = [
  { value: 'natural', label: 'Natural only' },
  { value: 'cinnamon', label: 'Cinnamon present (terracotta/walnut/warm)' },
  { value: 'twilight', label: 'Twilight present (navy/indigo clothing)' },
  { value: 'hunter', label: 'Hunter present (plants/greenery)' },
  { value: 'all', label: 'All three present' },
] as const;

export const PHOTO_STYLE_BLOCK = `Kodak Portra 400 film photograph, editorial workplace photography. Golden natural light, warm and soft directional from windows. Candid documentary feel, nobody aware of camera. Fine organic film grain, lifted warm blacks, ivory-cream highlights, muted greens, slightly soft clarity. Kinfolk magazine quality.`;

export const PHOTO_GRADE_BLOCK = `Film quality: warm lifted blacks (#2A1F14 shadow floor), ivory-cream highlights, muted greens on plants, warm glowing skin tones with amber undertone, fine Kodak Portra grain, slightly reduced clarity. Overall palette: walnut, cognac, cream, brass, olive, terracotta. 3800-4200K colour temperature feel.`;

export const PHOTO_EXCLUSIONS = `No flash photography. No cool/blue colour temperature. No fluorescent lighting. No corporate stock photography aesthetic. No posed group photos. No one looking directly at camera. No white sterile office backgrounds. No chrome/glass/steel-dominated environments. No harsh directional shadows. No ring light. No studio backdrop.`;

export const LIGHTROOM_PRESET = [
  { param: 'Temperature', value: '+300K from native' },
  { param: 'Tint', value: '+6' },
  { param: 'Contrast', value: '-12' },
  { param: 'Highlights', value: '-30' },
  { param: 'Shadows', value: '+28' },
  { param: 'Whites', value: '-12' },
  { param: 'Blacks', value: '+18' },
  { param: 'Clarity', value: '-8' },
  { param: 'Texture', value: '+6' },
  { param: 'Dehaze', value: '-3' },
  { param: 'Vibrance', value: '-5' },
  { param: 'Saturation', value: '-12' },
  { param: 'HSL Orange Sat', value: '+8' },
  { param: 'HSL Orange Lum', value: '+12' },
  { param: 'HSL Green Sat', value: '-15' },
  { param: 'HSL Green Hue', value: '+10' },
  { param: 'Grain Amount', value: '20' },
  { param: 'Grain Size', value: '25' },
  { param: 'Grain Roughness', value: '50' },
  { param: 'Tone Curve Blacks', value: 'Lift to 8%' },
  { param: 'Tone Curve Highlights', value: 'Pull to 92%' },
] as const;

export const QUALITY_CHECKLIST = [
  'Portra warmth: does it feel like Kodak Portra 400 film?',
  'Natural light: golden, directional, 3800-4200K? No flash?',
  'Candid: are people in natural mid-action, not posed?',
  'Materials: walnut, leather, brass, ceramics visible?',
  'Plants: monstera, pothos, or fiddle leaf present?',
  'Earth-tone wardrobe: cream, navy, olive, camel?',
  'Brand colour: at least 1 vertical colour as physical object?',
  'Colour volume: brand colours at 5-12% of frame?',
  'Composition: 30%+ quiet zone for text/annotation overlay?',
  'Diversity: mixed ethnicities, natural representation?',
  'Film grain: fine organic grain visible, not digital noise?',
  'Lifted blacks: shadow floor warm brown-black, not pure black?',
  'The Kinfolk test: could this run in Kinfolk magazine with zero edits?',
  'The brand test: does it feel at home beside "innova" in PP Neue Machina?',
] as const;

export interface PhotoPreset {
  name: string;
  description: string;
  shotType: ShotType;
  vertical: PhotoVertical;
  elements: number[];
  people: string;
  age: string;
  subject: string;
}

export const PHOTO_PRESETS: PhotoPreset[] = [
  {
    name: 'The 10:30AM Floor',
    description: 'Open coworking floor mid-morning, diverse people scattered at desks',
    shotType: 'establishing', vertical: 'space',
    elements: [0, 1, 2, 3, 4, 5, 6, 7], people: '4-6', age: 'mixed',
    subject: 'Open coworking floor mid-morning, 5-6 diverse people scattered at desks, golden morning light through large windows, coffee cups on desks, plants throughout.',
  },
  {
    name: 'The Conversation',
    description: 'Three professionals, animated discussion, coffee cups',
    shotType: 'action', vertical: 'people',
    elements: [0, 2, 3], people: '2-3', age: 'mixed',
    subject: 'Three professionals around a round walnut table, animated discussion, coffee cups in terracotta mugs, brass pendant light above, natural gestures.',
  },
  {
    name: 'The Kinfolk Desk',
    description: 'Close-up walnut desk with objects',
    shotType: 'detail', vertical: 'space',
    elements: [0, 2, 3, 7], people: '0', age: 'mixed',
    subject: 'Close-up walnut desk surface with open laptop, terracotta coffee cup, linen-covered notebook, brass pen, small pothos plant trailing from shelf above.',
  },
  {
    name: 'The Founder',
    description: 'Distinguished South Asian man at desk by window',
    shotType: 'portrait', vertical: 'people',
    elements: [0, 1, 2], people: '1', age: 'senior',
    subject: 'Distinguished South Asian man, late 50s, grey beard, cream linen shirt, sitting at walnut desk by window, warm afternoon light, cognac leather chair, contemplative.',
  },
  {
    name: 'The Integration',
    description: 'All three verticals visible through glass partition',
    shotType: 'convergence', vertical: 'all',
    elements: [0, 1, 2, 3, 4, 6], people: '4-6', age: 'mixed',
    subject: 'Shot through glass partition into meeting room — 4 people visible around table with screen displaying data, coworking space and plants visible in background, layered depth.',
  },
];
