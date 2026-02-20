'use client';

import Spline from '@splinetool/react-spline';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SplineSceneProps {
    scene: string;
    className?: string;
    /** Control whether the canvas captures pointer events. Default: true */
    interactive?: boolean;
    /** Callback fired once the Spline canvas element is available in the DOM */
    onCanvasReady?: (canvas: HTMLCanvasElement) => void;
    /** Callback fired when the Spline app has loaded */
    onLoad?: (splineApp: any) => void;
}

export function SplineScene({ scene, className, interactive = true, onCanvasReady, onLoad }: SplineSceneProps) {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleLoad = (splineApp: any) => {
        setLoading(false);
        if (onLoad) {
            onLoad(splineApp);
        }
        if (containerRef.current && onCanvasReady) {
            const canvas = containerRef.current.querySelector('canvas');
            if (canvas) onCanvasReady(canvas as HTMLCanvasElement);
        }
    };

    return (
        <div ref={containerRef} className={cn('w-full h-full relative overflow-hidden', className)}>
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-10 transition-opacity duration-1000">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            )}

            <div className="w-full h-full scale-[1.1] origin-center">
                <Spline
                    scene={scene}
                    onLoad={handleLoad}
                    className={cn(
                        'w-full h-full',
                        interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    )}
                />
            </div>
        </div>
    );
}
