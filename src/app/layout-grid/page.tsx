'use client';

import { useState, useMemo, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useToast } from '@/components/shared/Toast';
import { FORMATS, getAccentColour, getBgColour, generateCSS, type ApplicationType, type LayoutTemplate, type LayoutVertical, type LayoutBg } from '@/lib/constants/layout';

function GridPreview({ format, vertical, bg }: { format: typeof FORMATS[ApplicationType]; vertical: LayoutVertical; bg: LayoutBg }) {
  const scale = 300 / Math.max(format.width, format.height);
  const w = format.width * scale;
  const h = format.height * scale;
  const m = { top: format.margins.top * scale, bottom: format.margins.bottom * scale, left: format.margins.left * scale, right: format.margins.right * scale };
  const accent = getAccentColour(vertical);
  const bgCol = getBgColour(bg, vertical);
  const liveW = w - m.left - m.right;
  const colW = format.columns > 0 ? (liveW - (format.columns - 1) * format.gutter * scale) / format.columns : liveW;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md border border-ink-700 rounded-lg" style={{ background: bgCol }}>
      {/* Margins */}
      <rect x={m.left} y={m.top} width={liveW} height={h - m.top - m.bottom} fill="none" stroke="#E8E4DF" strokeWidth="0.5" strokeDasharray="3,2" />
      {/* Column grid */}
      {Array.from({ length: format.columns }).map((_, i) => {
        const x = m.left + i * (colW + format.gutter * scale);
        return <rect key={i} x={x} y={m.top} width={colW} height={h - m.top - m.bottom} fill={accent} opacity="0.06" />;
      })}
      {/* Accent bar */}
      <rect x={0} y={h - 4} width={w * 0.3} height={4} fill={accent} opacity="0.6" />
      {/* Wordmark zone */}
      <rect x={m.left} y={m.top} width={liveW * 0.2} height={8} fill="#191919" opacity="0.15" rx="1" />
      {/* Dimension labels */}
      <text x={w / 2} y={h - 2} textAnchor="middle" fontSize="5" fill="#9A958F" fontFamily="Space Mono, monospace">{format.width}×{format.height}{format.unit}</text>
    </svg>
  );
}

