'use client';

import React from 'react';
import { GlassCard } from './GlassCard';
import {
    SiDassaultsystemes, // SolidWorks (Dassault) 
    SiAutodesk, // AutoCAD, Fusion 360
    SiCplusplus,
    SiPython
} from 'react-icons/si';
import { Cog } from 'lucide-react';

const softwares = [
    { name: 'SolidWorks', icon: () => <SiDassaultsystemes className="w-12 h-12 text-white/80" /> },
    { name: 'AutoCAD', icon: () => <SiAutodesk className="w-12 h-12 text-white/80" /> },
    { name: 'MATLAB', icon: () => <Cog className="w-12 h-12 text-white/80" /> },
    { name: 'ANSYS', icon: () => <Cog className="w-12 h-12 text-white/80" /> },
    { name: 'PowerBI', icon: () => <Cog className="w-12 h-12 text-white/80" /> },
    { name: 'Fusion 360', icon: () => <SiAutodesk className="w-12 h-12 text-white/80" /> },
    { name: 'C++', icon: () => <SiCplusplus className="w-12 h-12 text-white/80" /> },
    { name: 'Python', icon: () => <SiPython className="w-12 h-12 text-white/80" /> },
    { name: 'Solid Edge', icon: () => <SiDassaultsystemes className="w-12 h-12 text-white/80" /> },
];

export function SoftwareTicker() {
    // Double the array to create a seamless infinite loop
    const duplicatedSoftwares = [...softwares, ...softwares];

    return (
        <>
            {/* The entire block becomes a group to trap hover, and it kills animation on itself or children when group-hovered  */}
            <div className="w-full overflow-hidden relative opacity-100 flex py-4 z-40 pointer-events-auto group">
                {/* Left and Right Fade Indicators (Optional, but looks nice with glassmorphism) */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                {/* Ticker Container Container */}
                <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused] py-4 pointer-events-auto">
                    {duplicatedSoftwares.map((software, index) => {
                        return (
                            <GlassCard
                                key={index}
                                intensity="high"
                                className="flex items-center gap-6 px-12 py-6 !rounded-full whitespace-nowrap shrink-0 transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-2 hover:bg-white/[0.12] hover:border-white/40 hover:backdrop-brightness-125 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] group pointer-events-auto z-50 relative"
                            >
                                <div className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                    {software.icon()}
                                </div>
                                <span className="font-semibold text-white/90 tracking-widest text-2xl uppercase ml-2 transition-all duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{software.name}</span>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
