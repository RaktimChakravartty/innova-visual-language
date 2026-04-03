'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useToast } from '@/components/shared/Toast';

const TIMING_TABLE = [
  { element: 'Logo reveal (full)', duration: '800ms', easing: 'ease-out', delay: '0ms' },
  { element: 'Page transition', duration: '300ms', easing: 'ease-out', delay: '0ms' },
  { element: 'Element entrance', duration: '300ms', easing: 'ease-out', delay: 'stagger 50ms' },
  { element: 'Hover state', duration: '200ms', easing: 'ease-out', delay: '0ms' },
  { element: 'Tooltip appear', duration: '150ms', easing: 'ease-out', delay: '200ms wait' },
  { element: 'Modal open', duration: '250ms', easing: 'ease-out', delay: '0ms' },
  { element: 'Modal close', duration: '200ms', easing: 'ease-in', delay: '0ms' },
  { element: 'Loading pulse', duration: '1500ms', easing: 'ease-in-out', delay: 'loop' },
  { element: 'Slide transition', duration: '400ms', easing: 'ease-out', delay: '0ms' },
  { element: 'Accordion expand', duration: '250ms', easing: 'ease-out', delay: '0ms' },
  { element: 'Button press', duration: '100ms', easing: 'ease-out', delay: '0ms' },
  { element: 'Social story entrance', duration: '500ms', easing: 'ease-out', delay: '0ms' },
];

const EASING_CURVES = [
  { name: 'INNOVA Ease Out', value: 'cubic-bezier(0.22, 0.61, 0.36, 1)', use: 'Standard transitions' },
  { name: 'INNOVA Ease In-Out', value: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)', use: 'Connecting lines' },
  { name: 'INNOVA Ease In', value: 'cubic-bezier(0.55, 0.09, 0.68, 0.53)', use: 'Exit/close animations' },
];

const CSS_EXPORT = `:root {
  /* Motion Timing */
  --motion-reveal: 800ms;
  --motion-transition: 300ms;
  --motion-entrance: 300ms;
  --motion-hover: 200ms;
  --motion-stagger: 50ms;
  --motion-modal-open: 250ms;
  --motion-modal-close: 200ms;
  --motion-button: 100ms;

  /* Easing Curves */
  --ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-in-out: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  --ease-in: cubic-bezier(0.55, 0.09, 0.68, 0.53);
}`;

function RevealDemo() {
  const [playing, setPlaying] = useState(false);
  const play = () => { setPlaying(false); requestAnimationFrame(() => setPlaying(true)); };
  return (
    <div className="relative h-32 flex items-center justify-center bg-ink-800 rounded-lg overflow-hidden">
      <div className={`transition-all duration-700 ${playing ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }}>
        <div className="w-6 h-6 rounded-full bg-cinnamon" />
      </div>
      {playing && (
        <>
          <div className="absolute w-20 h-0.5 bg-ink-400 transition-all duration-500 delay-200 origin-left" style={{ transform: playing ? 'scaleX(1)' : 'scaleX(0)', transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }} />
          <div className="absolute w-0.5 h-16 bg-ink-400 transition-all duration-500 delay-300 origin-top" style={{ transform: playing ? 'scaleY(1)' : 'scaleY(0)', transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }} />
        </>
      )}
      <button onClick={play} className="absolute bottom-2 right-2 p-1.5 rounded bg-ink-700 text-ink-300 hover:text-ink-100 cursor-pointer"><Play size={12} /></button>
    </div>
  );
}

function ConnectDemo() {
  const [playing, setPlaying] = useState(false);
  const play = () => { setPlaying(false); requestAnimationFrame(() => setPlaying(true)); };
  return (
    <div className="relative h-32 flex items-center justify-around bg-ink-800 rounded-lg overflow-hidden px-12">
      <div className="w-8 h-8 rounded-full bg-twilight" />
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <line x1="35%" y1="50%" x2="65%" y2="50%" stroke="#9A958F" strokeWidth="2"
          strokeDasharray="100" strokeDashoffset={playing ? '0' : '100'}
          style={{ transition: 'stroke-dashoffset 400ms cubic-bezier(0.45, 0.05, 0.55, 0.95)' }} />
      </svg>
      <div className="w-6 h-6 rounded bg-hunter" />
      <button onClick={play} className="absolute bottom-2 right-2 p-1.5 rounded bg-ink-700 text-ink-300 hover:text-ink-100 cursor-pointer"><Play size={12} /></button>
    </div>
  );
}

function SettleDemo() {
  const [playing, setPlaying] = useState(false);
  const play = () => { setPlaying(false); requestAnimationFrame(() => setPlaying(true)); };
  return (
    <div className="relative h-32 flex items-center justify-center bg-ink-800 rounded-lg overflow-hidden">
      <div className={`w-12 h-12 rounded-lg bg-cinnamon/80 transition-all duration-300 ${playing ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }} />
      <button onClick={play} className="absolute bottom-2 right-2 p-1.5 rounded bg-ink-700 text-ink-300 hover:text-ink-100 cursor-pointer"><Play size={12} /></button>
    </div>
  );
}

