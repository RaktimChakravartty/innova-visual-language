interface ModuleHeaderProps {
  system: string;
  subtitle: string;
}

export function ModuleHeader({ system, subtitle }: ModuleHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-semibold text-ink-50 tracking-tight">{system}</h1>
      <p className="font-mono text-[11px] text-ink-500 mt-1">{subtitle}</p>
    </div>
  );
}
