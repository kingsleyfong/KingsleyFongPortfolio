import { getProjects, getExperiences, getHero } from '@/sanity/lib/client';
import HomeClient from '@/components/HomeClient';

// Server Component (Pre-renders HTML with data instantly)
export default async function Page() {
    // These fetches happen on the SERVER during request (or statically at build time)
    // The user's browser never has to wait for a network roundtrip to the CMS!
    const projects = await getProjects();
    const experiences = await getExperiences();
    const hero = await getHero();

    return (
        <HomeClient 
            initialProjects={projects as any[]} 
            initialExperiences={experiences as any[]} 
            initialHero={hero} 
        />
    );
}
