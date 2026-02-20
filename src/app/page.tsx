'use client';

import { SplineScene } from '@/components/ui/SplineScene';
import { GlassCard } from '@/components/ui/GlassCard';
import { SoftwareTicker } from '@/components/ui/SoftwareTicker';
import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { Github, Linkedin, Mail, Twitter, ChevronDown, ChevronUp } from 'lucide-react';
import { getProjects } from '@/sanity/lib/client';
import { ExtendedProject, InteractiveProjectCard } from '@/components/ui/InteractiveProjectCard';
import { ProjectTicker } from '@/components/ui/ProjectTicker';

export default function Home() {
  const robotCanvasRef = useRef<HTMLCanvasElement | null>(null);

  /* ───────────────────────────────────────────────
   * Forward every global mouse-move to the robot
   * canvas so Spline's built-in "Follow Cursor"
   * behaviour fires.
   * ─────────────────────────────────────────────── */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = robotCanvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const syntheticEvent = new PointerEvent('pointermove', {
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        pointerId: 1,
        pointerType: 'mouse',
        bubbles: true,
        cancelable: true,
      });

      Object.defineProperties(syntheticEvent, {
        offsetX: { value: offsetX },
        offsetY: { value: offsetY },
      });

      canvas.dispatchEvent(syntheticEvent);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRobotCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    robotCanvasRef.current = canvas;
  }, []);

  const handleRobotSplineLoad = useCallback((splineApp: any) => {
    try {
      // The NANOBOT text is baked into 7 meshes under a group named 'logo'
      const logoGroup = splineApp.findObjectByName('logo');
      if (logoGroup) {
        logoGroup.visible = false;
      }

      // Attempt to make the Spline scene's internal background transparent
      if (typeof splineApp.setBackgroundColor === 'function') {
        splineApp.setBackgroundColor('rgba(0,0,0,0)');
      } else if (splineApp._scene) {
        splineApp._scene.background = null;
      }
    } catch (e) {
      console.warn('Could not hide Spline object', e);
    }
  }, []);

  // Track active section for sidebar navigation
  const [activeSectionId, setActiveSectionId] = useState('hero');

  // Projects State
  const [projects, setProjects] = useState<ExtendedProject[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  // Fetch projects on mount
  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  // Compute navigation items dynamically based on visible projects
  const navItems = useMemo(() => {
    return [
      { id: 'hero', label: 'Intro' },
      { id: 'about', label: 'Background' },
      { id: 'projects', label: 'Projects' },
      ...projects.slice(0, visibleCount).map((p) => ({
        id: p.slug?.current || p._id,
        label: p.title
      })),
      { id: 'contact', label: 'Contact' }
    ];
  }, [projects, visibleCount]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
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

    // Briefly delay observing to let React render any newly expanded project sections
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
    <main className="h-[100dvh] overflow-y-auto overflow-x-hidden relative w-full bg-black tracking-tight text-white selection:bg-white/20">

      {/* ═══════ FIXED BACKGROUND: Robot (z-0) ═══════ */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
        {/* Glow aura behind the robot */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '50vw',
            height: '50vh',
            background: 'radial-gradient(circle, rgba(120, 80, 255, 0.15) 0%, rgba(0, 220, 255, 0.05) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Massive Background Text behind the robot */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-10 overflow-hidden pointer-events-none opacity-80 user-select-none z-[0]">
          <h1 className="text-[16vw] leading-[0.85] font-black text-white/50 tracking-tighter whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            MECHANICAL
          </h1>
          <h1 className="text-[16vw] leading-[0.85] font-black text-white/50 tracking-tighter whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            ENGINEERING
          </h1>
        </div>

        {/* Robot Spline scene centered */}
        <div
          className="absolute w-full h-[120%] pointer-events-none opacity-100 z-[1]"
          style={{
            transform: 'scale(1.1) translateY(10%)',
          }}
        >
          <SplineScene
            scene="https://prod.spline.design/t3k7oPsl0Z1W5ywo/scene.splinecode"
            className="w-full h-full"
            interactive={false}
            onCanvasReady={handleRobotCanvasReady}
            onLoad={handleRobotSplineLoad}
          />
        </div>
      </div>

      {/* ═══════ FIXED HEADER (z-50) ═══════ */}
      <header className="fixed top-0 left-0 w-full px-6 py-8 flex justify-between items-center z-50 transition-all duration-300 backdrop-blur-md bg-black/20 border-b border-white/5 animate-fade-in pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="text-3xl md:text-4xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity" onClick={() => scrollToSection('hero')}>
            Kingsley Fong
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 font-semibold pointer-events-auto">
          <button onClick={() => scrollToSection('hero')} className="bg-clip-text text-transparent bg-gradient-to-r from-white/40 via-white to-white/40 bg-[length:200%_auto] animate-[pulse_3s_ease-in-out_infinite] text-xl md:text-2xl tracking-tight hover:opacity-80 transition-opacity">
            Building the future.
          </button>

          {/* Minimal Divider */}
          <div className="w-[1px] h-6 bg-white/20" />

          {/* Liquid Glass Navigation Pills */}
          <div className="flex items-center gap-4">
            {/* Work Pill (White Liquid Glass) */}
            <button
              onClick={() => scrollToSection('projects')}
              className="relative overflow-hidden px-8 py-3 rounded-full bg-white text-black font-semibold text-base tracking-wide transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] group"
            >
              {/* Liquid flowing inner highlight */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-black/10 to-white/0 bg-[length:200%_auto] animate-[fluid-flow_3s_linear_infinite]" />
              <span className="relative z-10 drop-shadow-sm">Work</span>
            </button>

            {/* Contact Pill (Clear/Dark Liquid Glass) */}
            <button
              onClick={() => scrollToSection('contact')}
              className="relative overflow-hidden px-8 py-3 rounded-full bg-black/20 border border-white/20 text-white font-semibold text-base tracking-wide transition-all duration-500 ease-out backdrop-blur-xl hover:scale-105 hover:bg-white/[0.1] hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
            >
              {/* Liquid flowing inner highlight */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_auto] animate-[fluid-flow_3s_linear_infinite]" />
              <span className="relative z-10 drop-shadow-md">Contact</span>
            </button>
          </div>
        </div>
      </header>

      {/* ═══════ MINIMALIST LEFT SIDEBAR (z-50) ═══════ */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 items-start">
        {navItems.map((item) => {
          const isActive = activeSectionId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center gap-4 focus:outline-none"
            >
              {/* The Glassmorphism Dot */}
              <div
                className={`transition-all duration-500 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center
                  ${isActive
                    ? 'w-3 h-3 bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-125'
                    : 'w-2 h-2 bg-white/10 group-hover:bg-white/30 group-hover:scale-110'
                  }`}
              >
                {isActive && <div className="w-1 h-1 bg-white rounded-full animate-pulse" />}
              </div>

              {/* The Label Text */}
              <span
                className={`text-sm tracking-wide transition-all duration-500 font-semibold drop-shadow-md
                  ${isActive
                    ? 'text-white translate-x-1'
                    : 'text-white/60 group-hover:text-white'
                  }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ═══════ SCROLLING FOREGROUND (z-10) ═══════ */}
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* HERO SECTION */}
        <section id="hero" className="w-full h-screen flex flex-col items-center justify-center px-6 relative pointer-events-none">

          <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 pointer-events-auto z-20 mt-10">

            {/* Left Column: Profile Picture Squircle */}
            <div className="w-48 h-48 md:w-72 md:h-72 shrink-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              <GlassCard intensity="high" className="w-full h-full p-2 !rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                <img
                  src="/kingsley.png"
                  alt="Kingsley Fong Profile"
                  className="w-full h-full object-cover rounded-[2rem]"
                />
              </GlassCard>
            </div>

            {/* Right Column: Text & CTA */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                Kingsley Fong
              </h1>
              <p className="text-lg md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                Aspiring Mechanical Engineer driven by a passion for design optimization, kinematics, and bringing digital concepts into the physical world.
              </p>
              <div className="mt-12 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300 text-sm tracking-wide"
                >
                  View Selected Work
                </button>
              </div>
            </div>

          </div>

          {/* Software Ticker Tape at the absolute bottom of the Hero screen */}
          <div className="absolute bottom-10 left-0 w-full z-30 px-6 pointer-events-auto">
            <SoftwareTicker />
          </div>
        </section>

        {/* BACKGROUND SECTION (formerly About + Experience) */}
        <section id="about" className="w-full max-w-6xl px-6 py-32 pointer-events-auto flex flex-col gap-16 items-center">

          <div className="flex flex-col md:flex-row gap-12 items-start w-full">
            {/* The About block */}
            <div className="w-full md:w-1/2 sticky top-32">
              <GlassCard className="p-12 border-white/10 bg-white/[0.03] backdrop-blur-2xl">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Background</h2>
                <div className="space-y-4 text-white/70 text-lg leading-relaxed font-light">
                  <p>
                    I am a creative developer and designer focusing on building memorable digital experiences that bridge the gap between design and engineering.
                  </p>
                  <p>
                    My work lives at the intersection of 3D graphics, motion design, and high-performance web development. I thrive on bringing static designs to life with fluid animations.
                  </p>
                </div>
              </GlassCard>
            </div>

            {/* The Experience Timeline */}
            <div className="w-full md:w-1/2 pt-4">
              <h3 className="text-2xl font-bold tracking-tight mb-8 text-white/90 px-4">Experience</h3>
              <div className="relative pl-6 md:pl-8 space-y-12 before:absolute before:inset-y-2 before:left-0 before:w-[1px] before:bg-gradient-to-b before:from-white/40 before:to-white/5 mx-4">
                {[
                  { role: 'Mechanical Engineer', company: 'Tech Startup', year: '2023 - Present', desc: 'Leading the development of highly interactive 3D web experiences for premium brands. Focusing on kinematic analysis and generative design.' },
                  { role: 'Design Team Lead', company: 'Formula SAE', year: '2021 - 2023', desc: 'Led a multidisciplinary team to design, manufacture, and test a formula-style racecar. Managed chassis design and composite manufacturing.' },
                  { role: 'Engineering Intern', company: 'ATS Corporation', year: '2020 - 2021', desc: 'Designed high-speed automated assembly cells for medical devices. Reduced calibration time by 40% through iterative pallet design.' },
                ].map((job, i) => (
                  <div key={i} className="relative group">
                    {/* Glowing Dot overlaying the vertical line */}
                    <div className="absolute -left-[24px] md:-left-[32px] top-1.5 w-2 h-2 -translate-x-1/2 rounded-full bg-white/20 ring-4 ring-black">
                      {i === 0 && (
                        <>
                          <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                          <div className="absolute inset-0 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]" />
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.role}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 mb-3">
                      <span className="text-white/80 font-medium">{job.company}</span>
                      <span className="hidden sm:inline text-white/30 text-sm">•</span>
                      <span className="text-white/40 font-mono text-xs tracking-wider uppercase">{job.year}</span>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed font-light max-w-md">
                      {job.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION (LANDING TAPE) */}
        <section id="projects" className="w-full flex flex-col items-end py-32 pointer-events-auto relative z-10 overflow-hidden">
          <div className="w-full max-w-screen-2xl mx-auto self-center">
            <div className="mb-16 px-6 max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Projects</h2>
              <p className="text-white/60 text-lg">A collection of things I have built.</p>
            </div>
          </div>

          {/* The Infinite Scrolling Tape (Full bleed right, bounds-aligned left) */}
          <div className="w-full md:w-[calc(50vw+36rem-1.5rem)]">
            <ProjectTicker
              projects={projects}
              onSelect={(index) => {
                // If the selected project is beyond visibleCount, expand it
                if (index >= visibleCount) {
                  setVisibleCount(index + 1);
                }
                // Need to wait for React to render the new section, then scroll
                setTimeout(() => {
                  const targetId = projects[index].slug?.current || projects[index]._id;
                  scrollToSection(targetId);
                }, 150);
              }}
            />
          </div>
        </section>

        {/* FULLSCREEN PROJECT SECTIONS */}
        <div className="w-full flex flex-col relative z-20">
          {projects.slice(0, visibleCount).map((project) => (
            <InteractiveProjectCard key={project._id} project={project} />
          ))}
        </div>

        {/* PAGINATION / EXPAND CONTROLS */}
        {projects.length > 0 && (
          <div className="w-full flex justify-center py-24 relative z-20 pointer-events-auto">
            {visibleCount < projects.length ? (
              <div className="flex flex-col items-center animate-fade-in">
                <p className="text-white/40 text-sm font-semibold tracking-[0.2em] uppercase mb-4">There's More</p>
                <h3 className="text-4xl font-bold mb-8 italic text-white/90">{projects.length - visibleCount} More Projects</h3>
                <button
                  onClick={() => setVisibleCount(projects.length)}
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  View all projects <ChevronDown size={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-fade-in">
                <button
                  onClick={() => {
                    setVisibleCount(3);
                    scrollToSection('projects');
                  }}
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  Collapse projects <ChevronUp size={20} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full max-w-6xl px-6 py-32 pointer-events-auto mb-20 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Let's build something.</h2>

          <GlassCard className="px-8 py-4 inline-flex items-center gap-3 border-white/10 bg-white/[0.05] backdrop-blur-2xl rounded-full hover:bg-white/10 transition-colors cursor-pointer mb-16">
            <Mail size={20} className="text-white/70" />
            <span className="font-semibold tracking-wide">hello@kingsleyfong.com</span>
          </GlassCard>

          <div className="flex gap-6">
            <a href="#" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 transition-all text-white/70 hover:text-white">
              <Github size={24} />
            </a>
            <a href="#" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 transition-all text-white/70 hover:text-white">
              <Linkedin size={24} />
            </a>
            <a href="#" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 transition-all text-white/70 hover:text-white">
              <Twitter size={24} />
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full py-8 text-center text-white/30 text-sm border-t border-white/5">
          <p>© {new Date().getFullYear()} Kingsley Fong. All rights reserved.</p>
        </footer>

      </div>
    </main>
  );
}
