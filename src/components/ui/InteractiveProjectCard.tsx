'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../sanity/types';
import { urlFor } from '@/sanity/lib/image';

export interface ExtendedProject extends Project {
    content?: {
        challenge: string;
        approach: string;
        impact: string;
    };
}

export function InteractiveProjectCard({ project }: { project: ExtendedProject }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [lightboxMedia, setLightboxMedia] = useState<{ type: 'image' | 'video'; src: string; alt?: string } | null>(null);

    const carousel = project.media?.carousel || [];
    const bottomLeft = project.media?.bottomLeftAnchor;
    const bottomRight = project.media?.bottomRightAnchor;

    // Auto-scroll logic (3 seconds)
    useEffect(() => {
        if (carousel.length <= 1 || isPaused || lightboxMedia) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carousel.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [carousel.length, isPaused, lightboxMedia]);

    const nextSlide = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % carousel.length);
    }, [carousel.length]);

    const prevSlide = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + carousel.length) % carousel.length);
    }, [carousel.length]);

    const renderMedia = (item: any, className: string, isHero = false) => {
        if (!item) return null;
        
        // Handle Sanity structure vs local string path
        const isVideo = item.type === 'video';
        let src = isVideo ? item.video : item.image;

        // If it's a Sanity asset object (not yet resolved by GROQ), we need to handle it.
        // But our GROQ resolves it to a string. Mock data also uses strings.
        // If it's still an object, we attempt to get the URL.
        if (typeof src === 'object' && src !== null) {
            if (isVideo) {
                // If it's a file object from Sanity
                src = (src as any).asset?.url || (src as any).url;
            } else {
                // If it's an image object from Sanity
                try {
                    src = urlFor(src).url();
                } catch (e) {
                    src = (src as any).asset?.url || (src as any).url;
                }
            }
        }

        if (!src || typeof src !== 'string') return null;

        if (isVideo) {
            return (
                <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`${className} object-cover`}
                />
            );
        }

        return (
            <img
                src={src}
                alt={item.alt || "Project Media"}
                className={`${className} object-cover`}
                loading={isHero ? "eager" : "lazy"}
            />
        );
    };

    return (
        <section id={project.slug?.current || project._id} className="w-full min-h-[90dvh] flex items-center justify-center py-12 lg:py-20 relative pointer-events-auto border-t border-border mt-16 scroll-mt-24">
            <div className="w-full max-w-[85rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center z-10">

                {/* ════ LEFT COLUMN: Hero Stage + Anchors ════ */}
                <div className="w-full lg:w-[55%] flex flex-col gap-6">
                    
                    {/* HERO STAGE (Carousel) */}
                    <div 
                        className="w-full aspect-[16/10] relative rounded-3xl overflow-hidden bg-foreground/5 border border-border/50 shadow-2xl group cursor-pointer"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onClick={() => {
                            const current = carousel[currentIndex];
                            if (current) {
                                setLightboxMedia({
                                    type: current.type,
                                    src: (current.type === 'video' ? current.video : current.image) || '',
                                    alt: current.alt
                                });
                            }
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                {carousel.length > 0 ? (
                                    renderMedia(carousel[currentIndex], "w-full h-full", true)
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted/20 text-xs font-bold uppercase tracking-widest">
                                        No Hero Media
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Glassmorphism Controls */}
                        {carousel.length > 1 && (
                            <>
                                <button 
                                    onClick={prevSlide}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-background/40 z-20"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={nextSlide}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-background/40 z-20"
                                >
                                    <ChevronRight size={20} />
                                </button>
                                
                                {/* Progress Dashes */}
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
                                    {carousel.map((_, i) => (
                                        <div 
                                            key={i}
                                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                                            className={`h-1 rounded-full transition-all duration-700 cursor-pointer ${i === currentIndex ? 'w-10 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        <div className="absolute top-6 right-6 p-2 rounded-full bg-background/20 backdrop-blur-md border border-white/10 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 size={16} />
                        </div>
                    </div>

                    {/* ANCHOR TILES */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Bottom Left Anchor */}
                        <div 
                            className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-foreground/5 border border-border/50 shadow-lg group cursor-pointer"
                            onClick={() => {
                                if (bottomLeft) {
                                    setLightboxMedia({
                                        type: bottomLeft.type,
                                        src: (bottomLeft.type === 'video' ? bottomLeft.video : bottomLeft.image) || '',
                                        alt: bottomLeft.alt
                                    });
                                }
                            }}
                        >
                            {bottomLeft ? (
                                renderMedia(bottomLeft, "w-full h-full transition-transform duration-1000 group-hover:scale-105")
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted/20 text-[10px] font-bold uppercase tracking-widest">
                                    Anchor L
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 size={24} className="text-white/80" />
                            </div>
                        </div>

                        {/* Bottom Right Anchor */}
                        <div 
                            className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-foreground/5 border border-border/50 shadow-lg group cursor-pointer"
                            onClick={() => {
                                if (bottomRight) {
                                    setLightboxMedia({
                                        type: bottomRight.type,
                                        src: (bottomRight.type === 'video' ? bottomRight.video : bottomRight.image) || '',
                                        alt: bottomRight.alt
                                    });
                                }
                            }}
                        >
                            {bottomRight ? (
                                renderMedia(bottomRight, "w-full h-full transition-transform duration-1000 group-hover:scale-105")
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted/20 text-[10px] font-bold uppercase tracking-widest">
                                    Anchor R
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 size={24} className="text-white/80" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ════ RIGHT COLUMN: Technical Narrative ════ */}
                <div className="w-full lg:w-[45%] flex flex-col items-start">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase rounded-full bg-blue-500/5 text-blue-500 border border-blue-500/10">
                            {project.category || "ENGINEERING PROJECT"}
                        </span>
                        <span className="text-[10px] font-mono text-muted/50 tracking-widest uppercase">
                            {project.year || "2025"}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 text-foreground leading-[0.95]">
                        {project.title}
                    </h2>

                    <div className="text-lg md:text-xl text-muted/70 font-light leading-relaxed mb-12 max-w-xl">
                        {typeof project.description === 'string' ? project.description : 
                          (project.description?.[0]?.children?.[0]?.text || "Advanced mechatronic exploration focused on high-precision sensing and structural optimization.")}
                    </div>

                    {/* Specs Matrix */}
                    {project.specs && project.specs.length > 0 && (
                        <div className="grid grid-cols-3 gap-10 w-full mb-12 py-10 border-y border-border/50">
                            {project.specs.map((spec, i) => (
                                <div key={i} className="flex flex-col gap-1.5">
                                    <span className="text-2xl md:text-4xl font-black tracking-tighter text-foreground tabular-nums leading-none">
                                        {spec.value}
                                    </span>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted/40">
                                        {spec.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Technical Breakdown */}
                    <div className="space-y-10 mb-14">
                        <div className="group/text">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/30 mb-4 transition-colors group-hover/text:text-blue-500/50">The Challenge</h4>
                            <p className="text-sm md:text-base text-muted/80 leading-relaxed font-medium">
                                {project.content?.challenge || "Solving critical architectural constraints through iterative prototyping and GD&T validation."}
                            </p>
                        </div>
                        <div className="group/text">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/30 mb-4 transition-colors group-hover/text:text-blue-500/50">The Approach</h4>
                            <p className="text-sm md:text-base text-muted/80 leading-relaxed font-medium">
                                {project.content?.approach || "Implementing 6-DoF sensing arrays and non-contact magnetic kinematics for high-reliability control."}
                            </p>
                        </div>
                        <div className="group/text">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/30 mb-4 transition-colors group-hover/text:text-blue-500/50">The Impact</h4>
                            <p className="text-sm md:text-base text-muted/80 leading-relaxed font-medium">
                                {project.content?.impact || "Achieved measurable improvements in system throughput and ergonomic durability."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-auto">
                        {project.links?.demo && (
                            <a 
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95"
                            >
                                <ExternalLink size={16} />
                                View Technical Work
                            </a>
                        )}
                        {project.links?.github && (
                            <a 
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-8 py-4 rounded-full border border-border bg-background/30 text-foreground font-bold text-[10px] uppercase tracking-[0.2em] backdrop-blur-md transition-all hover:bg-foreground/5 hover:scale-[1.02] active:scale-95"
                            >
                                <Github size={16} />
                                Source
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* LIGHTBOX PORTAL */}
            <AnimatePresence>
                {lightboxMedia && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-16"
                        onClick={() => setLightboxMedia(null)}
                    >
                        <button className="absolute top-10 right-10 p-5 rounded-full bg-foreground/5 text-foreground/50 hover:bg-foreground/10 hover:text-foreground transition-all z-[110] border border-white/5">
                            <X size={28} />
                        </button>
                        
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-7xl aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.7)] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {lightboxMedia.type === 'video' ? (
                                <video
                                    src={lightboxMedia.src}
                                    autoPlay
                                    controls
                                    className="w-full h-full object-contain bg-black"
                                />
                            ) : (
                                <img
                                    src={lightboxMedia.src}
                                    alt={lightboxMedia.alt || "Lightbox View"}
                                    className="w-full h-full object-contain bg-black"
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
