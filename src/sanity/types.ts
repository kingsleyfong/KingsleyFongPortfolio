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
    date?: string;
    category?: string;
    specs?: { label: string; value: string }[];
    content?: {
        challenge: string;
        approach: string;
        impact: string;
    };
    media?: {
        what: string;
        how: string;
        results: string;
    };
}