function EasingCurve({ curve }: { curve: string }) {
  // Parse cubic-bezier values for SVG visualization
  const match = curve.match(/cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
  if (!match) return null;
  const [, x1, y1, x2, y2] = match.map(Number);
  const s = 100;
  return (
    <svg viewBox={`-5 -5 ${s + 10} ${s + 10}`} className="w-24 h-24">
      <rect x={0} y={0} width={s} height={s} fill="none" stroke="var(--color-ink-700)" strokeWidth="0.5" />
      <path d={`M 0 ${s} C ${x1 * s} ${s - y1 * s} ${x2 * s} ${s - y2 * s} ${s} 0`}
        fill="none" stroke="var(--color-cinnamon)" strokeWidth="2" />
      <circle cx={x1 * s} cy={s - y1 * s} r="3" fill="var(--color-cinnamon)" opacity="0.5" />
      <circle cx={x2 * s} cy={s - y2 * s} r="3" fill="var(--color-cinnamon)" opacity="0.5" />
      <line x1={0} y1={s} x2={x1 * s} y2={s - y1 * s} stroke="var(--color-ink-500)" strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1={s} y1={0} x2={x2 * s} y2={s - y2 * s} stroke="var(--color-ink-500)" strokeWidth="0.5" strokeDasharray="2,2" />
    </svg>
  );
}

export default function MotionPage() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = useCallback(async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard');
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }, [showToast]);

  return (
    <div className="min-h-screen p-8 max-w-[1000px] mx-auto">
      <ModuleHeader system="Motion Principles" subtitle="How the brand moves · The i-dot as animation seed" />

      {/* Philosophy */}
      <div className="mb-10">
        <blockquote className="font-display text-xl text-ink-200 italic leading-relaxed border-l-2 border-cinnamon pl-6">
          Motion is subtle. The brand moves with the confidence of someone who doesn&apos;t need to grab attention. The i-dot — the circle from the brandmark — is the origin point for all motion.
        </blockquote>
      </div>

      {/* Three Behaviours */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-ink-900 border border-ink-700 rounded-xl p-5 space-y-3">
          <h3 className="font-display text-base font-semibold text-ink-100">REVEAL</h3>
          <p className="text-[12px] text-ink-400">Elements emerge from the i-dot outward.</p>
          <RevealDemo />
          <p className="font-mono text-[9px] text-ink-500">scale(0)→scale(1), stagger 50ms, ease-out, 800ms</p>
        </div>
        <div className="bg-ink-900 border border-ink-700 rounded-xl p-5 space-y-3">
          <h3 className="font-display text-base font-semibold text-ink-100">CONNECT</h3>
          <p className="text-[12px] text-ink-400">Lines draw between elements, like annotation marks.</p>
          <ConnectDemo />
          <p className="font-mono text-[9px] text-ink-500">stroke-dashoffset, ease-in-out, 400ms</p>
        </div>
        <div className="bg-ink-900 border border-ink-700 rounded-xl p-5 space-y-3">
          <h3 className="font-display text-base font-semibold text-ink-100">SETTLE</h3>
          <p className="text-[12px] text-ink-400">Elements arrive and rest with a gentle ease-out.</p>
          <SettleDemo />
          <p className="font-mono text-[9px] text-ink-500">translate(0,-20px)→(0,0) + opacity, ease-out, 300ms</p>
        </div>
      </div>

      {/* Timing Table */}
      <div className="bg-ink-900 border border-ink-700 rounded-xl p-5 mb-10">
        <h3 className="font-display text-base font-semibold text-ink-100 mb-4">Timing Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-ink-700">
                <th className="text-left py-2 text-ink-400 font-medium">Element</th>
                <th className="text-left py-2 text-ink-400 font-medium font-mono">Duration</th>
                <th className="text-left py-2 text-ink-400 font-medium font-mono">Easing</th>
                <th className="text-left py-2 text-ink-400 font-medium font-mono">Delay</th>
              </tr>
            </thead>
            <tbody>
              {TIMING_TABLE.map((row) => (
                <tr key={row.element} className="border-b border-ink-800">
                  <td className="py-2 text-ink-200">{row.element}</td>
                  <td className="py-2 text-ink-300 font-mono text-[11px]">{row.duration}</td>
                  <td className="py-2 text-ink-300 font-mono text-[11px]">{row.easing}</td>
                  <td className="py-2 text-ink-300 font-mono text-[11px]">{row.delay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Easing Curves */}
      <div className="bg-ink-900 border border-ink-700 rounded-xl p-5 mb-10">
        <h3 className="font-display text-base font-semibold text-ink-100 mb-4">Easing Curves</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EASING_CURVES.map((c) => (
            <div key={c.name} className="flex flex-col items-center text-center">
              <EasingCurve curve={c.value} />
              <p className="text-[12px] text-ink-200 font-medium mt-2">{c.name}</p>
              <p className="font-mono text-[9px] text-cinnamon mt-0.5">{c.value}</p>
              <p className="text-[10px] text-ink-500 mt-0.5">{c.use}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo Reveal Storyboard */}
      <div className="bg-ink-900 border border-ink-700 rounded-xl p-5 mb-10">
        <h3 className="font-display text-base font-semibold text-ink-100 mb-4">Logo Reveal Storyboard</h3>
        <div className="grid grid-cols-6 gap-2">
          {[
            { label: 'Blank', desc: '0ms', el: <div className="w-full h-full bg-ink-800 rounded" /> },
            { label: 'i-dot', desc: '0ms', el: <div className="w-full h-full bg-ink-800 rounded flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-cinnamon" /></div> },
            { label: 'i-stem', desc: '150ms', el: <div className="w-full h-full bg-ink-800 rounded flex items-center justify-center"><div className="flex flex-col items-center"><div className="w-3 h-3 rounded-full bg-cinnamon" /><div className="w-0.5 h-4 bg-ink-200 mt-0.5" /></div></div> },
            { label: 'Letters', desc: '300ms', el: <div className="w-full h-full bg-ink-800 rounded flex items-center justify-center"><span className="font-display text-[10px] text-ink-200">innova</span></div> },
            { label: 'Descriptor', desc: '800ms', el: <div className="w-full h-full bg-ink-800 rounded flex flex-col items-center justify-center gap-0.5"><span className="font-display text-[10px] text-ink-200">innova</span><span className="font-mono text-[5px] text-ink-500">SPACE · PEOPLE · TECH</span></div> },
            { label: 'Settled', desc: '1200ms', el: <div className="w-full h-full bg-ink-800 rounded flex flex-col items-center justify-center gap-0.5 border border-cinnamon/20"><span className="font-display text-[10px] text-ink-100 font-medium">innova</span><span className="font-mono text-[5px] text-ink-400">SPACE · PEOPLE · TECH</span></div> },
          ].map((frame, i) => (
            <div key={i} className="text-center">
              <div className="aspect-video mb-1">{frame.el}</div>
              <p className="text-[9px] text-ink-300">{frame.label}</p>
              <p className="font-mono text-[8px] text-ink-500">{frame.desc}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-[9px] text-ink-500 mt-3">Total: 1200ms. Dot: 0ms, Stem: 150ms, Letters: 300ms (50ms stagger), Descriptor: 800ms.</p>
      </div>

      {/* Export */}
      <div className="bg-ink-900 border border-ink-700 rounded-xl p-5 mb-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-base font-semibold text-ink-100">CSS Export</h3>
          <Button size="sm" onClick={() => handleCopy('css', CSS_EXPORT)}>
            {copied === 'css' ? <Check size={14} /> : <Copy size={14} />}
            {copied === 'css' ? 'Copied!' : 'Copy CSS'}
          </Button>
        </div>
        <pre className="text-[11px] text-ink-300 font-mono whitespace-pre leading-relaxed">{CSS_EXPORT}</pre>
      </div>

      {/* Rules */}
      <div className="bg-ink-900 border border-cinnamon/20 rounded-xl p-5">
        <h3 className="font-display text-base font-semibold text-ink-100 mb-3">Motion Rules</h3>
        <div className="grid grid-cols-2 gap-4 text-[12px]">
          <div>
            <p className="text-red-400 font-medium mb-1">NEVER</p>
            <ul className="text-ink-400 space-y-0.5">
              <li>Bounce, elastic, or spring animations</li>
              <li>Overshoot on any transition</li>
              <li>Decorative loading animations</li>
            </ul>
          </div>
          <div>
            <p className="text-emerald-400 font-medium mb-1">ALWAYS</p>
            <ul className="text-ink-400 space-y-0.5">
              <li>ease-out for entrances</li>
              <li>ease-in for exits</li>
              <li>The i-dot as conceptual origin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
