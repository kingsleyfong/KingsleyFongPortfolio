const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function run() {
  const projects = await client.fetch('*[_type == "project" && title match "Pin*"]{title, media}');
  console.log(JSON.stringify(projects, null, 2));
}

run();
