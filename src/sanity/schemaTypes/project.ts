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
            title: 'Description (Short Summary)',
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
            description: 'Used for sorting.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave blank if ongoing.',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'E.g., S&C ELECTRIC | AME/MQE',
        }),
        defineField({
            name: 'specs',
            title: 'Key Specifications',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string', description: 'E.g., Time Saved' },
                        { name: 'value', title: 'Value', type: 'string', description: 'E.g., 64%' },
                    ]
                }
            ]
        }),
        defineField({
            name: 'content',
            title: 'Technical Narratives',
            type: 'object',
            fields: [
                { name: 'challenge', title: 'The Challenge', type: 'text' },
                { name: 'approach', title: 'The Approach', type: 'text' },
                { name: 'impact', title: 'The Impact', type: 'text' },
            ],
        }),
        defineField({
            name: 'media',
            title: 'Media Architecture (Carousel + Anchors)',
            description: 'The "Apple-Sleek" media stage for the work page.',
            type: 'object',
            fields: [
                {
                    name: 'carousel',
                    title: 'Hero Carousel (16:10 Stage)',
                    description: 'Large auto-scrolling gallery. Drag to reorder.',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            name: 'mediaItem',
                            title: 'Media Item',
                            fields: [
                                {
                                    name: 'type',
                                    title: 'Type',
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
                                    type: 'string'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'bottomLeftAnchor',
                    title: 'Bottom Left Anchor (4:3)',
                    type: 'object',
                    fields: [
                        {
                            name: 'type',
                            title: 'Type',
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
                    title: 'Bottom Right Anchor (4:3)',
                    type: 'object',
                    fields: [
                        {
                            name: 'type',
                            title: 'Type',
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
