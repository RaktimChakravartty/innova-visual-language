'use client';

import { useState, useEffect } from 'react';
import { Key, Check, AlertCircle, Zap, Eye, EyeOff, Loader2, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isSupabaseConfigured } from '@/lib/supabase';
import { PROVIDERS, getProviderKey, setProviderKey } from '@/lib/providers';

interface ProviderState {
  key: string;
  showKey: boolean;
  status: 'idle' | 'testing' | 'ok' | 'error';
  detail: string;
}

export default function SettingsPage() {
  const [supabaseOk, setSupabaseOk] = useState(false);
  const [providers, setProviders] = useState<Record<string, ProviderState>>({});

  useEffect(() => {
    setSupabaseOk(isSupabaseConfigured());

    // Initialize provider states from localStorage
    const initial: Record<string, ProviderState> = {};
    for (const p of PROVIDERS) {
      initial[p.id] = {
        key: getProviderKey(p.id),
        showKey: false,
        status: p.isServerSide ? 'ok' : 'idle',
        detail: p.isServerSide ? 'Built-in server token' : '',
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
        body: JSON.stringify({
          provider: providerId,
          apiKey: state.key || undefined,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        updateProvider(providerId, { status: 'ok', detail: data.detail || 'Connected' });
      } else {
        updateProvider(providerId, { status: 'error', detail: data.error || 'Connection failed' });
      }
    } catch {
      updateProvider(providerId, { status: 'error', detail: 'Network error' });
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-ink-50">Settings</h1>
        <p className="text-ink-500 text-sm mt-0.5">API providers, storage, and configuration</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Connection Overview */}
        <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-ink-100 mb-4">System Status</h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink-800 border border-ink-700">
              {supabaseOk ? <Wifi size={14} className="text-emerald-500" /> : <WifiOff size={14} className="text-amber" />}
              <span className="text-xs text-ink-300">
                Storage: {supabaseOk ? 'Supabase' : 'Local Storage'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink-800 border border-ink-700">
              <span className="text-xs text-ink-300">
                Active providers: {Object.values(providers).filter((p) => p.status === 'ok' || p.key).length}
              </span>
            </div>
          </div>
        </div>

        {/* Provider Cards */}
        <div>
          <h2 className="text-sm font-semibold text-ink-100 mb-4 flex items-center gap-2">
            <Zap size={16} /> Image Generation Providers
          </h2>

          <div className="space-y-3">
            {PROVIDERS.map((provider) => {
              const state = providers[provider.id];
              if (!state) return null;

              return (
                <div
                  key={provider.id}
                  className={`bg-ink-900 border rounded-xl p-5 transition-all ${
                    state.status === 'ok' ? 'border-emerald-600/30' : state.status === 'error' ? 'border-red-600/30' : 'border-ink-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{provider.icon}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-ink-100">{provider.name}</h3>
                        <p className="text-[11px] text-ink-500 mt-0.5">{provider.description}</p>
                      </div>
                    </div>
                    <div>
                      {state.status === 'ok' && <Badge variant="success">Connected</Badge>}
                      {state.status === 'error' && <Badge variant="warning">Error</Badge>}
                      {state.status === 'testing' && <Badge>Testing...</Badge>}
                      {state.status === 'idle' && state.key && <Badge>Key Set</Badge>}
                      {state.status === 'idle' && !state.key && !provider.isServerSide && <Badge>Not Configured</Badge>}
                    </div>
                  </div>

                  {/* Models */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {provider.models.map((m) => (
                      <span key={m.id} className="px-2 py-0.5 rounded bg-ink-800 text-[10px] text-ink-400 border border-ink-700">
                        {m.name} {m.speed && <span className="text-ink-500">{m.speed}</span>}
                      </span>
                    ))}
                  </div>

                  {/* API Key Input */}
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
                          className="w-full bg-ink-800 border border-ink-700 rounded-lg pl-9 pr-10 py-2 text-xs text-ink-100 font-mono placeholder:text-ink-600 focus:outline-none focus:ring-1 focus:ring-amber/50"
                        />
                        <button
                          onClick={() => updateProvider(provider.id, { showKey: !state.showKey })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 cursor-pointer"
                        >
                          {state.showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleTestConnection(provider.id)}
                        disabled={state.status === 'testing' || (!state.key && !provider.isServerSide)}
                      >
                        {state.status === 'testing' ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        Test
                      </Button>
                    </div>
                  )}

                  {/* Server-side info */}
                  {provider.isServerSide && (
                    <p className="text-[10px] text-emerald-500/80 flex items-center gap-1">
                      <Check size={12} /> Built-in server token. Always available. Add your own HF Pro token for faster generation.
                    </p>
                  )}

                  {/* Status detail */}
                  {state.detail && state.status !== 'idle' && (
                    <p className={`text-[10px] mt-2 ${state.status === 'ok' ? 'text-emerald-500' : state.status === 'error' ? 'text-red-400' : 'text-ink-500'}`}>
                      {state.detail}
                    </p>
                  )}

                  {/* Signup link */}
                  {!provider.isServerSide && (
                    <p className="text-[10px] text-ink-600 mt-2">
                      Get your key at{' '}
                      <a href={provider.signupUrl} target="_blank" rel="noopener noreferrer" className="text-amber hover:underline">
                        {provider.signupUrl.replace('https://', '').split('/')[0]}
                      </a>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Supabase Config */}
        <div className="bg-ink-900 border border-ink-700 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-ink-100 flex items-center gap-2">
            <AlertCircle size={16} /> Supabase Configuration
          </h2>
          <p className="text-xs text-ink-400">
            Set environment variables in <code className="text-amber bg-ink-800 px-1 rounded text-[11px]">.env.local</code> to enable cloud storage:
          </p>
          <pre className="text-[11px] text-ink-400 bg-ink-950 rounded-lg p-3 font-mono">
{`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
          </pre>
          <p className="text-[10px] text-ink-600">Without Supabase, data is stored in browser localStorage.</p>
        </div>

        {/* Clear Data */}
        <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-ink-100 mb-3">Storage</h2>
          <p className="text-xs text-ink-400 mb-3">
            {supabaseOk ? 'Cloud storage via Supabase.' : 'Browser local storage. Data is device-specific.'}
          </p>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm('Clear all local data? This cannot be undone.')) {
                localStorage.removeItem('ink_generations');
                localStorage.removeItem('ink_palettes');
                localStorage.removeItem('ink_styles');
                window.location.reload();
              }
            }}
          >
            Clear Local Data
          </Button>
        </div>
      </div>
    </div>
  );
}
