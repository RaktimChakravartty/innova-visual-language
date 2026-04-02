'use client';

import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { PlayCircle } from 'lucide-react';

export default function MotionPage() {
  return (
    <div className="min-h-screen p-8 max-w-[1200px] mx-auto">
      <ModuleHeader system="Motion Principles" subtitle="How the brand moves · The i-dot as animation seed" />
      <div className="flex items-center justify-center h-64 bg-ink-900 border border-ink-700 rounded-xl">
        <div className="text-center">
          <PlayCircle size={32} className="text-ink-400 mx-auto mb-3" />
          <p className="text-ink-300 font-display text-lg">Motion Module</p>
          <p className="text-ink-500 text-sm mt-1">Interactive CSS demos, easing curves, timing specs</p>
        </div>
      </div>
    </div>
  );
}
