import { defineType, defineField } from 'sanity';

export const experience = defineType({
    name: 'experience',
    title: 'Experience / Recent Work',
    type: 'document',
    fields: [
        defineField({
            name: 'company',
            title: 'Company Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'company', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role / Position',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date Range',
            type: 'string',
            description: 'E.g., Jan 2026 - Apr 2026',
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            description: 'Used for sorting (Hidden from frontend but required for chronological order)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'link',
            title: 'Experience Website Link',
            type: 'url',
            description: 'Link to company or professional details. If empty, the header logo won\'t scale on hover.',
        }),
        defineField({
            name: 'projects',
            title: 'Associated Projects',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'project' } }],
        }),
        defineField({
            name: 'hidden',
            title: 'Hide Experience',
            type: 'boolean',
            description: 'If checked, this experience and all of its associated projects will be completely hidden from the website.',
            initialValue: false,
        }),
    ],
});
