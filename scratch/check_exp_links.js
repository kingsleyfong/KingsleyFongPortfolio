const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function run() {
  const experiences = await client.fetch('*[_type == "experience"]{company, projects[]->{_id, title}}');
  console.log(JSON.stringify(experiences, null, 2));
}

run();
