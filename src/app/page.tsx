'use client';

import Link from 'next/link';
import {
  PenTool, Aperture, Grid3X3, Layout, PlayCircle, Hexagon,
  ArrowRight,
} from 'lucide-react';
import { MODULES } from '@/lib/constants/brand';

const ICON_MAP: Record<string, React.ElementType> = {
  'pen-tool': PenTool, 'aperture': Aperture, 'grid-3x3': Grid3X3,
  'layout': Layout, 'play-circle': PlayCircle, 'hexagon': Hexagon,
};

const VERTICAL_DOTS = [
  { colour: '#D4772E', label: 'Space' },
  { colour: '#2D4272', label: 'People' },
  { colour: '#3D6B4F', label: 'Tech' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8 max-w-[1200px] mx-auto">
      {/* Hero */}
      <div className="mb-12 pt-4">
        <h1 className="font-display text-4xl font-semibold text-ink-50 tracking-tight leading-tight">
          INNOVA Visual Language
        </h1>
        <p className="text-ink-400 mt-2 text-[15px] max-w-xl">
          Production companion to the brand guidelines. Six visual systems, one locked identity.
        </p>
        <div className="flex items-center gap-3 mt-3">
          <span className="font-mono text-[10px] text-ink-500">v3.0 · Built for INNOVA AM Tech</span>
          <span className="text-ink-600">·</span>
          <div className="flex gap-1.5">
            {VERTICAL_DOTS.map((v) => (
              <span key={v.label} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.colour }} />
                <span className="font-mono text-[9px] text-ink-500">{v.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
        {MODULES.map((mod) => {
          const Icon = ICON_MAP[mod.icon] || PenTool;
          return (
            <Link
              key={mod.id}
              href={mod.route}
              className="group bg-ink-900 border border-ink-700 rounded-xl p-6 hover:border-ink-600 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-ink-800 border border-ink-700 flex items-center justify-center group-hover:border-cinnamon/30 transition-colors">
                  <Icon size={18} className="text-ink-400 group-hover:text-cinnamon transition-colors" />
                </div>
                <ArrowRight size={16} className="text-ink-600 group-hover:text-ink-300 transition-colors mt-1" />
              </div>
              <h2 className="font-display text-lg font-semibold text-ink-100 mb-0.5">{mod.name}</h2>
              <p className="font-mono text-[10px] text-cinnamon mb-2">{mod.system}</p>
              <p className="text-[13px] text-ink-400 leading-relaxed">{mod.description}</p>
              <div className="mt-3 flex items-center gap-1.5">
                <kbd className="font-mono text-[9px] text-ink-500 px-1.5 py-0.5 rounded bg-ink-800 border border-ink-700">{mod.shortcut}</kbd>
                <span className="text-[10px] text-ink-600">to open</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick info */}
      <div className="bg-ink-900 border border-ink-700 rounded-xl p-6">
        <h3 className="font-display text-base font-semibold text-ink-200 mb-3">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-mono text-[10px] text-cinnamon uppercase tracking-wider mb-1">1. Configure</p>
            <p className="text-[13px] text-ink-400">Select parameters within any module — ink mode, shot type, icon tier, layout format.</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-cinnamon uppercase tracking-wider mb-1">2. Generate</p>
            <p className="text-[13px] text-ink-400">The platform assembles a brand-compliant prompt or specification from locked visual rules.</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-cinnamon uppercase tracking-wider mb-1">3. Use</p>
            <p className="text-[13px] text-ink-400">Copy the prompt into Freepik, Recraft, Midjourney — or export specs for Figma, Illustrator, CSS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
