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
        carousel?: {
            type: 'image' | 'video' | 'pdf';
            image?: string;
            video?: string;
            pdf?: string;
            pdfThumbnail?: string;
            alt?: string;
        }[];
        bottomLeftAnchor?: {
            type: 'image' | 'video' | 'pdf';
            image?: string;
            video?: string;
            pdf?: string;
            pdfThumbnail?: string;
            alt?: string;
        };
        bottomRightAnchor?: {
            type: 'image' | 'video' | 'pdf';
            image?: string;
            video?: string;
            pdf?: string;
            pdfThumbnail?: string;
            alt?: string;
        };
    };
}

export interface Experience {
    _id: string;
    slug: { current: string };
    company: string;
    role: string;
    date: string;
    description: string;
    link?: string;
    thumbnail?: string; // Thumbnail image path
    projects: Project[];
    hidden?: boolean;
}
