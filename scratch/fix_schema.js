const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function run() {
  console.log('Fixing experience schemas...');
  const experiences = await client.fetch('*[_type == "experience"]');
  
  for (const exp of experiences) {
    if (exp.projectIds && Array.isArray(exp.projectIds)) {
      console.log(`Migrating projectIds to projects for ${exp.company}...`);
      
      const projectRefs = exp.projectIds.map(id => ({
        _key: Math.random().toString(36).substring(2, 9),
        _type: 'reference',
        _ref: id
      }));

      await client.patch(exp._id)
        .set({ projects: projectRefs })
        .unset(['projectIds'])
        .commit();
        
      console.log(`Updated ${exp.company}.`);
    }
  }
}

run().catch(console.error);
