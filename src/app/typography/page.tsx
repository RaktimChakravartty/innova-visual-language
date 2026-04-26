'use client';

import { useState } from 'react';
import { Wordmark } from '@/components/brand/Wordmark';
import { Brandmark } from '@/components/brand/Brandmark';

export default function TypographyPage() {
  const [testText, setTestText] = useState('Where work comes together');
  const [testFont, setTestFont] = useState<'display' | 'body' | 'mono'>('display');
  const [testSize, setTestSize] = useState(32);
  const [testWeight, setTestWeight] = useState(600);

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="bg-[#191919] px-8 py-12">
        <div className="max-w-[1000px] mx-auto">
          <Brandmark size={40} color="#FAF7F3" className="mb-4" />
          <h1 className="font-display text-[36px] font-semibold text-[#FAF7F3] tracking-tight">Typography System</h1>
          <p className="font-mono text-[10px] text-[#6B6B6B] mt-2 uppercase tracking-[0.15em]">THREE TYPEFACES · THREE ROLES</p>
        </div>
      </div>
      <div className="max-w-[1000px] mx-auto px-8 py-12 space-y-16">
        <section className="border border-ink-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-ink-500">01 · WORDMARK</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">Licensed</span>
          </div>
          <p className="font-body text-sm italic text-ink-400 mb-6">PP Neue Machina Inktrap UltraBold · Pangram Pangram Foundry</p>
          <div className="mb-4"><Wordmark height={56} className="text-ink-100" /></div>
          <p className="text-[12px] text-ink-500">Used exclusively for the wordmark. Not for body text. Requires commercial licence from Pangram Pangram Foundry.</p>
        </section>
        <section className="border border-ink-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-ink-500">02 · DISPLAY & HEADLINES</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-hunter/10 text-hunter border border-hunter/20">Open Source</span>
          </div>
          <p className="font-body text-sm italic text-ink-400 mb-6">Fraunces · Google Fonts</p>
          <p className="font-display text-[48px] font-semibold text-ink-100 leading-tight mb-2">Where work comes together</p>
          <p className="font-display text-[36px] italic text-ink-300 leading-tight mb-8">Everything your work needs.</p>
          <div className="flex gap-8 mb-6">{[{ w: 'Light', n: 300 }, { w: 'Regular', n: 400 }, { w: 'SemiBold', n: 600 }, { w: 'Bold', n: 700 }].map((f) => (<div key={f.w} className="text-center"><span className="font-display text-[32px] text-ink-200" style={{ fontWeight: f.n }}>Ag</span><p className="font-mono text-[9px] text-ink-500 mt-1">{f.w} ({f.n})</p></div>))}</div>
          <p className="text-[12px] text-ink-500">For hero text, headlines, taglines, and messaging.</p>
        </section>
        <section className="border border-ink-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-ink-500">03 · BODY & INTERFACE</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-hunter/10 text-hunter border border-hunter/20">Open Source</span>
          </div>
          <p className="font-body text-sm italic text-ink-400 mb-6">DM Sans · Google Fonts</p>
          <p className="font-body text-[16px] text-ink-200 leading-[1.65] max-w-2xl mb-8">INNOVA AM Tech is one of India&apos;s pioneering enterprise workplace solutions companies, operating at the intersection of managed office spaces, IT staffing, and smart workplace technology. Founded in 1996 in Noida, the company has grown into a comprehensive provider serving enterprise clients across the National Capital Region.</p>
          <div className="flex gap-8 mb-6">{[{ w: 'Light', n: 300 }, { w: 'Regular', n: 400 }, { w: 'Medium', n: 500 }, { w: 'Bold', n: 700 }].map((f) => (<div key={f.w} className="text-center"><span className="font-body text-[24px] text-ink-200" style={{ fontWeight: f.n }}>Ag</span><p className="font-mono text-[9px] text-ink-500 mt-1">{f.w} ({f.n})</p></div>))}</div>
          <p className="text-[12px] text-ink-500">For paragraphs, emails, documents, presentations, UI text.</p>
        </section>
        <section className="border border-ink-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-ink-500">04 · FUNCTIONAL & DATA</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-hunter/10 text-hunter border border-hunter/20">Open Source</span>
          </div>
          <p className="font-body text-sm italic text-ink-400 mb-6">Space Mono · Google Fonts</p>
          <div className="font-mono text-[12px] text-ink-300 space-y-1 mb-8"><p>EST. 1996 · NOIDA NCR</p><p>SPACE · PEOPLE · TECH</p><p>D-108, SECTOR 63, NOIDA 201301</p><p>CIN: U74990DL2022PTC394519</p></div>
          <p className="text-[12px] text-ink-500">For captions, labels, metadata, technical information, dates, and addresses.</p>
        </section>
        <section className="border border-ink-700 rounded-lg p-8">
          <span className="font-mono text-[10px] text-ink-500">05 · TYPE TESTER</span>
          <div className="mt-4 space-y-4">
            <input type="text" value={testText} onChange={(e) => setTestText(e.target.value)} placeholder="Type to preview..." className="w-full bg-ink-800 border border-ink-700 rounded-lg px-4 py-3 text-ink-100 focus:outline-none focus:ring-1 focus:ring-cinnamon/50" />
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex gap-1">{(['display', 'body', 'mono'] as const).map((f) => (<button key={f} onClick={() => setTestFont(f)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer ${testFont === f ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'border-ink-700 text-ink-400'}`}>{f === 'display' ? 'Fraunces' : f === 'body' ? 'DM Sans' : 'Space Mono'}</button>))}</div>
              <div className="flex items-center gap-2"><span className="text-[10px] text-ink-500">Size</span><input type="range" min={12} max={72} value={testSize} onChange={(e) => setTestSize(Number(e.target.value))} className="w-24 accent-cinnamon" /><span className="font-mono text-[10px] text-ink-400 w-8">{testSize}px</span></div>
              <div className="flex items-center gap-2"><span className="text-[10px] text-ink-500">Weight</span><input type="range" min={300} max={700} step={100} value={testWeight} onChange={(e) => setTestWeight(Number(e.target.value))} className="w-24 accent-cinnamon" /><span className="font-mono text-[10px] text-ink-400 w-8">{testWeight}</span></div>
            </div>
            <div className="min-h-[80px] flex items-center py-4"><p style={{ fontFamily: testFont === 'display' ? 'var(--font-display)' : testFont === 'body' ? 'var(--font-body)' : 'var(--font-mono)', fontSize: `${testSize}px`, fontWeight: testWeight }} className="text-ink-100 leading-tight break-words w-full">{testText || 'Type something above...'}</p></div>
            <p className="font-mono text-[9px] text-ink-500">font-family: {testFont === 'display' ? "'Fraunces'" : testFont === 'body' ? "'DM Sans'" : "'Space Mono'"}; font-size: {testSize}px; font-weight: {testWeight};</p>
          </div>
        </section>
        <section className="bg-[#191919] rounded-lg p-8">
          <h3 className="font-display text-lg font-semibold text-[#FAF7F3] mb-6">Type System Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[{ role: 'Wordmark', font: 'PP Neue Machina', use: 'Brand name only' }, { role: 'Display', font: 'Fraunces', use: 'Headlines, taglines' }, { role: 'Body', font: 'DM Sans', use: 'Paragraphs, UI' }, { role: 'Functional', font: 'Space Mono', use: 'Labels, data, specs' }].map((t) => (<div key={t.role}><p className="font-mono text-[10px] text-[#D4772E] uppercase tracking-wider">{t.role}</p><p className="text-[14px] text-[#FAF7F3] font-medium mt-1">{t.font}</p><p className="text-[12px] text-[#9A958F] mt-0.5">{t.use}</p></div>))}</div>
        </section>
        <section className="bg-ink-900 border border-ink-700 rounded-lg p-8">
          <p className="font-mono text-[9px] text-ink-500 uppercase tracking-wider mb-6">Usage Example</p>
          <div className="space-y-4">
            <p className="font-display text-[28px] font-semibold text-ink-100 leading-tight">Where work comes together</p>
            <p className="font-body text-[14px] text-ink-300 leading-relaxed max-w-xl">Three decades of enterprise workplace expertise. From managed offices to smart technology integration, INNOVA AM Tech creates environments where people do their best work.</p>
            <p className="font-mono text-[10px] text-ink-500 uppercase tracking-[0.15em]">INNOVA AM TECH · EST. 1996 · SPACE · PEOPLE · TECH</p>
          </div>
        </section>
      </div>
    </div>
  );
}
