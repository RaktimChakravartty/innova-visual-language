'use client';

import { useState, useMemo, useCallback } from 'react';
import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { useToast } from '@/components/shared/Toast';
import { PLATFORM_LABELS, PLATFORM_CHAR_LIMITS } from '@/lib/prompt-engine';
import type { PlatformVariant } from '@/lib/prompt-engine';
import {
  SHOT_TYPES, ENVIRONMENT_ELEMENTS, PEOPLE_OPTIONS, DIVERSITY_OPTIONS,
  AGE_OPTIONS, COLOUR_INTEGRATION_OPTIONS, PHOTO_STYLE_BLOCK,
  PHOTO_GRADE_BLOCK, PHOTO_EXCLUSIONS, LIGHTROOM_PRESET,
  QUALITY_CHECKLIST, PHOTO_PRESETS,
  type ShotType, type PhotoVertical,
} from '@/lib/constants/photography';

function assemblePhotoPrompt(
  shotType: ShotType, vertical: PhotoVertical, elements: number[],
  people: string, diversity: string, customDiversity: string,
  age: string, colourIntegration: string, subject: string,
  focal: string, aperture: string, angle: string,
): string {
  const shot = SHOT_TYPES[shotType];
  const envDesc = elements.map((i) => ENVIRONMENT_ELEMENTS[i]?.prompt).filter(Boolean).join('. ');
  const peopleDesc = people === '0' ? '' : `${people} people in frame${diversity === 'custom' ? `, ${customDiversity}` : diversity === 'south_asian' ? ', predominantly South Asian workplace context' : ', mixed ethnicities (South Asian, East Asian, Middle Eastern, diverse)'}. Age range: ${age === 'young' ? '25-35' : age === 'senior' ? '45-60' : '25-55'}.`;
  const colourDesc = colourIntegration === 'natural' ? '' :
    colourIntegration === 'cinnamon' ? 'Brand colour present: warm terracotta and walnut tones prominent.' :
    colourIntegration === 'twilight' ? 'Brand colour present: navy/indigo clothing or textile visible.' :
    colourIntegration === 'hunter' ? 'Brand colour present: green plants and foliage prominent.' :
    'All three brand colours present as physical objects: terracotta/walnut warmth, navy/indigo textiles, green plants.';

  const subjectBlock = subject || shot.description;

  return [
    `── STYLE ──\n${PHOTO_STYLE_BLOCK}`,
    `── SUBJECT ──\n${shot.label} shot. ${subjectBlock}${peopleDesc ? ` ${peopleDesc}` : ''}${envDesc ? ` Environment: ${envDesc}.` : ''}${colourDesc ? ` ${colourDesc}` : ''}`,
    `── CAMERA ──\nShot at ${focal}, ${aperture}. ${angle}. ${shotType === 'detail' ? 'Very shallow depth of field, background completely blurred.' : shotType === 'portrait' ? 'Shallow DOF, environment softly blurred behind subject.' : 'Moderate depth of field, environment partially in focus.'}`,
    `── GRADE ──\n${PHOTO_GRADE_BLOCK}`,
    `── EXCLUSIONS ──\n${PHOTO_EXCLUSIONS}`,
  ].join('\n\n');
}

