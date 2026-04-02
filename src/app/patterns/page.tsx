'use client';

import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { Hexagon } from 'lucide-react';

export default function PatternsPage() {
  return (
    <div className="min-h-screen p-8 max-w-[1200px] mx-auto">
      <ModuleHeader system="Patterns & Textures" subtitle="Supergraphic patterns from brandmark geometry + Ink Register textures" />
      <div className="flex items-center justify-center h-64 bg-ink-900 border border-ink-700 rounded-xl">
        <div className="text-center">
          <Hexagon size={32} className="text-ink-400 mx-auto mb-3" />
          <p className="text-ink-300 font-display text-lg">Patterns & Textures Module</p>
          <p className="text-ink-500 text-sm mt-1">Live SVG pattern generation + texture reference</p>
        </div>
      </div>
    </div>
  );
}
