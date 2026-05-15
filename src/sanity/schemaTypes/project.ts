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
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            description: 'Used for sorting and chronological order.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave blank if ongoing.',
        }),
        defineField({
            name: 'duration',
            title: 'Duration / Time Frame',
            type: 'string',
            description: 'E.g., "3 Months", "Jan 2025 - Present"',
        }),
        defineField({
            name: 'year',
            title: 'Year (Legacy)',
            type: 'number',
            description: 'E.g., 2025.',
            validation: (Rule) => Rule.min(2000).max(2100).integer(),
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
            title: 'Media Showcase (Carousel + Anchors)',
            type: 'object',
            fields: [
                {
                    name: 'carousel',
                    title: 'Hero Stage (Auto-Scrolling Gallery)',
                    description: 'The large top window. Drag and drop to reorder. 3-second crossfade auto-scroll.',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            name: 'mediaItem',
                            title: 'Media Item',
                            fields: [
                                {
                                    name: 'type',
                                    title: 'Media Type',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Image', value: 'image' },
                                            { title: 'Video', value: 'video' }
                                        ],
                                        layout: 'radio'
                                    },
                                    initialValue: 'image'
                                },
                                {
                                    name: 'image',
                                    title: 'Image',
                                    type: 'image',
                                    options: { hotspot: true },
                                    hidden: ({ parent }) => parent?.type !== 'image'
                                },
                                {
                                    name: 'video',
                                    title: 'Video (MP4)',
                                    type: 'file',
                                    options: { accept: 'video/mp4' },
                                    hidden: ({ parent }) => parent?.type !== 'video'
                                },
                                {
                                    name: 'alt',
                                    title: 'Alt Text / Caption',
                                    type: 'string',
                                    description: 'E.g., "FEA Stress Analysis results"'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'bottomLeftAnchor',
                    title: 'Bottom Left Anchor',
                    type: 'object',
                    fields: [
                        {
                            name: 'type',
                            title: 'Media Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Image', value: 'image' },
                                    { title: 'Video', value: 'video' }
                                ],
                                layout: 'radio'
                            },
                            initialValue: 'image'
                        },
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                            hidden: ({ parent }) => parent?.type !== 'image'
                        },
                        {
                            name: 'video',
                            title: 'Video (MP4)',
                            type: 'file',
                            options: { accept: 'video/mp4' },
                            hidden: ({ parent }) => parent?.type !== 'video'
                        },
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string'
                        }
                    ]
                },
                {
                    name: 'bottomRightAnchor',
                    title: 'Bottom Right Anchor',
                    type: 'object',
                    fields: [
                        {
                            name: 'type',
                            title: 'Media Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Image', value: 'image' },
                                    { title: 'Video', value: 'video' }
                                ],
                                layout: 'radio'
                            },
                            initialValue: 'image'
                        },
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                            hidden: ({ parent }) => parent?.type !== 'image'
                        },
                        {
                            name: 'video',
                            title: 'Video (MP4)',
                            type: 'file',
                            options: { accept: 'video/mp4' },
                            hidden: ({ parent }) => parent?.type !== 'video'
                        },
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string'
                        }
                    ]
                }
            ],
        }),
    ],
});
