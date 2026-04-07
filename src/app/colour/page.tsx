import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Colour System — INNOVA' };

const VERTICALS = [
  { name: 'Cinnamon', hex: '#D4772E', vertical: 'Space', desc: 'Managed offices and coworking', rgb: '212, 119, 46', cmyk: '0, 44, 78, 17', pantone: '7571 C',
    scale: [{ s: '900', h: '#6B3A14' }, { s: '700', h: '#A85A1F' }, { s: '500', h: '#D4772E' }, { s: '300', h: '#E8A872' }, { s: '100', h: '#F5DCC4' }, { s: '50', h: '#FBF0E4' }] },
  { name: 'Twilight Indigo', hex: '#2D4272', vertical: 'People', desc: 'IT staffing and talent solutions', rgb: '45, 66, 114', cmyk: '61, 42, 0, 55', pantone: '534 C',
    scale: [{ s: '900', h: '#142038' }, { s: '700', h: '#1F3155' }, { s: '500', h: '#2D4272' }, { s: '300', h: '#6B82A8' }, { s: '100', h: '#B8C5DA' }, { s: '50', h: '#E4E9F1' }] },
  { name: 'Hunter Green', hex: '#3D6B4F', vertical: 'Tech', desc: 'AV integration and smart workspaces', rgb: '61, 107, 79', cmyk: '43, 0, 26, 58', pantone: '7734 C',
    scale: [{ s: '900', h: '#1E3527' }, { s: '700', h: '#2D503B' }, { s: '500', h: '#3D6B4F' }, { s: '300', h: '#7AA38C' }, { s: '100', h: '#BDD5C6' }, { s: '50', h: '#E3EFE8' }] },
];

const NEUTRALS = [
  { name: 'Charcoal', hex: '#191919' }, { name: 'Graphite', hex: '#3A3A3A' }, { name: 'Stone', hex: '#6B6B6B' },
  { name: 'Silver', hex: '#A0A0A0' }, { name: 'Mist', hex: '#D4D0CA' }, { name: 'Ivory', hex: '#FAF7F3' }, { name: 'White', hex: '#FFFFFF' },
];

const CONTRAST = [
  { pair: 'Cinnamon on Ivory', ratio: '3.6:1', grade: 'AA Large Pass', c1: '#D4772E', c2: '#FAF7F3' },
  { pair: 'Twilight on Ivory', ratio: '8.2:1', grade: 'AA Pass', c1: '#2D4272', c2: '#FAF7F3' },
  { pair: 'Hunter on Ivory', ratio: '5.1:1', grade: 'AA Pass', c1: '#3D6B4F', c2: '#FAF7F3' },
];

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

export default function ColourPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#191919] px-8 py-12">
        <div className="max-w-[1000px] mx-auto">
          <img src="/brandmark.svg" alt="INNOVA" className="w-10 h-10 mb-4" style={{ filter: 'invert(1) brightness(2)' }} />
          <h1 className="font-display text-[36px] font-semibold text-[#FAF7F3] tracking-tight">Colour System</h1>
          <p className="font-mono text-[10px] text-[#6B6B6B] mt-2 uppercase tracking-[0.15em]">SPACE · PEOPLE · TECH</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-8 py-12 space-y-16">
        {/* Primary Palette */}
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-100 mb-6">Primary Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VERTICALS.map((v) => (
              <div key={v.name} className="rounded-lg overflow-hidden border border-ink-700">
                <div className="h-[200px] flex flex-col justify-end p-5" style={{ backgroundColor: v.hex }}>
                  <p className="font-body text-sm font-bold uppercase text-white">{v.vertical}</p>
                  <p className="font-body text-xs text-white/70 mt-0.5">{v.desc}</p>
                </div>
                <div className="p-5 bg-ink-900">
                  <p className="font-mono text-lg font-bold text-ink-100">{v.hex}</p>
                  <p className="font-body text-sm text-ink-300 mt-0.5">{v.name}</p>
                  <div className="mt-3 space-y-1 font-mono text-[10px] text-ink-500">
                    <p>RGB {v.rgb}</p>
                    <p>CMYK {v.cmyk}</p>
                    <p>Pantone {v.pantone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tint Scales */}
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-100 mb-6">Tint Scales</h2>
          {VERTICALS.map((v) => (
            <div key={v.name} className="mb-6">
              <p className="font-mono text-[10px] text-ink-500 uppercase tracking-wider mb-2">{v.name}</p>
              <div className="flex rounded-lg overflow-hidden border border-ink-700">
                {v.scale.map((s) => (
                  <div key={s.s} className="flex-1 h-[72px] flex items-center justify-center" style={{ backgroundColor: s.h }}>
                    <span className={`font-mono text-[9px] ${isLight(s.h) ? 'text-[#191919]' : 'text-white'}`}>{s.h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Neutrals */}
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-100 mb-6">Neutral Palette</h2>
          <div className="flex rounded-lg overflow-hidden border border-ink-700">
            {NEUTRALS.map((n) => (
              <div key={n.name} className="flex-1 h-[72px] flex flex-col items-center justify-center" style={{ backgroundColor: n.hex }}>
                <span className={`font-mono text-[9px] ${isLight(n.hex) ? 'text-[#191919]' : 'text-white'}`}>{n.name}</span>
                <span className={`font-mono text-[8px] mt-0.5 ${isLight(n.hex) ? 'text-[#191919]/60' : 'text-white/60'}`}>{n.hex}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-100 mb-6">Accessibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CONTRAST.map((c) => (
              <div key={c.pair} className="border border-ink-700 rounded-lg p-4 bg-ink-900">
                <div className="flex gap-2 mb-3">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: c.c1 }} />
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: c.c2 }} />
                </div>
                <p className="font-body text-sm text-ink-200">{c.pair}</p>
                <p className="font-mono text-lg font-bold text-ink-100 mt-1">{c.ratio}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-mono bg-hunter/15 text-hunter border border-hunter/20">{c.grade}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Rules */}
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-100 mb-6">Usage Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { type: 'DO', items: ['Use vertical colours as accents (5-15% of layout area)', 'Pair any vertical colour with Charcoal text', 'Default to Charcoal + Ivory for master brand contexts'] },
              { type: "DON'T", items: ['Use vertical colours as full backgrounds on large surfaces', 'Place Cinnamon text on Hunter backgrounds (vertical-on-vertical)', 'Use any colour not in this system'] },
            ].map((rule) => (
              <div key={rule.type} className={`border rounded-lg p-5 ${rule.type === 'DO' ? 'border-hunter/30 bg-hunter/5' : 'border-red-500/20 bg-red-500/5'}`}>
                <p className={`font-mono text-xs font-bold mb-3 ${rule.type === 'DO' ? 'text-hunter' : 'text-red-500'}`}>{rule.type}</p>
                <ul className="space-y-2">
                  {rule.items.map((item) => (
                    <li key={item} className="text-[13px] text-ink-300">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
