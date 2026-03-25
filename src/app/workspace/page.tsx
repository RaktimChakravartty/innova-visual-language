'use client';

import { Layout, ArrowRight } from 'lucide-react';

export default function WorkspacePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center">
          <Layout size={32} className="text-ink-400" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-ink-50 mb-2">Canvas Workspace</h1>
        <p className="text-ink-400 text-sm leading-relaxed mb-6">
          A freeform canvas where you can arrange multiple generated illustrations,
          add text overlays, create compositions, and export layouts.
        </p>
        <div className="bg-ink-900 border border-ink-700 rounded-xl p-5 text-left space-y-3">
          <h3 className="text-xs font-semibold text-ink-300 uppercase tracking-wider">Coming Soon</h3>
          <ul className="space-y-2 text-sm text-ink-400">
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-amber flex-shrink-0" /> Drag-and-drop illustration arrangement</li>
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-amber flex-shrink-0" /> Text overlay and annotation tools</li>
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-amber flex-shrink-0" /> Multi-illustration composition layouts</li>
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-amber flex-shrink-0" /> Export as PNG, PDF, or presentation slides</li>
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-amber flex-shrink-0" /> Integration with Freepik Spaces, Kittl, and more</li>
          </ul>
        </div>
        <p className="text-[10px] text-ink-600 mt-4">
          In the meantime, use the Generator to create illustrations and the Gallery to curate them.
        </p>
      </div>
    </div>
  );
}
