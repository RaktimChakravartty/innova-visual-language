'use client';

import Link from 'next/link';
import {
  PenTool, Aperture, Grid3X3, Layout, PlayCircle, Hexagon,
  ArrowRight,
} from 'lucide-react';
import { MODULES, BRAND, VERTICALS } from '@/lib/constants/brand';

const ICON_MAP: Record<string, React.ElementType> = {
  'pen-tool': PenTool, 'aperture': Aperture, 'grid-3x3': Grid3X3,
  'layout': Layout, 'play-circle': PlayCircle, 'hexagon': Hexagon,
};

const MODULE_ACCENTS: Record<string, string> = {
  illustration: BRAND.cinnamon,
  photography: BRAND.cinnamon,
  icons: BRAND.twilight,
  layout: BRAND.hunter,
  motion: BRAND.charcoal,
  patterns: BRAND.stone,
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8 max-w-[1200px] mx-auto">
      {/* Hero */}
      <div className="mb-16 pt-8">
        <div className="flex items-center gap-4 mb-4">
          <img src="/brandmark.svg" alt="INNOVA" className="w-12 h-12" style={{ filter: 'var(--brandmark-filter, none)' }} />
          <div>
            <h1 className="font-display text-[36px] font-semibold text-ink-100 tracking-tight leading-[1.1]">
              Visual Language
            </h1>
            <p className="font-display text-[18px] italic text-ink-500">Brand visual system for INNOVA AM Tech</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex gap-2">
            {Object.values(VERTICALS).map((v) => (
              <span key={v.name} className="flex items-center gap-1.5">
                <span className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: v.colour }} />
                <span className="font-mono text-[10px] text-ink-500">{v.name}</span>
              </span>
            ))}
          </div>
          <span className="font-mono text-[10px] text-ink-600">INNOVA AM Tech · Visual Language Platform</span>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 mb-16">
        {MODULES.map((mod, i) => {
          const Icon = ICON_MAP[mod.icon] || PenTool;
          const accent = MODULE_ACCENTS[mod.id] || BRAND.cinnamon;
          return (
            <Link
              key={mod.id}
              href={mod.route}
              className="group block p-6 border-b border-r border-ink-700 hover:bg-ink-900/50 transition-colors duration-150"
              style={{ borderLeftWidth: '3px', borderLeftColor: accent, borderLeftStyle: 'solid' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-ink-500">0{i + 1}</span>
                <Icon size={16} className="text-ink-500 group-hover:text-ink-300 transition-colors" />
              </div>
              <h2 className="font-display text-[22px] font-semibold text-ink-100 mb-1 tracking-tight">{mod.name}</h2>
              <p className="font-mono text-[11px] italic text-cinnamon mb-2">{mod.system}</p>
              <p className="text-[13px] text-ink-400 leading-relaxed mb-4">{mod.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-ink-400 group-hover:text-cinnamon transition-colors flex items-center gap-1">
                  Open module <ArrowRight size={12} />
                </span>
                <kbd className="font-mono text-[10px] text-ink-500 px-1.5 py-0.5 rounded bg-ink-800 border border-ink-700">{mod.shortcut}</kbd>
              </div>
            </Link>
          );
        })}
      </div>

      {/* How it works */}
      <div className="mb-16">
        <h3 className="font-display text-lg font-semibold text-ink-200 mb-6">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Configure', desc: 'Select parameters within any module to define what you need.' },
            { step: '02', title: 'Generate', desc: 'The platform assembles brand-compliant prompts and specifications.' },
            { step: '03', title: 'Use', desc: 'Copy into Freepik, Recraft, Midjourney, Illustrator, Figma, or CSS.' },
          ].map((item) => (
            <div key={item.step}>
              <span className="font-mono text-[11px] text-cinnamon">{item.step}</span>
              <h4 className="text-[14px] font-medium text-ink-200 mt-1">{item.title}</h4>
              <p className="text-[13px] text-ink-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
