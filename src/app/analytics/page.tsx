'use client';

import { useState, useEffect, useCallback } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { getGenerations } from '@/lib/store';
import { INK_MODE_LABELS, VERTICAL_LABELS, COMPOSITION_LABELS } from '@/lib/constants';
import type { Generation } from '@/types/database';

interface StatGroup {
  label: string;
  total: number;
  approved: number;
  rejected: number;
  pending: number;
  rate: number;
}

function calcStats(gens: Generation[], key: keyof Generation, labels: Record<string, string>): StatGroup[] {
  const grouped: Record<string, Generation[]> = {};
  for (const g of gens) {
    const k = g[key] as string;
    if (!grouped[k]) grouped[k] = [];
    grouped[k].push(g);
  }
  return Object.entries(grouped)
    .map(([k, items]) => {
      const approved = items.filter((i) => i.status === 'approved').length;
      return {
        label: labels[k] || k,
        total: items.length,
        approved,
        rejected: items.filter((i) => i.status === 'rejected').length,
        pending: items.filter((i) => i.status === 'pending').length,
        rate: items.length > 0 ? Math.round((approved / items.length) * 100) : 0,
      };
    })
    .sort((a, b) => b.total - a.total);
}

function StatBar({ stat }: { stat: StatGroup }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-ink-300 w-44 truncate">{stat.label}</span>
      <div className="flex-1 h-5 bg-ink-800 rounded-full overflow-hidden flex">
        {stat.approved > 0 && <div className="bg-emerald-600 h-full transition-all" style={{ width: `${(stat.approved / stat.total) * 100}%` }} />}
        {stat.pending > 0 && <div className="bg-amber/60 h-full transition-all" style={{ width: `${(stat.pending / stat.total) * 100}%` }} />}
        {stat.rejected > 0 && <div className="bg-red-600/60 h-full transition-all" style={{ width: `${(stat.rejected / stat.total) * 100}%` }} />}
      </div>
      <span className="text-xs font-medium text-ink-300 w-10 text-right">{stat.rate}%</span>
      <span className="text-[10px] text-ink-500 w-8 text-right">{stat.total}</span>
    </div>
  );
}

export default function AnalyticsPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const data = await getGenerations();
    setGenerations(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const total = generations.length;
  const approved = generations.filter((g) => g.status === 'approved').length;
  const rejected = generations.filter((g) => g.status === 'rejected').length;
  const pending = generations.filter((g) => g.status === 'pending').length;
  const uploaded = generations.filter((g) => g.source === 'uploaded').length;
  const generated = generations.filter((g) => g.source === 'generated').length;

  const byMode = calcStats(generations, 'ink_mode', INK_MODE_LABELS);
  const byVertical = calcStats(generations, 'vertical', VERTICAL_LABELS);
  const byComposition = calcStats(generations, 'composition', COMPOSITION_LABELS);

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-ink-50">Analytics</h1>
        <p className="text-ink-500 text-sm mt-0.5">Approval rates and generation insights</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-ink-500">Loading...</div>
      ) : total === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center">
            <BarChart3 size={24} className="text-ink-400" />
          </div>
          <p className="text-ink-300 text-lg font-medium">No data yet</p>
          <p className="text-ink-500 text-sm mt-1">Generate or upload illustrations to see analytics</p>
          <a href="/" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber text-ink-950 font-semibold text-sm hover:bg-amber/90 transition">
            Start Generating
          </a>
        </div>
      ) : (
        <div className="max-w-4xl space-y-6">
          {/* Overview cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Total', value: total, color: 'text-ink-50' },
              { label: 'Approved', value: approved, color: 'text-emerald-400' },
              { label: 'Rejected', value: rejected, color: 'text-red-400' },
              { label: 'Pending', value: pending, color: 'text-amber' },
              { label: 'Generated', value: generated, color: 'text-cobalt' },
              { label: 'Uploaded', value: uploaded, color: 'text-coral' },
            ].map((card) => (
              <div key={card.label} className="bg-ink-900 border border-ink-700 rounded-xl p-4">
                <p className="text-[10px] text-ink-500 uppercase tracking-wider">{card.label}</p>
                <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>

          {/* Overall approval rate */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-ink-400" />
              <h3 className="text-sm font-semibold text-ink-100">Overall Approval Rate</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-5 bg-ink-800 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${total > 0 ? (approved / total) * 100 : 0}%` }} />
              </div>
              <span className="text-xl font-bold text-ink-50">{total > 0 ? Math.round((approved / total) * 100) : 0}%</span>
            </div>
            <div className="flex gap-4 mt-3 text-[10px] text-ink-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600" /> Approved</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber/60" /> Pending</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600/60" /> Rejected</span>
            </div>
          </div>

          {/* Breakdowns */}
          {[
            { title: 'By Ink Mode', data: byMode },
            { title: 'By Vertical', data: byVertical },
            { title: 'By Composition', data: byComposition },
          ].map(({ title, data }) => (
            data.length > 0 && (
              <div key={title} className="bg-ink-900 border border-ink-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-ink-100">{title}</h3>
                  <div className="flex gap-4 text-[9px] text-ink-500">
                    <span>Approval %</span>
                    <span>Count</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {data.map((s) => <StatBar key={s.label} stat={s} />)}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
