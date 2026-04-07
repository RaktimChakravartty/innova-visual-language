'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { Copy, Check, Download, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useToast } from '@/components/shared/Toast';
import { BRAND } from '@/lib/constants/brand';

type PatternType = 'scatter' | 'grid_mesh' | 'arc_wave' | 'dot_grid' | 'concentric' | 'line_field' | 'noise';
type ColourMode = 'mono_charcoal' | 'mono_ivory' | 'cinnamon' | 'twilight' | 'hunter' | 'tricolour' | 'custom';
type TextureTab = 'patterns' | 'textures';

const SIZE = 500;

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

function getColours(mode: ColourMode, custom: string): string[] {
  switch (mode) {
    case 'mono_charcoal': return [BRAND.charcoal];
    case 'mono_ivory': return [BRAND.ivory];
    case 'cinnamon': return [BRAND.cinnamon];
    case 'twilight': return [BRAND.twilight];
    case 'hunter': return [BRAND.hunter];
    case 'tricolour': return [BRAND.cinnamon, BRAND.twilight, BRAND.hunter];
    case 'custom': return [custom];
  }
}

function ScatterField({ density, colours, bg, seed }: { density: number; colours: string[]; bg: string; seed: number }) {
  const rand = seededRandom(seed);
  const count = Math.floor(15 + density * 1.5);
  const circles = Array.from({ length: count }, () => {
    const sizeRoll = rand();
    const r = sizeRoll < 0.7 ? 2 + rand() * 6 : sizeRoll < 0.9 ? 6 + rand() * 10 : 10 + rand() * 16;
    return { cx: rand() * SIZE, cy: rand() * SIZE, r, fill: colours[Math.floor(rand() * colours.length)], opacity: 0.06 + rand() * 0.12 };
  });
  return <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>{circles.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} opacity={c.opacity} />)}</svg>;
}

function GridMesh({ density, colours, bg }: { density: number; colours: string[]; bg: string }) {
  const gap = Math.max(16, 50 - density * 0.4);
  const w = 2 + density * 0.02;
  const count = Math.floor(SIZE / gap);
  return <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>
    {Array.from({ length: count + 1 }, (_, i) => { const pos = i * gap; return <g key={i}><line x1={pos} y1={0} x2={pos} y2={SIZE} stroke={colours[0]} strokeWidth={w} opacity={0.1} /><line x1={0} y1={pos} x2={SIZE} y2={pos} stroke={colours[0]} strokeWidth={w} opacity={0.1} />{i % 3 === 0 && <rect x={pos - 1.5} y={pos - 1.5} width={3} height={3} fill={colours[0]} opacity={0.15} />}</g>; })}
  </svg>;
}

function ArcWave({ density, colours, bg }: { density: number; colours: string[]; bg: string }) {
  const count = Math.floor(4 + density * 0.12);
  const spacing = SIZE / (count + 1);
  return <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>
    {Array.from({ length: count }, (_, i) => { const r = (i + 1) * spacing; return <g key={i}><path d={`M 0 ${SIZE} A ${r} ${r} 0 0 1 ${r} ${SIZE - r}`} fill="none" stroke={colours[i % colours.length]} strokeWidth={1.5} opacity={0.15} /><path d={`M ${SIZE} 0 A ${r} ${r} 0 0 1 ${SIZE - r} ${r}`} fill="none" stroke={colours[i % colours.length]} strokeWidth={1.5} opacity={0.12} /></g>; })}
  </svg>;
}

function DotGrid({ density, colours, bg, opacity }: { density: number; colours: string[]; bg: string; opacity: number }) {
  const dotSize = 1.5 + (density / 100) * 4;
  const spacing = 48 - density * 0.4;
  const cols = Math.floor(SIZE / spacing);
  return <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>
    {Array.from({ length: cols * cols }, (_, i) => { const x = (i % cols) * spacing + spacing / 2; const y = Math.floor(i / cols) * spacing + spacing / 2; return <circle key={i} cx={x} cy={y} r={dotSize} fill={colours[0]} opacity={opacity / 100} />; })}
  </svg>;
}

