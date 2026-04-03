'use client';

import { useState, useMemo, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useToast } from '@/components/shared/Toast';
import { PLATFORM_LABELS, PLATFORM_CHAR_LIMITS } from '@/lib/prompt-engine';
import type { PlatformVariant } from '@/lib/prompt-engine';

type IconTier = 'tier1' | 'tier2' | 'tier3' | 'tier4';
type IconVertical = 'space' | 'people' | 'tech' | 'neutral';
type RenderMode = 'filled' | 'outline' | 'dot_array' | 'halftone' | 'scattered';
type IconSize = '32' | '48' | '64' | '128';

const TIER_LABELS: Record<IconTier, { label: string; desc: string }> = {
  tier1: { label: 'Tier 1 — Mark Variants', desc: 'The brandmark itself in different renders' },
  tier2: { label: 'Tier 2 — Category Icons', desc: '3-4 per vertical, capability representation' },
  tier3: { label: 'Tier 3 — Wayfinding', desc: 'Environmental signage icons' },
  tier4: { label: 'Tier 4 — UI Icons', desc: 'Digital interface icons' },
};

const TIER_SUGGESTIONS: Record<IconTier, string[]> = {
  tier1: ['Standard mark', 'Filled mark', 'Outline mark', 'Dot array mark'],
  tier2: ['Managed Office', 'Coworking', 'Meeting Room', 'Talent Search', 'Team Building', 'AV Integration', 'Video Conferencing', 'Smart Room', 'Digital Signage'],
  tier3: ['Reception', 'Meeting Room', 'Phone Booth', 'Washroom', 'Pantry/Café', 'Helpdesk', 'Fire Exit', 'Elevator', 'Stairs', 'Parking', 'Printer', 'Server Room', 'Locker', 'Smoking Area'],
  tier4: ['Search', 'Menu', 'Close', 'Settings', 'Notification', 'User', 'Calendar', 'Download', 'Share', 'Filter', 'Edit', 'Delete', 'Plus', 'Arrow'],
};

const RENDER_LABELS: Record<RenderMode, string> = {
  filled: 'Filled (solid forms)', outline: 'Outline (2px stroke)', dot_array: 'Dot Array', halftone: 'Halftone', scattered: 'Scattered (60% density)',
};

const PRIMITIVES = [
  { id: 'P1', name: 'The Node', source: 'Core circle', desc: 'Perfect circle, base unit' },
  { id: 'P2', name: 'The Cardinal', source: 'N/E/S/W capsule', desc: 'Stadium/capsule shape' },
  { id: 'P3', name: 'The Bridge', source: 'Corner quarter-circle', desc: '90° arc segment' },
  { id: 'P4', name: 'The Channel', source: 'Cross negative space', desc: 'Narrow rectangular gap' },
  { id: 'P5', name: 'The Arc', source: 'Quarter-circle curve', desc: 'Single curved stroke' },
  { id: 'P6', name: 'The Cluster', source: 'Multiple P1 nodes', desc: 'Circles at varying scales' },
  { id: 'P7', name: 'The Ring', source: 'P1 as outline', desc: 'Circle stroke, no fill' },
];

function getPrimitivesUsed(tier: IconTier, vertical: IconVertical): string[] {
  const base = ['P1'];
  if (tier === 'tier1') return ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'];
  if (vertical === 'space') return [...base, 'P3', 'P4'];
  if (vertical === 'people') return [...base, 'P6', 'P7'];
  if (vertical === 'tech') return [...base, 'P4', 'P5', 'P7'];
  return [...base, 'P2', 'P5'];
}

