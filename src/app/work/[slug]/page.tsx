import { notFound } from 'next/navigation';
import { getExperienceBySlug, getProjectsByIds } from '@/sanity/lib/client';
import WorkPageClient from '@/components/WorkPageClient';

export const revalidate = 0;

export default async function WorkExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    const experience = await getExperienceBySlug(slug);
    if (!experience) {
        console.error(`Experience not found for slug: ${slug}`);
        return notFound();
    }

    const projects = experience.projects || [];

    return (
        <WorkPageClient 
            experience={experience as any}
            projects={projects as any[]} 
        />
    );
}
