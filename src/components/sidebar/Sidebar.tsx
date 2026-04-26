'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Brandmark } from '@/components/brand/Brandmark';
import {
  PenTool, Aperture, Grid3X3, Layout, PlayCircle, Hexagon,
  Image, Bookmark, Palette, Settings, BookOpen, Type, Sliders,
  Sun, Moon, Menu, X, ChevronLeft, ChevronRight, Home,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useTheme } from '@/lib/theme';

const ICON_MAP: Record<string, React.ElementType> = {
  'pen-tool': PenTool, 'aperture': Aperture, 'grid-3x3': Grid3X3,
  'layout': Layout, 'play-circle': PlayCircle, 'hexagon': Hexagon,
  'image': Image, 'bookmark': Bookmark, 'palette': Palette,
  'settings': Settings, 'home': Home, 'book-open': BookOpen,
  'type': Type, 'sliders': Sliders,
};

interface NavItem {
  href: string;
  label: string;
  icon: string;
  shortcut?: string;
}

const BRAND_ITEMS: NavItem[] = [
  { href: '/guidelines', label: 'Guidelines', icon: 'book-open' },
  { href: '/colour', label: 'Colour System', icon: 'palette' },
  { href: '/typography', label: 'Typography', icon: 'type' },
];

const MODULE_ITEMS: NavItem[] = [
  { href: '/illustration', label: 'Illustration', icon: 'pen-tool', shortcut: '1' },
  { href: '/photography', label: 'Photography', icon: 'aperture', shortcut: '2' },
  { href: '/icons', label: 'Icons', icon: 'grid-3x3', shortcut: '3' },
  { href: '/layout-grid', label: 'Layout & Grid', icon: 'layout', shortcut: '4' },
  { href: '/motion', label: 'Motion', icon: 'play-circle', shortcut: '5' },
  { href: '/patterns', label: 'Patterns & Textures', icon: 'hexagon', shortcut: '6' },
];

const LIBRARY_ITEMS: NavItem[] = [
  { href: '/gallery', label: 'Gallery', icon: 'image', shortcut: 'G' },
  { href: '/library', label: 'Reference Library', icon: 'bookmark', shortcut: 'R' },
];

const SYSTEM_ITEMS: NavItem[] = [
  { href: '/brand-kit', label: 'Brand Kit', icon: 'sliders', shortcut: 'B' },
  { href: '/settings', label: 'Settings', icon: 'settings', shortcut: 'S' },
];

const ALL_ITEMS = [
  { href: '/', label: 'Dashboard', icon: 'home', shortcut: 'D' },
  ...BRAND_ITEMS, ...MODULE_ITEMS, ...LIBRARY_ITEMS, ...SYSTEM_ITEMS,
];

