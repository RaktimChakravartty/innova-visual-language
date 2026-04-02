'use client';

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Check, Edit3, Palette as PaletteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColourPicker } from '@/components/ui/colour-picker';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { getPalettes, savePalette, setActivePaletteId, deletePalette } from '@/lib/store';
import { BRAND, VERTICALS } from '@/lib/constants/brand';
import type { Palette } from '@/types/database';

const LOCKED_CORE = [
  { name: 'Charcoal', hex: BRAND.charcoal },
  { name: 'Text', hex: BRAND.text },
  { name: 'Ivory', hex: BRAND.ivory },
  { name: 'Mist', hex: BRAND.mist },
  { name: 'Stone', hex: BRAND.stone },
];

const LOCKED_VERTICALS = [
  { name: 'Cinnamon', hex: BRAND.cinnamon, vertical: 'SPACE' },
  { name: 'Twilight', hex: BRAND.twilight, vertical: 'PEOPLE' },
  { name: 'Hunter', hex: BRAND.hunter, vertical: 'TECH' },
];

function EmptyPalette(): Palette {
  return {
    id: uuidv4(), name: '', core_dark: '#1C1C1E', core_light: '#FAF7F2',
    vertical_space_name: 'Amber', vertical_space_hex: '#E8A317',
    vertical_people_name: 'Coral', vertical_people_hex: '#E86A50',
    vertical_tech_name: 'Cobalt', vertical_tech_hex: '#2B5EA7',
    is_active: false, created_at: new Date().toISOString(),
  };
}

