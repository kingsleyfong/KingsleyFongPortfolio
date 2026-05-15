const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function run() {
  const query = `*[_type == "project" && title match "Brick It*"]{
    title,
    media{
      carousel[]{
        type,
        "image": image.asset->url,
        "video": video.asset->url,
        alt
      }
    }
  }`;
  const projects = await client.fetch(query);
  console.log(JSON.stringify(projects, null, 2));
}

run();
