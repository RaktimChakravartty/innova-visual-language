'use client';

import { useState, useEffect } from 'react';
import { Key, Check, Eye, EyeOff, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useTheme } from '@/lib/theme';
import { PROVIDERS, getProviderKey, setProviderKey } from '@/lib/providers';

import type { Metadata } from 'next';

interface ProviderState {
  key: string;
  showKey: boolean;
  status: 'idle' | 'testing' | 'ok' | 'error';
  detail: string;
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [providers, setProviders] = useState<Record<string, ProviderState>>({});

  useEffect(() => {
    const initial: Record<string, ProviderState> = {};
    for (const p of PROVIDERS) {
      initial[p.id] = {
        key: getProviderKey(p.id),
        showKey: false,
        status: p.isServerSide ? 'ok' : 'idle',
        detail: p.isServerSide ? 'Included with platform' : '',
      };
    }
    setProviders(initial);
  }, []);

  const updateProvider = (id: string, updates: Partial<ProviderState>) => {
    setProviders((prev) => ({ ...prev, [id]: { ...prev[id], ...updates } }));
  };

  const handleSaveKey = (providerId: string) => {
    const state = providers[providerId];
    if (!state) return;
    setProviderKey(providerId, state.key);
  };

  const handleTestConnection = async (providerId: string) => {
    const state = providers[providerId];
    if (!state) return;
    updateProvider(providerId, { status: 'testing', detail: 'Testing...' });
    try {
      const res = await fetch('/api/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: providerId, apiKey: state.key || undefined }),
      });
      const data = await res.json();
      updateProvider(providerId, {
        status: data.ok ? 'ok' : 'error',
        detail: data.ok ? (data.detail || 'Connected') : (data.error || 'Connection failed'),
      });
    } catch {
      updateProvider(providerId, { status: 'error', detail: 'Network error' });
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-[900px] mx-auto">
      <ModuleHeader system="Settings" subtitle="Theme, image generation, and data management" />

      <div className="space-y-8">
        {/* Theme */}
        <div className="bg-ink-900 border border-ink-700 rounded-lg p-6">
          <h2 className="font-display text-base font-semibold text-ink-100 mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-200">Theme</p>
              <p className="text-[12px] text-ink-500">Switch between light and dark interface</p>
            </div>
            <Button variant="secondary" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </Button>
          </div>
        </div>

        {/* Image Generation */}
        <div>
          <h2 className="font-display text-base font-semibold text-ink-100 mb-4">Image Generation</h2>
          <p className="text-[13px] text-ink-400 mb-4">Connect image generation services to create illustrations directly from prompts.</p>

          <div className="space-y-3">
            {PROVIDERS.map((provider) => {
              const state = providers[provider.id];
              if (!state) return null;
              return (
                <div key={provider.id} className={`bg-ink-900 border rounded-lg p-5 transition-all ${
                  state.status === 'ok' ? 'border-hunter/30' : state.status === 'error' ? 'border-red-600/30' : 'border-ink-700'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{provider.icon}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-ink-100">{provider.name}</h3>
                        <p className="text-[11px] text-ink-500 mt-0.5">{provider.description}</p>
                      </div>
                    </div>
                    {state.status === 'ok' && <Badge variant="success">Connected</Badge>}
                    {state.status === 'error' && <Badge variant="warning">Error</Badge>}
                    {state.status === 'testing' && <Badge>Testing...</Badge>}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {provider.models.map((m) => (
                      <span key={m.id} className="px-2 py-0.5 rounded bg-ink-800 text-[10px] text-ink-400 border border-ink-700">
                        {m.name} {m.speed && <span className="text-ink-500">{m.speed}</span>}
                      </span>
                    ))}
                  </div>

                  {!provider.isServerSide && (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                        <input
                          type={state.showKey ? 'text' : 'password'}
                          value={state.key}
                          onChange={(e) => updateProvider(provider.id, { key: e.target.value })}
                          onBlur={() => handleSaveKey(provider.id)}
                          placeholder={provider.keyFormat}
                          className="w-full bg-ink-800 border border-ink-700 rounded-lg pl-9 pr-10 py-2 text-xs text-ink-100 font-mono placeholder:text-ink-600 focus:outline-none focus:ring-1 focus:ring-cinnamon/50"
                        />
                        <button onClick={() => updateProvider(provider.id, { showKey: !state.showKey })} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 cursor-pointer">
                          {state.showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                      <Button variant="secondary" size="sm" onClick={() => handleTestConnection(provider.id)} disabled={state.status === 'testing' || !state.key}>
                        {state.status === 'testing' ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        Test
                      </Button>
                    </div>
                  )}

                  {provider.isServerSide && (
                    <p className="text-[10px] text-hunter flex items-center gap-1">
                      <Check size={12} /> Included with platform. Always available.
                    </p>
                  )}

                  {state.detail && state.status !== 'idle' && (
                    <p className={`text-[10px] mt-2 ${state.status === 'ok' ? 'text-hunter' : state.status === 'error' ? 'text-red-400' : 'text-ink-500'}`}>
                      {state.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Data */}
        <div className="bg-ink-900 border border-ink-700 rounded-lg p-6">
          <h2 className="font-display text-base font-semibold text-ink-100 mb-3">Data Management</h2>
          <p className="text-[13px] text-ink-400 mb-4">All data is stored locally in your browser. Clearing will remove all saved assets, palettes, and preferences.</p>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm('Clear all saved data? This cannot be undone.')) {
                localStorage.removeItem('ink_generations');
                localStorage.removeItem('ink_palettes');
                localStorage.removeItem('ink_styles');
                window.location.reload();
              }
            }}
          >
            <Trash2 size={14} /> Clear Saved Data
          </Button>
        </div>
      </div>
    </div>
  );
}
