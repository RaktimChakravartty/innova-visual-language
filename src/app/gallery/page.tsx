'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Check,
  X,
  Tag,
  Download,
  Trash2,
  Eye,
  Search,
  Grid3X3,
  LayoutGrid,
  Maximize2,
  CheckSquare,
  Square,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import {
  getGenerations,
  updateGenerationStatus,
  updateGenerationTags,
  deleteGeneration,
} from '@/lib/store';
import {
  INK_MODE_LABELS,
  VERTICAL_LABELS,
  COMPOSITION_LABELS,
  VERTICAL_BADGE_VARIANT,
  STATUS_BADGE_VARIANT,
} from '@/lib/constants';
import type { Generation, InkMode, Vertical, GenerationStatus } from '@/types/database';

type Density = 'compact' | 'comfortable' | 'large';

export default function GalleryPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState<InkMode | 'all'>('all');
  const [filterVertical, setFilterVertical] = useState<Vertical | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<GenerationStatus | 'all'>('all');
  const [sortNewest, setSortNewest] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGen, setSelectedGen] = useState<Generation | null>(null);
  const [tagModalGen, setTagModalGen] = useState<Generation | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [density, setDensity] = useState<Density>('comfortable');
  const [batchMode, setBatchMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const loadData = useCallback(async () => {
    const data = await getGenerations();
    setGenerations(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = useMemo(() => generations
    .filter((g) => filterMode === 'all' || g.ink_mode === filterMode)
    .filter((g) => filterVertical === 'all' || g.vertical === filterVertical)
    .filter((g) => filterStatus === 'all' || g.status === filterStatus)
    .filter((g) =>
      !searchQuery ||
      g.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) =>
      sortNewest
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    ), [generations, filterMode, filterVertical, filterStatus, searchQuery, sortNewest]);

  const handleStatus = async (id: string, status: GenerationStatus) => {
    await updateGenerationStatus(id, status);
    await loadData();
  };

  const handleBatchStatus = async (status: GenerationStatus) => {
    for (const id of selected) {
      await updateGenerationStatus(id, status);
    }
    setSelected(new Set());
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await deleteGeneration(id);
    await loadData();
    setSelectedGen(null);
  };

  const handleAddTag = async () => {
    if (!tagModalGen || !tagInput.trim()) return;
    const newTags = [...new Set([...tagModalGen.tags, tagInput.trim()])];
    await updateGenerationTags(tagModalGen.id, newTags);
    setTagInput('');
    await loadData();
    setTagModalGen((prev) => prev ? { ...prev, tags: newTags } : null);
  };

  const handleRemoveTag = async (tag: string) => {
    if (!tagModalGen) return;
    const newTags = tagModalGen.tags.filter((t) => t !== tag);
    await updateGenerationTags(tagModalGen.id, newTags);
    await loadData();
    setTagModalGen((prev) => prev ? { ...prev, tags: newTags } : null);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };


  const gridCols = density === 'compact' ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
    : density === 'comfortable' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ink-50">Gallery</h1>
          <p className="text-ink-500 text-sm mt-0.5">{filtered.length} illustration{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Batch mode */}
          <Button variant={batchMode ? 'primary' : 'ghost'} size="sm" onClick={() => { setBatchMode(!batchMode); setSelected(new Set()); }}>
            <CheckSquare size={14} /> {batchMode ? `${selected.size} selected` : 'Select'}
          </Button>
          {batchMode && selected.size > 0 && (
            <>
              <Button size="sm" onClick={() => handleBatchStatus('approved')}><Check size={14} /> Approve</Button>
              <Button variant="danger" size="sm" onClick={() => handleBatchStatus('rejected')}><X size={14} /> Reject</Button>
            </>
          )}

          {/* Density */}
          <div className="flex border border-ink-700 rounded-lg overflow-hidden">
            <button onClick={() => setDensity('compact')} className={`p-1.5 cursor-pointer ${density === 'compact' ? 'bg-ink-800 text-ink-100' : 'text-ink-500 hover:bg-ink-800/50'}`}>
              <Grid3X3 size={14} />
            </button>
            <button onClick={() => setDensity('comfortable')} className={`p-1.5 cursor-pointer ${density === 'comfortable' ? 'bg-ink-800 text-ink-100' : 'text-ink-500 hover:bg-ink-800/50'}`}>
              <LayoutGrid size={14} />
            </button>
            <button onClick={() => setDensity('large')} className={`p-1.5 cursor-pointer ${density === 'large' ? 'bg-ink-800 text-ink-100' : 'text-ink-500 hover:bg-ink-800/50'}`}>
              <Maximize2 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter chips + Search */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <div className="relative flex-shrink-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, tags..."
            className="bg-ink-900 border border-ink-700 rounded-lg pl-9 pr-3 py-1.5 text-[12px] text-ink-100 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber/50 w-52"
          />
        </div>

        {/* Status chips */}
        {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-2.5 py-1 rounded-lg text-[11px] border cursor-pointer transition ${
              filterStatus === s ? 'bg-ink-800 border-amber/50 text-ink-50' : 'border-ink-700 text-ink-400 hover:border-ink-600'
            }`}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}

        <span className="text-ink-700">|</span>

        {/* Mode chips */}
        <button
          onClick={() => setFilterMode('all')}
          className={`px-2.5 py-1 rounded-lg text-[11px] border cursor-pointer transition ${filterMode === 'all' ? 'bg-ink-800 border-amber/50 text-ink-50' : 'border-ink-700 text-ink-400 hover:border-ink-600'}`}
        >All Modes</button>
        {(Object.keys(INK_MODE_LABELS) as InkMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setFilterMode(m)}
            className={`px-2.5 py-1 rounded-lg text-[11px] border cursor-pointer transition ${filterMode === m ? 'bg-ink-800 border-amber/50 text-ink-50' : 'border-ink-700 text-ink-400 hover:border-ink-600'}`}
          >{INK_MODE_LABELS[m]}</button>
        ))}

        <button
          onClick={() => setSortNewest(!sortNewest)}
          className="ml-auto px-2.5 py-1 rounded-lg text-[11px] border border-ink-700 text-ink-400 hover:border-ink-600 cursor-pointer transition"
        >{sortNewest ? 'Newest first' : 'Oldest first'}</button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64 text-ink-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-ink-400 text-lg">No illustrations yet</p>
          <p className="text-ink-500 text-sm mt-1">Generate or upload illustrations from the Generator page</p>
          <a href="/" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber text-ink-950 font-semibold text-sm hover:bg-amber/90 transition">
            Generate your first illustration
          </a>
        </div>
      ) : (
        <div className={`grid ${gridCols} gap-3`}>
          {filtered.map((gen) => (
            <div
              key={gen.id}
              className={`group bg-ink-900 border rounded-xl overflow-hidden transition-all ${
                selected.has(gen.id) ? 'border-amber ring-1 ring-amber/30' : 'border-ink-700 hover:border-ink-600'
              }`}
            >
              {/* Image */}
              <div
                className="aspect-square bg-white cursor-pointer relative overflow-hidden"
                onClick={() => batchMode ? toggleSelect(gen.id) : setSelectedGen(gen)}
              >
                <img src={gen.image_url} alt={gen.subject || 'Illustration'} className="w-full h-full object-contain" />
                {/* Batch select checkbox */}
                {batchMode && (
                  <div className="absolute top-2 left-2">
                    {selected.has(gen.id) ? (
                      <CheckSquare size={20} className="text-amber" />
                    ) : (
                      <Square size={20} className="text-ink-400" />
                    )}
                  </div>
                )}
                {/* Hover: show prompt preview */}
                {!batchMode && gen.prompt_full && (
                  <div className="absolute inset-0 bg-black/70 p-3 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white/80 font-mono line-clamp-4 leading-relaxed">{gen.prompt_full.slice(0, 200)}...</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Eye size={12} className="text-white/60" />
                      <span className="text-[9px] text-white/60">Click to view details</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2.5 space-y-1.5">
                <div className="flex flex-wrap gap-1">
                  <Badge variant={VERTICAL_BADGE_VARIANT[gen.vertical]}>
                    {VERTICAL_LABELS[gen.vertical] || gen.vertical}
                  </Badge>
                  <Badge>{INK_MODE_LABELS[gen.ink_mode]}</Badge>
                  <Badge variant={STATUS_BADGE_VARIANT[gen.status]}>{gen.status}</Badge>
                </div>
                {gen.subject && <p className="text-[11px] text-ink-400 truncate">{gen.subject}</p>}
                <p className="text-[9px] text-ink-500">{new Date(gen.created_at).toLocaleDateString()} &middot; {gen.source}</p>

                {/* Actions */}
                <div className="flex gap-0.5 pt-0.5">
                  <button onClick={() => handleStatus(gen.id, 'approved')} className={`p-1 rounded transition cursor-pointer ${gen.status === 'approved' ? 'bg-emerald-600/20 text-emerald-500' : 'text-ink-500 hover:text-emerald-500 hover:bg-ink-800'}`} title="Approve"><Check size={13} /></button>
                  <button onClick={() => handleStatus(gen.id, 'rejected')} className={`p-1 rounded transition cursor-pointer ${gen.status === 'rejected' ? 'bg-red-600/20 text-red-400' : 'text-ink-500 hover:text-red-400 hover:bg-ink-800'}`} title="Reject"><X size={13} /></button>
                  <button onClick={() => setTagModalGen(gen)} className="p-1 rounded text-ink-500 hover:text-amber hover:bg-ink-800 transition cursor-pointer" title="Tag"><Tag size={13} /></button>
                  <a href={gen.image_url} download className="p-1 rounded text-ink-500 hover:text-ink-200 hover:bg-ink-800 transition cursor-pointer" title="Download"><Download size={13} /></a>
                  <button onClick={() => handleDelete(gen.id)} className="p-1 rounded text-ink-500 hover:text-red-400 hover:bg-ink-800 transition cursor-pointer ml-auto" title="Delete"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal open={!!selectedGen} onClose={() => setSelectedGen(null)} title="Illustration Detail" className="max-w-3xl">
        {selectedGen && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <img src={selectedGen.image_url} alt={selectedGen.subject} className="w-full max-h-[500px] object-contain" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={VERTICAL_BADGE_VARIANT[selectedGen.vertical]}>{VERTICAL_LABELS[selectedGen.vertical]}</Badge>
              <Badge>{INK_MODE_LABELS[selectedGen.ink_mode]}</Badge>
              <Badge>{COMPOSITION_LABELS[selectedGen.composition]}</Badge>
              <Badge variant={STATUS_BADGE_VARIANT[selectedGen.status]}>{selectedGen.status}</Badge>
            </div>
            {selectedGen.subject && <p className="text-sm text-ink-300">{selectedGen.subject}</p>}
            {selectedGen.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedGen.tags.map((t) => (<span key={t} className="px-2 py-0.5 rounded bg-ink-700 text-[10px] text-ink-300">{t}</span>))}
              </div>
            )}
            <div>
              <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-1.5 font-semibold">Full Prompt</p>
              <pre className="text-[11px] text-ink-300 bg-ink-950 rounded-lg p-3 overflow-auto max-h-48 whitespace-pre-wrap font-mono leading-relaxed">{selectedGen.prompt_full}</pre>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={() => handleStatus(selectedGen.id, 'approved')}><Check size={14} /> Approve</Button>
              <Button variant="danger" size="sm" onClick={() => handleStatus(selectedGen.id, 'rejected')}><X size={14} /> Reject</Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(selectedGen.id)} className="ml-auto"><Trash2 size={14} /> Delete</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Tag Modal */}
      <Modal open={!!tagModalGen} onClose={() => setTagModalGen(null)} title="Manage Tags">
        {tagModalGen && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {tagModalGen.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-ink-700 text-xs text-ink-300">
                  {t}
                  <button onClick={() => handleRemoveTag(t)} className="text-ink-500 hover:text-red-400 cursor-pointer"><X size={12} /></button>
                </span>
              ))}
              {tagModalGen.tags.length === 0 && <p className="text-xs text-ink-500">No tags yet</p>}
            </div>
            <div className="flex gap-2">
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add a tag..." onKeyDown={(e) => e.key === 'Enter' && handleAddTag()} />
              <Button size="md" onClick={handleAddTag}>Add</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
