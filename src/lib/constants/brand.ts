// INNOVA AM Tech — Locked Brand Colour System
// These values are FINAL and should never be modified.

export const BRAND = {
  charcoal: '#191919',
  text: '#221F20',
  ivory: '#FAF7F3',
  mist: '#E8E4DF',
  stone: '#9A958F',
  cinnamon: '#D4772E',
  twilight: '#2D4272',
  hunter: '#3D6B4F',
  white: '#FFFFFF',
} as const;

export const VERTICALS = {
  space: { name: 'Space', colour: BRAND.cinnamon, label: 'INNOVA Space', description: 'Managed offices & coworking' },
  people: { name: 'People', colour: BRAND.twilight, label: 'INNOVA People', description: 'IT staffing & talent' },
  tech: { name: 'Tech', colour: BRAND.hunter, label: 'INNOVA Tech', description: 'AV integration & smart workspaces' },
} as const;

export type VerticalKey = keyof typeof VERTICALS;

export const TYPOGRAPHY = {
  display: "'Fraunces', serif",
  body: "'DM Sans', sans-serif",
  mono: "'Space Mono', monospace",
} as const;

export const MODULES = [
  {
    id: 'illustration',
    name: 'Illustration',
    system: 'The Ink Register',
    description: 'Editorial gestural ink with selective colour accent',
    icon: 'pen-tool',
    route: '/illustration',
    shortcut: '1',
  },
  {
    id: 'photography',
    name: 'Photography',
    system: 'The Working Notebook',
    description: 'Kodak Portra 400 editorial workplace aesthetic',
    icon: 'aperture',
    route: '/photography',
    shortcut: '2',
  },
  {
    id: 'icons',
    name: 'Icons',
    system: 'The Convergence Vocabulary',
    description: 'Derived from brandmark geometry',
    icon: 'grid-3x3',
    route: '/icons',
    shortcut: '3',
  },
  {
    id: 'layout',
    name: 'Layout & Grid',
    system: 'The Trap Grid',
    description: 'Derived from brandmark clear space proportions',
    icon: 'layout',
    route: '/layout-grid',
    shortcut: '4',
  },
  {
    id: 'motion',
    name: 'Motion',
    system: 'Motion Principles',
    description: 'How the brand moves — the i-dot as animation seed',
    icon: 'play-circle',
    route: '/motion',
    shortcut: '5',
  },
  {
    id: 'patterns',
    name: 'Patterns & Textures',
    system: 'Supergraphic Patterns',
    description: 'Brandmark geometry patterns + Ink Register textures',
    icon: 'hexagon',
    route: '/patterns',
    shortcut: '6',
  },
] as const;
