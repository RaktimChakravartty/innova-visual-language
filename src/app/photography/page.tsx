'use client';

import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { Aperture } from 'lucide-react';

export default function PhotographyPage() {
  return (
    <div className="min-h-screen p-8 max-w-[1200px] mx-auto">
      <ModuleHeader system="The Working Notebook" subtitle="Photography System · Kodak Portra 400 editorial workplace aesthetic" />
      <div className="flex items-center justify-center h-64 bg-ink-900 border border-ink-700 rounded-xl">
        <div className="text-center">
          <Aperture size={32} className="text-ink-400 mx-auto mb-3" />
          <p className="text-ink-300 font-display text-lg">Photography Module</p>
          <p className="text-ink-500 text-sm mt-1">Coming next — Kodak Portra 400 prompt assembly</p>
        </div>
      </div>
    </div>
  );
}
