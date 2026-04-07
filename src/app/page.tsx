'use client';

import Link from 'next/link';
import {
  PenTool, Aperture, Grid3X3, Layout, PlayCircle, Hexagon,
  ArrowRight, BookOpen, Palette, Type, Image, Bookmark, Sliders, Settings,
} from 'lucide-react';
import { MODULES, VERTICALS } from '@/lib/constants/brand';
import { BrandmarkSVG, WordmarkSVG } from '@/components/shared/BrandSVGs';

const ICON_MAP: Record<string, React.ElementType> = {
  'pen-tool': PenTool, 'aperture': Aperture, 'grid-3x3': Grid3X3,
  'layout': Layout, 'play-circle': PlayCircle, 'hexagon': Hexagon,
};

const MODULE_COLOURS: Record<string, string> = {
  illustration: '#D4772E', photography: '#D4772E', icons: '#2D4272',
  layout: '#3D6B4F', motion: '#1A1A1A', patterns: '#9A958F',
};

function NavCard({ href, icon: Icon, label, desc }: { href: string; icon: React.ElementType; label: string; desc: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3 px-4 py-3 hover:bg-ink-800/30 transition-colors">
      <Icon size={16} className="text-ink-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-ink-200">{label}</p>
        <p className="text-[11px] text-ink-500 truncate">{desc}</p>
      </div>
      <ArrowRight size={14} className="text-ink-600 group-hover:text-ink-400 transition-colors flex-shrink-0" />
    </Link>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8 max-w-[1100px] mx-auto">
      {/* Hero */}
      <div className="flex flex-col items-center mb-14 pt-8">
        <div className="flex items-center gap-4 mb-3">
          <BrandmarkSVG className="w-12 h-12 text-ink-100 flex-shrink-0" />
          <WordmarkSVG className="h-8 text-ink-100" />
        </div>
        <p className="font-mono text-[11px] text-ink-500 uppercase tracking-[0.12em] mt-1">Visual Language Platform</p>
        <div className="flex gap-3 mt-4">
          {Object.values(VERTICALS).map((v) => (
            <span key={v.name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-800 border border-ink-700">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.colour }} />
              <span className="font-mono text-[10px] text-ink-400">{v.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Left — Modules */}
        <div className="flex-[3]">
          <p className="font-mono text-[10px] font-bold uppercase text-ink-500 tracking-[0.12em] mb-3 px-4">Modules</p>
          <div className="border border-ink-700 rounded-lg overflow-hidden divide-y divide-ink-700">
            {MODULES.map((mod) => {
              const Icon = ICON_MAP[mod.icon] || PenTool;
              const colour = MODULE_COLOURS[mod.id] || '#D4772E';
              return (
                <Link
                  key={mod.id}
                  href={mod.route}
                  className="group flex items-center gap-4 px-5 py-4 hover:bg-ink-800/30 transition-colors"
                >
                  <Icon size={20} style={{ color: colour }} className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-ink-100">{mod.name}</p>
                    <p className="text-[12px] text-ink-500 mt-0.5 truncate">{mod.description}</p>
                  </div>
                  <ArrowRight size={15} className="text-ink-600 group-hover:text-ink-300 transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right — Reference + Library */}
        <div className="flex-[2]">
          <p className="font-mono text-[10px] font-bold uppercase text-ink-500 tracking-[0.12em] mb-3 px-4">Brand Reference</p>
          <div className="border border-ink-700 rounded-lg overflow-hidden divide-y divide-ink-700 mb-6">
            <NavCard href="/guidelines" icon={BookOpen} label="Guidelines" desc="Complete identity system" />
            <NavCard href="/colour" icon={Palette} label="Colour System" desc="Palette, tints, accessibility" />
            <NavCard href="/typography" icon={Type} label="Typography" desc="Typefaces and hierarchy" />
          </div>

          <p className="font-mono text-[10px] font-bold uppercase text-ink-500 tracking-[0.12em] mb-3 px-4">Library</p>
          <div className="border border-ink-700 rounded-lg overflow-hidden divide-y divide-ink-700 mb-6">
            <NavCard href="/gallery" icon={Image} label="Gallery" desc="Generated and curated assets" />
            <NavCard href="/library" icon={Bookmark} label="Reference Library" desc="Approved brand assets" />
          </div>
        </div>
      </div>

      {/* System — full width */}
      <div className="mt-8 flex items-center gap-6 px-4">
        <p className="font-mono text-[10px] text-ink-600 uppercase tracking-[0.12em]">System</p>
        <Link href="/brand-kit" className="flex items-center gap-1.5 text-[12px] text-ink-400 hover:text-ink-200 transition-colors">
          <Sliders size={13} /> Brand Kit
        </Link>
        <Link href="/settings" className="flex items-center gap-1.5 text-[12px] text-ink-400 hover:text-ink-200 transition-colors">
          <Settings size={13} /> Settings
        </Link>
      </div>
    </div>
  );
}
