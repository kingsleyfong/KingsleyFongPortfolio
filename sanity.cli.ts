import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqlb03gf'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: 'sfjk2wcwz2xd583uavjozf5i'
  }
})