export default function LayoutGridPage() {
  const { showToast } = useToast();
  const [appType, setAppType] = useState<ApplicationType>('presentation');
  const [template, setTemplate] = useState<LayoutTemplate>('hero');
  const [vertical, setVertical] = useState<LayoutVertical>('space');
  const [bg, setBg] = useState<LayoutBg>('ivory');
  const [copied, setCopied] = useState<string | null>(null);

  const format = FORMATS[appType];
  const css = useMemo(() => generateCSS(format, bg, vertical), [format, bg, vertical]);
  const accent = getAccentColour(vertical);

  const handleCopy = useCallback(async (what: string, text: string) => {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard');
    setCopied(what);
    setTimeout(() => setCopied(null), 2000);
  }, [showToast]);

  const specText = `DIMENSIONS\nFormat: ${format.label}\nSize: ${format.width} × ${format.height} ${format.unit}\nOrientation: ${format.orientation}\nBleed: ${format.bleed}\n\nGRID\nColumns: ${format.columns}\nGutter: ${format.gutter}${format.unit}\nMargins — Top: ${format.margins.top}${format.unit}\nMargins — Bottom: ${format.margins.bottom}${format.unit}\nMargins — Left: ${format.margins.left}${format.unit}\nMargins — Right: ${format.margins.right}${format.unit}\n\nSPACING\nBase: ${format.spaceBase}${format.unit}\nScale: ×2, ×3, ×4, ×6, ×8, ×12\n\nTYPOGRAPHY\nDisplay: ${format.typo.display}\nHeading: ${format.typo.heading}\nBody: ${format.typo.body}\nLabel: ${format.typo.label}\n\nWORDMARK\nPlacement: ${format.wordmark.placement}\nMin width: ${format.wordmark.minWidth}\nClear space: ${format.wordmark.clearSpace}\n\nQuiet zone: ${format.quietZone}`;

  return (
    <div className="min-h-screen">
      <div className="px-8 pt-6 pb-4 border-b border-ink-700">
        <ModuleHeader system="The Trap Grid" subtitle="Layout & Grid System · Derived from brandmark clear space proportions" />
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* LEFT */}
        <div className="w-80 flex-shrink-0 border-r border-ink-700 overflow-y-auto p-5 space-y-5">
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Application Format</p>
            <div className="space-y-1">
              {(Object.keys(FORMATS) as ApplicationType[]).map((t) => (
                <button key={t} onClick={() => setAppType(t)} className={`w-full text-left px-3 py-2 rounded-lg border transition cursor-pointer text-[11px] ${appType === t ? 'bg-ink-800 border-cinnamon/50 text-ink-50 font-medium' : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'}`}>
                  {FORMATS[t].label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Layout Template</p>
            <div className="flex flex-wrap gap-1.5">
              {(['hero', 'content', 'data', 'social', 'minimal'] as LayoutTemplate[]).map((t) => (
                <button key={t} onClick={() => setTemplate(t)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer capitalize ${template === t ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>{t}</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Vertical Accent</p>
            <div className="flex flex-wrap gap-1.5">
              {(['space', 'people', 'tech', 'master'] as LayoutVertical[]).map((v) => (
                <button key={v} onClick={() => setVertical(v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer capitalize ${vertical === v ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getAccentColour(v) }} />
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Background</p>
            <div className="flex flex-wrap gap-1.5">
              {(['ivory', 'charcoal', 'white', 'vertical'] as LayoutBg[]).map((b) => (
                <button key={b} onClick={() => setBg(b)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer capitalize ${bg === b ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400'}`}>
                  <span className="w-2.5 h-2.5 rounded border border-ink-600" style={{ backgroundColor: getBgColour(b, vertical) }} />
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SVG Grid Preview */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 mb-3">Grid Preview</p>
            <GridPreview format={format} vertical={vertical} bg={bg} />
          </div>

          {/* Spec Table */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 mb-4">Specification</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-[11px]">
              {[
                ['Format', format.label],
                ['Size', `${format.width} × ${format.height} ${format.unit}`],
                ['Orientation', format.orientation],
                ['Bleed', format.bleed],
                ['Columns', `${format.columns}`],
                ['Gutter', `${format.gutter}${format.unit}`],
                ['Margin Top', `${format.margins.top}${format.unit}`],
                ['Margin Bottom', `${format.margins.bottom}${format.unit}`],
                ['Margin Left', `${format.margins.left}${format.unit}`],
                ['Margin Right', `${format.margins.right}${format.unit}`],
                ['Space Base', `${format.spaceBase}${format.unit}`],
                ['Display Type', format.typo.display],
                ['Heading Type', format.typo.heading],
                ['Body Type', format.typo.body],
                ['Label Type', format.typo.label],
                ['Wordmark', format.wordmark.placement],
                ['Wordmark Min Width', format.wordmark.minWidth],
                ['Clear Space', format.wordmark.clearSpace],
                ['Quiet Zone', format.quietZone],
                ['Accent', `${accent} (${vertical})`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-0.5 border-b border-ink-800">
                  <span className="text-ink-400">{k}</span>
                  <span className="text-ink-200 font-mono text-[10px]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" onClick={() => handleCopy('specs', specText)}>
              {copied === 'specs' ? <Check size={14} /> : <Copy size={14} />}
              {copied === 'specs' ? 'Copied!' : 'Copy Specs'}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => handleCopy('css', css)}>
              {copied === 'css' ? <Check size={14} /> : <Copy size={14} />}
              {copied === 'css' ? 'Copied!' : 'Copy CSS'}
            </Button>
          </div>

          {/* CSS Preview */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl overflow-hidden">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500 px-5 pt-4 mb-2">CSS Custom Properties</p>
            <pre className="px-5 pb-4 text-[11px] text-ink-300 font-mono overflow-auto max-h-64 whitespace-pre leading-relaxed">{css}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
