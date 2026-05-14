import { getProjects, getExperiences, getHero, getSettings } from '@/sanity/lib/client';
import HomeClient from '@/components/HomeClient';

export const revalidate = 0; // Force fresh data on every request for "live" feel

// Server Component (Pre-renders HTML with data instantly)
export default async function Page() {
    // These fetches happen on the SERVER during request (or statically at build time)
    // The user's browser never has to wait for a network roundtrip to the CMS!
    const experiences = await getExperiences();
    const hero = await getHero();
    const settings = await getSettings();
    
    // Prioritize manual featured order from settings, fallback to chronological projects
    const projects = (settings?.featuredProjects && settings.featuredProjects.length > 0) 
        ? settings.featuredProjects 
        : await getProjects();

    return (
        <HomeClient 
            initialProjects={projects as any[]} 
            initialExperiences={experiences as any[]} 
            initialHero={hero} 
            initialSettings={settings}
        />
    );
}
