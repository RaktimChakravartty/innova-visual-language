'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Pen,
  LayoutGrid,
  BookOpen,
  Palette,
  Settings,
  FileText,
  BarChart3,
  Sun,
  Moon,
  Layout,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useTheme } from '@/lib/theme';

const NAV_ITEMS = [
  { href: '/', label: 'Generator', icon: Pen, shortcut: 'G' },
  { href: '/gallery', label: 'Gallery', icon: LayoutGrid, shortcut: 'L' },
  { href: '/library', label: 'Reference Library', icon: BookOpen, shortcut: 'R' },
  { href: '/brand-kit', label: 'Brand Kit', icon: Palette, shortcut: 'B' },
  { href: '/prompt-library', label: 'Prompt Library', icon: FileText, shortcut: 'P' },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, shortcut: 'A' },
  { href: '/workspace', label: 'Workspace', icon: Layout, shortcut: 'W' },
  { href: '/settings', label: 'Settings', icon: Settings, shortcut: 'S' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        e.metaKey || e.ctrlKey || e.altKey
      ) return;

      const key = e.key.toUpperCase();
      const item = NAV_ITEMS.find((n) => n.shortcut === key);
      if (item) {
        e.preventDefault();
        router.push(item.href);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [router]);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-ink-700">
        <Link href="/" className="block">
          <h1 className="font-serif text-2xl tracking-tight">
            <span className="text-amber font-bold">ink</span>
            <span className="text-ink-400 font-light">.</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.25em] text-ink-500 mt-0.5">
            INNOVA Ink Studio
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon, shortcut }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-all duration-100',
                isActive
                  ? 'bg-ink-800 text-ink-50 font-medium'
                  : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/60'
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                {label}
              </span>
              <kbd className="text-[9px] text-ink-500 font-mono hidden xl:inline">{shortcut}</kbd>
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle + Footer */}
      <div className="px-3 py-3 border-t border-ink-700 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-ink-400 hover:text-ink-200 hover:bg-ink-800/60 transition cursor-pointer"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <div className="px-3 py-1">
          <p className="text-[9px] text-ink-500">The Ink Register &middot; v2.0</p>
          <p className="text-[9px] text-ink-600 mt-0.5">Built for INNOVA AM Tech</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-ink-900 border border-ink-700 text-ink-300 hover:text-ink-100 transition cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="w-60 h-full bg-ink-900 border-r border-ink-700 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileOpen(false)} className="text-ink-400 hover:text-ink-200 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-60 bg-ink-900 border-r border-ink-700 flex-col z-40">
        {sidebarContent}
      </aside>
    </>
  );
}
