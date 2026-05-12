const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function run() {
  const exps = await client.fetch('*[_type == "experience"]{_id, company, projectIds}');
  console.log('Experiences:', JSON.stringify(exps, null, 2));
}

run().catch(console.error);
