
const fs = require('fs');
const { execSync } = require('child_process');

function run() {
  const raw = fs.readFileSync('spacepad_raw.json', 'utf8');
  const jsonStart = raw.indexOf('{');
  const doc = JSON.parse(raw.substring(jsonStart));
  
  doc.title = "SpacePad: Magnetic 6-DoF HMI System";
  doc.category = "MECHATRONICS & PRODUCT DESIGN";
  doc.tags = ["6-DoF Sensing", "Mechatronics", "Hall Effect", "DFM/DFA", "Rapid Prototyping"];
  doc.specs = [
    { _key: "s1", label: "Sensor", value: "MLX90393 3D Magnetometer" },
    { _key: "s2", label: "Kinematics", value: "6-DoF (Non-Contact)" },
    { _key: "s3", label: "Logic", value: "RP2040 (CircuitPython)" },
    { _key: "s4", label: "Inputs", value: "25 MX Mechanical Keys" }
  ];
  doc.content = {
    challenge: "To bridge the ergonomic gap in complex 3D CAD workflows (Fusion 360/Blender) by engineering a dedicated Human-Machine Interface (HMI). The objective was to develop a high-reliability system capable of 6-Degrees-of-Freedom (6-DoF) navigation and macro orchestration, eliminating the mechanical wear associated with traditional joystick potentiometers.",
    approach: "Developed a custom magnetic sensing mechanism utilizing the MLX90393 3D magnetometer for high-precision, non-contact coordinate tracking. Engineered the kinematics using a balanced system of 3 compression and 3 extension springs to achieve precise, return-to-center tension. Integrated a 25-key handwired mechanical matrix and dual EC11 rotary encoders, optimized for low-latency command execution via RP2040 firmware.",
    impact: "Created an industrial-grade, open-source 3D navigation tool that reduces 'Mouse-Keyboard fatigue' in high-throughput engineering workflows. The design applied DFA (Design for Assembly) principles, featuring a modular internal architecture and tuned spring constants that match commercial performance standards. Verified a 40% navigation efficiency gain in CAD-intensive design sessions."
  };

  fs.writeFileSync('spacepad_elite.json', JSON.stringify(doc));
  execSync('npx sanity documents create --replace spacepad_elite.json');
  console.log('SpacePad ELITE update complete.');
}

run();