function ConcentricSquircles({ density, colours, bg }: { density: number; colours: string[]; bg: string }) {
  const count = Math.floor(3 + density * 0.12);
  const gap = (SIZE * 0.4) / count;
  return <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>
    {Array.from({ length: count }, (_, i) => { const s = SIZE * 0.1 + i * gap; const off = (SIZE - s * 2) / 2; const r = s * 0.25; return <rect key={i} x={off} y={off} width={s * 2} height={s * 2} rx={r} fill="none" stroke={colours[i % colours.length]} strokeWidth={1.5} opacity={0.12 - i * 0.005} />; })}
  </svg>;
}

function LineField({ density, colours, bg, opacity }: { density: number; colours: string[]; bg: string; opacity: number }) {
  const spacing = 24 - density * 0.2;
  const count = Math.floor(SIZE * 2 / spacing);
  return <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>
    {Array.from({ length: count }, (_, i) => { const offset = i * spacing - SIZE; return <line key={i} x1={offset} y1={0} x2={offset + SIZE} y2={SIZE} stroke={colours[0]} strokeWidth={1} opacity={opacity / 100} />; })}
  </svg>;
}

function NoiseTexture({ density, colours, bg, seed }: { density: number; colours: string[]; bg: string; seed: number }) {
  const rand = seededRandom(seed);
  const count = Math.floor(200 + density * 10);
  return <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>
    {Array.from({ length: count }, (_, i) => <circle key={i} cx={rand() * SIZE} cy={rand() * SIZE} r={0.3 + rand() * 1.5} fill={colours[0]} opacity={0.03 + rand() * 0.1} />)}
  </svg>;
}

const PATTERN_OPTIONS: { id: PatternType; label: string; desc: string }[] = [
  { id: 'scatter', label: 'Scatter Field', desc: 'Circles at varying scales and positions' },
  { id: 'grid_mesh', label: 'Grid Mesh', desc: 'Repeating cross/plus pattern' },
  { id: 'arc_wave', label: 'Arc Wave', desc: 'Nested quarter-arcs' },
  { id: 'dot_grid', label: 'Dot Grid', desc: 'Uniform dot grid — engineering paper feel' },
  { id: 'concentric', label: 'Concentric Squircles', desc: 'Nested rounded squares from brandmark geometry' },
  { id: 'line_field', label: 'Line Field', desc: 'Diagonal parallel lines — technical hatching' },
  { id: 'noise', label: 'Noise Texture', desc: 'Organic grain/stipple for print overlay' },
];

const COLOUR_OPTIONS: { id: ColourMode; label: string }[] = [
  { id: 'mono_charcoal', label: 'Charcoal on Ivory' },
  { id: 'mono_ivory', label: 'Ivory on Charcoal' },
  { id: 'cinnamon', label: 'Cinnamon (Space)' },
  { id: 'twilight', label: 'Twilight (People)' },
  { id: 'hunter', label: 'Hunter (Tech)' },
  { id: 'tricolour', label: 'Tricolour (all three)' },
  { id: 'custom', label: 'Custom' },
];

