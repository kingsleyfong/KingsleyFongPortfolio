import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

export function GlassCard({ children, className, intensity = 'medium', ...props }: GlassCardProps) {
    const intensityClasses = {
        low: 'bg-white/[0.02] backdrop-blur-md border-white/5',
        medium: 'bg-white/[0.04] backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
        high: 'bg-white/[0.08] backdrop-blur-3xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]',
    };

    return (
        <div
            className={cn(
                'rounded-3xl p-6 transition-all duration-500 border',
                intensityClasses[intensity],
                'hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)] text-white relative overflow-hidden',
                className
            )}
            {...props}
        >
            {/* Subtle inner highlight to emulate glass thickness */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/10 mix-blend-overlay"></div>
            {children}
        </div>
    );
}
