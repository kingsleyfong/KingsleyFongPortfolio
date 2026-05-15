const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'eqlb03gf',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-19',
});

async function checkOrder() {
  const query = `*[_type == "experience"]{
    company,
    "projects": projects[]->{title}
  }`;
  
  const results = await client.fetch(query);
  console.log(JSON.stringify(results, null, 2));
}

checkOrder();
