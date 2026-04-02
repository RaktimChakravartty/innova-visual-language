'use client';

import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { Grid3X3 } from 'lucide-react';

export default function IconsPage() {
  return (
    <div className="min-h-screen p-8 max-w-[1200px] mx-auto">
      <ModuleHeader system="The Convergence Vocabulary" subtitle="Icon System · Derived from brandmark geometry" />
      <div className="flex items-center justify-center h-64 bg-ink-900 border border-ink-700 rounded-xl">
        <div className="text-center">
          <Grid3X3 size={32} className="text-ink-400 mx-auto mb-3" />
          <p className="text-ink-300 font-display text-lg">Icons Module</p>
          <p className="text-ink-500 text-sm mt-1">Construction specs + AI concept exploration</p>
        </div>
      </div>
    </div>
  );
}
