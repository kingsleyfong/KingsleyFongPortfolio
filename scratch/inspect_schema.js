const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function run() {
  const project = await client.fetch('*[_type == "project"][0]');
  if (project) {
    console.log('Project keys:', Object.keys(project));
    if (project.media) {
      console.log('Media keys:', Object.keys(project.media));
    }
  } else {
    console.log('No project found.');
  }
}

run();
