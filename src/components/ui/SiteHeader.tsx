'use client';

import Link from 'next/link';

export function SiteHeader() {
    return (
        <header className="fixed top-0 left-0 w-full px-6 py-5 flex justify-between items-center z-50 transition-all duration-300 backdrop-blur-md bg-background/80 border-b border-border">
            <div className="flex items-center gap-8">
                <Link
                    href="/#hero"
                    className="text-xl md:text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
                >
                    Kingsley Fong
                </Link>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
                    <Link href="/#projects" className="hover:text-foreground transition-colors">Projects</Link>
                    <Link href="/#resume" className="hover:text-foreground transition-colors">Resume</Link>
                </div>
            </div>
        </header>
    );
}
