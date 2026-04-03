'use client';

import { v4 as uuidv4 } from 'uuid';
import type { Palette, Generation, StyleDefinition, GenerationStatus } from '@/types/database';
import { DEFAULT_PALETTE, DEFAULT_STYLE_BLOCK, DEFAULT_EXCLUSIONS_BLOCK } from './constants';
import { supabase, isSupabaseConfigured } from './supabase';

// ---------- Local Storage helpers ----------

function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ---------- Palettes ----------

export async function getPalettes(): Promise<Palette[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data } = await supabase.from('palettes').select('*').order('created_at', { ascending: true });
      if (data && data.length > 0) return data;
    } catch {
      // Supabase unavailable, fall through to localStorage
    }
  }
  const local = getLocal<Palette[]>('ink_palettes', []);
  if (local.length === 0) {
    const defaultPalette: Palette = {
      id: uuidv4(),
      ...DEFAULT_PALETTE,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setLocal('ink_palettes', [defaultPalette]);
    return [defaultPalette];
  }
  return local;
}

export async function getActivePalette(): Promise<Palette | null> {
  const palettes = await getPalettes();
  return palettes.find((p) => p.is_active) || palettes[0] || null;
}

export async function savePalette(palette: Palette): Promise<Palette> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('palettes').upsert(palette).select().single();
    if (!error && data) return data;
  }
  const palettes = await getPalettes();
  const idx = palettes.findIndex((p) => p.id === palette.id);
  if (idx >= 0) {
    palettes[idx] = palette;
  } else {
    palettes.push(palette);
  }
  setLocal('ink_palettes', palettes);
  return palette;
}

export async function setActivePaletteId(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    await supabase.from('palettes').update({ is_active: false }).neq('id', id);
    await supabase.from('palettes').update({ is_active: true }).eq('id', id);
    return;
  }
  const palettes = await getPalettes();
  palettes.forEach((p) => (p.is_active = p.id === id));
  setLocal('ink_palettes', palettes);
}

export async function deletePalette(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    await supabase.from('palettes').delete().eq('id', id);
    return;
  }
  let palettes = await getPalettes();
  palettes = palettes.filter((p) => p.id !== id);
  setLocal('ink_palettes', palettes);
}

// ---------- Generations ----------

export async function getGenerations(): Promise<Generation[]> {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('generations').select('*').order('created_at', { ascending: false });
    if (data) return data;
  }
  return getLocal<Generation[]>('ink_generations', []);
}

export async function saveGeneration(gen: Generation): Promise<Generation> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('generations').upsert(gen).select().single();
    if (!error && data) return data;
  }
  const gens = getLocal<Generation[]>('ink_generations', []);
  const idx = gens.findIndex((g) => g.id === gen.id);
  if (idx >= 0) {
    gens[idx] = gen;
  } else {
    gens.unshift(gen);
  }
  setLocal('ink_generations', gens);
  return gen;
}

export async function updateGenerationStatus(id: string, status: GenerationStatus, feedback?: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const update: Record<string, unknown> = { status };
    if (feedback !== undefined) update.feedback = feedback;
    await supabase.from('generations').update(update).eq('id', id);
    return;
  }
  const gens = getLocal<Generation[]>('ink_generations', []);
  const gen = gens.find((g) => g.id === id);
  if (gen) {
    gen.status = status;
    if (feedback !== undefined) gen.feedback = feedback;
    setLocal('ink_generations', gens);
  }
}

export async function updateGenerationTags(id: string, tags: string[]): Promise<void> {
  if (isSupabaseConfigured()) {
    await supabase.from('generations').update({ tags }).eq('id', id);
    return;
  }
  const gens = getLocal<Generation[]>('ink_generations', []);
  const gen = gens.find((g) => g.id === id);
  if (gen) {
    gen.tags = tags;
    setLocal('ink_generations', gens);
  }
}

export async function deleteGeneration(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    await supabase.from('generations').delete().eq('id', id);
    return;
  }
  let gens = getLocal<Generation[]>('ink_generations', []);
  gens = gens.filter((g) => g.id !== id);
  setLocal('ink_generations', gens);
}

// ---------- Style Definitions ----------

export async function getStyleDefinitions(): Promise<StyleDefinition[]> {
  if (isSupabaseConfigured()) {
    const { data } = await supabase.from('style_definitions').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) return data;
  }
  const local = getLocal<StyleDefinition[]>('ink_styles', []);
  if (local.length === 0) {
    const def: StyleDefinition = {
      id: uuidv4(),
      version: 'v1',
      style_block: DEFAULT_STYLE_BLOCK,
      exclusions_block: DEFAULT_EXCLUSIONS_BLOCK,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setLocal('ink_styles', [def]);
    return [def];
  }
  return local;
}

export async function getActiveStyleDefinition(): Promise<StyleDefinition | null> {
  const defs = await getStyleDefinitions();
  return defs.find((d) => d.is_active) || defs[0] || null;
}

export async function saveStyleDefinition(def: StyleDefinition): Promise<StyleDefinition> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('style_definitions').upsert(def).select().single();
    if (!error && data) return data;
  }
  const defs = getLocal<StyleDefinition[]>('ink_styles', []);
  const idx = defs.findIndex((d) => d.id === def.id);
  if (idx >= 0) {
    defs[idx] = def;
  } else {
    defs.unshift(def);
  }
  setLocal('ink_styles', defs);
  return def;
}

// ---------- Image upload (local = data URL) ----------

export async function uploadImage(file: File): Promise<string> {
  if (isSupabaseConfigured()) {
    const ext = file.name.split('.').pop() || 'png';
    const path = `generations/${uuidv4()}.${ext}`;
    const { error } = await supabase.storage.from('illustrations').upload(path, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from('illustrations').getPublicUrl(path);
      return urlData.publicUrl;
    }
  }
  // Fallback: convert to data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
