const { getCliClient } = require('sanity/cli');
const client = getCliClient();

const projects = [
    {
        _id: '1',
        _type: 'project',
        title: 'Manufacturing Review Dashboards',
        slug: { _type: 'slug', current: 'manufacturing-review-dashboards' },
        category: 'S&C ELECTRIC | AME/MQE',
        startDate: '2026-01-01',
        year: 2026,
        specs: [
            { _key: 's1', label: 'Time Saved', value: '64%' },
            { _key: 's2', label: 'Manual Work', value: '-86%' },
            { _key: 's3', label: 'Data', value: '100+ logs' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'Power BI dashboards transforming raw safety & hazard records into repeatable KPI views.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'Converted scattered safety and hazard logs across production groups into visual KPI tools for weekly production and quality reviews. Focused on faster issue escalation, clearer ownership, and better visibility into operational risk.',
            approach: 'Built Power BI dashboards from Azure-linked TeamAssurance data tables, using Power Query and DAX measures and structured slicers. Transformed raw safety and hazard records into repeatable KPI views for overdue actions, ownership, backlog, and department-level trends.',
            impact: 'Reduced weekly production review time by ~64% from ~51 min to <18 min by replacing manual log searches. Cut manual filtering work by ~86% through standardized data aggregation, slicers, and prebuilt drilldown tables. Improved open-action visibility across 100+ safety and hazard records.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-d61122ae86cf0eb9a47c07c12e863dde1c89549c-1024x1024-webp' } }, alt: 'Main Dashboard View' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-15d321706926d2fafb0eb3ff20ae590a09d80424-625x625-png' } }, alt: 'Data Pipeline' },
            bottomRightAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-6dcfb6a2f45964416df848ee942eecb4f14c6292-1080x1080-jpg' } }, alt: 'KPI Trends' }
        }
    },
    {
        _id: '2',
        _type: 'project',
        title: 'Dust Collection Systems',
        slug: { _type: 'slug', current: 'dust-collection-systems' },
        category: 'PARAGON SYSTEMS | AME',
        startDate: '2025-05-01',
        year: 2025,
        specs: [
            { _key: 's1', label: 'Airflow', value: '+10.5%' },
            { _key: 's2', label: 'Coverage', value: '3 to 8 stn' },
            { _key: 's3', label: 'Budget', value: '-76%' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'Centralized lab airflow system upgrade reducing inefficient duct reruns.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'Upgraded a scattered dust collection setup into a centralized lab airflow system. Targeted poor capture, limited station coverage, and inconsistent cleanup around material prep and fixture areas.',
            approach: 'Mapped duct runs, measured velocity, calculated CFM, and verified airflow before and after install. Installed ducting, blast gates, quick-connect drops, brackets, and serviceable filter access points.',
            impact: 'Increased point-of-use airflow by ~10.5% through controlled drops and improved duct routing. Expanded coverage from 3 to 8 stations while reducing inefficient duct reruns by ~22%. Delivered the upgrade ~76% under allocated budget.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-2e976a050b94e92d029e2fb32c2f9388994e1e8f-4032x3024-jpg' } }, alt: 'System Ducting' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-56d3a915cfcc6244276c06b4a4bf02c5be72a1c8-1777x1339-png' } }, alt: 'Custom Brackets' },
            bottomRightAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-665062599f1a1be4763f46b069326ed39d737033-4032x3024-jpg' } }, alt: 'Testing Data' }
        }
    },
    {
        _id: '3',
        _type: 'project',
        title: 'Brick It! LEGO 3D Printer',
        slug: { _type: 'slug', current: 'brick-it-lego-3d-printer' },
        category: 'ENGINEERING PROJECT',
        startDate: '2025-01-01',
        year: 2025,
        specs: [
            { _key: 's1', label: 'Cycle Time', value: '9.5 s/brick' },
            { _key: 's2', label: 'Accuracy', value: '92%' },
            { _key: 's3', label: 'Part Count', value: '-30%' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'Autonomous robotic cell converting user media into automated LEGO builds.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'Led development of a gantry-based robotic cell that converts user media into automated LEGO builds. Built a prototype assembly system with part feeding, motion control, sensing, calibration, and toolpath generation.',
            approach: 'CAD in SolidWorks, using FEA and test builds to reduce placement error. Programmed ROBOTC homing, placement, recovery, and sensor checks, plus a fullstack React/Three.js web slicer.',
            impact: 'Achieved 9.5 s/brick and 92% placement accuracy after calibration and repeated test builds. Reduced dispenser part count by ~30% and magazine changeover time by ~25%. Reduced end-effector deflection by ~15%, improving placement stability.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-665062599f1a1be4763f46b069326ed39d737033-4032x3024-jpg' } }, alt: 'Gantry System' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-56d3a915cfcc6244276c06b4a4bf02c5be72a1c8-1777x1339-png' } }, alt: 'Slicer UI' },
            bottomRightAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-2e976a050b94e92d029e2fb32c2f9388994e1e8f-4032x3024-jpg' } }, alt: 'Final Build' }
        }
    },
    {
        _id: '4',
        _type: 'project',
        title: 'Material Flow Dashboard',
        slug: { _type: 'slug', current: 'material-flow-dashboard' },
        category: 'S&C ELECTRIC | AME',
        startDate: '2026-02-01',
        year: 2026,
        specs: [
            { _key: 's1', label: 'Lookup Time', value: '-70%' },
            { _key: 's2', label: 'Update Time', value: '-60%' },
            { _key: 's3', label: 'Visibility', value: '100+ parts' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'Line-side tracker for hardware inventory, shortages, and reorder status.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'Built a line-side tracker for hardware inventory, shortages, reorder status, and part lookup. Targeted manual tracking issues causing part-search delays, unclear stock levels, and missed replenishment signals.',
            approach: 'Developed Excel VBA workflows for inbound, outbound, live inventory, and part lookup using structured tables and formulas. Built dashboard views for inventory health, critical parts, warning items, top shortages, and reorder triggers.',
            impact: 'Reduced part lookup and inventory review time by ~70%, from 10 min to under 3 min, by centralizing hardware records. Improved shortage visibility across 100+ hardware transactions. Cut manual update friction by ~60%.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-6dcfb6a2f45964416df848ee942eecb4f14c6292-1080x1080-jpg' } }, alt: 'Inventory Dashboard' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-15d321706926d2fafb0eb3ff20ae590a09d80424-625x625-png' } }, alt: 'VBA Logic' },
            bottomRightAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-d61122ae86cf0eb9a47c07c12e863dde1c89549c-1024x1024-webp' } }, alt: 'Kanban Integration' }
        }
    },
    {
        _id: '5',
        _type: 'project',
        title: '3-Axis Assembly Workbench',
        slug: { _type: 'slug', current: '3-axis-assembly-workbench' },
        category: 'S&C ELECTRIC | AME',
        startDate: '2026-03-01',
        year: 2026,
        specs: [
            { _key: 's1', label: 'Cycle Time', value: '-30%' },
            { _key: 's2', label: 'Type', value: 'Welded Frame' },
            { _key: 's3', label: 'Design', value: 'SolidWorks' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'Custom assembly workbench replacing cart-based workflows for rollerdeck production.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'Engineered an assembly workbench to replace cart-based workflows and support rollerdeck-floor production. Targeted operator access, hardware storage, tool organization, and mounted-arm integration.',
            approach: 'Built SolidWorks CAD, BOMs, sheet-metal drawings, and assembly documentation for fabrication. Iterated around floor-space limits, Atlas Copco arm reach, hardware bins, drawer storage, and operator feedback.',
            impact: 'Advanced design from concept to welded sheet-metal frame with fabrication-ready documentation. Improved line-side organization with integrated hardware storage, tool drawers, and dedicated arm support. Reduced assembler cycletime by ~30%.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-15d321706926d2fafb0eb3ff20ae590a09d80424-625x625-png' } }, alt: 'Workbench CAD' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-56d3a915cfcc6244276c06b4a4bf02c5be72a1c8-1777x1339-png' } }, alt: 'Assembly Detail' },
            bottomRightAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-2e976a050b94e92d029e2fb32c2f9388994e1e8f-4032x3024-jpg' } }, alt: 'Fabrication Drawings' }
        }
    },
    {
        _id: '6',
        _type: 'project',
        title: 'Shrink Wrap Cart',
        slug: { _type: 'slug', current: 'shrink-wrap-cart' },
        category: 'S&C ELECTRIC | AME',
        startDate: '2026-04-01',
        year: 2026,
        specs: [
            { _key: 's1', label: 'Workflow', value: '-11%' },
            { _key: 's2', label: 'Design', value: 'Welded Frame' },
            { _key: 's3', label: 'Access', value: 'Serviceable' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'Production-ready material handling system for shrink-wrap packaging.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'Redesigned a wooden shrink-wrap cart into a production-ready material handling system for packaging. Targeted safer roll handling, cleaner material flow, better mobility, and easier operator access.',
            approach: 'Created SolidWorks CAD, BOMs, manufacturing drawings, and procurement package for shop fabrication. Designed a welded-frame cart with roll supports, caster mobility, lift-table compatibility, and serviceable loading access.',
            impact: 'Replaced an improvised wooden cart with a standardized fabrication-ready production fixture. Improved roll access and packaging workflow by reducing awkward handling. Reduced changeover, retrieval, and workflow time by ~11%.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-56d3a915cfcc6244276c06b4a4bf02c5be72a1c8-1777x1339-png' } }, alt: 'Final Cart Assembly' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-665062599f1a1be4763f46b069326ed39d737033-4032x3024-jpg' } }, alt: 'Design Features' },
            bottomRightAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-2e976a050b94e92d029e2fb32c2f9388994e1e8f-4032x3024-jpg' } }, alt: 'Fabrication Package' }
        }
    },
    {
        _id: '7',
        _type: 'project',
        title: 'Trace It! Interactive Targeting',
        slug: { _type: 'slug', current: 'trace-it-interactive-targeting' },
        category: 'ENGINEERING PROJECT',
        startDate: '2024-09-01',
        year: 2024,
        specs: [
            { _key: 's1', label: 'Accuracy', value: '95%' },
            { _key: 's2', label: 'Tracking', value: '8 cm/s' },
            { _key: 's3', label: 'Control', value: 'Closed-Loop' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'Belt-driven motion platform with closed-loop stepper control and IR sensing.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'Design an interactive targeting platform capable of highly accurate and stable tracking under variable environmental conditions.',
            approach: 'Engineered a belt-driven motion platform utilizing closed-loop stepper control and IR sensing. Applied DFM and tolerance analysis, utilizing CNC machining and additive manufacturing for structural components.',
            impact: 'Achieved 95% detection accuracy and stable tracking at 8 cm/s under variable lighting. Improved overall system reliability and simplified the assembly process for repeatable builds.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-6dcfb6a2f45964416df848ee942eecb4f14c6292-1080x1080-jpg' } }, alt: 'Electronics and sensors' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-15d321706926d2fafb0eb3ff20ae590a09d80424-625x625-png' } }, alt: 'Motion Platform' },
            bottomRightAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-d61122ae86cf0eb9a47c07c12e863dde1c89549c-1024x1024-webp' } }, alt: 'Tracking Results' }
        }
    },
    {
        _id: '0548cd49-5841-4966-a321-e49e4b726a7a',
        _type: 'project',
        title: 'SpacePad: Magnetic 6-DoF Mechatronic System',
        slug: { _type: 'slug', current: 'spacepad' },
        category: 'MECHATRONICS & HMI DESIGN',
        startDate: '2025-03-01',
        year: 2025,
        specs: [
            { _key: 's1', label: 'Sensor', value: 'MLX90393 3D Magnetometer' },
            { _key: 's2', label: 'Kinematics', value: '6-DoF (Non-Contact)' },
            { _key: 's3', label: 'Logic', value: 'RP2040 (CircuitPython)' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'High-reliability HMI capable of fluid 6-DoF navigation and macro orchestration.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'To bridge the ergonomic gap in complex 3D CAD workflows (Fusion 360/Blender) by engineering a dedicated Human-Machine Interface (HMI). The objective was to replace wear-prone mechanical joysticks with an open-source, high-reliability magnetic system capable of fluid 6-DoF navigation and macro orchestration.',
            approach: 'Developed a custom magnetic sensing mechanism utilizing the MLX90393 3D magnetometer for high-precision, non-contact coordinate tracking. Engineered the kinematics using a balanced system of 3 compression and 3 extension springs to achieve tuned, return-to-center tension. Integrated a 25-key mechanical matrix and dual EC11 rotary encoders, optimized for low-latency command execution via RP2040 firmware.',
            impact: 'Created a production-ready mechatronic tool that eliminates the \'Mouse-Keyboard fatigue\' in high-throughput engineering workflows. Proven through field testing to increase CAD navigation efficiency by 40%.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-824d9e0c6ea23a0031a7038e8b10dad7be5dee8d-1448x1086-png' } }, alt: 'Primary SpacePad Hero View' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-202173ec049ee4acb1eeab8867f94ef99d7c5b86-1086x1448-png' } }, alt: 'SpacePad Mechatronic Assembly' },
            bottomRightAnchor: { type: 'video', video: { _type: 'file', asset: { _ref: 'file-e0a0297349d00444f013df5c065f9a7557ddfedf-mp4' } }, alt: '6-DoF Kinematics Demo' }
        }
    },
    {
        _id: 'SrLtFAfCOsAY9E0ez2Kpc0',
        _type: 'project',
        title: 'Thermo Pin (Guerilla Gear V1)',
        slug: { _type: 'slug', current: 'thermo-pin-v1' },
        category: 'GUERRILLA GEAR | PRODUCT DESIGN',
        startDate: '2025-01-15',
        year: 2025,
        specs: [
            { _key: 's1', label: 'Safety Factor', value: '2.0x FoS' },
            { _key: 's2', label: 'Manufacturing', value: 'Slant 3D (FDM)' },
            { _key: 's3', label: 'Modularity', value: '2-in-1' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'Market-first modular weight-loading pin solving for cross-machine compatibility.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'Identify and solve a gap for a modular weight-loading pin with zero upfront tooling cost. The goal was to validate product-market fit using agile manufacturing before committing to metal production.',
            approach: 'Engineered a modular "Base + Extender" architecture. Optimized Design for Additive Manufacturing (DFAM) print orientations for shear-force resistance. Sourced and coordinated with Slant 3D to utilize their distributed print farm, scaling to thousands of units.',
            impact: 'Established a new product category and enabled six-figure product growth via agile thermoplastic production. Dynamic stress testing revealed elastic deformation limits, providing the baseline requirements for the V2 metal overhaul.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-d61de7c372cbce791322d8a0bc761504a96415a1-1024x1024-png' } }, alt: 'V1 Thermoplastic Variant' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-0eac4fc84d7692c1f9de8daad2b525ed8573b950-1024x1024-png' } }, alt: 'DFAM Optimization' },
            bottomRightAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-8fd444e32abe9e2d9aa7d9001d9757e5b474b83f-1080x1080-jpg' } }, alt: 'Market Launch' }
        }
    },
    {
        _id: '27d41afa-556f-4857-8260-7b3dec3dfaae',
        _type: 'project',
        title: 'META Pin (Guerilla Gear V2)',
        slug: { _type: 'slug', current: 'meta-pin-v2' },
        category: 'GUERRILLA GEAR | AME/MQE',
        startDate: '2025-06-01',
        year: 2025,
        specs: [
            { _key: 's1', label: 'Safety Factor', value: '2.5x FoS' },
            { _key: 's2', label: 'Manufacturing', value: 'Xometry (CNC)' },
            { _key: 's3', label: 'Fit', value: 'H7/g6 Sliding Fit' }
        ],
        description: [
            { _key: 'd1', _type: 'block', children: [{ _type: 'span', text: 'Precision-engineered all-metal upgrade with zero-fail commercial durability.' }], markDefs: [], style: 'normal' }
        ],
        content: {
            challenge: 'Ground-up mechanical overhaul to a "Zero-Fail" commercial system with an interchangeable 8mm/10mm rod system.',
            approach: 'Transitioned to CNC-machined 6061-T6 Aluminum via sourced partners in the Xometry network. Utilized H7/g6 sliding fits and a concentric adapter sleeve system to ensure precision modularity. Coordinated the technical hand-off and QC inspection for all mission-critical dimensions.',
            impact: 'Verified a 2.5x Factor of Safety for dynamic peak loads (450lb+). Reduced field failure rates to 0% while supporting six-figure product growth through technical reliability and interchangeable pin modularity.'
        },
        media: {
            carousel: [
                { _key: 'c1', type: 'image', image: { _type: 'image', asset: { _ref: 'image-d61122ae86cf0eb9a47c07c12e863dde1c89549c-1024x1024-webp' } }, alt: 'V2 Precision Metal Variant' }
            ],
            bottomLeftAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-15d321706926d2fafb0eb3ff20ae590a09d80424-625x625-png' } }, alt: 'FEA Validation' },
            bottomRightAnchor: { type: 'image', image: { _type: 'image', asset: { _ref: 'image-6dcfb6a2f45964416df848ee942eecb4f14c6292-1080x1080-jpg' } }, alt: 'Commercial Durability' }
        }
    }
];

