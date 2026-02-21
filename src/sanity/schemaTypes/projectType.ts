import { defineField, defineType } from 'sanity'

export const projectType = defineType({
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
            name: 'date',
            title: 'Date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            initialValue: 'PROJECT',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
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
                { name: 'demo', type: 'url', title: 'Live Demo URL' },
                { name: 'github', type: 'url', title: 'GitHub URL' },
            ]
        }),
        defineField({
            name: 'specs',
            title: 'Specifications',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'value', type: 'string', title: 'Value' },
                    ]
                }
            ]
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'content',
            title: 'Detailed Content',
            type: 'object',
            fields: [
                { name: 'challenge', type: 'text', title: 'The Challenge' },
                { name: 'approach', type: 'text', title: 'The Approach' },
                { name: 'impact', type: 'text', title: 'The Impact' },
            ]
        }),
        defineField({
            name: 'media',
            title: 'Interactive Media URLs',
            type: 'object',
            fields: [
                { name: 'what', type: 'url', title: 'What Image URL' },
                { name: 'how', type: 'url', title: 'How Image URL' },
                { name: 'results', type: 'url', title: 'Results Image URL' },
            ]
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'mainImage',
        }
    },
})
