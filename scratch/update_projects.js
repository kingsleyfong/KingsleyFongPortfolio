const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function run() {
  console.log('Linking projects to Guerrilla Gear experience...');
  await client.patch('exp-guerrilla').set({
    projectIds: [
      '27d41afa-556f-4857-8260-7b3dec3dfaae',
      'SrLtFAfCOsAY9E0ez2Kpc0'
    ]
  }).commit();
  console.log('Linked.');
}

run().catch(console.error);
