const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function run() {
  const projects = await client.fetch('*[_type == "project"]{_id, title}');
  console.log('All projects:', JSON.stringify(projects, null, 2));
}

run().catch(console.error);
