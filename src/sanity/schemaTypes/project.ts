import { defineType, defineField } from 'sanity';

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image (Thumbnail)',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'links',
            title: 'Links',
            type: 'object',
            fields: [
                { name: 'demo', title: 'Live Demo URL', type: 'url' },
                { name: 'github', title: 'GitHub Repository URL', type: 'url' },
            ],
        }),
        defineField({
            name: 'date',
            title: 'Project Date',
            type: 'date',
            description: 'Used to sort projects chronologically.',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'E.g., DESIGN TEAM PROJECT, ACADEMIC PROJECT, FREELANCE',
        }),
        defineField({
            name: 'specs',
            title: 'Key Specifications',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string', description: 'E.g., PPM, range, capacity' },
                        { name: 'value', title: 'Value', type: 'string', description: 'E.g., 180, 85°, 200kg' },
                    ]
                }
            ]
        }),
        defineField({
            name: 'content',
            title: 'Detailed Content',
            type: 'object',
            fields: [
                { name: 'challenge', title: 'The Challenge', type: 'text', description: 'Describe the context and problem.' },
                { name: 'approach', title: 'The Approach', type: 'text', description: 'Describe how you solved it.' },
                { name: 'impact', title: 'The Impact', type: 'text', description: 'Describe the final results and metrics.' },
            ],
        }),
        defineField({
            name: 'media',
            title: 'Media Windows',
            type: 'object',
            fields: [
                { name: 'what', title: 'What Media URL', type: 'url', description: 'Image or Video URL for the "What" tab.' },
                { name: 'how', title: 'How Media URL', type: 'url', description: 'Image or Video URL for the "How" tab.' },
                { name: 'results', title: 'Results Media URL', type: 'url', description: 'Image or Video URL for the "Results" tab.' },
            ],
        }),
    ],
});
