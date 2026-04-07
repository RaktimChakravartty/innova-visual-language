'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  { href: '/guidelines', label: 'Guidelines', icon: 'book-open', shortcut: undefined },
  { href: '/colour', label: 'Colour System', icon: 'palette', shortcut: undefined },
  { href: '/typography', label: 'Typography', icon: 'type', shortcut: undefined },
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
        <p className="px-3 mb-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-ink-500">{label}</p>
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
                'flex items-center gap-2.5 rounded-lg transition-all duration-100',
                collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2',
                isActive
                  ? 'bg-ink-800 text-ink-50 font-medium'
                  : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/50'
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
      {/* Logo */}
      <div className={cn('border-b border-ink-700', collapsed ? 'px-2 py-4' : 'px-5 py-5')}>
        <Link href="/" className="block">
          {collapsed ? (
            <img src="/brandmark.svg" alt="INNOVA" className="w-7 h-7 mx-auto text-ink-100" style={{ filter: 'var(--brandmark-filter, none)' }} />
          ) : (
            <>
              <div className="flex items-center gap-2.5">
                <img src="/brandmark.svg" alt="INNOVA" className="w-8 h-8 text-ink-100" style={{ filter: 'var(--brandmark-filter, none)' }} />
                <span className="font-display text-lg font-semibold text-ink-100 tracking-tight">innova</span>
              </div>
              <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink-500 mt-1 ml-[42px]">
                VISUAL LANGUAGE
              </p>
            </>
          )}
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        {!collapsed && (
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-100 mb-3',
              pathname === '/'
                ? 'bg-ink-800 text-ink-50 font-medium'
                : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/50'
            )}
          >
            <Home size={15} strokeWidth={pathname === '/' ? 2 : 1.5} />
            <span className="text-[13px] flex-1">Dashboard</span>
            <kbd className="text-[9px] text-ink-500 font-mono">D</kbd>
          </Link>
        )}
        {collapsed && (
          <div className="mb-3">
            <Link href="/" title="Dashboard" className={cn(
              'flex justify-center px-2 py-2.5 rounded-lg transition-all',
              pathname === '/' ? 'bg-ink-800 text-ink-50' : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/50'
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

      {/* Footer */}
      <div className="px-2 py-3 border-t border-ink-700 space-y-1">
        <button
          onClick={toggleTheme}
          className={cn(
            'w-full flex items-center gap-2.5 rounded-lg text-[13px] text-ink-400 hover:text-ink-200 hover:bg-ink-800/50 transition cursor-pointer',
            collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2'
          )}
        >
          {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          {!collapsed && (theme === 'light' ? 'Dark Mode' : 'Light Mode')}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'w-full flex items-center gap-2.5 rounded-lg text-[13px] text-ink-400 hover:text-ink-200 hover:bg-ink-800/50 transition cursor-pointer',
            collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2'
          )}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          {!collapsed && 'Collapse'}
        </button>
        {!collapsed && (
          <div className="px-3 py-1">
            <p className="font-mono text-[8px] text-ink-500">INNOVA AM Tech · Visual Language Platform</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button onClick={() => setMobileOpen(true)} className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-ink-900 border border-ink-700 text-ink-300 hover:text-ink-100 transition cursor-pointer">
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <aside className="w-60 h-full sidebar-bg border-r border-ink-700 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileOpen(false)} className="text-ink-400 hover:text-ink-200 cursor-pointer"><X size={20} /></button>
            </div>
            {content}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={cn('hidden lg:flex fixed left-0 top-0 bottom-0 sidebar-bg border-r border-ink-700 flex-col z-40 transition-all duration-200', width)}>
        {content}
      </aside>
    </>
  );
}
