import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
    basePath: '/studio',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqlb03gf',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    title: 'Kingsley Portfolio Studio',
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Website Content')
                    .items([
                        // 1. Singleton: Site Settings & Resume
                        S.listItem()
                            .title('Site Settings & Resume')
                            .id('settings')
                            .child(
                                S.document()
                                    .schemaType('settings')
                                    .documentId('settings')
                                    .title('Site Settings & Resume')
                            ),
                        S.divider(),
                        // 2. The Hero Section (another singleton-like experience)
                        S.listItem()
                            .title('Hero Section')
                            .id('hero')
                            .child(
                                S.document()
                                    .schemaType('hero')
                                    .documentId('hero')
                            ),
                        S.divider(),
                        // 3. Projects
                        S.listItem()
                            .title('Projects')
                            .schemaType('project')
                            .child(S.documentTypeList('project').title('Projects')),
                        // 4. Experiences
                        S.listItem()
                            .title('Experience / Recent Work')
                            .schemaType('experience')
                            .child(S.documentTypeList('experience').title('Experience / Recent Work')),
                    ]),
        }),
    ],
    schema: {
        types: schema.types,
    },
})
