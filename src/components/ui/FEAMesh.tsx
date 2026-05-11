'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export const FEAMesh = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let points: Point[] = [];
        
        // Determine colors based on html dark class to avoid hydration mismatch flashes
        const isDark = document.documentElement.classList.contains('dark');
        
        // Configuration: Crisp, high-contrast Slate/Navy for Light mode to prevent "smudge" look
        // Bold, bright Sky Blue for Dark mode to ensure it pops visibly.
        const POINT_COLOR = isDark ? 'rgba(56, 189, 248, 1)' : 'rgba(30, 58, 138, 0.4)'; 
        const LINE_COLOR = isDark ? '56, 189, 248' : '30, 58, 138'; 
        const MAX_DISTANCE = 150;
        const MOUSE_RADIUS = 250;

        let mouse = { x: -1000, y: -1000 };

        class Point {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                // Extremely slow drift
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                // Slightly larger radius so they look like purposeful UI nodes
                this.radius = isDark ? Math.random() * 2.0 + 1.5 : Math.random() * 1.5 + 1.2; 
            }

            update() {
                // Gentle bounce off screen bounds
                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

                this.x += this.vx;
                this.y += this.vy;

                // Mouse repulsion physics (FEA elasticity)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MOUSE_RADIUS) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    // Ease out the force
                    const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                    // Push away gently but with intent
                    this.x -= forceDirectionX * force * 2.0;
                    this.y -= forceDirectionY * force * 2.0;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = POINT_COLOR;
                ctx.fill();
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const init = () => {
            points = [];
            // Responsive point count based on screen size (Density mapping)
            const area = window.innerWidth * window.innerHeight;
            const POINT_COUNT = Math.floor(area / 15000); 
            
            for (let i = 0; i < POINT_COUNT; i++) {
                points.push(new Point(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        };

        const drawLines = () => {
            if (!ctx) return;
            for (let i = 0; i < points.length; i++) {
                // Draw lines between nodes
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < MAX_DISTANCE) {
                        // Fade out line opacity based on distance, but much higher base opacity for dark mode
                        const baseOpacity = isDark ? 0.6 : 0.3;
                        const opacity = (1 - (distance / MAX_DISTANCE)) * baseOpacity;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.strokeStyle = `rgba(${LINE_COLOR}, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }

                // Draw magnetic interaction line connecting nodes directly to the mouse cursor
                const dxMouse = mouse.x - points[i].x;
                const dyMouse = mouse.y - points[i].y;
                const distanceToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distanceToMouse < MOUSE_RADIUS && mouse.x !== -1000) {
                    const baseInteractionOpacity = isDark ? 0.8 : 0.4;
                    const opacity = (1 - (distanceToMouse / MOUSE_RADIUS)) * baseInteractionOpacity;
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(${LINE_COLOR}, ${opacity})`;
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw all lines first so points render on top
            drawLines();
            points.forEach(point => {
                point.update();
                point.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            // Move mouse focus off screen
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseout', handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
};
