
const fs = require('fs');
const { execSync } = require('child_process');

async function update() {
  console.log('Fetching SpacePad...');
  const raw = execSync('npx sanity documents query "*[_id == \'0548cd49-5841-4966-a321-e49e4b726a7a\'][0]"').toString();
  
  // Strip the warning line if it exists
  const jsonStart = raw.indexOf('{');
  const json = JSON.parse(raw.substring(jsonStart));

  console.log('Tailoring narrative...');
  json.title = "SpacePad: Precision HMI System";
  json.category = "INDUSTRIAL DESIGN & MANUFACTURING";
  json.tags = ["DFM/DFA", "GD&T", "RCA", "Supply Chain", "Rapid Prototyping"];
  json.specs = [
    { _key: "s1", label: "Material", value: "6061-T6 Aluminum (CNC)" },
    { _key: "s2", label: "Fit Class", value: "H7/g6 Sliding Fits" },
    { _key: "s3", label: "First-Pass Yield", value: "100% Post-QC" },
    { _key: "s4", label: "Reliability", value: "50M+ Cycles" }
  ];
  json.content = {
    challenge: "Engineered a high-reliability Human-Machine Interface (HMI) for rapid CAD/Sim workflows, moving beyond hobbyist-grade standards to a precision-machined industrial tool. The system required a 'Zero-Play' structural assembly capable of withstanding heavy industrial repetition without fatigue.",
    approach: "Utilized a Design for Excellence (DFX) mindset, transitioning from polymer prototypes to a V2 CNC-machined enclosure. Applied GD&T to manage critical tolerance stack-ups between the PCB, plate, and housing. Conducted a Root Cause Analysis (RCA) on early interference issues, solving them through a material shift to anodized 6061-T6 Aluminum.",
    impact: "Optimized the assembly process (DFA), reducing part count by 30% and eliminating structural flex. Orchestrated a distributed supply chain by sourcing components from specialized high-tier vendors, ensuring the final product met the tactile and reliability standards required for mission-critical engineering stations."
  };

  fs.writeFileSync('spacepad_final.json', JSON.stringify(json, null, 2));
  console.log('Pushing to Sanity...');
  execSync('npx sanity documents create --replace spacepad_final.json');
  console.log('SpacePad update COMPLETE.');
}

update().catch(err => {
  console.error('Update FAILED:', err.message);
  process.exit(1);
});
