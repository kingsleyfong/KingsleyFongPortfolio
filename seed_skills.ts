import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const defaultSkills = [
  { name: 'SolidWorks', builtInIcon: 'SolidWorks' },
  { name: 'Fusion 360', builtInIcon: 'Fusion 360' },
  { name: 'AutoCAD', builtInIcon: 'AutoCAD' },
  { name: 'GD&T', builtInIcon: 'GD&T' },
  { name: 'DFMA', builtInIcon: 'DFMA' },
  { name: 'FEA', builtInIcon: 'FEA' },
  { name: 'CFD', builtInIcon: 'CFD' },
  { name: 'CNC Machining', builtInIcon: 'CNC Machining' },
  { name: 'Injection Molding', builtInIcon: 'Injection Molding' },
  { name: '3D Printing', builtInIcon: '3D Printing' },
  { name: 'Python', builtInIcon: 'Python' },
  { name: 'Power BI', builtInIcon: 'Power BI' },
  { name: 'Lean Manufacturing', builtInIcon: 'Lean Manufacturing' },
  { name: 'Rapid Prototyping', builtInIcon: 'Rapid Prototyping' },
  { name: 'Optimization', builtInIcon: 'Optimization' },
];

async function seed() {
  console.log('Fetching hero document...');
  const hero = await client.fetch('*[_type == "hero"][0]');
  if (!hero) {
    console.error('No hero document found!');
    return;
  }
  
  console.log('Patching hero document with default skills...');
  const skillsToSet = defaultSkills.map((s, i) => ({
    _key: `skill_${i}_${Date.now()}`,
    name: s.name,
    builtInIcon: s.builtInIcon
  }));
  
  await client.patch(hero._id).set({ skills: skillsToSet }).commit();
  console.log('Successfully seeded default skills!');
}

seed().catch(console.error);
