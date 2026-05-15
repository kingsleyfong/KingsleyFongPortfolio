const { getCliClient } = require('sanity/cli');
const client = getCliClient();

async function run() {
  console.log('Swapping project content to align with existing images...');

  // Now mapping META content to the ID that has the META image
  // ID: 27d41afa-556f-4857-8260-7b3dec3dfaae
  await client.patch('27d41afa-556f-4857-8260-7b3dec3dfaae')
    .set({
      title: 'META Pin (Guerilla Gear V2)',
      specs: [
        { _key: 'spec1', label: 'Manufacturing', value: 'Xometry (CNC)' },
        { _key: 'spec2', label: 'Mechanical Fit', value: 'H7/g6 Sliding Fit' },
        { _key: 'spec3', label: 'Safety Factor', value: '2.5x FoS' }
      ],
      content: {
        challenge: 'Ground-up mechanical overhaul to a "Zero-Fail" commercial system with an interchangeable 8mm/10mm rod system.',
        approach: 'Transitioned to CNC-machined 6061-T6 Aluminum via sourced partners in the Xometry network. Utilized H7/g6 sliding fits and a concentric adapter sleeve system to ensure precision modularity. Coordinated the technical hand-off and QC inspection for all mission-critical dimensions.',
        impact: 'Verified a 2.5x Factor of Safety for dynamic peak loads (450lb+). Reduced field failure rates to 0% while supporting six-figure product growth through technical reliability and interchangeable pin modularity.'
      }
    })
    .commit();

  // Now mapping Thermo content to the ID that has the Thermo image
  // ID: SrLtFAfCOsAY9E0ez2Kpc0
  await client.patch('SrLtFAfCOsAY9E0ez2Kpc0')
    .set({
      title: 'Thermo Pin (Guerilla Gear V1)',
      specs: [
        { _key: 'spec1', label: 'Manufacturing', value: 'Slant 3D (FDM)' },
        { _key: 'spec2', label: 'Sourcing', value: 'US-Based Print Farms' },
        { _key: 'spec3', label: 'Safety Factor', value: '2.0x FoS' }
      ],
      content: {
        challenge: 'Identify and solve a gap for a modular weight-loading pin with zero upfront tooling cost. The goal was to validate product-market fit using agile manufacturing before committing to metal production.',
        approach: 'Engineered a modular "Base + Extender" architecture. Optimized Design for Additive Manufacturing (DFAM) print orientations for shear-force resistance. Sourced and coordinated with Slant 3D to utilize their distributed print farm, scaling to thousands of units.',
        impact: 'Established a new product category and enabled six-figure product growth via agile thermoplastic production. Dynamic stress testing revealed elastic deformation limits, providing the baseline requirements for the V2 metal overhaul.'
      }
    })
    .commit();

  // Update the Experience document to ensure the order is V1 (Thermo) then V2 (META)
  // Since we swapped content, the order of IDs in the array should now be SrLt... then 27d4...
  await client.patch('exp-guerrilla').set({
    projectIds: [
      'SrLtFAfCOsAY9E0ez2Kpc0', // This is now Thermo
      '27d41afa-556f-4857-8260-7b3dec3dfaae'  // This is now META
    ]
  }).commit();

  console.log('Content swapped successfully.');
}

run().catch(console.error);
