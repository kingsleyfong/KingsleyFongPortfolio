'use client';

import React from 'react';
import Image from 'next/image';
import { ExtendedProject } from './InteractiveProjectCard';
import { GlassCard } from './GlassCard';

interface ProjectTickerProps {
    projects: ExtendedProject[];
    onSelect: (index: number) => void;
}

export function ProjectTicker({ projects, onSelect }: ProjectTickerProps) {
    if (!projects || projects.length === 0) return null;

    // Double the array to create a seamless infinite loop for the marquee
    const duplicatedProjects = [...projects, ...projects];

    return (
        <div className="w-full overflow-hidden relative opacity-100 flex flex-col pt-12 pb-24 z-40 pointer-events-auto group">
            {/* Ticker Container Container */}
            <div className="relative flex flex-col gap-16 w-max animate-marquee hover:[animation-play-state:paused] pointer-events-auto">

                {/* Global Timeline Track */}
                <div className="absolute bottom-[30px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div className="flex gap-8">
                    {duplicatedProjects.map((project, index) => {
                        const originalIndex = index % projects.length;

                        // Parse date for "June 2024" format
                        const dateObj = project.date ? new Date(project.date) : new Date();
                        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                        const isLatest = originalIndex === 0;

                        return (
                            <div key={`${project._id}-${index}`} className="flex flex-col gap-10 items-center shrink-0">
                                {/* The Card */}
                                <div
                                    onClick={() => onSelect(originalIndex)}
                                    className="relative w-[300px] h-[200px] md:w-[400px] md:h-[260px] rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:z-50 group/card border border-white/10 bg-white/5 shadow-2xl"
                                >
                                    <Image
                                        src={project.mainImage?.asset?.url || '/placeholder.png'}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-all duration-700 ease-in-out group-hover/card:scale-110 opacity-70 group-hover/card:opacity-100"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity duration-500 pointer-events-none" />

                                    {/* Text Content */}
                                    <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                                        <h4 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2 drop-shadow-md line-clamp-2">
                                            {project.title}
                                        </h4>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                                                {project.category || 'PROJECT'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Node */}
                                <div className="flex flex-col items-center relative z-10 w-full mb-2">
                                    {/* The Dot */}
                                    <div className="w-3 h-3 rounded-full bg-white/20 ring-4 ring-black relative flex items-center justify-center">
                                        {isLatest && (
                                            <>
                                                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                                                <div className="absolute inset-0 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]" />
                                            </>
                                        )}
                                    </div>
                                    {/* The Date */}
                                    <div className="absolute top-6 whitespace-nowrap text-xs font-mono text-white/40 tracking-widest uppercase">
                                        {formattedDate}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