function formatForPlatform(prompt: string, platform: PlatformVariant): string {
  if (platform === 'universal') return prompt;
  if (platform === 'midjourney') {
    const core = prompt.replace(/── \w+ ──\n/g, '').replace(/── EXCLUSIONS ──[\s\S]*$/, '');
    return `${core.trim()} --no flash blue-light fluorescent stock-photo posed ring-light studio chrome steel harsh-shadow --ar 4:3 --v 7 --style raw`;
  }
  if (platform === 'recraft') {
    return `Style: photographic, substyle: film\n\n${prompt.replace(/── EXCLUSIONS ──[\s\S]*$/, '')}`;
  }
  if (platform === 'freepik') {
    const lines = prompt.split('\n').filter(l => !l.startsWith('──') && l.trim());
    return lines.join(' ').slice(0, 900);
  }
  if (platform === 'dalle') {
    return prompt.replace(/── (\w+) ──/g, '').replace(/\n{3,}/g, '\n\n');
  }
  if (platform === 'stable_diffusion') {
    const parts = prompt.split('── EXCLUSIONS ──');
    const positive = `masterpiece, best quality, professional photography, ${(parts[0] || '').replace(/── \w+ ──\n/g, '').trim()}`;
    const negative = (parts[1] || '').trim().replace(/No /g, '').replace(/\./g, ',').replace(/ ,/g, ',');
    return `POSITIVE PROMPT:\n${positive}\n\nNEGATIVE PROMPT:\n${negative}, blurry, low quality, amateur, overexposed, underexposed`;
  }
  return prompt;
}

