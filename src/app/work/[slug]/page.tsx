import { notFound } from 'next/navigation';
import { getExperienceBySlug, getProjectsByIds } from '@/sanity/lib/client';
import { ExtendedProject, InteractiveProjectCard } from '@/components/ui/InteractiveProjectCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FEAMesh } from '@/components/ui/FEAMesh';

export default async function WorkExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    const experience = await getExperienceBySlug(slug);
    if (!experience) {
        console.error(`Experience not found for slug: ${slug}`);
        return notFound();
    }

    const projects = await getProjectsByIds(experience.projectIds);

    return (
        <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300 pb-32 relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
                 <FEAMesh />
            </div>

            {/* Header / Hero */}
            <header className="w-full pt-32 pb-20 px-6 border-b border-border/50 relative z-10 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto">
                    <Link href="/#about" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-12 bg-background/50 px-4 py-2 rounded-full border border-border/50 backdrop-blur-md">
                        <ArrowLeft size={16} />
                        Back to Portfolio
                    </Link>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">{experience.company}</h1>
                        </div>
                        <h2 className="text-xl md:text-2xl text-muted font-light">{experience.role}</h2>
                        <div className="text-sm font-mono text-muted/60 uppercase tracking-wider">{experience.date}</div>
                    </div>
                    
                    <p className="mt-8 text-lg leading-relaxed max-w-3xl text-foreground/80">
                        {experience.description}
                    </p>
                </div>
            </header>

            {/* Projects Section */}
            <section className="w-full pt-20 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-2xl font-bold mb-12 tracking-tight">Key Contributions</h3>
                    
                    {projects.length > 0 ? (
                        <div className="space-y-32">
                            {projects.map((project, index) => (
                                <div id={project.slug?.current || project._id} key={project._id} className="scroll-mt-32">
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
