'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useToast } from '@/components/shared/Toast';
import { BRAND } from '@/lib/constants/brand';

type PatternType = 'scatter' | 'grid_mesh' | 'arc_wave';
type ColourMode = 'mono_light' | 'mono_dark' | 'single' | 'all_three' | 'custom';
type PatternScale = 'small' | 'medium' | 'large';
type PatternBg = 'ivory' | 'charcoal' | 'white';
type TextureTab = 'patterns' | 'textures';

const SIZE = 400;

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

function getColours(mode: ColourMode, customColour: string): string[] {
  switch (mode) {
    case 'mono_light': return [BRAND.charcoal];
    case 'mono_dark': return [BRAND.ivory];
    case 'single': return [BRAND.cinnamon];
    case 'all_three': return [BRAND.cinnamon, BRAND.twilight, BRAND.hunter];
    case 'custom': return [customColour];
  }
}

function ScatterField({ density, colours, bg }: { density: number; colours: string[]; bg: string }) {
  const rand = seededRandom(42);
  const count = Math.floor(30 + density * 0.7);
  const circles = Array.from({ length: count }, () => {
    const r = 3 + rand() * 18;
    return { cx: rand() * SIZE, cy: rand() * SIZE, r, fill: colours[Math.floor(rand() * colours.length)], opacity: 0.08 + rand() * 0.15 };
  });
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>
      {circles.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} opacity={c.opacity} />)}
    </svg>
  );
}

function GridMesh({ density, colours, bg }: { density: number; colours: string[]; bg: string }) {
  const gap = Math.max(12, 50 - density * 0.4);
  const w = 2 + density * 0.02;
  const count = Math.floor(SIZE / gap);
  const colour = colours[0];
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>
      {Array.from({ length: count + 1 }, (_, i) => {
        const pos = i * gap;
        return (
          <g key={i}>
            <line x1={pos} y1={0} x2={pos} y2={SIZE} stroke={colour} strokeWidth={w} opacity={0.12} />
            <line x1={0} y1={pos} x2={SIZE} y2={pos} stroke={colour} strokeWidth={w} opacity={0.12} />
            {i % 3 === 0 && <rect x={pos - 1.5} y={pos - 1.5} width={3} height={3} fill={colour} opacity={0.2} />}
          </g>
        );
      })}
    </svg>
  );
}

function ArcWave({ density, colours, bg }: { density: number; colours: string[]; bg: string }) {
  const arcCount = Math.floor(8 + density * 0.12);
  const spacing = SIZE / (arcCount + 1);
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full rounded-lg" style={{ background: bg }}>
      {Array.from({ length: arcCount }, (_, i) => {
        const r = (i + 1) * spacing;
        const colour = colours[i % colours.length];
        return (
          <g key={i}>
            <path d={`M 0 ${SIZE} A ${r} ${r} 0 0 1 ${r} ${SIZE - r}`} fill="none" stroke={colour} strokeWidth={1.5} opacity={0.15} />
            <path d={`M ${SIZE} 0 A ${r} ${r} 0 0 1 ${SIZE - r} ${r}`} fill="none" stroke={colour} strokeWidth={1.5} opacity={0.12} />
          </g>
        );
      })}
    </svg>
  );
}

