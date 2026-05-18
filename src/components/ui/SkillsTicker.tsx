'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
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

export interface SanitySkill {
    name: string;
    builtInIcon?: string;
    customIconUrl?: string;
}

const BuiltInIconMap: Record<string, React.ReactNode> = {
    'SolidWorks': <SiDassaultsystemes className="text-[#00548B]" />,
    'Fusion 360': <SiAutodesk className="text-[#FF7D21]" />,
    'AutoCAD': <SiAutodesk className="text-[#E01C24]" />,
    'GD&T': <Ruler className="text-blue-400" size={16} />,
    'DFMA': <Cpu className="text-purple-400" size={16} />,
    'FEA': <Grid3X3 className="text-emerald-400" size={16} />,
    'CFD': <Wind className="text-cyan-400" size={16} />,
    'CNC Machining': <Wrench className="text-slate-400" size={16} />,
    'Injection Molding': <Layers className="text-orange-400" size={16} />,
    '3D Printing': <Printer className="text-pink-400" size={16} />,
    'Python': <SiPython className="text-[#3776AB]" />,
    'Power BI': <BarChart3 className="text-[#F2C811]" size={16} />,
    'Lean Manufacturing': <Zap className="text-yellow-400" size={16} />,
    'Rapid Prototyping': <Box className="text-indigo-400" size={16} />,
    'Optimization': <Binary className="text-teal-400" size={16} />,
};

const defaultSkills: Skill[] = Object.entries(BuiltInIconMap).map(([name, icon]) => ({ name, icon }));

interface SkillsTickerProps {
    skills?: SanitySkill[];
}

export function SkillsTicker({ skills: sanitySkills }: SkillsTickerProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const scrollX = useRef(0);
    const velocity = useRef(0);
    const autoSpeed = -0.45; // Increased slightly for smoother movement
    const isUserInteracting = useRef(false);
    const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rafId = useRef<number>(0);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollStart = useRef(0);
    const lastDragX = useRef(0);
    const lastDragTime = useRef(0);
    const [isGrabbing, setIsGrabbing] = useState(false);

    const activeSkills = React.useMemo(() => {
        if (!sanitySkills || sanitySkills.length === 0) return defaultSkills;
        return sanitySkills.map(s => {
            let icon: React.ReactNode = null;
            if (s.customIconUrl) {
                icon = <img src={s.customIconUrl} alt={s.name} className="w-4 h-4 object-contain" />;
            } else {
                const iconKey = s.builtInIcon || s.name;
                icon = BuiltInIconMap[iconKey] || <Box className="text-foreground/50" size={16} />;
            }
            return { name: s.name, icon };
        });
    }, [sanitySkills]);

    // Triple the array for seamless wrapping
    const tripled = [...activeSkills, ...activeSkills, ...activeSkills];

    const getHalfWidth = useCallback(() => {
        if (!trackRef.current) return 1;
        return trackRef.current.scrollWidth / 3;
    }, []);

    const tick = useCallback(() => {
        if (!trackRef.current) return;
        const halfW = getHalfWidth();

        if (!isUserInteracting.current) {
            scrollX.current += autoSpeed;
        } else {
            scrollX.current += velocity.current;
            velocity.current *= 0.97; // reduced friction for 20% more 'swing'
            if (Math.abs(velocity.current) < 0.1) velocity.current = 0;
        }

        // Seamless wrap logic
        if (scrollX.current >= 0) {
            scrollX.current -= halfW;
        } else if (scrollX.current <= -halfW) {
            scrollX.current += halfW;
        }

        // Use translate3d for hardware acceleration and sub-pixel smoothness
        trackRef.current.style.transform = `translate3d(${scrollX.current}px, 0, 0)`;
        rafId.current = requestAnimationFrame(tick);
    }, [getHalfWidth, autoSpeed]);

    useEffect(() => {
        // Start in the middle set to allow scrolling in both directions
        scrollX.current = -getHalfWidth();
        rafId.current = requestAnimationFrame(tick);
        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            if (resumeTimer.current) clearTimeout(resumeTimer.current);
        };
    }, [tick, getHalfWidth]);

    const scheduleResume = useCallback(() => {
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => {
            isUserInteracting.current = false;
        }, 1500);
    }, []);

    // ── Mouse Drag ──
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = true;
        isUserInteracting.current = true;
        setIsGrabbing(true);
        dragStartX.current = e.clientX;
        dragScrollStart.current = scrollX.current;
        lastDragX.current = e.clientX;
        lastDragTime.current = Date.now();
        velocity.current = 0;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const delta = e.clientX - dragStartX.current;
        scrollX.current = dragScrollStart.current + delta;

        // Track velocity for fling
        const now = Date.now();
        const dt = now - lastDragTime.current;
        if (dt > 0) {
            velocity.current = (e.clientX - lastDragX.current) * (16 / dt);
        }
        lastDragX.current = e.clientX;
        lastDragTime.current = now;
    }, []);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        setIsGrabbing(false);
        scheduleResume();
    }, [scheduleResume]);

    // ── Touch Drag ──
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        isDragging.current = true;
        isUserInteracting.current = true;
        dragStartX.current = e.touches[0].clientX;
        dragScrollStart.current = scrollX.current;
        lastDragX.current = e.touches[0].clientX;
        lastDragTime.current = Date.now();
        velocity.current = 0;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging.current) return;
        const delta = e.touches[0].clientX - dragStartX.current;
        scrollX.current = dragScrollStart.current + delta;

        const now = Date.now();
        const dt = now - lastDragTime.current;
        if (dt > 0) {
            velocity.current = (e.touches[0].clientX - lastDragX.current) * (16 / dt);
        }
        lastDragX.current = e.touches[0].clientX;
        lastDragTime.current = now;
    }, []);

    const handleTouchEnd = useCallback(() => {
        isDragging.current = false;
        scheduleResume();
    }, [scheduleResume]);

    return (
        <div 
            className={`w-full overflow-hidden py-3 border-b border-border/30 bg-background/20 backdrop-blur-sm relative cursor-grab ${isGrabbing ? 'cursor-grabbing' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex select-none">
                <div
                    ref={trackRef}
                    className="flex gap-4 will-change-transform"
                >
                    {tripled.map((skill, index) => (
                        <div
                            key={`${skill.name}-${index}`}
                            className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-foreground/5 border border-border/50 hover:border-foreground/20 hover:bg-foreground/10 transition-all group backdrop-blur-md pointer-events-none"
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
