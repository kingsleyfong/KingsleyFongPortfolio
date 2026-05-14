export interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    description: any; // Portable Text block
    mainImage: {
        asset: {
            url: string;
        };
        alt: string;
    };
    tags: string[];
    links: {
        demo?: string;
        github?: string;
    };
    year?: number;
    startDate?: string;
    endDate?: string;
    duration?: string;
    category?: string;
    specs?: { label: string; value: string }[];
    content?: {
        challenge: string;
        approach: string;
        impact: string;
    };
    media?: {
        what?: string | { asset?: { url: string } };
        how?: string | { asset?: { url: string } };
        results?: string | { asset?: { url: string } };
    };
}

export interface Experience {
    _id: string;
    slug: { current: string };
    company: string;
    role: string;
    date: string;
    description: string;
    thumbnail?: string; // Thumbnail image path
    // We map to the full project objects rather than just IDs for easier rendering
    // We map to the full project objects rather than just IDs for easier rendering
    projects: Project[];
}