export default function PhotographyPage() {
  const { showToast } = useToast();
  const [shotType, setShotType] = useState<ShotType>('establishing');
  const [vertical, setVertical] = useState<PhotoVertical>('space');
  const [elements, setElements] = useState<number[]>([0, 2, 3, 4]);
  const [people, setPeople] = useState('2-3');
  const [diversity, setDiversity] = useState('mixed');
  const [customDiversity, setCustomDiversity] = useState('');
  const [age, setAge] = useState('mixed');
  const [colourIntegration, setColourIntegration] = useState('cinnamon');
  const [subject, setSubject] = useState('');
  const [focal, setFocal] = useState(SHOT_TYPES.establishing.focal);
  const [aperture, setAperture] = useState(SHOT_TYPES.establishing.aperture);
  const [angle, setAngle] = useState(SHOT_TYPES.establishing.angle);
  const [activePlatform, setActivePlatform] = useState<PlatformVariant>('universal');
  const [copied, setCopied] = useState<string | null>(null);
  const [showLightroom, setShowLightroom] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const updateShotType = (t: ShotType) => {
    setShotType(t);
    setFocal(SHOT_TYPES[t].focal);
    setAperture(SHOT_TYPES[t].aperture);
    setAngle(SHOT_TYPES[t].angle);
  };

  const loadPreset = (p: typeof PHOTO_PRESETS[number]) => {
    updateShotType(p.shotType);
    setVertical(p.vertical);
    setElements(p.elements);
    setPeople(p.people);
    setAge(p.age);
    setSubject(p.subject);
  };

  const toggleElement = (i: number) => {
    setElements((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  };

  const rawPrompt = useMemo(() =>
    assemblePhotoPrompt(shotType, vertical, elements, people, diversity, customDiversity, age, colourIntegration, subject, focal, aperture, angle),
    [shotType, vertical, elements, people, diversity, customDiversity, age, colourIntegration, subject, focal, aperture, angle]
  );

  const displayPrompt = useMemo(() => formatForPlatform(rawPrompt, activePlatform), [rawPrompt, activePlatform]);

  const handleCopy = useCallback(async (platform?: PlatformVariant) => {
    const text = platform ? formatForPlatform(rawPrompt, platform) : displayPrompt;
    await navigator.clipboard.writeText(text);
    setCopied(platform || activePlatform);
    showToast('Copied to clipboard');
    setTimeout(() => setCopied(null), 2000);
  }, [rawPrompt, displayPrompt, activePlatform, showToast]);

  const handleCopyLightroom = async () => {
    const text = LIGHTROOM_PRESET.map((p) => `${p.param}: ${p.value}`).join('\n');
    await navigator.clipboard.writeText(text);
    showToast('Preset values copied');
    setCopied('lightroom');
    setTimeout(() => setCopied(null), 2000);
  };

  const charLimit = PLATFORM_CHAR_LIMITS[activePlatform];
  const overLimit = charLimit !== null && displayPrompt.length > charLimit;

  return (
    <div className="min-h-screen">
      <div className="px-8 pt-6 pb-4 border-b border-ink-700">
        <ModuleHeader system="The Working Notebook" subtitle="Photography System · Kodak Portra 400 editorial workplace aesthetic" />
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* LEFT: Controls */}
        <div className="w-80 flex-shrink-0 border-r border-ink-700 overflow-y-auto p-5 space-y-5">

          {/* Presets */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Quick Presets</p>
            <div className="flex flex-wrap gap-1.5">
              {PHOTO_PRESETS.map((p) => (
                <button key={p.name} onClick={() => loadPreset(p)} className="px-2.5 py-1.5 rounded-lg text-[10px] bg-ink-800 text-ink-400 hover:text-ink-200 hover:bg-ink-700 border border-ink-700 transition cursor-pointer">
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Shot Type */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Shot Type</p>
            {(Object.keys(SHOT_TYPES) as ShotType[]).map((t) => (
              <button key={t} onClick={() => updateShotType(t)} className={`w-full text-left p-2.5 rounded-lg border transition cursor-pointer ${shotType === t ? 'bg-ink-800 border-cinnamon/50 text-ink-50' : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'}`}>
                <p className="text-[11px] font-medium">{SHOT_TYPES[t].label}</p>
                <p className="text-[9px] text-ink-500 mt-0.5">{SHOT_TYPES[t].description}</p>
              </button>
            ))}
          </div>

          {/* Vertical */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Vertical Emphasis</p>
            <div className="flex flex-wrap gap-1.5">
              {(['space', 'people', 'tech', 'all'] as PhotoVertical[]).map((v) => (
                <button key={v} onClick={() => setVertical(v)} className={`px-3 py-1.5 rounded-lg text-[11px] border transition cursor-pointer ${vertical === v ? 'bg-ink-800 border-cinnamon/50 text-ink-50 font-medium' : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'}`}>
                  {v === 'all' ? 'All Three' : v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Environment */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Environment Elements</p>
            <div className="space-y-1">
              {ENVIRONMENT_ELEMENTS.map((el, i) => (
                <label key={i} className="flex items-center gap-2 text-[11px] text-ink-300 cursor-pointer hover:text-ink-100">
                  <input type="checkbox" checked={elements.includes(i)} onChange={() => toggleElement(i)} className="rounded border-ink-600 accent-cinnamon" />
                  {el.label}
                </label>
              ))}
            </div>
          </div>

          {/* People */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">People in Frame</p>
            <select value={people} onChange={(e) => setPeople(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[12px] text-ink-100">
              {PEOPLE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {people !== '0' && (
            <>
              <div className="space-y-2">
                <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Diversity</p>
                <select value={diversity} onChange={(e) => setDiversity(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[12px] text-ink-100">
                  {DIVERSITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {diversity === 'custom' && (
                  <input type="text" value={customDiversity} onChange={(e) => setCustomDiversity(e.target.value)} placeholder="Describe..." className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[12px] text-ink-100 placeholder:text-ink-500" />
                )}
              </div>
              <div className="space-y-2">
                <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Age Range</p>
                <select value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[12px] text-ink-100">
                  {AGE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Colour Integration */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Brand Colour Integration</p>
            <select value={colourIntegration} onChange={(e) => setColourIntegration(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[12px] text-ink-100">
              {COLOUR_INTEGRATION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Subject override */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Subject (optional override)</p>
            <textarea value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Leave empty for auto-generated from shot type..." className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[12px] text-ink-100 placeholder:text-ink-500 resize-none h-16" />
          </div>

          {/* Camera overrides */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-500">Camera Spec</p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[9px] text-ink-500">Focal</label>
                <input value={focal} onChange={(e) => setFocal(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded px-2 py-1 text-[11px] text-ink-100 font-mono" />
              </div>
              <div>
                <label className="text-[9px] text-ink-500">Aperture</label>
                <input value={aperture} onChange={(e) => setAperture(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded px-2 py-1 text-[11px] text-ink-100 font-mono" />
              </div>
              <div>
                <label className="text-[9px] text-ink-500">Angle</label>
                <input value={angle} onChange={(e) => setAngle(e.target.value)} className="w-full bg-ink-800 border border-ink-700 rounded px-2 py-1 text-[11px] text-ink-100 font-mono" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Output */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Platform Tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {(Object.keys(PLATFORM_LABELS) as PlatformVariant[]).map((p) => (
              <button key={p} onClick={() => setActivePlatform(p)} className={`px-3 py-1.5 rounded-md text-[11px] transition cursor-pointer ${activePlatform === p ? 'bg-ink-800 text-ink-50 font-medium border border-ink-600' : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/50 border border-transparent'}`}>
                {PLATFORM_LABELS[p]}
              </button>
            ))}
          </div>

          {/* Prompt */}
          <pre className="w-full text-[12px] text-ink-200 bg-ink-900 border border-ink-700 rounded-xl p-5 overflow-auto max-h-[40vh] whitespace-pre-wrap font-mono leading-relaxed">
            {displayPrompt}
          </pre>

          {/* Copy + char count */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button onClick={() => handleCopy()} size="lg">
              {copied === activePlatform ? <Check size={16} /> : <Copy size={16} />}
              {copied === activePlatform ? 'Copied!' : `Copy ${PLATFORM_LABELS[activePlatform]}`}
            </Button>
            {(Object.keys(PLATFORM_LABELS) as PlatformVariant[]).filter(p => p !== activePlatform).slice(0, 3).map((p) => (
              <button key={p} onClick={() => handleCopy(p)} className={`px-2.5 py-1.5 rounded-md text-[10px] transition cursor-pointer border ${copied === p ? 'bg-emerald-600/20 text-emerald-500 border-emerald-600/30' : 'text-ink-400 bg-ink-900 border-ink-700 hover:bg-ink-800'}`}>
                {copied === p ? 'Copied!' : `Copy ${PLATFORM_LABELS[p]}`}
              </button>
            ))}
            <span className={`ml-auto text-[10px] ${overLimit ? 'text-red-500 font-semibold' : 'text-ink-500'}`}>
              {displayPrompt.length.toLocaleString()} chars{charLimit ? ` / ${charLimit.toLocaleString()} max` : ''}
              {overLimit && ' — over limit'}
            </span>
          </div>

          {/* Lightroom Preset */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl overflow-hidden">
            <button onClick={() => setShowLightroom(!showLightroom)} className="w-full flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-ink-800/50 transition">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Post-Generation Grade — Lightroom / Camera Raw</span>
              {showLightroom ? <ChevronDown size={14} className="text-ink-500" /> : <ChevronRight size={14} className="text-ink-500" />}
            </button>
            {showLightroom && (
              <div className="px-5 pb-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {LIGHTROOM_PRESET.map((p) => (
                    <div key={p.param} className="flex justify-between py-0.5 border-b border-ink-800">
                      <span className="text-[11px] text-ink-400">{p.param}</span>
                      <span className="text-[11px] text-ink-200 font-mono">{p.value}</span>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" size="sm" className="mt-3" onClick={handleCopyLightroom}>
                  {copied === 'lightroom' ? <Check size={12} /> : <Copy size={12} />}
                  {copied === 'lightroom' ? 'Copied!' : 'Copy Preset Values'}
                </Button>
              </div>
            )}
          </div>

          {/* Quality Checklist */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl overflow-hidden">
            <button onClick={() => setShowChecklist(!showChecklist)} className="w-full flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-ink-800/50 transition">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">The Working Notebook — Quality Gate</span>
              {showChecklist ? <ChevronDown size={14} className="text-ink-500" /> : <ChevronRight size={14} className="text-ink-500" />}
            </button>
            {showChecklist && (
              <div className="px-5 pb-4 space-y-1.5">
                {QUALITY_CHECKLIST.map((item, i) => (
                  <label key={i} className="flex items-start gap-2 text-[11px] text-ink-400">
                    <input type="checkbox" className="mt-0.5 rounded border-ink-600 accent-cinnamon" />
                    {item}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
