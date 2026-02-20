'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../sanity/types';

export interface ExtendedProject extends Project {
    content?: {
        challenge: string;
        approach: string;
        impact: string;
    };
    media?: {
        what: string;
        how: string;
        results: string;
    };
}

export function InteractiveProjectCard({ project }: { project: ExtendedProject }) {
    const [activeTab, setActiveTab] = useState<'what' | 'how' | 'results'>('what');

    const content = project.content || {
        challenge: "Complex product requirements required a robust structural redesign while maintaining extreme weight efficiency.",
        approach: "Utilized generative design algorithms and advanced topological optimization to strip away unnecessary material.",
        impact: "Reduced overall mass by 22% while increasing structural integrity and fatigue resistance under core load."
    };

    const mediaUrl = project.mainImage?.asset?.url || "/placeholder.png";
    const media = project.media || {
        what: mediaUrl,
        how: mediaUrl,
        results: mediaUrl
    };

    const tabs = [
        { id: 'what', label: 'What' },
        { id: 'how', label: 'How' },
        { id: 'results', label: 'Results' }
    ] as const;

    // Auto-cycle tabs every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTab((current) => {
                if (current === 'what') return 'how';
                if (current === 'how') return 'results';
                return 'what';
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [activeTab]);

    return (
        <section id={project.slug?.current || project._id} className="w-full min-h-[100dvh] flex items-center justify-center py-16 lg:py-12 pt-28 lg:pt-24 relative overflow-hidden pointer-events-auto">
            {/* Background subtle glowing orb based on project ID to give unique color cast maybe? Sticking to white/monochrome for Apple sleek. */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[85rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center z-10">

                {/* ════ LEFT COLUMN: Media Window & Controls ════ */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    {/* Media Window Container */}
                    <div className="w-full aspect-video lg:aspect-[16/10] relative rounded-[2rem] overflow-hidden bg-black/60 border border-white/10 shadow-2xl flex-shrink-0 group">
                        <Image
                            key={activeTab} // Force re-animation on tab change
                            src={media[activeTab]}
                            alt={`${activeTab} view of ${project.title}`}
                            fill
                            className="object-cover transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] animate-[scale-in_1.5s_ease-out_forwards] scale-[1.03] group-hover:scale-100"
                            priority
                        />

                        {/* Dynamic Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none opacity-80" />

                        {/* Tags overlay */}
                        <div className="absolute top-8 left-8 flex flex-wrap gap-3 z-10">
                            {project.tags?.map((tag) => (
                                <span key={tag} className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Media Controls (Tabs) */}
                    <div className="flex justify-center gap-3 w-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'what' | 'how' | 'results')}
                                className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-500 ease-out focus:outline-none 
                                    ${activeTab === tab.id
                                        ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.6)] scale-105'
                                        : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ════ RIGHT COLUMN: Stacked Text Content ════ */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">

                    {/* Header Group */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                {project.category || 'PROJECT'}
                            </span>
                            {project.date && (
                                <span className="text-[10px] md:text-xs font-mono text-white/30 tracking-wider uppercase">
                                    {new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                            )}
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white mb-3 leading-tight">
                            {project.title}
                        </h2>
                        {/* Simple array to map description text */}
                        {project.description && (
                            <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                                {typeof project.description[0]?.children?.[0]?.text === 'string'
                                    ? project.description[0].children[0].text
                                    : 'Exploring new frontiers in engineering and design.'}
                            </p>
                        )}
                    </div>

                    {/* Specs Row */}
                    {project.specs && project.specs.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-white/10">
                            {project.specs.map((spec, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">{spec.value}</span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">{spec.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Detailed Content Stack */}
                    <div className="space-y-4 mb-8">
                        <div className="space-y-1.5">
                            <h4 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white">The Challenge</h4>
                            <p className="text-[13px] md:text-sm text-white/60 font-light leading-relaxed">{content.challenge}</p>
                        </div>
                        <div className="space-y-1.5">
                            <h4 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white">The Approach</h4>
                            <p className="text-[13px] md:text-sm text-white/60 font-light leading-relaxed">{content.approach}</p>
                        </div>
                        <div className="space-y-1.5">
                            <h4 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white">The Impact</h4>
                            <p className="text-[13px] md:text-sm text-white/60 font-light leading-relaxed">{content.impact}</p>
                        </div>
                    </div>

                    {/* External Links */}
                    <div className="flex gap-4">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold tracking-widest uppercase text-xs hover:scale-105 transition-transform duration-300">
                                <ExternalLink size={16} /> Live Demo
                            </a>
                        )}
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white/20 hover:scale-105 transition-all duration-300">
                                <Github size={16} /> Source Code
                            </a>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
