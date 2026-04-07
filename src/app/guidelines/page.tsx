import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Guidelines — INNOVA Visual Language',
};

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen">
      <div className="px-8 py-4 border-b border-ink-700 flex items-center justify-between">
        <div>
          <h1 className="font-display text-lg font-semibold text-ink-100">Brand Guidelines V10</h1>
          <p className="font-mono text-[10px] text-ink-500">April 2026 · Complete brand identity system</p>
        </div>
        <a
          href="/innova_brand_guidelines_v10.html"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-cinnamon hover:underline"
        >
          Open in new tab →
        </a>
      </div>
      <iframe
        src="/innova_brand_guidelines_v10.html"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 73px)' }}
        title="INNOVA Brand Guidelines V10"
      />
    </div>
  );
}