export default function PatternsPage() {
  const { showToast } = useToast();
  const [tab, setTab] = useState<TextureTab>('patterns');
  const [patternType, setPatternType] = useState<PatternType>('scatter');
  const [density, setDensity] = useState(35);
  const [opacity, setOpacity] = useState(50);
  const [colourMode, setColourMode] = useState<ColourMode>('mono_charcoal');
  const [customColour, setCustomColour] = useState<string>(BRAND.cinnamon);
  const [bgChoice, setBgChoice] = useState<'ivory' | 'charcoal' | 'white'>('ivory');
  const [seed, setSeed] = useState(42);
  const [showTile, setShowTile] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const bgColour = bgChoice === 'ivory' ? BRAND.ivory : bgChoice === 'charcoal' ? BRAND.charcoal : '#FFFFFF';
  const colours = useMemo(() => getColours(colourMode, customColour), [colourMode, customColour]);

  const handleCopy = useCallback(async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard');
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }, [showToast]);

  const handleDownloadSVG = () => {
    const el = svgRef.current?.querySelector('svg');
    if (!el) return;
    const data = new XMLSerializer().serializeToString(el);
    const blob = new Blob([data], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `innova-${patternType}.svg`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySVG = () => {
    const el = svgRef.current?.querySelector('svg');
    if (!el) return;
    handleCopy('svg', new XMLSerializer().serializeToString(el));
  };

  const renderPattern = (s: number = SIZE) => {
    const props = { density, colours, bg: bgColour, opacity, seed };
    switch (patternType) {
      case 'scatter': return <ScatterField {...props} />;
      case 'grid_mesh': return <GridMesh {...props} />;
      case 'arc_wave': return <ArcWave {...props} />;
      case 'dot_grid': return <DotGrid {...props} />;
      case 'concentric': return <ConcentricSquircles {...props} />;
      case 'line_field': return <LineField {...props} />;
      case 'noise': return <NoiseTexture {...props} />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-8 pt-6 pb-4 border-b border-ink-700">
        <ModuleHeader system="Patterns & Textures" subtitle="Supergraphic patterns from brandmark geometry + Ink Register textures" />
      </div>

      <div className="px-8 pt-4">
        <div className="flex gap-1 bg-ink-900 border border-ink-700 rounded-lg p-1 w-fit">
          <button onClick={() => setTab('patterns')} className={`px-4 py-2 rounded-md text-[12px] transition cursor-pointer ${tab === 'patterns' ? 'bg-ink-800 text-ink-50 font-medium' : 'text-ink-400 hover:text-ink-200'}`}>Supergraphic Patterns</button>
          <button onClick={() => setTab('textures')} className={`px-4 py-2 rounded-md text-[12px] transition cursor-pointer ${tab === 'textures' ? 'bg-ink-800 text-ink-50 font-medium' : 'text-ink-400 hover:text-ink-200'}`}>Illustration Textures</button>
        </div>
      </div>

      {tab === 'patterns' ? (
        <div className="flex h-[calc(100vh-160px)]">
          <div className="w-80 flex-shrink-0 border-r border-ink-700 overflow-y-auto p-5 space-y-5">
            <div className="space-y-1.5">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Pattern Type</p>
              {PATTERN_OPTIONS.map((p) => (
                <button key={p.id} onClick={() => setPatternType(p.id)} className={`w-full text-left p-2 rounded-lg border transition cursor-pointer ${patternType === p.id ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'}`}>
                  <p className="text-[11px] font-medium">{p.label}</p>
                  <p className="text-[9px] text-ink-500 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between"><p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Density</p><span className="font-mono text-[10px] text-ink-400">{density}%</span></div>
              <input type="range" min={10} max={65} value={density} onChange={(e) => setDensity(Number(e.target.value))} className="w-full accent-cinnamon h-1.5" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between"><p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Opacity</p><span className="font-mono text-[10px] text-ink-400">{opacity}%</span></div>
              <input type="range" min={5} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-cinnamon h-1.5" />
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Colour</p>
              {COLOUR_OPTIONS.map((c) => (
                <button key={c.id} onClick={() => setColourMode(c.id)} className={`w-full text-left px-3 py-1.5 rounded-lg border transition cursor-pointer text-[11px] ${colourMode === c.id ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{c.label}</button>
              ))}
              {colourMode === 'custom' && <input type="color" value={customColour} onChange={(e) => setCustomColour(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />}
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Background</p>
              <div className="flex gap-1.5">
                {(['ivory', 'charcoal', 'white'] as const).map((b) => (
                  <button key={b} onClick={() => setBgChoice(b)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer capitalize ${bgChoice === b ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>
                    <span className="w-2.5 h-2.5 rounded border border-ink-600" style={{ backgroundColor: b === 'ivory' ? BRAND.ivory : b === 'charcoal' ? BRAND.charcoal : '#FFF' }} />
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Live Preview</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setSeed(Date.now())}><Shuffle size={14} /> Randomise</Button>
                <Button variant="ghost" size="sm" onClick={() => setShowTile(!showTile)}>{showTile ? 'Single' : '2×2 Tile'}</Button>
              </div>
            </div>

            <div ref={svgRef} className="max-w-xl mx-auto">
              {showTile ? (
                <div className="grid grid-cols-2 gap-0 border border-ink-700 rounded-lg overflow-hidden">
                  {[0, 1, 2, 3].map((i) => <div key={i}>{renderPattern()}</div>)}
                </div>
              ) : renderPattern()}
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button size="sm" onClick={handleDownloadSVG}><Download size={14} /> SVG</Button>
              <Button variant="secondary" size="sm" onClick={handleCopySVG}>
                {copied === 'svg' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'svg' ? 'Copied!' : 'Copy SVG'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 max-w-3xl mx-auto space-y-6">
          {[
            { name: 'Parallel Line Hatching', rule: 'For mid-tones on specific elements. Suggests volume. Used on clothing or shadowed surfaces.',
              svg: <svg viewBox="0 0 80 80" className="w-20 h-20 rounded border border-ink-700" style={{ background: 'white' }}>{Array.from({ length: 20 }, (_, i) => <line key={i} x1={i * 5} y1={0} x2={i * 5 + 40} y2={80} stroke="currentColor" strokeWidth="0.8" opacity="0.4" />)}</svg> },
            { name: 'Halftone Dot Pattern', rule: 'Editorial print reference. Adds visual weight. Used very rarely — one element per illustration maximum.',
              svg: <svg viewBox="0 0 80 80" className="w-20 h-20 rounded border border-ink-700" style={{ background: 'white' }}>{Array.from({ length: 64 }, (_, i) => { const x = (i % 8) * 10 + 5; const y = Math.floor(i / 8) * 10 + 5; const r = 0.5 + (1 - y / 80) * 3; return <circle key={i} cx={x} cy={y} r={r} fill="currentColor" opacity="0.5" />; })}</svg> },
            { name: 'Pencil/Charcoal Grain', rule: 'Suggests the physical drawing tool. Appears naturally in brush pen strokes.',
              svg: <svg viewBox="0 0 80 80" className="w-20 h-20 rounded border border-ink-700" style={{ background: 'white' }}>{Array.from({ length: 200 }, (_, i) => { const r = seededRandom(i + 100); return <circle key={i} cx={r() * 80} cy={r() * 80} r={0.3 + r() * 1.2} fill="currentColor" opacity={0.05 + r() * 0.15} />; })}</svg> },
          ].map((t) => (
            <div key={t.name} className="bg-ink-900 border border-ink-700 rounded-lg p-5 flex gap-5">
              {t.svg}
              <div>
                <h3 className="font-display text-base font-semibold text-ink-100">{t.name}</h3>
                <p className="text-[12px] text-ink-400 mt-1">{t.rule}</p>
              </div>
            </div>
          ))}
          <div className="bg-ink-900 border border-ink-700 rounded-lg p-5">
            <h3 className="font-display text-base font-semibold text-ink-100 mb-3">Texture Rules</h3>
            <ul className="space-y-1.5 text-[12px] text-ink-400">
              <li>Texture <strong className="text-ink-200">NEVER</strong> on backgrounds</li>
              <li>Texture <strong className="text-ink-200">NEVER</strong> on floors or walls</li>
              <li>Texture <strong className="text-ink-200">ONLY</strong> on figures or objects</li>
              <li>Maximum <strong className="text-ink-200">2 textured areas</strong> per illustration</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
