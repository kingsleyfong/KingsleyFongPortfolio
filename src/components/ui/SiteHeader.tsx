'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export function SiteHeader() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <header className="fixed top-0 left-0 w-full px-6 py-5 flex justify-between items-center z-50 transition-all duration-300 backdrop-blur-md bg-background/80 border-b border-border">
            <div className="flex items-center gap-8">
                <Link
                    href="/#about"
                    className="text-xl md:text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
                >
                    Kingsley Fong
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
                    <Link href="/#about" className="hover:text-foreground transition-colors">Background</Link>
                    <Link href="/#projects" className="hover:text-foreground transition-colors">Projects</Link>
                    <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                    aria-label="Toggle theme"
                >
                    {mounted ? (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />}
                </button>
            </div>
        </header>
    );
}