function ColourSwatch({ hex, name, size = 'md' }: { hex: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'w-20 h-20' : size === 'md' ? 'w-14 h-14' : 'w-8 h-8';
  return (
    <div className="text-center">
      <div className={`${sizeClass} rounded-xl border border-ink-700 mx-auto`} style={{ backgroundColor: hex }} />
      <p className="text-[10px] text-ink-400 mt-1.5">{name}</p>
      <p className="text-[9px] text-ink-600 font-mono">{hex}</p>
    </div>
  );
}

export default function BrandKitPage() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPalette, setEditPalette] = useState<Palette | null>(null);
  const [isNew, setIsNew] = useState(false);

  const loadData = useCallback(async () => {
    const data = await getPalettes();
    setPalettes(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSave = async () => {
    if (!editPalette || !editPalette.name.trim()) return;
    await savePalette(editPalette);
    setEditPalette(null);
    setIsNew(false);
    await loadData();
  };

  const handleSetActive = async (id: string) => {
    await setActivePaletteId(id);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await deletePalette(id);
    await loadData();
  };

  return (
    <div className="min-h-screen p-8 max-w-[1200px] mx-auto">
      <ModuleHeader system="Brand Kit" subtitle="INNOVA colour system + custom palette management" />

      {/* Locked INNOVA Palette */}
      <div className="bg-ink-900 border border-ink-700 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-display text-base font-semibold text-ink-100">INNOVA Colour System</h2>
          <span className="font-mono text-[9px] text-ink-500 bg-ink-800 px-2 py-0.5 rounded border border-ink-700">LOCKED</span>
        </div>
        <div className="mb-5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 mb-2">Core</p>
          <div className="flex gap-4">
            {LOCKED_CORE.map((c) => (
              <div key={c.name} className="text-center">
                <div className="w-14 h-14 rounded-xl border border-ink-700" style={{ backgroundColor: c.hex }} />
                <p className="text-[10px] text-ink-300 mt-1.5">{c.name}</p>
                <p className="font-mono text-[9px] text-ink-500">{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 mb-2">Verticals</p>
          <div className="flex gap-6">
            {LOCKED_VERTICALS.map((c) => (
              <div key={c.name} className="text-center">
                <div className="w-16 h-16 rounded-xl" style={{ backgroundColor: c.hex }} />
                <p className="text-[10px] text-ink-300 mt-1.5">{c.name}</p>
                <p className="font-mono text-[9px] text-ink-500">{c.hex}</p>
                <p className="font-mono text-[8px] text-ink-600 mt-0.5">{c.vertical}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Palettes */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-base font-semibold text-ink-100">Custom Palettes</h2>
        <Button onClick={() => { setIsNew(true); setEditPalette(EmptyPalette()); }}>
          <Plus size={16} /> New Palette
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-ink-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {palettes.map((palette) => (
            <div
              key={palette.id}
              className={`bg-ink-900 border rounded-xl p-6 transition-all ${
                palette.is_active ? 'border-amber/50 ring-1 ring-amber/20' : 'border-ink-700 hover:border-ink-600'
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <PaletteIcon size={18} className="text-ink-400" />
                    <h3 className="text-lg font-semibold text-ink-50">{palette.name}</h3>
                  </div>
                  {palette.is_active && <Badge variant="amber" className="mt-1.5">Active</Badge>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setIsNew(false); setEditPalette({ ...palette }); }} className="p-2 rounded-lg text-ink-500 hover:text-ink-200 hover:bg-ink-800 transition cursor-pointer"><Edit3 size={15} /></button>
                  {!palette.is_active && <button onClick={() => handleDelete(palette.id)} className="p-2 rounded-lg text-ink-500 hover:text-red-400 hover:bg-ink-800 transition cursor-pointer"><Trash2 size={15} /></button>}
                </div>
              </div>

              {/* Core colours - large swatches */}
              <div className="flex gap-4 mb-5">
                <div className="flex-1">
                  <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-2">Core Dark</p>
                  <div className="h-12 rounded-xl border border-ink-700" style={{ backgroundColor: palette.core_dark }} />
                  <p className="text-[9px] text-ink-600 font-mono mt-1">{palette.core_dark}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-2">Core Light</p>
                  <div className="h-12 rounded-xl border border-ink-700" style={{ backgroundColor: palette.core_light }} />
                  <p className="text-[9px] text-ink-600 font-mono mt-1">{palette.core_light}</p>
                </div>
              </div>

              {/* Vertical colours - large swatches */}
              <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-3">Verticals</p>
              <div className="flex gap-6 mb-5">
                <ColourSwatch hex={palette.vertical_space_hex} name={palette.vertical_space_name} size="lg" />
                <ColourSwatch hex={palette.vertical_people_hex} name={palette.vertical_people_name} size="lg" />
                <ColourSwatch hex={palette.vertical_tech_hex} name={palette.vertical_tech_name} size="lg" />
              </div>

              {/* Preview: how colours look as accent on ink illustration */}
              <div className="bg-white rounded-xl p-4 border border-ink-700 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg border-2 border-ink-200 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <circle cx="20" cy="12" r="6" fill="none" stroke="#1c1c1e" strokeWidth="2"/>
                      <path d="M10 38 C10 26 30 26 30 38" fill="none" stroke="#1c1c1e" strokeWidth="2"/>
                      <rect x="8" y="20" width="8" height="12" fill={palette.vertical_space_hex} opacity="0.7" rx="1"/>
                      <rect x="24" y="22" width="8" height="10" fill={palette.vertical_people_hex} opacity="0.7" rx="1"/>
                    </svg>
                  </div>
                  <div className="text-[10px] text-ink-400">
                    <p>Preview of accent colours on ink illustration</p>
                    <div className="flex gap-2 mt-1">
                      <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: palette.vertical_space_hex, color: 'white', fontSize: '9px' }}>Space</span>
                      <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: palette.vertical_people_hex, color: 'white', fontSize: '9px' }}>People</span>
                      <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: palette.vertical_tech_hex, color: 'white', fontSize: '9px' }}>Tech</span>
                    </div>
                  </div>
                </div>
              </div>

              {!palette.is_active && (
                <Button variant="secondary" size="sm" className="w-full" onClick={() => handleSetActive(palette.id)}>
                  <Check size={14} /> Set Active
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal open={!!editPalette} onClose={() => { setEditPalette(null); setIsNew(false); }} title={isNew ? 'New Palette' : 'Edit Palette'} className="max-w-lg">
        {editPalette && (
          <div className="space-y-5">
            <Input label="Palette Name" value={editPalette.name} onChange={(e) => setEditPalette({ ...editPalette, name: e.target.value })} placeholder="e.g., The Meridian" />
            <div className="grid grid-cols-2 gap-4">
              <ColourPicker label="Core Dark" value={editPalette.core_dark} onChange={(v) => setEditPalette({ ...editPalette, core_dark: v })} />
              <ColourPicker label="Core Light" value={editPalette.core_light} onChange={(v) => setEditPalette({ ...editPalette, core_light: v })} />
            </div>
            <div className="border-t border-ink-700 pt-4">
              <p className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-3">Vertical Colours</p>
              <div className="space-y-3">
                {[
                  { label: 'Space', nameKey: 'vertical_space_name' as const, hexKey: 'vertical_space_hex' as const },
                  { label: 'People', nameKey: 'vertical_people_name' as const, hexKey: 'vertical_people_hex' as const },
                  { label: 'Tech', nameKey: 'vertical_tech_name' as const, hexKey: 'vertical_tech_hex' as const },
                ].map(({ label, nameKey, hexKey }) => (
                  <div key={label} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Input label={`${label} Name`} value={editPalette[nameKey]} onChange={(e) => setEditPalette({ ...editPalette, [nameKey]: e.target.value })} />
                    </div>
                    <ColourPicker value={editPalette[hexKey]} onChange={(v) => setEditPalette({ ...editPalette, [hexKey]: v })} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1">{isNew ? 'Create Palette' : 'Save Changes'}</Button>
              <Button variant="ghost" onClick={() => { setEditPalette(null); setIsNew(false); }}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
