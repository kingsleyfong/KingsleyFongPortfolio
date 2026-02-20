'use client';

import { useEffect, useState } from 'react';
import { Project } from '../sanity/types';
import { getProjects } from '../sanity/lib/client';
import { GlassCard } from './ui/GlassCard';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

import { InteractiveProjectCard, ExtendedProject } from './ui/InteractiveProjectCard';

export function ProjectGrid() {
    const [projects, setProjects] = useState<ExtendedProject[]>([]);

    useEffect(() => {
        getProjects().then(setProjects);
    }, []);

    return (
        <div className="flex flex-col gap-8 w-full">
            {projects.map((project) => (
                <InteractiveProjectCard key={project._id} project={project} />
            ))}
        </div>
    );
}