const experiences = [
    {
        _id: 'exp-snc',
        _type: 'experience',
        company: 'S&C Electric',
        slug: { _type: 'slug', current: 'snc-electric' },
        role: 'Manufacturing Engineering Intern',
        date: 'Jan 2026 - Apr 2026',
        description: 'Engineered line-side manufacturing fixtures reducing cycle time by ~30%. Built Power BI dashboards from Azure data to cut safety review time by ~64%. Developed VBA inventory trackers and implemented Kanban systems to reduce material downtime.',
        projects: [
            { _type: 'reference', _ref: '1', _key: 'p1' },
            { _type: 'reference', _ref: '4', _key: 'p2' },
            { _type: 'reference', _ref: '5', _key: 'p3' },
            { _type: 'reference', _ref: '6', _key: 'p4' }
        ]
    },
    {
        _id: 'exp-paragon',
        _type: 'experience',
        company: 'Paragon Systems',
        slug: { _type: 'slug', current: 'paragon-systems' },
        role: 'Mechanical Engineer Intern',
        date: 'May 2025 - Aug 2025',
        description: 'Executed high-cycle vibration and IP validation testing. Designed modular test fixtures in SolidWorks, increasing throughput by 20%. Automated test-log post-processing using Python to reduce reporting cycle time from hours to 15 minutes.',
        projects: [
            { _type: 'reference', _ref: '2', _key: 'p1' }
        ]
    },
    {
        _id: 'exp-guerrilla',
        _type: 'experience',
        company: 'Guerrilla Gear',
        slug: { _type: 'slug', current: 'guerrilla-gear' },
        role: 'Product Design & Manufacturing Lead',
        date: 'Mar 2025 - Dec 2025',
        description: 'Led DFM/DFAM for a modular weight-stack system, achieving a 2.5x FoS via FEA and material optimization. Orchestrated a distributed manufacturing network reducing per-unit cost by 13%. Transitioned V1 thermoplastic innovation to V2 precision-machined variant, scaling fulfillment for six-figure revenue growth.',
        projects: [
            { _type: 'reference', _ref: 'SrLtFAfCOsAY9E0ez2Kpc0', _key: 'p1' },
            { _type: 'reference', _ref: '27d41afa-556f-4857-8260-7b3dec3dfaae', _key: 'p2' }
        ]
    },
    {
        _id: 'exp-independent',
        _type: 'experience',
        company: 'Independent Projects',
        slug: { _type: 'slug', current: 'independent-projects' },
        role: 'Mechatronics & Design',
        date: '2024 - Present',
        description: 'Independent engineering ventures focusing on robotics, advanced kinematics, and full-stack integration.',
        projects: [
            { _type: 'reference', _ref: '3', _key: 'p1' },
            { _type: 'reference', _ref: '7', _key: 'p2' },
            { _type: 'reference', _ref: '0548cd49-5841-4966-a321-e49e4b726a7a', _key: 'p3' }
        ]
    }
];

async function run() {
    console.log(`Starting restoration of ${projects.length} projects...`);
    for (const project of projects) {
        try {
            await client.createOrReplace(project);
            console.log(`Successfully restored project: ${project.title}`);
        } catch (err) {
            console.error(`Failed to restore project ${project.title}:`, err.message);
        }
    }

    console.log(`Starting restoration of ${experiences.length} experiences...`);
    for (const exp of experiences) {
        try {
            await client.createOrReplace(exp);
            console.log(`Successfully restored experience: ${exp.company}`);
        } catch (err) {
            console.error(`Failed to restore experience ${exp.company}:`, err.message);
        }
    }
}

run();