function NavGroup({ label, items, pathname, collapsed }: { label: string; items: NavItem[]; pathname: string; collapsed: boolean }) {
  return (
    <div className="mb-4">
      {!collapsed && (
        <p className="px-3 mb-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-ink-500 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-cinnamon/50" />
          {label}
        </p>
      )}
      <div className="space-y-0.5">
        {items.map(({ href, label, icon, shortcut }) => {
          const Icon = ICON_MAP[icon] || Home;
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                'flex items-center gap-2.5 rounded-lg transition-all duration-150',
                collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2',
                isActive
                  ? 'bg-ink-800 text-ink-50 font-medium'
                  : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/30'
              )}
            >
              <Icon size={collapsed ? 18 : 15} strokeWidth={isActive ? 2 : 1.5} />
              {!collapsed && (
                <>
                  <span className="text-[13px] flex-1">{label}</span>
                  {shortcut && <kbd className="text-[9px] text-ink-500 font-mono">{shortcut}</kbd>}
                </>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement || e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toUpperCase();
      const item = ALL_ITEMS.find((n) => n.shortcut === key);
      if (item) { e.preventDefault(); router.push(item.href); }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [router]);

  const width = collapsed ? 'w-16' : 'w-60';

  const content = (
    <>
      <div className={cn(collapsed ? 'px-2 py-4' : 'px-5 py-5')}>
        <Link href="/" className="block">
          {collapsed ? (
            <Brandmark size={28} className="mx-auto text-ink-100" />
          ) : (
            <>
              <Brandmark size={28} className="text-ink-100" />
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink-500 mt-2">
                Visual Language
              </p>
            </>
          )}
        </Link>
      </div>
      <div className="h-px bg-gradient-to-r from-ink-700/50 via-ink-700/30 to-transparent mx-3" />

      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        {!collapsed ? (
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 mb-3',
              pathname === '/'
                ? 'bg-ink-800 text-ink-50 font-medium'
                : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/30'
            )}
          >
            <Home size={15} strokeWidth={pathname === '/' ? 2 : 1.5} />
            <span className="text-[13px] flex-1">Dashboard</span>
            <kbd className="text-[9px] text-ink-500 font-mono">D</kbd>
          </Link>
        ) : (
          <div className="mb-3">
            <Link href="/" title="Dashboard" className={cn(
              'flex justify-center px-2 py-2.5 rounded-lg transition-all',
              pathname === '/' ? 'bg-ink-800 text-ink-50' : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/30'
            )}>
              <Home size={18} />
            </Link>
          </div>
        )}
        <NavGroup label="Brand" items={BRAND_ITEMS} pathname={pathname} collapsed={collapsed} />
        <NavGroup label="Modules" items={MODULE_ITEMS} pathname={pathname} collapsed={collapsed} />
        <NavGroup label="Library" items={LIBRARY_ITEMS} pathname={pathname} collapsed={collapsed} />
        <NavGroup label="System" items={SYSTEM_ITEMS} pathname={pathname} collapsed={collapsed} />
      </nav>

      <div className="px-2 py-3 border-t border-ink-700 space-y-1">
        {!collapsed ? (
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-ink-400 hover:text-ink-200 hover:bg-ink-800/30 transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
            <div className="relative w-8 h-[18px] rounded-full bg-ink-700 transition-colors">
              <div className={cn(
                'absolute top-[2px] w-[14px] h-[14px] rounded-full bg-ink-300 transition-all duration-200',
                theme === 'dark' ? 'left-[16px]' : 'left-[2px]'
              )} />
            </div>
          </button>
        ) : (
          <button onClick={toggleTheme} className="w-full flex justify-center px-2 py-2.5 rounded-lg text-ink-400 hover:text-ink-200 hover:bg-ink-800/30 transition cursor-pointer" title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'w-full flex items-center gap-2.5 rounded-lg text-[13px] text-ink-400 hover:text-ink-200 hover:bg-ink-800/30 transition cursor-pointer',
            collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2'
          )}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          {!collapsed && 'Collapse'}
        </button>
        {!collapsed && (
          <div className="px-3 py-1">
            <p className="font-mono text-[8px] text-ink-500">INNOVA AM Tech</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="fixed top-4 left-4 z-50 lg:hidden p-1.5 rounded-lg bg-ink-900/80 border border-ink-700 text-ink-300 hover:text-ink-100 transition cursor-pointer backdrop-blur-sm">
        <Menu size={18} />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}>
          <aside
            className="w-60 h-full sidebar-bg border-r border-ink-700 flex flex-col animate-slide-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileOpen(false)} className="text-ink-400 hover:text-ink-200 cursor-pointer p-1 rounded-lg hover:bg-ink-800/30"><X size={18} /></button>
            </div>
            {content}
          </aside>
        </div>
      )}

      <aside className={cn('hidden lg:flex fixed left-0 top-0 bottom-0 sidebar-bg border-r border-ink-700 flex-col z-40 transition-all duration-200', width)}>
        {content}
      </aside>
    </>
  );
}
