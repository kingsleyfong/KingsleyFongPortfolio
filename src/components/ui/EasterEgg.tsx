import Link from 'next/link';
import { Bot } from 'lucide-react';

export function EasterEgg() {
    return (
        <Link
            href="/robot"
            className="inline-flex items-center justify-center p-2 rounded-full text-muted hover:text-foreground hover:bg-foreground/5 transition-all duration-300 group"
            title="Access legacy systems"
        >
            <Bot size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="sr-only">Legacy Robot Experience</span>
        </Link>
    );
}
