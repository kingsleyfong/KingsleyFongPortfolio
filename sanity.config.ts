import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
    basePath: '/studio',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqlb03gf',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    title: 'Portfolio Studio',
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Content')
                    .items([
                        // Singleton: Site Settings (Resume, Links, etc)
                        S.listItem()
                            .title('Site Settings & Resume')
                            .id('settings')
                            .child(
                                S.document()
                                    .schemaType('settings')
                                    .documentId('settings')
                            ),
                        S.divider(),
                        // Regular document types
                        ...S.documentTypeListItems().filter(
                            (listItem) => !['settings'].includes(listItem.getId() || '')
                        ),
                    ]),
        }),
    ],
    schema: {
        types: schema.types,
    },
})
