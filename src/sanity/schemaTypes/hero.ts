export const heroType = {
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            description: 'The square profile picture shown next to the robot in the Hero section.',
            options: {
                hotspot: true, // Allow user to crop the image inside Sanity Studio
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessibility. E.g. "Kingsley Fong Headshot"',
                    validation: (Rule: any) => Rule.required(),
                }
            ]
        },
        {
            name: 'headline',
            title: 'Headline Text',
            type: 'string',
            description: 'The main big text. e.g. "Kingsley Fong"',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'The bio paragraph below the headline.',
        },
        {
            name: 'resume',
            title: 'Resume (PDF)',
            type: 'file',
            options: {
                accept: '.pdf'
            },
            description: 'Upload your latest professional resume here.'
        },
        {
            name: 'resumeImage',
            title: 'Resume Preview Image',
            type: 'image',
            description: 'Upload a premium preview image of your resume for the homepage section.',
            options: {
                hotspot: true
            }
        },
        {
            name: 'skills',
            title: 'Skills Ticker Tape',
            type: 'array',
            description: 'Add, remove, or edit skills for the ticker tape.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Skill Name', validation: (Rule: any) => Rule.required() },
                        { 
                            name: 'builtInIcon', 
                            type: 'string', 
                            title: 'Built-in Icon Identifier',
                            description: 'Used for the default icons (e.g. SolidWorks, AutoCAD). Leave blank if uploading a custom icon.'
                        },
                        { 
                            name: 'customIcon', 
                            type: 'image', 
                            title: 'Custom Icon (Upload)', 
                            description: 'Upload a custom image to override the built-in icon.',
                            options: { hotspot: true }
                        }
                    ]
                }
            ]
        }
    ],

    preview: {
        select: {
            title: 'headline',
            media: 'profileImage',
        },
    },
}
