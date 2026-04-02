'use client';

import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { Layout } from 'lucide-react';

export default function LayoutGridPage() {
  return (
    <div className="min-h-screen p-8 max-w-[1200px] mx-auto">
      <ModuleHeader system="The Trap Grid" subtitle="Layout & Grid System · Derived from brandmark clear space proportions" />
      <div className="flex items-center justify-center h-64 bg-ink-900 border border-ink-700 rounded-xl">
        <div className="text-center">
          <Layout size={32} className="text-ink-400 mx-auto mb-3" />
          <p className="text-ink-300 font-display text-lg">Layout & Grid Module</p>
          <p className="text-ink-500 text-sm mt-1">Layout specs, SVG grid previews, CSS exports</p>
        </div>
      </div>
    </div>
  );
}
