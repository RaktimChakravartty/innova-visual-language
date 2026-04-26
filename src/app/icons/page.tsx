'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Download, Copy, Check, Filter, X } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useToast } from '@/components/shared/Toast';
import { useTheme } from '@/lib/theme';
import { ICONS, ICON_CATEGORIES } from '@/data/icons';
import type { IconEntry } from '@/data/icons';

type VerticalColour = 'neutral' | 'space' | 'people' | 'tech';
type IconSize = 32 | 48 | 64 | 128;

const VERTICAL_COLOURS: Record<VerticalColour, string> = {
  neutral: '#191919',
  space: '#D4772E',
  people: '#2D4272',
  tech: '#3D6B4F',
};

const ICON_CONTAINER_SIZE: Record<IconSize, number> = {
  32: 28, 48: 40, 64: 52, 128: 100,
};

function IconCard({ icon, size, colour, onCopy, onDownload }: {
  icon: IconEntry; size: IconSize; colour: string;
  onCopy: (icon: IconEntry) => void; onDownload: (icon: IconEntry) => void;
}) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    fetch(icon.path).then((r) => r.text()).then(setSvgContent).catch(() => setSvgContent(''));
  }, [icon.path]);

  const containerSize = ICON_CONTAINER_SIZE[size];

  return (
    <div
      className="group relative flex flex-col items-center p-3 border rounded-lg card-hover cursor-default"
      style={{ borderColor: 'var(--border-default)', height: 140 }}
      title={icon.label}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full my-auto"
        style={{ width: containerSize, height: containerSize, color: colour }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      <p className="font-mono text-[9px] text-ink-400 text-center truncate w-full mt-auto">{icon.label}</p>

      <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button onClick={(e) => { e.stopPropagation(); onCopy(icon); }} className="p-1 rounded bg-ink-900/90 border border-ink-700 text-ink-400 hover:text-ink-100 transition cursor-pointer" title="Copy SVG">
          <Copy size={11} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDownload(icon); }} className="p-1 rounded bg-ink-900/90 border border-ink-700 text-ink-400 hover:text-ink-100 transition cursor-pointer" title="Download SVG">
          <Download size={11} />
        </button>
      </div>
    </div>
  );
}

export default function IconsPage() {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [verticalColour, setVerticalColour] = useState<VerticalColour>('neutral');
  const [iconSize, setIconSize] = useState<IconSize>(48);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return ICONS.filter((icon) => {
      if (activeCategory !== 'all' && icon.category !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const catLabel = ICON_CATEGORIES.find(c => c.id === icon.category)?.label || '';
        if (!icon.label.toLowerCase().includes(q) && !icon.id.includes(q) && !catLabel.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [searchQuery, activeCategory]);

  const handleCopy = useCallback(async (icon: IconEntry) => {
    try {
      const res = await fetch(icon.path);
      const svg = await res.text();
      await navigator.clipboard.writeText(svg);
      showToast('SVG copied');
    } catch { showToast('Failed to copy'); }
  }, [showToast]);

  const handleDownload = useCallback(async (icon: IconEntry) => {
    try {
      const res = await fetch(icon.path);
      const svg = await res.text();
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = icon.id + '.svg'; a.click();
      URL.revokeObjectURL(url);
    } catch { showToast('Failed to download'); }
  }, [showToast]);

  const colour = verticalColour === 'neutral' && theme === 'dark' ? '#FAF7F3' : VERTICAL_COLOURS[verticalColour];

  const filterContent = (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 mb-2">Categories</p>
        <div className="flex flex-wrap gap-1.5">
          {ICON_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'text-ink-50 font-medium'
                  : 'text-ink-400 hover:text-ink-200 bg-ink-800/40 hover:bg-ink-800'
              }`}
              style={activeCategory === cat.id ? { backgroundColor: colour + '20', color: colour, border: `1px solid ${colour}30` } : { border: '1px solid transparent' }}
            >
              {cat.label} <span className="text-ink-500 ml-0.5">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 mb-2">Colour</p>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(VERTICAL_COLOURS) as VerticalColour[]).map((v) => (
            <button
              key={v}
              onClick={() => setVerticalColour(v)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] border transition cursor-pointer capitalize ${
                verticalColour === v ? 'bg-ink-800 border-ink-600 text-ink-50' : 'bg-transparent border-ink-700 text-ink-400 hover:border-ink-600'
              }`}
            >
              <span className="w-4 h-4 rounded-full flex-shrink-0 border border-ink-600" style={{ backgroundColor: VERTICAL_COLOURS[v] }} />
              {v}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 mb-2">Size</p>
        <div className="flex gap-1.5">
          {([32, 48, 64, 128] as IconSize[]).map((s) => (
            <button
              key={s}
              onClick={() => setIconSize(s)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono border transition cursor-pointer ${
                iconSize === s ? 'bg-ink-800 border-ink-600 text-ink-50' : 'bg-transparent border-ink-700 text-ink-400 hover:border-ink-600'
              }`}
            >{s}px</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="px-4 md:px-8 pt-6 pb-4 border-b border-ink-700">
        <div className="flex items-center justify-between">
          <ModuleHeader system="The Dot Grid" subtitle="Icon System · Derived from brandmark geometry" accentColour="#2D4272" />
          <p className="font-mono text-[11px] text-ink-500 hidden md:block">{filtered.length} of {ICONS.length} icons</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)]">
        <div className="hidden lg:block w-80 flex-shrink-0 border-r border-ink-700 overflow-y-auto p-5">
          <div className="relative mb-5">
            <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search icons..."
              className="w-full bg-transparent border-b border-ink-700 pl-6 pb-2 text-[13px] text-ink-100 placeholder:text-ink-500 focus:outline-none focus:border-cinnamon/50 transition"
            />
          </div>
          {filterContent}
        </div>

        <div className="lg:hidden px-4 py-3 border-b border-ink-700">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search icons..."
                className="w-full bg-ink-800 border border-ink-700 rounded-lg pl-8 pr-3 py-2 text-[13px] text-ink-100 placeholder:text-ink-500 focus:outline-none"
              />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-lg border transition cursor-pointer ${showFilters ? 'bg-ink-800 border-cinnamon/50 text-ink-100' : 'border-ink-700 text-ink-400'}`}>
              <Filter size={16} />
            </button>
            <p className="font-mono text-[10px] text-ink-500">{filtered.length}</p>
          </div>
          {showFilters && <div className="mt-3 animate-fade-in">{filterContent}</div>}
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-64 animate-fade-in">
              <div className="text-center">
                <p className="text-ink-400 text-sm">No icons match your search</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="text-cinnamon text-xs mt-2 hover:underline cursor-pointer">Clear filters</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {filtered.map((icon) => (
                <IconCard key={icon.id} icon={icon} size={iconSize} colour={colour} onCopy={handleCopy} onDownload={handleDownload} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
