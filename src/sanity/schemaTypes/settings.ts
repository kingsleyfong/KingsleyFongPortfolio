import { defineType, defineField } from 'sanity';

export const settings = defineType({
    name: 'settings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'connectTitle',
            title: 'Connect Section Title',
            type: 'string',
            initialValue: "Let's Connect.",
        }),
        defineField({
            name: 'connectDescription',
            title: 'Connect Section Description',
            type: 'text',
            initialValue: "I am currently seeking Fall 2027 internship opportunities. Feel free to reach out if you're looking for a driven Manufacturing/Mechanical Engineer.",
        }),
        defineField({
            name: 'linkedinUrl',
            title: 'LinkedIn URL',
            type: 'url',
            initialValue: 'https://linkedin.com/in/kingsley-fong',
        }),

        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
            initialValue: 'hello@kingsleyfong.com',
        }),
        defineField({
            name: 'resume',
            title: 'Resume (PDF)',
            type: 'file',
            options: {
                accept: '.pdf'
            }
        }),
        defineField({
            name: 'resumeImage',
            title: 'Resume Preview Image',
            description: 'Preview image of your resume for the homepage section',
            type: 'image',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'featuredProjects',
            title: 'Featured Projects (Homepage Ticker Order)',
            description: 'Drag and drop projects to set their order on the homepage. If empty, the site will default to chronological order.',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'project' } }],
        }),
    ],
});

