'use client';

import Link from 'next/link';
import {
  PenTool, Aperture, Grid3X3, Layout, PlayCircle, Hexagon,
  ArrowRight, BookOpen, Palette, Type, Image, Bookmark, Sliders, Settings,
} from 'lucide-react';
import { MODULES, VERTICALS } from '@/lib/constants/brand';
import { Wordmark } from '@/components/brand/Wordmark';

const ICON_MAP: Record<string, React.ElementType> = {
  'pen-tool': PenTool, 'aperture': Aperture, 'grid-3x3': Grid3X3,
  'layout': Layout, 'play-circle': PlayCircle, 'hexagon': Hexagon,
};

const MODULE_COLOURS: Record<string, string> = {
  illustration: '#D4772E', photography: '#D4772E', icons: '#2D4272',
  layout: '#3D6B4F', motion: '#191919', patterns: '#9A958F',
};

function NavCard({ href, icon: Icon, label, desc, delay }: { href: string; icon: React.ElementType; label: string; desc: string; delay: number }) {
  return (
    <Link href={href} className="group flex items-center gap-3 px-4 py-3 card-hover rounded-lg animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
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
    <div className="min-h-screen p-4 md:p-8 max-w-[1100px] mx-auto">
      {/* Hero */}
      <div className="flex flex-col items-center mb-14 pt-8">
        <div className="animate-fade-in">
          <Wordmark height={40} className="text-ink-100" />
        </div>
        <p className="font-mono text-[11px] text-ink-500 uppercase tracking-[0.12em] mt-3 animate-fade-in stagger-1">Visual Language Platform</p>
        <div className="flex gap-3 mt-4 animate-fade-in stagger-2">
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
        {/* Left: Modules */}
        <div className="flex-[3]">
          <p className="font-mono text-[10px] font-bold uppercase text-ink-500 tracking-[0.12em] mb-3 px-4 animate-fade-in">Modules</p>
          <div className="border border-ink-700 rounded-lg overflow-hidden">
            {MODULES.map((mod, i) => {
              const Icon = ICON_MAP[mod.icon] || PenTool;
              const colour = MODULE_COLOURS[mod.id] || '#D4772E';
              return (
                <Link
                  key={mod.id}
                  href={mod.route}
                  className={`group flex items-center gap-4 px-5 py-4 card-hover animate-fade-in ${i < MODULES.length - 1 ? 'border-b border-ink-700' : ''}`}
                  style={{ borderLeft: `2px solid ${colour}`, animationDelay: `${(i + 1) * 60}ms` }}
                >
                  <Icon size={20} style={{ color: colour }} className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-ink-100">{mod.name}</p>
                    <p className="font-mono text-[9px] text-cinnamon/70 mt-0.5">{mod.system}</p>
                    <p className="text-[12px] text-ink-500 mt-0.5 truncate">{mod.description}</p>
                  </div>
                  <ArrowRight size={15} className="text-ink-600 group-hover:text-ink-300 transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Reference + Library */}
        <div className="flex-[2]">
          <p className="font-mono text-[10px] font-bold uppercase text-ink-500 tracking-[0.12em] mb-3 px-4 animate-fade-in stagger-2">Brand Reference</p>
          <div className="border border-ink-700 rounded-lg overflow-hidden mb-6">
            <NavCard href="/guidelines" icon={BookOpen} label="Guidelines" desc="Complete identity system" delay={200} />
            <div className="h-px bg-ink-700" />
            <NavCard href="/colour" icon={Palette} label="Colour System" desc="Palette, tints, accessibility" delay={260} />
            <div className="h-px bg-ink-700" />
            <NavCard href="/typography" icon={Type} label="Typography" desc="Typefaces and hierarchy" delay={320} />
          </div>

          <p className="font-mono text-[10px] font-bold uppercase text-ink-500 tracking-[0.12em] mb-3 px-4 animate-fade-in stagger-4">Library</p>
          <div className="border border-ink-700 rounded-lg overflow-hidden mb-6">
            <NavCard href="/gallery" icon={Image} label="Gallery" desc="Generated and curated assets" delay={380} />
            <div className="h-px bg-ink-700" />
            <NavCard href="/library" icon={Bookmark} label="Reference Library" desc="Approved brand assets" delay={440} />
          </div>

          <p className="font-mono text-[10px] font-bold uppercase text-ink-500 tracking-[0.12em] mb-3 px-4 animate-fade-in stagger-5">System</p>
          <div className="border border-ink-700 rounded-lg overflow-hidden">
            <NavCard href="/brand-kit" icon={Sliders} label="Brand Kit" desc="Colour palettes and overrides" delay={500} />
            <div className="h-px bg-ink-700" />
            <NavCard href="/settings" icon={Settings} label="Settings" desc="Theme and providers" delay={560} />
          </div>
        </div>
      </div>
    </div>
  );
}
