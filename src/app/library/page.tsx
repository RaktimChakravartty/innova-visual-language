'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, Eye, Grid3X3, List, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { getGenerations } from '@/lib/store';
import { INK_MODE_LABELS, VERTICAL_LABELS, COMPOSITION_LABELS, VERTICAL_BADGE_VARIANT } from '@/lib/constants';
import type { Generation } from '@/types/database';

export default function LibraryPage() {
  const [approved, setApproved] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedGen, setSelectedGen] = useState<Generation | null>(null);

  const loadData = useCallback(async () => {
    const data = await getGenerations();
    setApproved(data.filter((g) => g.status === 'approved'));
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleDownloadAll = () => {
    approved.forEach((gen) => {
      const link = document.createElement('a');
      link.href = gen.image_url;
      link.download = `ink-${gen.ink_mode}-${gen.vertical}-${gen.id.slice(0, 8)}.png`;
      link.click();
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ink-50">Reference Library</h1>
          <p className="text-ink-500 text-sm mt-0.5">{approved.length} approved illustration{approved.length !== 1 ? 's' : ''} — the brand standard</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-ink-700 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 cursor-pointer ${viewMode === 'grid' ? 'bg-ink-800 text-ink-100' : 'text-ink-500 hover:bg-ink-800/50'}`}><Grid3X3 size={14} /></button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 cursor-pointer ${viewMode === 'list' ? 'bg-ink-800 text-ink-100' : 'text-ink-500 hover:bg-ink-800/50'}`}><List size={14} /></button>
          </div>
          {approved.length > 0 && (
            <Button variant="secondary" size="sm" onClick={handleDownloadAll}><Download size={14} /> Download All</Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-ink-500">Loading...</div>
      ) : approved.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center">
            <BookOpen size={24} className="text-ink-400" />
          </div>
          <p className="text-ink-300 text-lg font-medium">No approved illustrations yet</p>
          <p className="text-ink-500 text-sm mt-1 max-w-md">
            Approve illustrations from the Gallery to build your reference set.
            These define the brand standard for The Ink Register.
          </p>
          <a href="/gallery" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber text-ink-950 font-semibold text-sm hover:bg-amber/90 transition">
            Go to Gallery
          </a>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {approved.map((gen) => (
            <div key={gen.id} className="group cursor-pointer bg-ink-900 border border-ink-700 rounded-xl overflow-hidden hover:border-ink-600 transition-all" onClick={() => setSelectedGen(gen)}>
              <div className="aspect-square bg-white relative overflow-hidden">
                <img src={gen.image_url} alt={gen.subject} className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Eye size={28} className="text-white" />
                </div>
              </div>
              <div className="p-3">
                {gen.subject && <p className="text-sm text-ink-200 truncate mb-1.5">{gen.subject}</p>}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="amber">{INK_MODE_LABELS[gen.ink_mode]}</Badge>
                  <Badge variant={VERTICAL_BADGE_VARIANT[gen.vertical]}>{VERTICAL_LABELS[gen.vertical]}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {approved.map((gen) => (
            <div key={gen.id} className="flex items-center gap-4 bg-ink-900 border border-ink-700 rounded-xl p-3 hover:border-ink-600 transition cursor-pointer" onClick={() => setSelectedGen(gen)}>
              <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img src={gen.image_url} alt={gen.subject} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink-100 truncate">{gen.subject || 'Untitled'}</p>
                <div className="flex gap-1 mt-1">
                  <Badge variant="amber">{INK_MODE_LABELS[gen.ink_mode]}</Badge>
                  <Badge>{COMPOSITION_LABELS[gen.composition]}</Badge>
                </div>
                <p className="text-[10px] text-ink-500 mt-1">{new Date(gen.created_at).toLocaleDateString()}</p>
              </div>
              <a href={gen.image_url} download onClick={(e) => e.stopPropagation()} className="p-2 rounded-lg text-ink-500 hover:text-ink-200 hover:bg-ink-800 transition"><Download size={16} /></a>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!selectedGen} onClose={() => setSelectedGen(null)} title="Reference Illustration" className="max-w-4xl">
        {selectedGen && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <img src={selectedGen.image_url} alt={selectedGen.subject} className="w-full max-h-[600px] object-contain" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="amber">{INK_MODE_LABELS[selectedGen.ink_mode]}</Badge>
              <Badge variant={VERTICAL_BADGE_VARIANT[selectedGen.vertical]}>{VERTICAL_LABELS[selectedGen.vertical]}</Badge>
              <Badge variant="cobalt">{COMPOSITION_LABELS[selectedGen.composition]}</Badge>
            </div>
            {selectedGen.subject && <p className="text-sm text-ink-300">{selectedGen.subject}</p>}
            <div>
              <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-1.5 font-semibold">Prompt Used</p>
              <pre className="text-[11px] text-ink-300 bg-ink-950 rounded-lg p-3 overflow-auto max-h-40 whitespace-pre-wrap font-mono leading-relaxed">{selectedGen.prompt_full}</pre>
            </div>
            <a href={selectedGen.image_url} download><Button size="sm"><Download size={14} /> Download</Button></a>
          </div>
        )}
      </Modal>
    </div>
  );
}