function buildSpec(tier: IconTier, vertical: IconVertical, render: RenderMode, size: string, icon: string): string {
  const s = parseInt(size);
  const prims = getPrimitivesUsed(tier, vertical);
  return `GRID\nArtboard: ${s}px × ${s}px\nMini unit: 2px\nSafe zone: 2px all sides\nLive area: ${s - 4}px × ${s - 4}px\n\nSTROKE\nWeight: 2px (at 32px base, scales proportionally)\nAlignment: Centred\nCaps: Round\nJoins: Round\nNO variable weight (reserved for Ink Register)\n\nCURVES\nAll curves: circular arc segments ONLY\nRadius R1: 9.5px (at 32px scale)\nRadius R2: 7.1px (at 32px scale)\nNO freehand Bézier curves\n\nANGLES\nStraight lines: 0°, 45°, or 90° ONLY\n\nPRIMITIVES USED\n${prims.join(', ')}\n\nRENDER\nMode: ${RENDER_LABELS[render]}\n${render === 'outline' ? 'Stroke 2px, no fill, channel gaps maintained' : render === 'filled' ? 'Solid forms, no stroke' : ''}\nMinimum size for outline: 48px\nBelow 48px: always use filled\n\nICON: ${icon || TIER_LABELS[tier].label}\n\nEXPORT\nSVG: paths expanded, no live text\nPNG: @1x, @2x, @4x\nPDF: for print production`;
}

function buildExplorationPrompt(tier: IconTier, vertical: IconVertical, render: RenderMode, size: string, icon: string): string {
  const renderDesc = render === 'filled' ? 'solid black filled forms' : render === 'outline' ? '2px outline strokes with no fill' : render === 'dot_array' ? 'silhouette filled with varying-size dots' : render === 'halftone' ? 'dense dot matrix halftone' : 'forms dissolved into floating circles at 60% density';
  const vertDesc = vertical === 'space' ? 'architectural floor-plan feel (bridges + channels)' : vertical === 'people' ? 'community/cluster feel (grouped circles)' : vertical === 'tech' ? 'circuit board precision (channels + arcs + rings)' : 'balanced use of all primitives';
  return `A grid of 9 minimal ${renderDesc} icons on a white background. Each icon is drawn in a single-weight stroke (2px), with rounded caps and joins. The icons should feel like they belong to the same family: derived from a circle as the base unit. Include: ${icon || TIER_LABELS[tier].desc}. Style: editorial, not corporate. Rounded terminals. Consistent optical weight. ${size}px grid. ${vertDesc}. The construction geometry uses only circular arcs at two specific radii — no freehand curves, no sharp corners on organic forms.`;
}

