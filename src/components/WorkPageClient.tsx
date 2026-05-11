'use client';

import { useState, useEffect } from 'react';
import { ExtendedProject, InteractiveProjectCard } from '@/components/ui/InteractiveProjectCard';
import { SiteHeader } from '@/components/ui/SiteHeader';
import { FEAMesh } from '@/components/ui/FEAMesh';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Experience } from '@/sanity/types';

interface WorkPageClientProps {
    experience: Experience;
    projects: ExtendedProject[];
}

export default function WorkPageClient({ experience, projects }: WorkPageClientProps) {
    const [activeProjectId, setActiveProjectId] = useState<string | null>(
        projects.length > 0 ? (projects[0].slug?.current || projects[0]._id) : null
    );

    // Observe which project section is in view
    useEffect(() => {
        if (projects.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveProjectId(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-40% 0px -40% 0px',
                threshold: 0,
            }
        );

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            projects.forEach((p) => {
                const id = p.slug?.current || p._id;
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });
        }, 200);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [projects]);

    const scrollToProject = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300 pb-32 relative">
            {/* Shared persistent header */}
            <SiteHeader />

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
                <FEAMesh />
            </div>

            {/* ═══════ PROJECT SIDEBAR (desktop only) ═══════ */}
            {projects.length > 0 && (
                <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1 items-start max-h-[60vh] overflow-y-auto scrollbar-none">
                    {/* Back link */}
                    <Link
                        href="/#about"
                        className="group flex items-center gap-3 mb-6 text-xs text-muted hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="tracking-wide">Portfolio</span>
                    </Link>

                    {/* Experience title */}
                    <div className="mb-4 pl-1">
                        <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted/50 mb-1">
                            {experience.company}
                        </div>
                        <div className="text-[9px] font-mono tracking-wider text-muted/30 uppercase">
                            {experience.date}
                        </div>
                    </div>

                    {/* Project list */}
                    {projects.map((project) => {
                        const id = project.slug?.current || project._id;
                        const isActive = activeProjectId === id;
                        return (
                            <button
                                key={project._id}
                                onClick={() => scrollToProject(id)}
                                className="group flex items-center gap-3 py-2 focus:outline-none w-full text-left"
                            >
                                {/* Indicator dot */}
                                <div
                                    className={`shrink-0 transition-all duration-300 rounded-full border
                                        ${isActive
                                            ? 'w-2.5 h-2.5 bg-foreground border-foreground/50 scale-110'
                                            : 'w-1.5 h-1.5 bg-transparent border-border group-hover:bg-foreground/20 group-hover:border-foreground/30'
                                        }`}
                                />
                                {/* Label */}
                                <span
                                    className={`text-sm leading-tight transition-all duration-300 max-w-[180px] truncate
                                        ${isActive
                                            ? 'text-foreground font-medium translate-x-1'
                                            : 'text-muted/60 font-normal group-hover:text-foreground/80'
                                        }`}
                                >
                                    {project.title}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            )}

            {/* ═══════ EXPERIENCE HEADER ═══════ */}
            <header className="w-full pt-28 pb-16 px-6 border-b border-border/50 relative z-10 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto lg:ml-64">
                    <Link href="/#about" className="lg:hidden inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-10 bg-background/50 px-4 py-2 rounded-full border border-border/50 backdrop-blur-md">
                        <ArrowLeft size={16} />
                        Back to Portfolio
                    </Link>

                    <div className="space-y-3 mt-4 lg:mt-0">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">{experience.company}</h1>
                        <h2 className="text-xl md:text-2xl text-muted font-light">{experience.role}</h2>
                        <div className="text-sm font-mono text-muted/60 uppercase tracking-wider">{experience.date}</div>
                    </div>

                    <p className="mt-6 text-lg leading-relaxed max-w-3xl text-foreground/80">
                        {experience.description}
                    </p>
                </div>
            </header>

            {/* ═══════ PROJECTS CONTENT ═══════ */}
            <section className="w-full pt-16 px-6 relative z-10">
                <div className="max-w-5xl mx-auto lg:ml-64">
                    <h3 className="text-2xl font-bold mb-12 tracking-tight">Key Contributions</h3>

                    {projects.length > 0 ? (
                        <div className="space-y-32">
                            {projects.map((project) => (
                                <div
                                    id={project.slug?.current || project._id}
                                    key={project._id}
                                    className="scroll-mt-28"
                                >
                                    <InteractiveProjectCard project={project as any} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 border border-dashed border-border/50 rounded-xl text-center text-muted/50 backdrop-blur-sm bg-background/30">
                            Detailed project case studies for this role are currently under review or NDA.
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
