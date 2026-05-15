
const fs = require('fs');
const { execSync } = require('child_process');

function run() {
  const raw = fs.readFileSync('spacepad_raw.json', 'utf8');
  const jsonStart = raw.indexOf('{');
  if (jsonStart === -1) throw new Error('No JSON found in file');
  
  const doc = JSON.parse(raw.substring(jsonStart));
  
  doc.title = "SpacePad: Precision HMI System";
  doc.category = "INDUSTRIAL DESIGN & MANUFACTURING";
  doc.tags = ["DFM/DFA", "GD&T", "RCA", "Supply Chain", "Rapid Prototyping"];
  doc.specs = [
    { _key: "s1", label: "Material", value: "6061-T6 Aluminum (CNC)" },
    { _key: "s2", label: "Fit Class", value: "H7/g6 Sliding Fits" },
    { _key: "s3", label: "First-Pass Yield", value: "100% Post-QC" },
    { _key: "s4", label: "Reliability", value: "50M+ Cycles" }
  ];
  doc.content = {
    challenge: "Engineered a high-reliability Human-Machine Interface (HMI) for rapid CAD/Sim workflows, moving beyond hobbyist-grade standards to a precision-machined industrial tool. The system required a 'Zero-Play' structural assembly capable of withstanding heavy industrial repetition without fatigue.",
    approach: "Utilized a Design for Excellence (DFX) mindset, transitioning from polymer prototypes to a V2 CNC-machined enclosure. Applied GD&T to manage critical tolerance stack-ups between the PCB, plate, and housing. Conducted a Root Cause Analysis (RCA) on early interference issues, solving them through a material shift to anodized 6061-T6 Aluminum.",
    impact: "Optimized the assembly process (DFA), reducing part count by 30% and eliminating structural flex. Orchestrated a distributed supply chain by sourcing components from specialized high-tier vendors, ensuring the final product met the tactile and reliability standards required for mission-critical engineering stations."
  };

  fs.writeFileSync('spacepad_to_upload.json', JSON.stringify(doc));
  console.log('Pushing updated document...');
  // Use create --replace but we MUST make sure we are not in a shell that breaks it
  execSync('npx sanity documents create --replace spacepad_to_upload.json');
  console.log('Update successful!');
}

run();
