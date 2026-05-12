'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/ui/SiteHeader';
import { Experience } from '@/sanity/types';
import { ExtendedProject, InteractiveProjectCard } from '@/components/ui/InteractiveProjectCard';
import { ProjectTicker } from '@/components/ui/ProjectTicker';
import { EasterEgg } from '@/components/ui/EasterEgg';
import { FEAMesh } from '@/components/ui/FEAMesh';
import Link from 'next/link';

interface HomeClientProps {
    initialProjects: ExtendedProject[];
    initialExperiences: Experience[];
    initialHero: any;
    initialSettings?: any;
}

export default function HomeClient({ initialProjects, initialExperiences, initialHero, initialSettings }: HomeClientProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeSectionId, setActiveSectionId] = useState('hero');
    // Initialize state with server-fetched props for instant 0ms load
    const [projects, setProjects] = useState<ExtendedProject[]>(initialProjects);
    const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
    const [hero, setHero] = useState<any>(initialHero);
    const [settings, setSettings] = useState<any>(initialSettings);
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        setSendError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to send message');
            
            setIsSent(true);
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setSendError('Failed to send. Please try again later.');
        } finally {
            setIsSending(false);
        }
    };


    const navItems = useMemo(() => {
        return [
            { id: 'hero', label: 'Intro' },
            { id: 'about', label: 'Background' },
            { id: 'projects', label: 'Projects' },
            { id: 'contact', label: 'Contact' }
        ];
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSectionId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        setTimeout(() => {
            navItems.forEach((item) => {
                const element = document.getElementById(item.id);
                if (element) observer.observe(element);
            });
        }, 100);

        return () => observer.disconnect();
    }, [navItems]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="h-[100dvh] overflow-y-auto overflow-x-hidden relative w-full bg-background tracking-tight text-foreground transition-colors duration-300">

            {/* ═══════ FEA MESH ABSTRACT BACKGROUND ═══════ */}
            <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.1),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(2,132,199,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.1),transparent_50%)]" />
                <FEAMesh />
            </div>

            {/* ═══════ HEADER & THEME TOGGLE ═══════ */}
            <SiteHeader />

            {/* ═══════ MINIMALIST LEFT SIDEBAR ═══════ */}
            <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 items-start">
                {navItems.map((item) => {
                    const isActive = activeSectionId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="group flex items-center gap-4 focus:outline-none"
                        >
                            <div
                                className={`transition-all duration-300 rounded-full border border-border flex items-center justify-center
                  ${isActive
                                        ? 'w-3 h-3 bg-foreground scale-110'
                                        : 'w-2 h-2 bg-transparent group-hover:bg-foreground/20'
                                    }`}
                            />
                            <span
                                className={`text-sm tracking-wide transition-all duration-300 font-medium
                  ${isActive
                                        ? 'text-foreground translate-x-1'
                                        : 'text-muted group-hover:text-foreground'
                                    }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* ═══════ CONTENT ═══════ */}
            <div className="relative z-10 w-full flex flex-col items-center max-w-5xl mx-auto px-6">

                {/* HERO SECTION */}
                <section id="hero" className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-center pt-32 pb-16 gap-12">
                    {/* Left: Profile Picture */}
                    <div className="w-56 h-56 md:w-72 md:h-72 shrink-0 animate-fade-in group/profile" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                        <a 
                            href="https://linkedin.com/in/kingsley-fong" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full h-full p-2 rounded-[2rem] border border-border bg-foreground/5 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-sm transition-all duration-500 hover:scale-[1.03] hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] group"
                        >

                            <img
                                src="/kingsley.png"
                                alt="Kingsley Fong Profile"
                                className="w-full h-full object-cover rounded-[1.5rem] transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                            />
                        </a>
                    </div>

                    {/* Right: Text Content */}
                    <div className="animate-fade-in text-center md:text-left flex-1" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-foreground">
                            {hero?.headline || 'Kingsley Fong'}
                        </h1>
                        <p className="text-xl md:text-3xl text-muted font-light leading-relaxed mx-auto md:mx-0 whitespace-normal md:whitespace-nowrap">
                            Mechanical Engineering Student at University of Waterloo.
                        </p>
                        <p className="text-lg md:text-xl text-muted/70 max-w-2xl font-light leading-relaxed mt-6 mx-auto md:mx-0">
                            {hero?.description || "I'm a mechanical engineer driven by a passion for eliminating inefficiencies and building highly scalable hardware systems. I love bridging the gap between rigorous validation and high-throughput manufacturing to solve hard, physical problems."}
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 text-sm tracking-wide"
                            >
                                View Engineering Work
                            </button>
                            <a
                                href="mailto:hello@kingsleyfong.com"
                                className="px-8 py-3 rounded-md border border-border bg-background/50 text-foreground font-medium hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-sm tracking-wide backdrop-blur-md"
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>
                </section>

                {/* RECENT WORK SECTION */}
                <section id="about" className="w-full py-20 border-t border-border flex flex-col justify-center min-h-[80vh]">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-foreground">Recent Work Portfolio</h2>
                    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
                        {experiences.map((exp) => (
                            <Link href={`/work/${exp.slug?.current || exp.slug}`} key={exp._id} className="group relative flex items-center gap-6 md:gap-8 p-4 md:p-6 rounded-2xl border border-border/50 bg-background/30 backdrop-blur-md hover:bg-foreground/5 hover:border-foreground/20 transition-all duration-300">
                                
                                {/* Image Placeholder (Square) */}
                                <div className="w-24 h-24 md:w-40 md:h-40 rounded-xl bg-foreground/5 border border-border overflow-hidden relative shrink-0 shadow-sm">
                                    {exp.thumbnail ? (
                                        <img src={exp.thumbnail} alt={`${exp.company} thumbnail`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted/30 font-mono text-[10px] text-center p-2">
                                            IMAGE
                                        </div>
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 py-2">
                                    <h3 className="text-xl md:text-3xl font-bold text-foreground tracking-tight mb-1">{exp.company}</h3>
                                    <div className="text-sm md:text-lg text-muted font-light">
                                        {exp.role} <span className="opacity-50 ml-1 tracking-wide text-xs md:text-sm">({exp.date})</span>
                                    </div>
                                </div>
                                
                                <div className="text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden md:block pr-4">
                                    <ArrowRight size={24} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section id="projects" className="w-full py-32 border-t border-border mt-32">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-foreground">Selected Work</h2>

                    {/* The Infinite Scrolling Timeline */}
                    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 mb-16 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                        <ProjectTicker
                            projects={projects}
                            onSelect={(index) => {
                                const projectId = projects[index]._id;
                                const projectSlug = projects[index].slug?.current || projects[index].slug || projectId;
                                const exp = experiences.find(e => e.projectIds?.includes(projectId) || (e as any).projects?.some((p: any) => p._ref === projectId));
                                const expSlug = exp ? (exp.slug?.current || exp.slug) : 'independent-projects';
                                const targetUrl = `/work/${expSlug}#${projectSlug}`;
                                window.location.href = targetUrl;
                            }}
                        />
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section id="contact" className="w-full py-32 border-t border-border flex flex-col items-center">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-foreground text-center">
                        {settings?.connectTitle || "Let's Connect."}
                    </h2>
                    <p className="text-lg text-muted mb-12 text-center max-w-xl font-light">
                        {settings?.connectDescription || "I am currently seeking Fall 2027 internship opportunities. Feel free to reach out if you're looking for a driven Manufacturing/Mechanical Engineer."}
                    </p>

                    {isSent ? (
                        <div className="w-full max-w-2xl bg-foreground/5 p-12 rounded-3xl border border-blue-500/30 backdrop-blur-md flex flex-col items-center gap-4 animate-fade-in text-center">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">Message Sent!</h3>
                            <p className="text-muted font-light">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                            <button 
                                onClick={() => setIsSent(false)}
                                className="mt-4 px-8 py-3 rounded-full border border-border hover:bg-foreground/5 transition-colors text-xs font-bold uppercase tracking-widest"
                            >
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleFormSubmit} className="w-full max-w-2xl flex flex-col gap-6 bg-foreground/5 p-8 rounded-2xl border border-border backdrop-blur-sm shadow-sm transition-all hover:border-foreground/10">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-sm font-bold text-foreground uppercase tracking-wider">Name</label>
                                    <input type="text" name="name" className="p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Your Name" required />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-sm font-bold text-foreground uppercase tracking-wider">Email</label>
                                    <input type="email" name="email" className="p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="your@email.com" required />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm font-bold text-foreground uppercase tracking-wider">Message</label>
                                <textarea name="message" rows={5} className="p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none" placeholder="How can I help you?" required></textarea>
                            </div>

                            {sendError && <p className="text-red-500 text-sm font-medium text-center">{sendError}</p>}

                            <button 
                                type="submit" 
                                disabled={isSending}
                                className={`mt-4 px-8 py-4 rounded-xl bg-foreground text-background font-bold uppercase tracking-widest transition-all
                                    ${isSending ? 'opacity-50 cursor-not-allowed scale-[0.98]' : 'hover:scale-[1.01] active:scale-[0.99]'}
                                `}
                            >
                                {isSending ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                        Sending...
                                    </div>
                                ) : 'Send Message'}
                            </button>
                        </form>
                    )}

                    <div className="flex gap-8 mt-16">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="font-medium text-muted hover:text-foreground transition-colors">GitHub</a>
                        <a href="https://linkedin.com/in/kingsleyfong" target="_blank" rel="noopener noreferrer" className="font-medium text-muted hover:text-foreground transition-colors">LinkedIn</a>
                        <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-medium text-muted hover:text-foreground transition-colors">Resume</a>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="w-full py-8 border-t border-border flex justify-between items-center text-muted text-sm px-2">
                    <p>© {new Date().getFullYear()} Kingsley Fong</p>
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-xs opacity-50">sys.status: optimal</span>
                        <EasterEgg />
                    </div>
                </footer>

            </div>
        </main>
    );
}
