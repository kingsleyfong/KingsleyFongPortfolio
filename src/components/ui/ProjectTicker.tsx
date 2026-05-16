'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { ExtendedProject } from './InteractiveProjectCard';
import { urlFor } from '@/sanity/lib/image';


interface ProjectTickerProps {
    projects: ExtendedProject[];
    onSelect: (index: number) => void;
}

export function ProjectTicker({ projects, onSelect }: ProjectTickerProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const scrollX = useRef(0);
    const velocity = useRef(0);
    const autoSpeed = useRef(0.55); // Increased for smoother, slightly faster drift
    const isUserInteracting = useRef(false);
    const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rafId = useRef<number>(0);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollStart = useRef(0);
    const lastDragX = useRef(0);
    const lastDragTime = useRef(0);
    const [isGrabbing, setIsGrabbing] = useState(false);

    if (!projects || projects.length === 0) return null;

    // Triple the array for seamless wrapping
    const tripled = [...projects, ...projects, ...projects];

    const getHalfWidth = useCallback(() => {
        if (!trackRef.current) return 1;
        // Width of one full set of projects
        return trackRef.current.scrollWidth / 3;
    }, []);

    // Core animation loop
    const tick = useCallback(() => {
        if (!trackRef.current) return;
        const halfW = getHalfWidth();

        if (!isUserInteracting.current) {
            // Auto-scroll: smooth constant drift to the left
            scrollX.current += autoSpeed.current;
        } else {
            // Apply momentum/friction from user fling
            scrollX.current += velocity.current;
            velocity.current *= 0.97; // reduced friction for 20% more 'swing'
            if (Math.abs(velocity.current) < 0.1) velocity.current = 0;
        }

        // Seamless wrap: when we've scrolled past one full set, jump back
        if (scrollX.current >= halfW) {
            scrollX.current -= halfW;
        } else if (scrollX.current < 0) {
            scrollX.current += halfW;
        }

        trackRef.current.style.transform = `translate3d(${-scrollX.current}px, 0, 0)`;

        rafId.current = requestAnimationFrame(tick);
    }, [getHalfWidth]);

    useEffect(() => {
        // Start on the middle copy so we have room to scroll left
        scrollX.current = getHalfWidth();
        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, [tick, getHalfWidth]);

    // Schedule auto-resume after user stops interacting
    const scheduleResume = useCallback(() => {
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => {
            isUserInteracting.current = false;
        }, 1500); // Resume after 1.5s of inactivity
    }, []);

    // ── Mouse Drag ──
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = true;
        isUserInteracting.current = true;
        setIsGrabbing(true);
        dragStartX.current = e.clientX;
        dragScrollStart.current = scrollX.current;
        lastDragX.current = e.clientX;
        lastDragTime.current = performance.now();
        velocity.current = 0;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const now = performance.now();
        const dx = lastDragX.current - e.clientX;
        const dt = now - lastDragTime.current;
        if (dt > 0) velocity.current = dx / dt * 16; // normalize to ~60fps
        lastDragX.current = e.clientX;
        lastDragTime.current = now;

        const delta = dragStartX.current - e.clientX;
        scrollX.current = dragScrollStart.current + delta;
    }, []);

    const handleMouseUp = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        setIsGrabbing(false);
        scheduleResume();
    }, [scheduleResume]);

    // ── Mouse Wheel (horizontal) ──
    const handleWheel = useCallback((e: React.WheelEvent) => {
        // Use deltaX for horizontal scroll, fall back to deltaY
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        isUserInteracting.current = true;
        velocity.current = 0;
        scrollX.current += delta * 0.8;
        scheduleResume();
    }, [scheduleResume]);

    // ── Touch (mobile) ──
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        isUserInteracting.current = true;
        isDragging.current = true;
        const touch = e.touches[0];
        dragStartX.current = touch.clientX;
        dragScrollStart.current = scrollX.current;
        lastDragX.current = touch.clientX;
        lastDragTime.current = performance.now();
        velocity.current = 0;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging.current) return;
        const touch = e.touches[0];
        const now = performance.now();
        const dx = lastDragX.current - touch.clientX;
        const dt = now - lastDragTime.current;
        if (dt > 0) velocity.current = dx / dt * 16;
        lastDragX.current = touch.clientX;
        lastDragTime.current = now;

        const delta = dragStartX.current - touch.clientX;
        scrollX.current = dragScrollStart.current + delta;
    }, []);

    const handleTouchEnd = useCallback(() => {
        isDragging.current = false;
        scheduleResume();
    }, [scheduleResume]);

    // Prevent click navigation if the user was dragging
    const handleCardClick = useCallback((originalIndex: number, e: React.MouseEvent) => {
        // If user dragged more than 5px, treat it as a drag, not a click
        const dragDistance = Math.abs(e.clientX - dragStartX.current);
        if (dragDistance > 5) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onSelect(originalIndex);
    }, [onSelect]);

    return (
        <div
            className={`w-full overflow-hidden relative flex flex-col pt-0 pb-0 z-40 select-none ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Track – positioned with transform, no CSS animation */}
            <div
                ref={trackRef}
                className="relative flex flex-col will-change-transform"
                style={{ transform: 'translate3d(0,0,0)' }}
            >
                <div className="flex gap-8">
                    {tripled.map((project, index) => {
                        const originalIndex = index % projects.length;

                        return (
                            <div key={`${project._id}-${index}`} className="flex flex-col items-center shrink-0">
                                {/* The Card */}
                                <div
                                    onClick={(e) => handleCardClick(originalIndex, e)}
                                    className="relative w-[300px] h-[200px] md:w-[400px] md:h-[260px] rounded-[1.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] bg-foreground/5 border border-border group/card"
                                >
                                    <Image
                                        src={project.mainImage ? urlFor(project.mainImage).width(800).quality(100).url() : '/portfolio-assets/pdf_img_p3_1.png'}
                                        alt={project.title}
                                        fill
                                        draggable={false}
                                        className="object-cover transition-all duration-700 ease-in-out group-hover/card:scale-105 opacity-80 group-hover/card:opacity-100 pointer-events-none"
                                    />


                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-500 pointer-events-none" />

                                    {/* Text Content */}
                                    <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                                        <h4 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-2 drop-shadow-md line-clamp-2">
                                            {project.title}
                                        </h4>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted bg-background/80 px-3 py-1 rounded-full backdrop-blur-md border border-border">
                                                {project.category || 'PROJECT'}
                                            </span>
                                        </div>
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
