'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, ChevronLeft, ChevronRight, X, Maximize2, FileText, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../sanity/types';
import { urlFor } from '@/sanity/lib/image';

import { createPortal } from 'react-dom';

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
    const [lightboxMedia, setLightboxMedia] = useState<{ 
        type: 'image' | 'video' | 'pdf'; 
        src: string; 
        alt?: string;
        index?: number; // Track index if it's from the carousel
    } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const carousel = project.media?.carousel || [];
    const bottomLeft = project.media?.bottomLeftAnchor;
    const bottomRight = project.media?.bottomRightAnchor;

    // Unified Media Array for Lightbox
    const allMedia = [
        ...carousel,
        ...(bottomLeft ? [bottomLeft] : []),
        ...(bottomRight ? [bottomRight] : [])
    ];

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % carousel.length);
    }, [carousel.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + carousel.length) % carousel.length);
    }, [carousel.length]);

    // Carousel Sync Logic
    useEffect(() => {
        if (carousel.length <= 1 || isPaused || lightboxMedia) return;

        const currentItem = carousel[currentIndex];
        
        // If it's an image or PDF, use a 3s timer
        if (currentItem.type !== 'video') {
            const interval = setInterval(() => {
                nextSlide();
            }, 3000);
            return () => clearInterval(interval);
        }
        
        // Videos are handled by the onEnded event in the video element itself
        // But we keep a fallback timer of 30s just in case
        const fallback = setTimeout(() => {
            nextSlide();
        }, 30000);
        return () => clearTimeout(fallback);
    }, [carousel.length, isPaused, lightboxMedia, currentIndex, nextSlide]);

    const renderMedia = (item: any, className: string, isHero = false, onEnded?: () => void) => {
        if (!item) return null;
        
        const type = item.type || 'image';
        let src = '';

        if (type === 'video') src = item.video;
        else if (type === 'pdf') src = item.pdf;
        else src = item.image;

        // Resolve Sanity objects to URLs
        if (typeof src === 'object' && src !== null) {
            if (type === 'video' || type === 'pdf') {
                src = (src as any).asset?.url || (src as any).url;
            } else {
                try { src = urlFor(src).url(); } catch (e) { src = (src as any).asset?.url || (src as any).url; }
            }
        }

        if (!src || typeof src !== 'string') {
            if (type === 'pdf' && item.pdfThumbnail) {
                try { src = urlFor(item.pdfThumbnail).url(); } catch (e) { return null; }
            } else {
                return null;
            }
        }

        if (type === 'video') {
            return (
                <video
                    src={src}
                    autoPlay
                    loop={!isHero} // Only loop if not the hero (anchors loop, hero syncs)
                    muted
                    playsInline
                    preload="auto"
                    onEnded={onEnded}
                    onContextMenu={(e) => e.preventDefault()}
                    controlsList="nodownload"
                    className={`${className} object-cover`}
                />
            );
        }

        if (type === 'pdf') {
            const thumbUrl = item.pdfThumbnail ? urlFor(item.pdfThumbnail).url() : null;
            return (
                <div className={`${className} relative group/pdf overflow-hidden bg-background`}>
                    {thumbUrl ? (
                        <img src={thumbUrl} alt="PDF Preview" className="w-full h-full object-cover opacity-60 group-hover/pdf:opacity-40 transition-opacity duration-700" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-foreground/[0.03]">
                            <FileText size={48} className="text-foreground/10 mb-4" />
                        </div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="p-4 rounded-2xl bg-background/40 backdrop-blur-2xl border border-white/10 shadow-2xl scale-90 group-hover/pdf:scale-100 transition-all duration-500">
                            <FileText size={32} className="text-foreground" />
                        </div>
                        <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 group-hover/pdf:text-foreground/60 transition-colors">
                            Technical Report
                        </span>
                    </div>
                </div>
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

    const handleLightboxNav = (direction: 'next' | 'prev') => {
        if (!lightboxMedia || lightboxMedia.index === undefined) return;
        
        const nextIdx = direction === 'next' 
            ? (lightboxMedia.index + 1) % allMedia.length 
            : (lightboxMedia.index - 1 + allMedia.length) % allMedia.length;
        
        const item = allMedia[nextIdx];
        let s = (item.type === 'video' ? item.video : (item.type === 'pdf' ? item.pdf : item.image)) || '';
        if (typeof s === 'object') s = (s as any).asset?.url || (s as any).url || '';
        
        setLightboxMedia({
            type: item.type as any || 'image',
            src: s as string,
            alt: item.alt,
            index: nextIdx
        });
    };

    return (
        <section id={project.slug?.current || project._id} className="w-full min-h-[85vh] flex items-center justify-center py-6 lg:py-10 relative pointer-events-auto border-t border-border mt-12 scroll-mt-24">
            <div className="w-full max-w-[85rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center z-10">

                {/* ════ LEFT COLUMN: Hero Stage + Anchors ════ */}
                <div className="w-full lg:w-[52%] flex flex-col gap-4">
                    
                    {/* HERO STAGE (Carousel) */}
                    <div 
                        className="w-full aspect-[16/10] relative rounded-2xl overflow-hidden bg-foreground/5 border border-border/50 shadow-2xl group cursor-pointer"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onClick={() => {
                            const current = carousel[currentIndex];
                            if (current) {
                                let s = (current.type === 'video' ? current.video : (current.type === 'pdf' ? current.pdf : current.image)) || '';
                                if (typeof s === 'object') s = (s as any).asset?.url || (s as any).url || '';
                                setLightboxMedia({
                                    type: current.type as any || 'image',
                                    src: s as string,
                                    alt: current.alt,
                                    index: currentIndex
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
                                    renderMedia(carousel[currentIndex], "w-full h-full", true, nextSlide)
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
                                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-background/40 z-20"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-background/40 z-20"
                                >
                                    <ChevronRight size={18} />
                                </button>
                                
                                {/* Progress Dashes */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                    {carousel.map((_, i) => (
                                        <div 
                                            key={i}
                                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                                            className={`h-1 rounded-full transition-all duration-700 cursor-pointer ${i === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        <div className="absolute top-4 right-4 p-1.5 rounded-full bg-background/20 backdrop-blur-md border border-white/10 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 size={14} />
                        </div>
                    </div>

                    {/* ANCHOR TILES */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Bottom Left Anchor */}
                        <div 
                            className="aspect-[4/3] relative rounded-xl overflow-hidden bg-foreground/5 border border-border/50 shadow-lg group cursor-pointer"
                            onClick={() => {
                                if (bottomLeft) {
                                    let s = (bottomLeft.type === 'video' ? bottomLeft.video : (bottomLeft.type === 'pdf' ? bottomLeft.pdf : bottomLeft.image)) || '';
                                    if (typeof s === 'object') s = (s as any).asset?.url || (s as any).url || '';
                                    setLightboxMedia({
                                        type: bottomLeft.type as any || 'image',
                                        src: s as string,
                                        alt: bottomLeft.alt,
                                        index: carousel.length // First anchor after carousel
                                    });
                                }
                            }}
                        >
                            {bottomLeft ? (
                                renderMedia(bottomLeft, "w-full h-full transition-transform duration-1000 group-hover:scale-105")
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted/20 text-[9px] font-bold uppercase tracking-widest">
                                    Anchor L
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 size={20} className="text-white/80" />
                            </div>
                        </div>

                        {/* Bottom Right Anchor */}
                        <div 
                            className="aspect-[4/3] relative rounded-xl overflow-hidden bg-foreground/5 border border-border/50 shadow-lg group cursor-pointer"
                            onClick={() => {
                                if (bottomRight) {
                                    let s = (bottomRight.type === 'video' ? bottomRight.video : (bottomRight.type === 'pdf' ? bottomRight.pdf : bottomRight.image)) || '';
                                    if (typeof s === 'object') s = (s as any).asset?.url || (s as any).url || '';
                                    setLightboxMedia({
                                        type: bottomRight.type as any || 'image',
                                        src: s as string,
                                        alt: bottomRight.alt,
                                        index: carousel.length + (bottomLeft ? 1 : 0) // Final anchor
                                    });
                                }
                            }}
                        >
                            {bottomRight ? (
                                renderMedia(bottomRight, "w-full h-full transition-transform duration-1000 group-hover:scale-105")
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted/20 text-[9px] font-bold uppercase tracking-widest">
                                    Anchor R
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 size={20} className="text-white/80" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ════ RIGHT COLUMN: Technical Narrative ════ */}
                <div className="w-full lg:w-[48%] flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase rounded-full bg-blue-500/5 text-blue-500 border border-blue-500/10">
                            {project.category || "ENGINEERING PROJECT"}
                        </span>
                        <span className="text-[9px] font-mono text-muted/50 tracking-widest uppercase">
                            {project.year || "2025"}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-foreground leading-[0.9] max-w-[12ch]">
                        {project.title}
                    </h2>

                    <div className="text-sm md:text-base text-muted/70 font-light leading-relaxed mb-6 max-w-lg">
                        {typeof project.description === 'string' ? project.description : 
                          (project.description?.[0]?.children?.[0]?.text || "Advanced mechatronic exploration focused on high-precision sensing and structural optimization.")}
                    </div>

                    {/* Specs Matrix - More Compact */}
                    {project.specs && project.specs.length > 0 && (
                        <div className="grid grid-cols-3 gap-6 w-full mb-6 py-6 border-y border-border/50">
                            {project.specs.map((spec, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-xl md:text-2xl font-black tracking-tighter text-foreground tabular-nums leading-none">
                                        {spec.value}
                                    </span>
                                    <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted/40">
                                        {spec.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Technical Breakdown - Tightened */}
                    <div className="space-y-4 mb-8">
                        <div className="group/text">
                            <h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted/30 mb-1.5 transition-colors group-hover/text:text-blue-500/50">The Challenge</h4>
                            <p className="text-xs md:text-sm text-muted/80 leading-relaxed font-medium">
                                {project.content?.challenge || "Solving critical architectural constraints through iterative prototyping and GD&T validation."}
                            </p>
                        </div>
                        <div className="group/text">
                            <h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted/30 mb-1.5 transition-colors group-hover/text:text-blue-500/50">The Approach</h4>
                            <p className="text-xs md:text-sm text-muted/80 leading-relaxed font-medium">
                                {project.content?.approach || "Implementing 6-DoF sensing arrays and non-contact magnetic kinematics for high-reliability control."}
                            </p>
                        </div>
                        <div className="group/text">
                            <h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted/30 mb-1.5 transition-colors group-hover/text:text-blue-500/50">The Impact</h4>
                            <p className="text-xs md:text-sm text-muted/80 leading-relaxed font-medium">
                                {project.content?.impact || "Achieved measurable improvements in system throughput and ergonomic durability."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto">
                        {project.links?.demo && (
                            <a 
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-foreground text-background font-bold text-[9px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95"
                            >
                                <ExternalLink size={14} />
                                Technical Work
                            </a>
                        )}
                        {project.links?.github && (
                            <a 
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-border bg-background/30 text-foreground font-bold text-[9px] uppercase tracking-[0.2em] backdrop-blur-md transition-all hover:bg-foreground/5 hover:scale-[1.02] active:scale-95"
                            >
                                <Github size={14} />
                                Source
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* LIGHTBOX PORTAL */}
            {mounted && createPortal(
                <AnimatePresence>
                    {lightboxMedia && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[10000] bg-[#050505]/98 flex items-center justify-center p-4 md:p-12 will-change-transform"
                            onClick={() => setLightboxMedia(null)}
                        >
                            {/* Sleek Minimal Close Button */}
                            <button 
                                className="absolute top-8 right-8 md:top-10 md:right-10 p-4 rounded-full bg-white/5 text-white/40 hover:bg-white hover:text-black transition-all z-[10002] border border-white/5 backdrop-blur-md shadow-2xl group"
                                onClick={(e) => { e.stopPropagation(); setLightboxMedia(null); }}
                            >
                                <X size={24} className="group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Lightbox Navigation */}
                            {lightboxMedia.index !== undefined && allMedia.length > 1 && (
                                <>
                                    <button 
                                        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 text-white/40 hover:bg-white hover:text-black transition-all z-[10001] border border-white/5 backdrop-blur-md shadow-2xl"
                                        onClick={(e) => { e.stopPropagation(); handleLightboxNav('prev'); }}
                                    >
                                        <ChevronLeft size={28} />
                                    </button>
                                    <button 
                                        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 text-white/40 hover:bg-white hover:text-black transition-all z-[10001] border border-white/5 backdrop-blur-md shadow-2xl"
                                        onClick={(e) => { e.stopPropagation(); handleLightboxNav('next'); }}
                                    >
                                        <ChevronRight size={28} />
                                    </button>
                                </>
                            )}
                            
                            <motion.div 
                                initial={{ scale: 0.98, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.98, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full max-w-[90vw] h-full max-h-[85vh] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 bg-black transform-gpu translate-z-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {lightboxMedia.type === 'video' ? (
                                    <div className="w-full h-full relative group/player">
                                        <video
                                            src={lightboxMedia.src}
                                            autoPlay
                                            controls
                                            playsInline
                                            preload="auto"
                                            onContextMenu={(e) => e.preventDefault()}
                                            controlsList="nodownload noplaybackrate"
                                            disablePictureInPicture
                                            className="w-full h-full object-contain transform-gpu"
                                        />
                                        {/* Minimalist Overlay to hide browser UI artifacts if any */}
                                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-0 group-hover/player:opacity-100 transition-opacity duration-500" />
                                    </div>
                                ) : lightboxMedia.type === 'pdf' ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                                        <iframe
                                            src={`${lightboxMedia.src}#toolbar=0&view=FitH`}
                                            className="w-full h-full border-none"
                                            title="PDF Viewer Case Study"
                                        />
                                        
                                        {/* Glassmorphism PDF Action Bar */}
                                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-5 rounded-[2rem] bg-white/10 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-5">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Technical Document</span>
                                                <span className="text-xs font-bold text-white/80">Case Study Report</span>
                                            </div>
                                            <div className="w-px h-8 bg-white/10 mx-2" />
                                            <a 
                                                href={lightboxMedia.src} 
                                                target="_blank" 
                                                className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform"
                                            >
                                                <ExternalLink size={14} />
                                                View Full
                                            </a>
                                            <a 
                                                href={lightboxMedia.src} 
                                                download 
                                                className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
                                                title="Download Report"
                                            >
                                                <Download size={16} />
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={lightboxMedia.src}
                                        alt={lightboxMedia.alt || "Lightbox View"}
                                        className="w-full h-full object-contain will-change-transform"
                                    />
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}