export default function PatternsPage() {
  const { showToast } = useToast();
  const [tab, setTab] = useState<TextureTab>('patterns');
  const [patternType, setPatternType] = useState<PatternType>('scatter');
  const [density, setDensity] = useState(35);
  const [colourMode, setColourMode] = useState<ColourMode>('mono_light');
  const [customColour, setCustomColour] = useState<string>(BRAND.cinnamon);
  const [scale, setScale] = useState<PatternScale>('medium');
  const [bg, setBg] = useState<PatternBg>('ivory');
  const [copied, setCopied] = useState<string | null>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const bgColour = bg === 'ivory' ? BRAND.ivory : bg === 'charcoal' ? BRAND.charcoal : BRAND.white;
  const colours = useMemo(() => getColours(colourMode, customColour), [colourMode, customColour]);

  const handleCopy = useCallback(async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard');
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }, [showToast]);

  const handleDownloadSVG = () => {
    const svgEl = svgRef.current?.querySelector('svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `innova-${patternType}-pattern.svg`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySVG = () => {
    const svgEl = svgRef.current?.querySelector('svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    handleCopy('svg', svgData);
  };

  return (
    <div className="min-h-screen">
      <div className="px-8 pt-6 pb-4 border-b border-ink-700">
        <ModuleHeader system="Patterns & Textures" subtitle="Supergraphic patterns from brandmark geometry + Ink Register textures" />
      </div>

      {/* Tabs */}
      <div className="px-8 pt-4">
        <div className="flex gap-1 bg-ink-900 border border-ink-700 rounded-lg p-1 w-fit">
          <button onClick={() => setTab('patterns')} className={`px-4 py-2 rounded-md text-[12px] transition cursor-pointer ${tab === 'patterns' ? 'bg-ink-800 text-ink-50 font-medium' : 'text-ink-400 hover:text-ink-200'}`}>Supergraphic Patterns</button>
          <button onClick={() => setTab('textures')} className={`px-4 py-2 rounded-md text-[12px] transition cursor-pointer ${tab === 'textures' ? 'bg-ink-800 text-ink-50 font-medium' : 'text-ink-400 hover:text-ink-200'}`}>Illustration Textures</button>
        </div>
      </div>

      {tab === 'patterns' ? (
        <div className="flex h-[calc(100vh-160px)]">
          {/* LEFT */}
          <div className="w-80 flex-shrink-0 border-r border-ink-700 overflow-y-auto p-5 space-y-5">
            <div className="space-y-2">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Pattern Type</p>
              {[
                { id: 'scatter' as const, label: 'Scatter Field', desc: 'Brandmark circles dispersed at varying scales' },
                { id: 'grid_mesh' as const, label: 'Grid Mesh', desc: 'Channel cross pattern tiled into repeating grid' },
                { id: 'arc_wave' as const, label: 'Arc Wave', desc: 'Nested quarter-arcs creating flowing undulation' },
              ].map((p) => (
                <button key={p.id} onClick={() => setPatternType(p.id)} className={`w-full text-left p-2.5 rounded-lg border transition cursor-pointer ${patternType === p.id ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'}`}>
                  <p className="text-[11px] font-medium">{p.label}</p>
                  <p className="text-[9px] text-ink-500 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between"><p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Density</p><span className="text-[10px] text-ink-400">{density}%</span></div>
              <input type="range" min={10} max={65} value={density} onChange={(e) => setDensity(Number(e.target.value))} className="w-full accent-cinnamon h-1.5" />
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Colour Mode</p>
              {[
                { id: 'mono_light' as const, label: 'Charcoal on Ivory' },
                { id: 'mono_dark' as const, label: 'Ivory on Charcoal' },
                { id: 'single' as const, label: 'Single Vertical (Cinnamon)' },
                { id: 'all_three' as const, label: 'All Three Verticals' },
                { id: 'custom' as const, label: 'Custom' },
              ].map((c) => (
                <button key={c.id} onClick={() => setColourMode(c.id)} className={`w-full text-left px-3 py-2 rounded-lg border transition cursor-pointer text-[11px] ${colourMode === c.id ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{c.label}</button>
              ))}
              {colourMode === 'custom' && (
                <input type="color" value={customColour} onChange={(e) => setCustomColour(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
              )}
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Scale</p>
              <div className="flex gap-1.5">
                {(['small', 'medium', 'large'] as PatternScale[]).map((s) => (
                  <button key={s} onClick={() => setScale(s)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer capitalize ${scale === s ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{s}</button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Background</p>
              <div className="flex gap-1.5">
                {(['ivory', 'charcoal', 'white'] as PatternBg[]).map((b) => (
                  <button key={b} onClick={() => setBg(b)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer capitalize ${bg === b ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>
                    <span className="w-2.5 h-2.5 rounded border border-ink-600" style={{ backgroundColor: b === 'ivory' ? BRAND.ivory : b === 'charcoal' ? BRAND.charcoal : BRAND.white }} />
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Live Preview</p>
            <div ref={svgRef} className="max-w-lg">
              {patternType === 'scatter' && <ScatterField density={density} colours={colours} bg={bgColour} />}
              {patternType === 'grid_mesh' && <GridMesh density={density} colours={colours} bg={bgColour} />}
              {patternType === 'arc_wave' && <ArcWave density={density} colours={colours} bg={bgColour} />}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" onClick={handleDownloadSVG}><Download size={14} /> Download SVG</Button>
              <Button variant="secondary" size="sm" onClick={handleCopySVG}>
                {copied === 'svg' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'svg' ? 'Copied!' : 'Copy SVG Code'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Textures tab */
        <div className="p-8 max-w-3xl mx-auto space-y-6">
          {[
            { name: 'Parallel Line Hatching', rule: 'For mid-tones on specific elements. Suggests volume. Used on clothing or shadowed surfaces.',
              svg: <svg viewBox="0 0 80 80" className="w-20 h-20 rounded border border-ink-700" style={{ background: 'white' }}>{Array.from({ length: 20 }, (_, i) => <line key={i} x1={i * 5} y1={0} x2={i * 5 + 40} y2={80} stroke="#191919" strokeWidth="0.8" opacity="0.4" />)}</svg> },
            { name: 'Halftone Dot Pattern', rule: 'Editorial print reference. Adds visual weight. Used very rarely — one element per illustration maximum.',
              svg: <svg viewBox="0 0 80 80" className="w-20 h-20 rounded border border-ink-700" style={{ background: 'white' }}>{Array.from({ length: 64 }, (_, i) => { const x = (i % 8) * 10 + 5; const y = Math.floor(i / 8) * 10 + 5; const r = 0.5 + (1 - y / 80) * 3; return <circle key={i} cx={x} cy={y} r={r} fill="#191919" opacity="0.5" />; })}</svg> },
            { name: 'Pencil/Charcoal Grain', rule: 'Suggests the physical drawing tool. Appears naturally in brush pen strokes.',
              svg: <svg viewBox="0 0 80 80" className="w-20 h-20 rounded border border-ink-700" style={{ background: 'white' }}>{Array.from({ length: 200 }, (_, i) => { const r = seededRandom(i + 100); return <circle key={i} cx={r() * 80} cy={r() * 80} r={0.3 + r() * 1.2} fill="#191919" opacity={0.05 + r() * 0.15} />; })}</svg> },
          ].map((t) => (
            <div key={t.name} className="bg-ink-900 border border-ink-700 rounded-xl p-5 flex gap-5">
              {t.svg}
              <div>
                <h3 className="font-display text-base font-semibold text-ink-100">{t.name}</h3>
                <p className="text-[12px] text-ink-400 mt-1">{t.rule}</p>
              </div>
            </div>
          ))}

          <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
            <h3 className="font-display text-base font-semibold text-ink-100 mb-3">Texture Rules</h3>
            <ul className="space-y-1.5 text-[12px] text-ink-400">
              <li>Texture <strong className="text-ink-200">NEVER</strong> on backgrounds (always clean white)</li>
              <li>Texture <strong className="text-ink-200">NEVER</strong> on floors or walls</li>
              <li>Texture <strong className="text-ink-200">ONLY</strong> on figures or objects</li>
              <li>Maximum <strong className="text-ink-200">2 textured areas</strong> per illustration</li>
            </ul>
          </div>

          <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 mb-2">Prompt Modifier</p>
            <p className="text-[12px] text-ink-300 font-mono">
              Add to any Ink Register prompt: <span className="text-cinnamon">{'"Apply [parallel line hatching / halftone dots / pencil grain] texture to [element] only. All other areas remain clean and untextured."'}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
