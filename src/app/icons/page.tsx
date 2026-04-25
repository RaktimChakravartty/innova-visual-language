'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Download, Copy, Check } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useToast } from '@/components/shared/Toast';
import { ICONS, ICON_CATEGORIES } from '@/data/icons';
import type { IconEntry } from '@/data/icons';

type VerticalColour = 'neutral' | 'space' | 'people' | 'tech';
type IconSize = 32 | 48 | 64 | 128;

const VERTICAL_COLOURS: Record<VerticalColour, string> = {
  neutral: '#1A1A1A',
  space: '#D4772E',
  people: '#2D4272',
  tech: '#3D6B4F',
};

const ICON_CONTAINER_SIZE: Record<IconSize, number> = {
  32: 28,
  48: 40,
  64: 52,
  128: 100,
};

function IconCard({ icon, size, colour, onCopy, onDownload }: {
  icon: IconEntry;
  size: IconSize;
  colour: string;
  onCopy: (icon: IconEntry) => void;
  onDownload: (icon: IconEntry) => void;
}) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [hover, setHover] = useState(false);

  useEffect(() => {
    fetch(icon.path)
      .then((r) => r.text())
      .then((text) => setSvgContent(text))
      .catch(() => setSvgContent(''));
  }, [icon.path]);

  const containerSize = ICON_CONTAINER_SIZE[size];

  return (
    <div
      className="relative flex flex-col items-center p-4 border rounded-xl transition-all duration-150 cursor-default"
      style={{
        borderColor: '#D4D0CA',
        backgroundColor: hover ? '#FAF7F3' : 'transparent',
        transform: hover ? 'scale(1.02)' : 'scale(1)',
        height: size + 72,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
        style={{ width: containerSize, height: containerSize, color: colour, marginTop: (size - containerSize) / 2 }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      <p className="font-mono text-[10px] text-ink-400 text-center truncate w-full mt-auto">{icon.label}</p>

      {hover && (
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onCopy(icon); }}
            className="p-1.5 rounded-md bg-ink-900 border border-ink-700 text-ink-400 hover:text-ink-100 transition cursor-pointer"
            title="Copy SVG"
          >
            <Copy size={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDownload(icon); }}
            className="p-1.5 rounded-md bg-ink-900 border border-ink-700 text-ink-400 hover:text-ink-100 transition cursor-pointer"
            title="Download SVG"
          >
            <Download size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function IconsPage() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [verticalColour, setVerticalColour] = useState<VerticalColour>('neutral');
  const [iconSize, setIconSize] = useState<IconSize>(48);

  const filtered = useMemo(() => {
    return ICONS.filter((icon) => {
      if (activeCategory !== 'all' && icon.category !== activeCategory) return false;
      if (searchQuery && !icon.label.toLowerCase().includes(searchQuery.toLowerCase()) && !icon.id.includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [searchQuery, activeCategory]);

  const handleCopy = useCallback(async (icon: IconEntry) => {
    try {
      const res = await fetch(icon.path);
      const svg = await res.text();
      await navigator.clipboard.writeText(svg);
      showToast('SVG copied');
    } catch {
      showToast('Failed to copy');
    }
  }, [showToast]);

  const handleDownload = useCallback(async (icon: IconEntry) => {
    try {
      const res = await fetch(icon.path);
      const svg = await res.text();
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = icon.id + '.svg';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      showToast('Failed to download');
    }
  }, [showToast]);

  const colour = VERTICAL_COLOURS[verticalColour];

  return (
    <div className="min-h-screen">
      <div className="px-8 pt-6 pb-4 border-b border-ink-700">
        <ModuleHeader system="The Dot Grid" subtitle="Icon System · Derived from brandmark geometry" />
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Left sidebar */}
        <div className="w-80 flex-shrink-0 border-r border-ink-700 overflow-y-auto p-5 space-y-6">

          {/* Search */}
          <div>
            <div className="relative">
              <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search icons..."
                className="w-full bg-transparent border-b border-ink-700 pl-6 pb-2 text-[13px] text-ink-100 placeholder:text-ink-500 focus:outline-none focus:border-cinnamon transition"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-1">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 mb-2">Categories</p>
            {ICON_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition cursor-pointer flex items-center justify-between ${
                  activeCategory === cat.id
                    ? 'bg-ink-800 text-ink-50 font-medium border-l-3 border-l-cinnamon'
                    : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/40'
                }`}
                style={activeCategory === cat.id ? { borderLeft: `3px solid ${colour}` } : undefined}
              >
                <span>{cat.label}</span>
                <span className="font-mono text-[10px] text-ink-500">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Vertical Colour */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Vertical Expression</p>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(VERTICAL_COLOURS) as VerticalColour[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setVerticalColour(v)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] border transition cursor-pointer capitalize ${
                    verticalColour === v
                      ? 'bg-ink-800 border-cinnamon/50 text-ink-50'
                      : 'bg-transparent border-ink-700 text-ink-400 hover:border-ink-600'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: VERTICAL_COLOURS[v] }} />
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Size</p>
            <div className="flex gap-1.5">
              {([32, 48, 64, 128] as IconSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setIconSize(s)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono border transition cursor-pointer ${
                    iconSize === s
                      ? 'bg-ink-800 border-cinnamon/50 text-ink-50'
                      : 'bg-transparent border-ink-700 text-ink-400 hover:border-ink-600'
                  }`}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div className="pt-2 border-t border-ink-700">
            <p className="font-mono text-[10px] text-ink-500">
              Showing {filtered.length} of {ICONS.length} icons
            </p>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-ink-400 text-sm">No icons match your search</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="text-cinnamon text-xs mt-2 hover:underline cursor-pointer">
                  Clear filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filtered.map((icon) => (
                <IconCard
                  key={icon.id}
                  icon={icon}
                  size={iconSize}
                  colour={colour}
                  onCopy={handleCopy}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
