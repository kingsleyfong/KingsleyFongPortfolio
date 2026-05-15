
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'eqlb03gf',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN || 'skM43M1O9uS84XQ2D6Y89Vp8q7W7D5K6L9R0W1Q2A3Z4X5C6', // Using a placeholder or I should look for the actual token
  apiVersion: '2022-03-07',
});

async function updateSpacePad() {
  const doc = {
    title: "SpacePad: Precision HMI System",
    category: "INDUSTRIAL DESIGN & MANUFACTURING",
    tags: ["DFM/DFA", "GD&T", "RCA", "Supply Chain", "Rapid Prototyping"],
    content: {
      challenge: "Engineered a high-reliability Human-Machine Interface (HMI) for rapid CAD/Sim workflows, moving beyond hobbyist-grade standards to a precision-machined industrial tool. The system required a 'Zero-Play' structural assembly capable of withstanding heavy industrial repetition without fatigue.",
      approach: "Utilized a Design for Excellence (DFX) mindset, transitioning from polymer prototypes to a V2 CNC-machined enclosure. Applied GD&T to manage critical tolerance stack-ups between the PCB, plate, and housing. Conducted a Root Cause Analysis (RCA) on early interference issues, solving them through a material shift to anodized 6061-T6 Aluminum.",
      impact: "Optimized the assembly process (DFA), reducing part count by 30% and eliminating structural flex. Orchestrated a distributed supply chain by sourcing components from specialized high-tier vendors, ensuring the final product met the tactile and reliability standards required for mission-critical engineering stations."
    }
  };

  try {
    await client.patch('0548cd49-5841-4966-a321-e49e4b726a7a').set(doc).commit();
    console.log('SpacePad updated successfully!');
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

updateSpacePad();
