'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Pen,
  Copy,
  Check,
  Sparkles,
  Upload,
  Loader2,
  AlertCircle,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ColourPicker } from '@/components/ui/colour-picker';
import { assemblePrompt, assemblePlatformPrompt, assembleRawPrompt, PLATFORM_LABELS, PLATFORM_CHAR_LIMITS } from '@/lib/prompt-engine';
import type { PlatformVariant, PromptParams } from '@/lib/prompt-engine';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import {
  INK_MODE_LABELS,
  INK_MODE_DESCRIPTIONS,
  VERTICAL_LABELS,
  COMPOSITION_LABELS,
  COMPOSITION_DESCRIPTIONS,
  SUBJECT_SUGGESTIONS,
} from '@/lib/constants';
import {
  getActivePalette,
  getActiveStyleDefinition,
  saveGeneration,
  uploadImage,
  updateGenerationStatus,
} from '@/lib/store';
import { getAvailableAdapters } from '@/lib/generation-adapters';
import type { InkMode, Vertical, Composition, Palette, Generation } from '@/types/database';

export default function GeneratorPage() {
  // Settings
  const [inkMode, setInkMode] = useState<InkMode>('single_register');
  const [vertical, setVertical] = useState<Vertical>('space');
  const [composition, setComposition] = useState<Composition>('environmental');
  const [subject, setSubject] = useState('');
  const [colour1, setColour1] = useState('#E8A317');
  const [colour2, setColour2] = useState('#E86A50');
  const [detailLevel, setDetailLevel] = useState(100);
  const [selectedModel, setSelectedModel] = useState('hf_flux_schnell');

  // Platform prompt tabs
  const [activePlatform, setActivePlatform] = useState<PlatformVariant>('universal');
  const [copied, setCopied] = useState<string | null>(null);

  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [genError, setGenError] = useState<string | null>(null);
  const [lastGeneration, setLastGeneration] = useState<Generation | null>(null);

  const [palette, setPalette] = useState<Palette | null>(null);
  const [styleBlock, setStyleBlock] = useState('');
  const [exclusionsBlock, setExclusionsBlock] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    getActivePalette().then((p) => {
      if (p) {
        setPalette(p);
        setColour1(p.vertical_space_hex);
        setColour2(p.vertical_people_hex);
      }
    });
    getActiveStyleDefinition().then((s) => {
      if (s) {
        setStyleBlock(s.style_block);
        setExclusionsBlock(s.exclusions_block);
      }
    });
  }, []);

  useEffect(() => {
    if (!palette) return;
    switch (vertical) {
      case 'space': setColour1(palette.vertical_space_hex); break;
      case 'people': setColour1(palette.vertical_people_hex); break;
      case 'tech': setColour1(palette.vertical_tech_hex); break;
    }
  }, [vertical, palette]);

  const accentColours = inkMode === 'double_register' ? [colour1, colour2] : [colour1];

  const promptParams: PromptParams = useMemo(() => ({
    inkMode, vertical, composition, subject, accentColours, palette,
    styleBlock: styleBlock || undefined,
    exclusionsBlock: exclusionsBlock || undefined,
    detailLevel,
  }), [inkMode, vertical, composition, subject, colour1, colour2, palette, styleBlock, exclusionsBlock, detailLevel]);

  const displayPrompt = useMemo(
    () => assemblePlatformPrompt(promptParams, activePlatform),
    [promptParams, activePlatform]
  );

  const adapters = useMemo(() => getAvailableAdapters(), []);

  const handleCopy = useCallback(async (platform?: PlatformVariant) => {
    const text = platform ? assemblePlatformPrompt(promptParams, platform) : displayPrompt;
    await navigator.clipboard.writeText(text);
    setCopied(platform || activePlatform);
    setTimeout(() => setCopied(null), 2000);
  }, [promptParams, displayPrompt, activePlatform]);

  const buildGeneration = (imageUrl: string, model: string, source: 'generated' | 'uploaded'): Generation => ({
    id: uuidv4(),
    prompt_full: assemblePrompt(promptParams),
    prompt_version: 'v1',
    ink_mode: inkMode,
    vertical, composition, subject,
    accent_colours: accentColours,
    model, status: 'pending', feedback: null, tags: [],
    image_url: imageUrl, source,
    created_at: new Date().toISOString(),
  });

  const handleGenerate = async () => {
    const adapter = adapters.find((a) => a.id === selectedModel);
    if (!adapter || adapter.id === 'copy_prompt') {
      await handleCopy();
      return;
    }

    setGenerating(true);
    setGeneratedImage(null);
    setGenError(null);
    setLastGeneration(null);

    try {
      const rawPrompt = assembleRawPrompt(promptParams);
      const result = await adapter.generate(rawPrompt, exclusionsBlock);
      setGeneratedImage(result.image);

      const gen = buildGeneration(result.image, result.model, 'generated');
      await saveGeneration(gen);
      setLastGeneration(gen);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Generation failed';
      setGenError(message);
    } finally {
      setGenerating(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    const imageUrl = await uploadImage(file);
    setGeneratedImage(imageUrl);
    const gen = buildGeneration(imageUrl, 'manual_upload', 'uploaded');
    await saveGeneration(gen);
    setLastGeneration(gen);
  };

  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    if (!lastGeneration) return;
    await updateGenerationStatus(lastGeneration.id, status);
    setLastGeneration({ ...lastGeneration, status });
  };

  const detailLabel = detailLevel < 40 ? 'Minimal' : detailLevel < 70 ? 'Standard' : 'Maximum';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-8 pt-6 pb-4 border-b border-ink-700">
        <div className="flex items-center justify-between">
          <ModuleHeader system="The Ink Register" subtitle="Illustration System · Editorial gestural ink with selective colour accent" />
          <div className="flex items-center gap-2">
            <Select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              options={adapters.map((a) => ({ value: a.id, label: a.name }))}
              className="w-56"
            />
            <Button onClick={handleGenerate} disabled={generating}>
              {generating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {generating ? 'Generating...' : selectedModel === 'copy_prompt' ? 'Copy Prompt' : 'Generate'}
            </Button>
            <label className="inline-flex">
              <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }} className="hidden" />
              <span
                className="inline-flex items-center justify-center rounded-lg cursor-pointer bg-ink-800 text-ink-300 hover:bg-ink-700 border border-ink-700 px-3 py-2 text-sm transition"
                onClick={(e) => { (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement)?.click(); }}
              >
                <Upload size={16} />
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-88px)]">
        {/* ── LEFT: Settings Panel ── */}
        <div className="w-80 flex-shrink-0 border-r border-ink-700 overflow-y-auto p-5 space-y-5">

          {/* Ink Mode */}
          <div className="space-y-2.5">
            <h2 className="text-[11px] font-semibold text-ink-400 uppercase tracking-wider">Ink Mode</h2>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(INK_MODE_LABELS) as InkMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInkMode(mode)}
                  className={`p-2.5 rounded-lg text-left transition-all border cursor-pointer ${
                    inkMode === mode
                      ? 'bg-ink-800 border-amber/60 text-ink-50'
                      : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'
                  }`}
                >
                  <p className="text-[11px] font-medium">{INK_MODE_LABELS[mode]}</p>
                  <p className="text-[9px] text-ink-500 mt-0.5 line-clamp-2">{INK_MODE_DESCRIPTIONS[mode]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Vertical */}
          <div className="space-y-2">
            <h2 className="text-[11px] font-semibold text-ink-400 uppercase tracking-wider">Vertical</h2>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(VERTICAL_LABELS) as Vertical[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setVertical(v)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] transition-all border cursor-pointer ${
                    vertical === v
                      ? 'bg-ink-800 border-amber/60 text-ink-50 font-medium'
                      : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'
                  }`}
                >
                  {VERTICAL_LABELS[v]}
                </button>
              ))}
            </div>
          </div>

          {/* Composition */}
          <div className="space-y-2">
            <h2 className="text-[11px] font-semibold text-ink-400 uppercase tracking-wider">Composition</h2>
            <Select
              value={composition}
              onChange={(e) => setComposition(e.target.value as Composition)}
              options={Object.entries(COMPOSITION_LABELS).map(([v, l]) => ({ value: v, label: l }))}
            />
            <p className="text-[10px] text-ink-500 italic leading-relaxed">{COMPOSITION_DESCRIPTIONS[composition]}</p>
          </div>

          {/* Subject with autocomplete */}
          <div className="space-y-2">
            <h2 className="text-[11px] font-semibold text-ink-400 uppercase tracking-wider">Subject</h2>
            <div className="relative">
              <textarea
                value={subject}
                onChange={(e) => { setSubject(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Describe the scene..."
                className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber/50 resize-none h-16"
              />
              {showSuggestions && (
                <div className="absolute z-20 mt-1 w-full bg-ink-900 border border-ink-700 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                  {Object.entries(SUBJECT_SUGGESTIONS).map(([cat, items]) => {
                    const matching = items.filter((s) => !subject.trim() || s.toLowerCase().includes(subject.toLowerCase()));
                    if (matching.length === 0) return null;
                    return (
                      <div key={cat}>
                        <p className="px-3 py-1.5 text-[9px] uppercase tracking-wider text-ink-500 font-semibold bg-ink-900 sticky top-0">{cat}</p>
                        {matching.map((s) => (
                          <button
                            key={s}
                            onMouseDown={(e) => { e.preventDefault(); setSubject(s); setShowSuggestions(false); }}
                            className="w-full text-left px-3 py-1.5 text-[12px] text-ink-300 hover:bg-ink-800 cursor-pointer transition"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Colours */}
          {inkMode !== 'pure_ink' && (
            <div className="space-y-2.5">
              <h2 className="text-[11px] font-semibold text-ink-400 uppercase tracking-wider">Accent Colours</h2>
              <ColourPicker label="Primary" value={colour1} onChange={setColour1} />
              {inkMode === 'double_register' && (
                <ColourPicker label="Secondary" value={colour2} onChange={setColour2} />
              )}
              {palette && (
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { hex: palette.vertical_space_hex, name: palette.vertical_space_name },
                    { hex: palette.vertical_people_hex, name: palette.vertical_people_name },
                    { hex: palette.vertical_tech_hex, name: palette.vertical_tech_name },
                  ].map(({ hex, name }) => (
                    <button
                      key={hex}
                      onClick={() => setColour1(hex)}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] bg-ink-800 hover:bg-ink-700 transition cursor-pointer border border-ink-700"
                    >
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: hex }} />
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Detail Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-semibold text-ink-400 uppercase tracking-wider">Prompt Detail</h2>
              <span className="text-[10px] text-ink-500">{detailLabel} ({detailLevel}%)</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={detailLevel}
              onChange={(e) => setDetailLevel(Number(e.target.value))}
              className="w-full accent-amber h-1.5 cursor-pointer"
            />
            <p className="text-[9px] text-ink-500">Low = concise (weak models). High = detailed (strong models like Recraft V4).</p>
          </div>
        </div>

        {/* ── RIGHT: Prompt + Preview ── */}
        <div className="flex-1 overflow-y-auto flex flex-col">

          {/* ── Assembled Prompt (always visible, top) ── */}
          <div className="p-6 flex-1 min-h-0 flex flex-col">
            {/* Platform Tabs */}
            <div className="flex items-center gap-1 mb-3 flex-wrap">
              {(Object.keys(PLATFORM_LABELS) as PlatformVariant[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePlatform(p)}
                  className={`px-3 py-1.5 rounded-md text-[11px] transition cursor-pointer ${
                    activePlatform === p
                      ? 'bg-ink-800 text-ink-50 font-medium border border-ink-600'
                      : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/60 border border-transparent'
                  }`}
                >
                  {PLATFORM_LABELS[p]}
                </button>
              ))}
            </div>

            {/* Prompt Text */}
            <div className="relative flex-1 min-h-[200px] max-h-[45vh]">
              <pre className="w-full h-full text-[12px] text-ink-200 bg-ink-900 border border-ink-700 rounded-xl p-5 overflow-auto whitespace-pre-wrap font-mono leading-relaxed">
                {displayPrompt}
              </pre>
            </div>

            {/* Copy buttons */}
            <div className="flex items-center gap-2 mt-3">
              <Button
                onClick={() => handleCopy()}
                size="lg"
                className="flex-shrink-0"
              >
                {copied === activePlatform ? <Check size={18} /> : <Copy size={18} />}
                {copied === activePlatform ? 'Copied!' : `Copy ${PLATFORM_LABELS[activePlatform]} Prompt`}
              </Button>

              {/* Quick copy buttons for other platforms */}
              <div className="flex gap-1 flex-wrap">
                {(Object.keys(PLATFORM_LABELS) as PlatformVariant[])
                  .filter((p) => p !== activePlatform)
                  .slice(0, 4)
                  .map((p) => (
                    <button
                      key={p}
                      onClick={() => handleCopy(p)}
                      className={`px-2.5 py-1.5 rounded-md text-[10px] transition cursor-pointer border ${
                        copied === p
                          ? 'bg-emerald-600/20 text-emerald-500 border-emerald-600/30'
                          : 'text-ink-400 hover:text-ink-200 bg-ink-900 border-ink-700 hover:bg-ink-800'
                      }`}
                    >
                      {copied === p ? 'Copied!' : `Copy ${PLATFORM_LABELS[p]}`}
                    </button>
                  ))}
              </div>

              <span className="ml-auto text-[10px] flex items-center gap-1.5">
                {(() => {
                  const len = displayPrompt.length;
                  const limit = PLATFORM_CHAR_LIMITS[activePlatform];
                  const overLimit = limit !== null && len > limit;
                  return (
                    <>
                      <span className={overLimit ? 'text-red-500 font-semibold' : 'text-ink-500'}>
                        {len.toLocaleString()} chars
                      </span>
                      {limit !== null && (
                        <span className={overLimit ? 'text-red-400' : 'text-ink-600'}>
                          / {limit.toLocaleString()} max
                        </span>
                      )}
                      {overLimit && (
                        <span className="text-red-400 font-medium">
                          — over limit, reduce detail or shorten subject
                        </span>
                      )}
                    </>
                  );
                })()}
              </span>
            </div>
          </div>

          {/* ── Preview (below prompt) ── */}
          <div className="border-t border-ink-700 p-6">
            <div className="bg-ink-900 border border-ink-700 rounded-xl overflow-hidden">
              {generating ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Loader2 size={28} className="animate-spin text-amber mx-auto" />
                    <p className="text-ink-300 text-sm">Generating with {lastGeneration?.model || selectedModel}...</p>
                    <p className="text-ink-500 text-xs">Usually takes 10-30 seconds</p>
                  </div>
                </div>
              ) : genError ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center space-y-3 max-w-md px-6">
                    <AlertCircle size={28} className="text-red-400 mx-auto" />
                    <p className="text-red-400 text-sm font-medium">Generation Failed</p>
                    <p className="text-ink-500 text-xs">{genError}</p>
                    <p className="text-ink-600 text-[10px]">Try copying the prompt and pasting into Freepik, Recraft, or Kittl directly.</p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="ghost" size="sm" onClick={() => setGenError(null)}>Dismiss</Button>
                      <Button size="sm" onClick={() => handleCopy('universal')}>
                        <Copy size={12} /> Copy Prompt Instead
                      </Button>
                    </div>
                  </div>
                </div>
              ) : generatedImage ? (
                <div>
                  <div className="relative bg-white">
                    <img src={generatedImage} alt={subject || 'Generated illustration'} className="w-full max-h-[500px] object-contain" />
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <Badge variant="amber">{INK_MODE_LABELS[inkMode]}</Badge>
                      <Badge variant="cobalt">{COMPOSITION_LABELS[composition]}</Badge>
                      {lastGeneration?.model && <Badge variant="success">{lastGeneration.model}</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-ink-900">
                    <div className="flex gap-1.5">
                      <Button
                        variant={lastGeneration?.status === 'approved' ? 'primary' : 'secondary'}
                        size="sm" onClick={() => handleStatusUpdate('approved')}
                      >
                        <ThumbsUp size={14} /> Approve
                      </Button>
                      <Button
                        variant={lastGeneration?.status === 'rejected' ? 'danger' : 'secondary'}
                        size="sm" onClick={() => handleStatusUpdate('rejected')}
                      >
                        <ThumbsDown size={14} /> Reject
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleGenerate}>
                      <RotateCcw size={14} /> Regenerate
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Pen size={24} className="text-ink-500 mx-auto" />
                    <p className="text-ink-400 text-sm">No illustration yet</p>
                    <p className="text-ink-600 text-xs">Select a model and hit Generate, or upload an image</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