export default function IconsPage() {
  const { showToast } = useToast();
  const [tier, setTier] = useState<IconTier>('tier3');
  const [vertical, setVertical] = useState<IconVertical>('neutral');
  const [render, setRender] = useState<RenderMode>('outline');
  const [size, setSize] = useState<IconSize>('48');
  const [icon, setIcon] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [showPrimitives, setShowPrimitives] = useState(true);
  const [activePlatform, setActivePlatform] = useState<PlatformVariant>('universal');

  const spec = useMemo(() => buildSpec(tier, vertical, render, size, icon), [tier, vertical, render, size, icon]);
  const prompt = useMemo(() => buildExplorationPrompt(tier, vertical, render, size, icon), [tier, vertical, render, size, icon]);

  const handleCopy = useCallback(async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard');
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }, [showToast]);

  const suggestions = TIER_SUGGESTIONS[tier];

  return (
    <div className="min-h-screen">
      <div className="px-8 pt-6 pb-4 border-b border-ink-700">
        <ModuleHeader system="The Convergence Vocabulary" subtitle="Icon System · Derived from brandmark geometry" />
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* LEFT */}
        <div className="w-80 flex-shrink-0 border-r border-ink-700 overflow-y-auto p-5 space-y-5">
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Icon Tier</p>
            {(Object.keys(TIER_LABELS) as IconTier[]).map((t) => (
              <button key={t} onClick={() => { setTier(t); setIcon(''); }} className={`w-full text-left p-2.5 rounded-lg border transition cursor-pointer ${tier === t ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'}`}>
                <p className="text-[11px] font-medium">{TIER_LABELS[t].label}</p>
                <p className="text-[9px] text-ink-500 mt-0.5">{TIER_LABELS[t].desc}</p>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Vertical Expression</p>
            <div className="flex flex-wrap gap-1.5">
              {(['space', 'people', 'tech', 'neutral'] as IconVertical[]).map((v) => (
                <button key={v} onClick={() => setVertical(v)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer capitalize ${vertical === v ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{v}</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Render Mode</p>
            {(Object.keys(RENDER_LABELS) as RenderMode[]).map((r) => (
              <button key={r} onClick={() => setRender(r)} className={`w-full text-left px-3 py-2 rounded-lg border transition cursor-pointer text-[11px] ${render === r ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{RENDER_LABELS[r]}</button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Target Size</p>
            <div className="flex gap-1.5">
              {(['32', '48', '64', '128'] as IconSize[]).map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer font-mono ${size === s ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{s}px</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Specific Icon</p>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Type or select..." className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[12px] text-ink-100 placeholder:text-ink-500" />
            <div className="flex flex-wrap gap-1">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setIcon(s)} className="px-2 py-1 rounded text-[9px] bg-ink-800 text-ink-400 hover:text-ink-200 hover:bg-ink-700 border border-ink-700 transition cursor-pointer">{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Construction Spec */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Illustrator Build Spec</p>
              <Button variant="secondary" size="sm" onClick={() => handleCopy('spec', spec)}>
                {copied === 'spec' ? <Check size={12} /> : <Copy size={12} />}
                {copied === 'spec' ? 'Copied!' : 'Copy Spec'}
              </Button>
            </div>
            <pre className="text-[11px] text-ink-300 font-mono whitespace-pre-wrap leading-relaxed">{spec}</pre>
          </div>

          {/* AI Exploration Prompt */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Concept Exploration Prompt</p>
              <Button size="sm" onClick={() => handleCopy('prompt', prompt)}>
                {copied === 'prompt' ? <Check size={12} /> : <Copy size={12} />}
                {copied === 'prompt' ? 'Copied!' : 'Copy Prompt'}
              </Button>
            </div>
            <pre className="text-[11px] text-ink-200 font-mono whitespace-pre-wrap leading-relaxed">{prompt}</pre>
            <p className="text-[10px] text-ink-500 mt-2">{prompt.length} chars</p>
          </div>

          {/* Primitives Reference */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl overflow-hidden">
            <button onClick={() => setShowPrimitives(!showPrimitives)} className="w-full flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-ink-800/50 transition">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">The Seven Primitives</span>
              <span className="text-ink-500 text-[11px]">{showPrimitives ? '−' : '+'}</span>
            </button>
            {showPrimitives && (
              <div className="px-5 pb-4 space-y-3">
                {PRIMITIVES.map((p) => (
                  <div key={p.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-ink-800 border border-ink-700 flex items-center justify-center flex-shrink-0">
                      {p.id === 'P1' && <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="10" cy="10" r="6" fill="#191919" /></svg>}
                      {p.id === 'P2' && <svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="4" y="6" width="12" height="8" rx="4" fill="#191919" /></svg>}
                      {p.id === 'P3' && <svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M 4 16 A 12 12 0 0 1 16 4" fill="none" stroke="#191919" strokeWidth="2" /></svg>}
                      {p.id === 'P4' && <svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="9" y="2" width="2" height="16" fill="#191919" /><rect x="2" y="9" width="16" height="2" fill="#191919" /></svg>}
                      {p.id === 'P5' && <svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M 4 16 Q 4 4 16 4" fill="none" stroke="#191919" strokeWidth="2" /></svg>}
                      {p.id === 'P6' && <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="7" cy="10" r="3" fill="#191919" /><circle cx="14" cy="7" r="2.5" fill="#191919" /><circle cx="13" cy="14" r="2" fill="#191919" /></svg>}
                      {p.id === 'P7' && <svg viewBox="0 0 20 20" className="w-5 h-5"><circle cx="10" cy="10" r="6" fill="none" stroke="#191919" strokeWidth="2" /></svg>}
                    </div>
                    <div>
                      <p className="text-[11px] text-ink-200 font-medium">{p.id} — {p.name}</p>
                      <p className="text-[10px] text-ink-500">{p.source} · {p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
