'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../sanity/types';
import { mockProjects } from '../../sanity/data/mock';
import { urlFor } from '@/sanity/lib/image';


export interface ExtendedProject extends Project {
    content?: {
        challenge: string;
        approach: string;
        impact: string;
    };
}

export function InteractiveProjectCard({ project }: { project: ExtendedProject }) {
    const content = project.content || {
        challenge: "Complex product requirements required a robust structural redesign while maintaining extreme weight efficiency.",
        approach: "Utilized generative design algorithms and advanced topological optimization to strip away unnecessary material.",
        impact: "Reduced overall mass by 22% while increasing structural integrity and fatigue resistance under core load."
    };

    const getImageUrl = (source: any, fallback: string) => {
        if (!source) return fallback;
        return urlFor(source).width(1200).quality(100).url();
    };

    const mockFallback = mockProjects.find(p => p._id === project._id)?.media as any;

    const media = {
        what: getImageUrl(project.media?.what || project.mainImage, "/portfolio-assets/pdf_img_p1_2.png"),
        how: getImageUrl(project.media?.how, "/portfolio-assets/pdf_img_p1_2.png"),
        results: getImageUrl(project.media?.results, "/portfolio-assets/pdf_img_p1_2.png")
    };


    return (
        <section id={project.slug?.current || project._id} className="w-full min-h-[90dvh] flex items-center justify-center py-12 lg:py-20 relative pointer-events-auto border-t border-border mt-16 scroll-mt-24">
            <div className="w-full max-w-[85rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center z-10">

                {/* ════ LEFT COLUMN: 3 Media Boxes (Grid Layout) ════ */}
                <div className="w-full lg:w-[55%] flex flex-col gap-4">
                    {/* Main "What" Image */}
                    <div className="w-full aspect-[16/10] relative rounded-3xl overflow-hidden bg-foreground/5 border border-border/50 shadow-md group">
                        <Image
                            src={media.what}
                            alt={`Main view of ${project.title}`}
                            fill
                            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                            priority
                        />
                        {/* Tags overlay */}
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                            {project.tags?.map((tag) => (
                                <span key={tag} className="px-3 py-1 text-[9px] font-bold tracking-widest uppercase rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground shadow-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Secondary & Tertiary Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-foreground/5 border border-border/50 shadow-sm group">
                            <Image
                                src={media.how}
                                alt={`Process view of ${project.title}`}
                                fill
                                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
                            />
                        </div>
                        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-foreground/5 border border-border/50 shadow-sm group">
                            <Image
                                src={media.results}
                                alt={`Results view of ${project.title}`}
                                fill
                                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
                            />
                        </div>
                    </div>
                </div>

                {/* ════ RIGHT COLUMN: Content ════ */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center">
                    {/* Header Group */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-500 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
                                {project.category || 'PROJECT'}
                            </span>
                            {(project.duration || project.year) && (
                                <span className="text-[10px] font-mono text-muted/60 tracking-wider uppercase">
                                    {project.duration || project.year}
                                </span>
                            )}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-5 leading-[0.95]">
                            {project.title}
                        </h2>
                        {project.description && (
                            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-lg">
                                {typeof project.description[0]?.children?.[0]?.text === 'string'
                                    ? project.description[0].children[0].text
                                    : 'Exploring new frontiers in engineering and design.'}
                            </p>
                        )}
                    </div>

                    {/* Specs Row */}
                    {project.specs && project.specs.length > 0 && (
                        <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-border/50">
                            {project.specs.map((spec, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">{spec.value}</span>
                                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted/60">{spec.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Detailed Content Stack */}
                    <div className="grid grid-cols-1 gap-6 mb-10">
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">The Challenge</h4>
                            <p className="text-xs md:text-[13px] text-muted font-light leading-relaxed">{content.challenge}</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">The Approach</h4>
                            <p className="text-xs md:text-[13px] text-muted font-light leading-relaxed">{content.approach}</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">The Impact</h4>
                            <p className="text-xs md:text-[13px] text-muted font-light leading-relaxed">{content.impact}</p>
                        </div>
                    </div>

                    {/* External Links */}
                    <div className="flex gap-3">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-bold tracking-widest uppercase text-[10px] hover:opacity-90 transition-opacity">
                                <ExternalLink size={14} /> Link
                            </a>
                        )}
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-background text-foreground border border-border rounded-full font-bold tracking-widest uppercase text-[10px] hover:bg-foreground/5 transition-colors">
                                <Github size={14} /> Source Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
