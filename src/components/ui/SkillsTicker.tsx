'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { 
  SiAutodesk, 
  SiPython, 
  SiDassaultsystemes,
  SiOpenai
} from 'react-icons/si';
import { 
  Ruler, 
  Zap, 
  Grid3X3, 
  Wind, 
  Wrench, 
  Box, 
  Printer, 
  Binary,
  Layers,
  Cpu,
  BarChart3
} from 'lucide-react';

interface Skill {
    name: string;
    icon: React.ReactNode;
}

const skills: Skill[] = [
    { name: 'SolidWorks', icon: <SiDassaultsystemes className="text-[#00548B]" /> },
    { name: 'Fusion 360', icon: <SiAutodesk className="text-[#FF7D21]" /> },
    { name: 'AutoCAD', icon: <SiAutodesk className="text-[#E01C24]" /> },
    { name: 'GD&T', icon: <Ruler className="text-blue-400" size={16} /> },
    { name: 'DFMA', icon: <Cpu className="text-purple-400" size={16} /> },
    { name: 'FEA', icon: <Grid3X3 className="text-emerald-400" size={16} /> },
    { name: 'CFD', icon: <Wind className="text-cyan-400" size={16} /> },
    { name: 'CNC Machining', icon: <Wrench className="text-slate-400" size={16} /> },
    { name: 'Injection Molding', icon: <Layers className="text-orange-400" size={16} /> },
    { name: '3D Printing', icon: <Printer className="text-pink-400" size={16} /> },
    { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
    { name: 'Power BI', icon: <BarChart3 className="text-[#F2C811]" size={16} /> },
    { name: 'Lean Manufacturing', icon: <Zap className="text-yellow-400" size={16} /> },
    { name: 'Rapid Prototyping', icon: <Box className="text-indigo-400" size={16} /> },
    { name: 'Optimization', icon: <Binary className="text-teal-400" size={16} /> },
];

export function SkillsTicker() {
    const trackRef = useRef<HTMLDivElement>(null);
    const scrollX = useRef(0);
    const autoSpeed = 0.4; // Slightly slower than projects for parallax feel
    const rafId = useRef<number>(0);

    // Triple the array for seamless wrapping
    const tripled = [...skills, ...skills, ...skills];

    const tick = useCallback(() => {
        if (!trackRef.current) return;
        const halfW = trackRef.current.scrollWidth / 3;

        // Counter-scroll: we move in the opposite direction (scrollX decreases)
        scrollX.current -= autoSpeed;

        if (scrollX.current <= -halfW) {
            scrollX.current += halfW;
        } else if (scrollX.current < 0) {
            scrollX.current -= halfW;
        }

        trackRef.current.style.transform = `translate3d(${scrollX.current}px, 0, 0)`;
        rafId.current = requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, [tick]);

    return (
        <div className="w-full overflow-hidden py-8 border-b border-border/30 bg-background/20 backdrop-blur-sm relative">
            {/* Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="max-w-[85rem] mx-auto px-6 mb-4">
                <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted/60">Core Engineering Stack</h3>
            </div>

            <div className="flex select-none">
                <div
                    ref={trackRef}
                    className="flex gap-4 will-change-transform"
                >
                    {tripled.map((skill, index) => (
                        <div
                            key={`${skill.name}-${index}`}
                            className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-foreground/5 border border-border/50 hover:border-foreground/20 hover:bg-foreground/10 transition-all group backdrop-blur-md"
                        >
                            <span className="text-foreground/80 font-medium text-sm tracking-tight group-hover:text-foreground transition-colors">
                                {skill.name}
                            </span>
                            <div className="flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">
                                {skill.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
