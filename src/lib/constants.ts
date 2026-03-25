import type { InkMode, Vertical, Composition, GenerationStatus } from '@/types/database';

export const DEFAULT_STYLE_BLOCK = `Hand-drawn editorial ink illustration with confident, gestural brushpen linework. Black ink on white. Variable line weight: heavier on outer contours of bodies and furniture (3-4px equivalent), lighter on interior details like faces, fingers, and screen contents (1-1.5px equivalent). Lines are organic and slightly imperfect with occasional breaks where strokes trail off at edges — conveying editorial confidence, not sloppiness. Human figures have natural proportions (approximately 1:5.5 head-to-body ratio) with distinguishing hair as the primary identifier (wavy strokes, solid black mass, bun shape, short crop, curls). Faces include simple line-drawn eyes, small line nose, optional mouth. Hands are 3-4 finger gestural shorthand. Clothing drawn as contour silhouettes with minimal interior line. Furniture and objects drawn as outline only with no fill. Plants appear as quick leaf shapes in pots, always in black line. The quality of line suggests a Pentel Pocket Brush Pen or Faber-Castell Pitt Artist Pen on smooth paper. Not digitally perfect. Not wobbly. Confident and decisive, like an architect sketching on a napkin. The style feels like editorial illustration from Monocle magazine, The New Yorker, or WeWork — warm, confident, human, and deliberately not digitally perfect.`;

export const DEFAULT_EXCLUSIONS_BLOCK = `No gradients. No drop shadows. No cast shadows. No glow effects. No 3D rendering. No photorealistic elements. No smooth digital vector linework. No uniform stroke width. No filled backgrounds or background colours behind the full scene. No detailed patterns on clothing. No detailed furniture textures. No text within the illustration unless specifically requested. No watermarks. The illustration must look hand-drawn, not digitally generated. Avoid symmetry. Avoid geometric precision in organic forms.`;

export const INK_MODE_LABELS: Record<InkMode, string> = {
  pure_ink: 'Pure Ink',
  single_register: 'Single Register',
  double_register: 'Double Register',
  tinted_mono: 'Tinted Monochrome',
};

export const INK_MODE_DESCRIPTIONS: Record<InkMode, string> = {
  pure_ink: 'All black ink on white. No colour. Solid black fills only for hair and clothing emphasis.',
  single_register: 'Black ink + ONE accent colour as flat fill on max 20% of area.',
  double_register: 'Black ink + TWO accent colours. Primary 15%, secondary 10%.',
  tinted_mono: 'No black ink. Entire linework in a single dark brand colour. Duotone effect.',
};

export const VERTICAL_LABELS: Record<Vertical, string> = {
  space: 'Space',
  people: 'People',
  tech: 'Tech',
  master: 'Master',
  custom: 'Custom',
};

export const COMPOSITION_LABELS: Record<Composition, string> = {
  centered_vignette: 'Centered Vignette',
  environmental: 'Environmental Scene',
  isometric: 'Isometric Room',
  cropped: 'Cropped Frame',
  grid: 'Grid Portrait',
};

export const COMPOSITION_DESCRIPTIONS: Record<Composition, string> = {
  centered_vignette: 'Figure group centred with white space on all sides. No background. Objects float.',
  environmental: 'Figures within a described space, architectural lines suggesting walls/ceiling/floor.',
  isometric: 'Deliberate isometric perspective showing room from above-corner angle. Coloured wall planes.',
  cropped: 'Figures partially cut off by frame edges, intimate "caught mid-action" feel.',
  grid: 'Multiple separate frames arranged in a grid, each with a different person.',
};

export const SUBJECT_SUGGESTIONS: Record<string, string[]> = {
  workspace: [
    'Open plan office', 'Private cabin', 'Phone booth', 'Reception area',
    'Pantry/kitchen', 'Meeting room', 'Hot desk area', 'Lounge/breakout',
    'Server room', 'Rooftop terrace',
  ],
  people: [
    'Team meeting', 'Video call', 'One-on-one conversation', 'Person at desk working',
    'Presentation/whiteboard', 'Onboarding/welcome', 'Interview', 'Coffee break chat',
    'Collaboration around table', 'Person walking with laptop',
  ],
  technology: [
    'Wall-mounted display with AV controls', 'Video conferencing setup',
    'Person adjusting screen/camera', 'Laptop and tablet on desk',
    'Smart room control panel', 'Cable management/server rack',
    'Headphones and microphone setup', 'Touchscreen kiosk',
  ],
  events: [
    'Anniversary celebration', 'Town hall meeting', 'Workshop/training',
    'Networking event', 'Panel discussion', 'Award ceremony', 'Team offsite',
  ],
};

export const VERTICAL_BADGE_VARIANT: Record<Vertical, 'amber' | 'coral' | 'cobalt' | 'default'> = {
  space: 'amber',
  people: 'coral',
  tech: 'cobalt',
  master: 'default',
  custom: 'default',
};

export const STATUS_BADGE_VARIANT: Record<GenerationStatus, 'success' | 'warning' | 'default'> = {
  approved: 'success',
  rejected: 'warning',
  pending: 'default',
};

export const DEFAULT_PALETTE = {
  name: 'The Meridian',
  core_dark: '#1C1C1E',
  core_light: '#FAF7F2',
  vertical_space_name: 'Amber',
  vertical_space_hex: '#E8A317',
  vertical_people_name: 'Coral',
  vertical_people_hex: '#E86A50',
  vertical_tech_name: 'Cobalt',
  vertical_tech_hex: '#2B5EA7',
};
