'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../sanity/types';

import { mockProjects } from '../../sanity/data/mock';

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

    const mediaUrl = project.mainImage?.asset?.url || "/placeholder.png";
    const mockFallback = mockProjects.find(p => p._id === project._id)?.media as any;

    const extractUrl = (item: any) => {
        if (typeof item === 'string') return item;
        if (item?.asset?.url) return item.asset.url;
        return null;
    };

    const media = {
        what: extractUrl(project.media?.what) || extractUrl(mockFallback?.what) || mediaUrl,
        how: extractUrl(project.media?.how) || extractUrl(mockFallback?.how) || mediaUrl,
        results: extractUrl(project.media?.results) || extractUrl(mockFallback?.results) || mediaUrl
    };

    return (
        <section id={project.slug?.current || project._id} className="w-full min-h-[100dvh] flex items-start justify-center py-16 lg:py-24 relative pointer-events-auto border-t border-border mt-16">
            <div className="w-full max-w-[85rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start z-10">

                {/* ════ LEFT COLUMN: 3 Static Media Boxes ════ */}
                <div className="w-full lg:w-1/2 flex flex-col gap-8">
                    {/* Main "What" Image */}
                    <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-foreground/5 border border-border shadow-sm group">
                        <Image
                            src={media.what}
                            alt={`Main view of ${project.title}`}
                            fill
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                            priority
                        />
                        {/* Tags overlay */}
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                            {project.tags?.map((tag) => (
                                <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground shadow-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Secondary "How" Image */}
                    <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-foreground/5 border border-border shadow-sm group">
                        <Image
                            src={media.how}
                            alt={`Process view of ${project.title}`}
                            fill
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                        />
                    </div>

                    {/* Tertiary "Results" Image */}
                    <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-foreground/5 border border-border shadow-sm group">
                        <Image
                            src={media.results}
                            alt={`Results view of ${project.title}`}
                            fill
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* ════ RIGHT COLUMN: Stacked Text Content ════ */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center sticky top-32">
                    {/* Header Group */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-muted bg-foreground/5 px-3 py-1 rounded-full border border-border">
                                {project.category || 'PROJECT'}
                            </span>
                            {project.year && (
                                <span className="text-[10px] md:text-xs font-mono text-muted/60 tracking-wider uppercase">
                                    {project.year}
                                </span>
                            )}
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground mb-4 leading-tight">
                            {project.title}
                        </h2>
                        {project.description && (
                            <p className="text-base md:text-lg text-muted font-light leading-relaxed">
                                {typeof project.description[0]?.children?.[0]?.text === 'string'
                                    ? project.description[0].children[0].text
                                    : 'Exploring new frontiers in engineering and design.'}
                            </p>
                        )}
                    </div>

                    {/* Specs Row */}
                    {project.specs && project.specs.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-border">
                            {project.specs.map((spec, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-1">{spec.value}</span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted md:text-xs">{spec.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Detailed Content Stack */}
                    <div className="space-y-6 mb-10">
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground">The Challenge</h4>
                            <p className="text-sm text-muted font-light leading-relaxed">{content.challenge}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground">The Approach</h4>
                            <p className="text-sm text-muted font-light leading-relaxed">{content.approach}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-foreground">The Impact</h4>
                            <p className="text-sm text-muted font-light leading-relaxed">{content.impact}</p>
                        </div>
                    </div>

                    {/* External Links */}
                    <div className="flex gap-4">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-bold tracking-widest uppercase text-xs hover:opacity-90 transition-opacity">
                                <ExternalLink size={16} /> Live Demo
                            </a>
                        )}
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-background text-foreground border border-border rounded-full font-bold tracking-widest uppercase text-xs hover:bg-foreground/5 transition-colors">
                                <Github size={16} /> Source Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
