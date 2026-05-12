import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { heroType } from './hero'
import { experience } from './experience'
import { settings } from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, heroType, experience, settings],
}
