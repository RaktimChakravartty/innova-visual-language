import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Typography — INNOVA Visual Language' };

export default function TypographyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#191919] px-8 py-12">
        <div className="max-w-[1000px] mx-auto">
          <img src="/brandmark.svg" alt="INNOVA" className="w-10 h-10 mb-4" style={{ filter: 'invert(1) brightness(2)' }} />
          <h1 className="font-display text-[36px] font-semibold text-[#FAF7F3] tracking-tight">Typography System</h1>
          <p className="font-mono text-[10px] text-[#6B6B6B] mt-2 uppercase tracking-[0.15em]">FOUR TYPEFACES · THREE ROLES</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-8 py-12 space-y-16">

        {/* 01 Wordmark */}
        <section className="border border-ink-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-ink-500">01 — WORDMARK</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">Licensed</span>
          </div>
          <p className="font-body text-sm italic text-ink-400 mb-6">PP Neue Machina Inktrap UltraBold — Pangram Pangram Foundry</p>
          <div className="flex items-center gap-4 mb-4">
            <img src="/brandmark.svg" alt="INNOVA brandmark" className="w-16 h-16" style={{ filter: 'var(--brandmark-filter, none)' }} />
            <span className="font-display text-[48px] font-bold text-ink-100 tracking-tight">innova</span>
          </div>
          <p className="text-[12px] text-ink-500">Used exclusively for the wordmark. Not for body text. Requires commercial licence from Pangram Pangram Foundry.</p>
        </section>

        {/* 02 Display */}
        <section className="border border-ink-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-ink-500">02 — DISPLAY & HEADLINES</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-hunter/10 text-hunter border border-hunter/20">Open Source</span>
          </div>
          <p className="font-body text-sm italic text-ink-400 mb-6">Fraunces — Google Fonts</p>
          <p className="font-display text-[48px] font-semibold text-ink-100 leading-tight mb-2">Where work comes together</p>
          <p className="font-display text-[36px] italic text-ink-300 leading-tight mb-8">Everything your work needs.</p>
          <div className="flex gap-8 mb-6">
            {[
              { w: 'Light', n: 300 }, { w: 'Regular', n: 400 }, { w: 'SemiBold', n: 600 }, { w: 'Bold', n: 700 },
            ].map((f) => (
              <div key={f.w} className="text-center">
                <span className="font-display text-[32px] text-ink-200" style={{ fontWeight: f.n }}>Ag</span>
                <p className="font-mono text-[9px] text-ink-500 mt-1">{f.w} ({f.n})</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-ink-500">For hero text, headlines, taglines, and messaging.</p>
        </section>

        {/* 03 Body */}
        <section className="border border-ink-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-ink-500">03 — BODY & INTERFACE</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-hunter/10 text-hunter border border-hunter/20">Open Source</span>
          </div>
          <p className="font-body text-sm italic text-ink-400 mb-6">DM Sans — Google Fonts</p>
          <p className="font-body text-[16px] text-ink-200 leading-[1.65] max-w-2xl mb-8">
            INNOVA AM Tech is one of India&apos;s pioneering enterprise workplace solutions companies, operating at the intersection of managed office spaces, IT staffing, and smart workplace technology. Founded in 1996 in Noida, the company has grown into a comprehensive provider serving enterprise clients across the National Capital Region.
          </p>
          <div className="flex gap-8 mb-6">
            {[
              { w: 'Light', n: 300 }, { w: 'Regular', n: 400 }, { w: 'Medium', n: 500 }, { w: 'Bold', n: 700 },
            ].map((f) => (
              <div key={f.w} className="text-center">
                <span className="font-body text-[24px] text-ink-200" style={{ fontWeight: f.n }}>Ag</span>
                <p className="font-mono text-[9px] text-ink-500 mt-1">{f.w} ({f.n})</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-ink-500">For paragraphs, emails, documents, presentations, UI text.</p>
        </section>

        {/* 04 Functional */}
        <section className="border border-ink-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-ink-500">04 — FUNCTIONAL & DATA</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-hunter/10 text-hunter border border-hunter/20">Open Source</span>
          </div>
          <p className="font-body text-sm italic text-ink-400 mb-6">Space Mono — Google Fonts</p>
          <div className="font-mono text-[12px] text-ink-300 space-y-1 mb-8">
            <p>EST. 1996 — NOIDA NCR</p>
            <p>SPACE · PEOPLE · TECH</p>
            <p>D-108, SECTOR 63, NOIDA 201301</p>
            <p>CIN: U74990DL2022PTC394519</p>
          </div>
          <p className="text-[12px] text-ink-500">For captions, labels, metadata, technical information, dates, and addresses.</p>
        </section>

        {/* Summary Card */}
        <section className="bg-[#191919] rounded-lg p-8">
          <h3 className="font-display text-lg font-semibold text-[#FAF7F3] mb-6">Type System Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { role: 'Wordmark', font: 'PP Neue Machina', use: 'Brand name only' },
              { role: 'Display', font: 'Fraunces', use: 'Headlines, taglines' },
              { role: 'Body', font: 'DM Sans', use: 'Paragraphs, UI' },
              { role: 'Functional', font: 'Space Mono', use: 'Labels, data, specs' },
            ].map((t) => (
              <div key={t.role}>
                <p className="font-mono text-[10px] text-[#D4772E] uppercase tracking-wider">{t.role}</p>
                <p className="text-[14px] text-[#FAF7F3] font-medium mt-1">{t.font}</p>
                <p className="text-[12px] text-[#9A958F] mt-0.5">{t.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Example */}
        <section className="bg-ink-900 border border-ink-700 rounded-lg p-8">
          <p className="font-mono text-[9px] text-ink-500 uppercase tracking-wider mb-6">Usage Example</p>
          <div className="space-y-4">
            <p className="font-display text-[28px] font-semibold text-ink-100 leading-tight">Where work comes together</p>
            <p className="font-body text-[14px] text-ink-300 leading-relaxed max-w-xl">
              Three decades of enterprise workplace expertise. From managed offices to smart technology integration, INNOVA AM Tech creates environments where people do their best work.
            </p>
            <p className="font-mono text-[10px] text-ink-500 uppercase tracking-[0.15em]">INNOVA AM TECH · EST. 1996 · SPACE · PEOPLE · TECH</p>
          </div>
        </section>
      </div>
    </div>
  );
}
