'use client';

import Link from 'next/link';

export function SiteHeader() {
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(id);
            const container = document.querySelector('main');
            if (element && container) {
                const targetScrollTop = element.getBoundingClientRect().top + container.scrollTop - container.getBoundingClientRect().top - 80;
                container.scrollTo({
                    top: targetScrollTop,
                    behavior: 'smooth'
                });
                window.history.pushState(null, '', `/#${id}`);
            }
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full px-6 py-5 flex justify-between items-center z-50 transition-all duration-300 backdrop-blur-md bg-background/80 border-b border-border">
            <div className="flex items-center gap-8">
                <Link
                    href="/#hero"
                    onClick={(e) => handleNav(e, 'hero')}
                    className="text-xl md:text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
                >
                    Kingsley Fong
                </Link>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
                    <Link 
                        href="/#projects" 
                        onClick={(e) => handleNav(e, 'projects')}
                        className="hover:text-foreground transition-colors"
                    >
                        Projects
                    </Link>
                    <Link 
                        href="/#resume" 
                        onClick={(e) => handleNav(e, 'resume')}
                        className="hover:text-foreground transition-colors"
                    >
                        Resume
                    </Link>
                </div>
            </div>
        </header>
    );
}
