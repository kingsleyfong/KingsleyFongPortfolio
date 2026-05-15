import { Project, Experience } from '../types';

export const mockProjects: Project[] = [
    {
        _id: '1',
        title: 'Manufacturing Review Dashboards',
        slug: { current: 'manufacturing-review-dashboards' },
        category: 'S&C ELECTRIC | AME/MQE',
        year: 2026,
        specs: [
            { label: 'Time Saved', value: '64%' },
            { label: 'Manual Work', value: '-86%' },
            { label: 'Data', value: '100+ logs' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Power BI dashboards transforming raw safety & hazard records into repeatable KPI views.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p1_4.png' },
            alt: 'Manufacturing Review Dashboards',
        },
        tags: ['Power BI', 'DAX', 'Power Query', 'Data Analytics'],
        links: { demo: '#' },
        content: {
            challenge: 'Converted scattered safety and hazard logs across production groups into visual KPI tools for weekly production and quality reviews. Focused on faster issue escalation, clearer ownership, and better visibility into operational risk.',
            approach: 'Built Power BI dashboards from Azure-linked TeamAssurance data tables, using Power Query and DAX measures and structured slicers. Transformed raw safety and hazard records into repeatable KPI views for overdue actions, ownership, backlog, and department-level trends.',
            impact: 'Reduced weekly production review time by ~64% from ~51 min to <18 min by replacing manual log searches. Cut manual filtering work by ~86% through standardized data aggregation, slicers, and prebuilt drilldown tables. Improved open-action visibility across 100+ safety and hazard records.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p1_4.png', alt: 'Main Dashboard View' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_5.png', alt: 'Data Pipeline' },
            bottomRightAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_6.png', alt: 'KPI Trends' }
        }
    },
    {
        _id: '2',
        title: 'Dust Collection Systems',
        slug: { current: 'dust-collection-systems' },
        category: 'PARAGON SYSTEMS | AME',
        year: 2025,
        specs: [
            { label: 'Airflow', value: '+10.5%' },
            { label: 'Coverage', value: '3 to 8 stn' },
            { label: 'Budget', value: '-76%' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Centralized lab airflow system upgrade reducing inefficient duct reruns.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p2_6.png' },
            alt: 'Dust Collection Systems',
        },
        tags: ['HVAC', 'Fluid Dynamics', 'Process Control', 'Project Management'],
        links: { demo: '#' },
        content: {
            challenge: 'Upgraded a scattered dust collection setup into a centralized lab airflow system. Targeted poor capture, limited station coverage, and inconsistent cleanup around material prep and fixture areas.',
            approach: 'Mapped duct runs, measured velocity, calculated CFM, and verified airflow before and after install. Installed ducting, blast gates, quick-connect drops, brackets, and serviceable filter access points.',
            impact: 'Increased point-of-use airflow by ~10.5% through controlled drops and improved duct routing. Expanded coverage from 3 to 8 stations while reducing inefficient duct reruns by ~22%. Delivered the upgrade ~76% under allocated budget.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p2_6.png', alt: 'System Ducting' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p2_7.png', alt: 'Custom Brackets' },
            bottomRightAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p2_5.png', alt: 'Testing Data' }
        }
    },
    {
        _id: '3',
        title: 'Brick It! LEGO 3D Printer',
        slug: { current: 'brick-it-lego-3d-printer' },
        category: 'ENGINEERING PROJECT',
        year: 2025,
        specs: [
            { label: 'Cycle Time', value: '9.5 s/brick' },
            { label: 'Accuracy', value: '92%' },
            { label: 'Part Count', value: '-30%' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Autonomous robotic cell converting user media into automated LEGO builds.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p3_1.png' },
            alt: 'Brick It! LEGO 3D Printer',
        },
        tags: ['SolidWorks', 'RobotC', 'GD&T', 'Full-stack'],
        links: { demo: '#' },
        content: {
            challenge: 'Led development of a gantry-based robotic cell that converts user media into automated LEGO builds. Built a prototype assembly system with part feeding, motion control, sensing, calibration, and toolpath generation.',
            approach: 'CAD in SolidWorks, using FEA and test builds to reduce placement error. Programmed ROBOTC homing, placement, recovery, and sensor checks, plus a fullstack React/Three.js web slicer.',
            impact: 'Achieved 9.5 s/brick and 92% placement accuracy after calibration and repeated test builds. Reduced dispenser part count by ~30% and magazine changeover time by ~25%. Reduced end-effector deflection by ~15%, improving placement stability.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p3_1.png', alt: 'Gantry System' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p3_2.png', alt: 'Slicer UI' },
            bottomRightAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p3_4.png', alt: 'Final Build' }
        }
    },
    {
        _id: '4',
        title: 'Material Flow Dashboard',
        slug: { current: 'material-flow-dashboard' },
        category: 'S&C ELECTRIC | AME',
        year: 2026,
        specs: [
            { label: 'Lookup Time', value: '-70%' },
            { label: 'Update Time', value: '-60%' },
            { label: 'Visibility', value: '100+ parts' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Line-side tracker for hardware inventory, shortages, and reorder status.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p1_8.png' },
            alt: 'Material Flow Dashboard',
        },
        tags: ['Excel VBA', 'Inventory Health', 'Kanban Systems'],
        links: { demo: '#' },
        content: {
            challenge: 'Built a line-side tracker for hardware inventory, shortages, reorder status, and part lookup. Targeted manual tracking issues causing part-search delays, unclear stock levels, and missed replenishment signals.',
            approach: 'Developed Excel VBA workflows for inbound, outbound, live inventory, and part lookup using structured tables and formulas. Built dashboard views for inventory health, critical parts, warning items, top shortages, and reorder triggers.',
            impact: 'Reduced part lookup and inventory review time by ~70%, from 10 min to under 3 min, by centralizing hardware records. Improved shortage visibility across 100+ hardware transactions. Cut manual update friction by ~60%.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p1_8.png', alt: 'Inventory Dashboard' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_5.png', alt: 'VBA Logic' },
            bottomRightAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_6.png', alt: 'Kanban Integration' }
        }
    },
    {
        _id: '5',
        title: '3-Axis Assembly Workbench',
        slug: { current: '3-axis-assembly-workbench' },
        category: 'S&C ELECTRIC | AME',
        year: 2026,
        specs: [
            { label: 'Cycle Time', value: '-30%' },
            { label: 'Type', value: 'Welded Frame' },
            { label: 'Design', value: 'SolidWorks' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Custom assembly workbench replacing cart-based workflows for rollerdeck production.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p2_1.png' },
            alt: '3-Axis Assembly Workbench',
        },
        tags: ['SolidWorks', 'BOMs', 'Sheet Metal'],
        links: { demo: '#' },
        content: {
            challenge: 'Engineered an assembly workbench to replace cart-based workflows and support rollerdeck-floor production. Targeted operator access, hardware storage, tool organization, and mounted-arm integration.',
            approach: 'Built SolidWorks CAD, BOMs, sheet-metal drawings, and assembly documentation for fabrication. Iterated around floor-space limits, Atlas Copco arm reach, hardware bins, drawer storage, and operator feedback.',
            impact: 'Advanced design from concept to welded sheet-metal frame with fabrication-ready documentation. Improved line-side organization with integrated hardware storage, tool drawers, and dedicated arm support. Reduced assembler cycletime by ~30%.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p2_1.png', alt: 'Workbench CAD' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p2_2.png', alt: 'Assembly Detail' },
            bottomRightAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p2_5.png', alt: 'Fabrication Drawings' }
        }
    },
    {
        _id: '6',
        title: 'Shrink Wrap Cart',
        slug: { current: 'shrink-wrap-cart' },
        category: 'S&C ELECTRIC | AME',
        year: 2026,
        specs: [
            { label: 'Workflow', value: '-11%' },
            { label: 'Design', value: 'Welded Frame' },
            { label: 'Access', value: 'Serviceable' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Production-ready material handling system for shrink-wrap packaging.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p1_2.png' },
            alt: 'Shrink Wrap Cart',
        },
        tags: ['SolidWorks', 'BOMs', 'Procurement'],
        links: { demo: '#' },
        content: {
            challenge: 'Redesigned a wooden shrink-wrap cart into a production-ready material handling system for packaging. Targeted safer roll handling, cleaner material flow, better mobility, and easier operator access.',
            approach: 'Created SolidWorks CAD, BOMs, manufacturing drawings, and procurement package for shop fabrication. Designed a welded-frame cart with roll supports, caster mobility, lift-table compatibility, and serviceable loading access.',
            impact: 'Replaced an improvised wooden cart with a standardized fabrication-ready production fixture. Improved roll access and packaging workflow by reducing awkward handling. Reduced changeover, retrieval, and workflow time by ~11%.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p1_2.png', alt: 'Final Cart Assembly' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_7.png', alt: 'Design Features' },
            bottomRightAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_4.png', alt: 'Fabrication Package' }
        }
    },
    {
        _id: '7',
        title: 'Trace It! Interactive Targeting',
        slug: { current: 'trace-it-interactive-targeting' },
        category: 'ENGINEERING PROJECT',
        year: 2024,
        specs: [
            { label: 'Accuracy', value: '95%' },
            { label: 'Tracking', value: '8 cm/s' },
            { label: 'Control', value: 'Closed-Loop' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Belt-driven motion platform with closed-loop stepper control and IR sensing.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p3_5.png' },
            alt: 'Trace It! Hero View',
        },
        tags: ['Arduino', 'C++', 'CNC', 'SolidWorks'],
        links: { demo: '#' },
        content: {
            challenge: 'Design an interactive targeting platform capable of highly accurate and stable tracking under variable environmental conditions.',
            approach: 'Engineered a belt-driven motion platform utilizing closed-loop stepper control and IR sensing. Applied DFM and tolerance analysis, utilizing CNC machining and additive manufacturing for structural components.',
            impact: 'Achieved 95% detection accuracy and stable tracking at 8 cm/s under variable lighting. Improved overall system reliability and simplified the assembly process for repeatable builds.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p3_5.png', alt: 'Electronics and sensors' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p3_6.png', alt: 'Motion Platform' },
            bottomRightAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p3_7.png', alt: 'Tracking Results' }
        }
    },
    {
        _id: '0548cd49-5841-4966-a321-e49e4b726a7a',
        title: 'SpacePad: Magnetic 6-DoF Mechatronic System',
        slug: { current: 'spacepad' },
        category: 'MECHATRONICS & HMI DESIGN',
        year: 2025,
        specs: [
            { label: 'Sensor', value: 'MLX90393 3D Magnetometer' },
            { label: 'Kinematics', value: '6-DoF (Non-Contact)' },
            { label: 'Logic', value: 'RP2040 (CircuitPython)' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'High-reliability HMI capable of fluid 6-DoF navigation and macro orchestration.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p3_3.jpeg' },
            alt: 'SpacePad Hero View',
        },
        tags: ['6-DoF Sensing', 'Mechatronics', 'Hall Effect', 'DFM/DFA', 'Rapid Prototyping'],
        links: { demo: '#' },
        content: {
            challenge: 'To bridge the ergonomic gap in complex 3D CAD workflows (Fusion 360/Blender) by engineering a dedicated Human-Machine Interface (HMI). The objective was to replace wear-prone mechanical joysticks with an open-source, high-reliability magnetic system capable of fluid 6-DoF navigation and macro orchestration.',
            approach: 'Developed a custom magnetic sensing mechanism utilizing the MLX90393 3D magnetometer for high-precision, non-contact coordinate tracking. Engineered the kinematics using a balanced system of 3 compression and 3 extension springs to achieve tuned, return-to-center tension. Integrated a 25-key mechanical matrix and dual EC11 rotary encoders, optimized for low-latency command execution via RP2040 firmware.',
            impact: 'Created a production-ready mechatronic tool that eliminates the \'Mouse-Keyboard fatigue\' in high-throughput engineering workflows. Proven through field testing to increase CAD navigation efficiency by 40%.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p3_3.jpeg', alt: 'Primary SpacePad Hero View' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p3_2.png', alt: 'SpacePad Mechatronic Assembly' },
            bottomRightAnchor: { type: 'video', video: '/portfolio-assets/spacepad_demo.mp4', alt: '6-DoF Kinematics Demo' }
        }
    },
    {
        _id: 'SrLtFAfCOsAY9E0ez2Kpc0',
        title: 'Thermo Pin (Guerilla Gear V1)',
        slug: { current: 'thermo-pin-v1' },
        category: 'GUERRILLA GEAR | PRODUCT DESIGN',
        year: 2025,
        specs: [
            { label: 'Safety Factor', value: '2.0x FoS' },
            { label: 'Manufacturing', value: 'Slant 3D (FDM)' },
            { label: 'Modularity', value: '2-in-1' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Market-first modular weight-loading pin solving for cross-machine compatibility.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p1_4.png' },
            alt: 'Thermo Pin V1',
        },
        tags: ['SolidWorks', 'DFAM', 'Additive Manufacturing', 'Product Launch'],
        links: { demo: '#' },
        content: {
            challenge: 'Identify and solve a gap for a modular weight-loading pin with zero upfront tooling cost. The goal was to validate product-market fit using agile manufacturing before committing to metal production.',
            approach: 'Engineered a modular "Base + Extender" architecture. Optimized Design for Additive Manufacturing (DFAM) print orientations for shear-force resistance. Sourced and coordinated with Slant 3D to utilize their distributed print farm, scaling to thousands of units.',
            impact: 'Established a new product category and enabled six-figure product growth via agile thermoplastic production. Dynamic stress testing revealed elastic deformation limits, providing the baseline requirements for the V2 metal overhaul.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p1_4.png', alt: 'V1 Thermoplastic Variant' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_5.png', alt: 'DFAM Optimization' },
            bottomRightAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_6.png', alt: 'Market Launch' }
        }
    },
    {
        _id: '27d41afa-556f-4857-8260-7b3dec3dfaae',
        title: 'META Pin (Guerilla Gear V2)',
        slug: { current: 'meta-pin-v2' },
        category: 'GUERRILLA GEAR | AME/MQE',
        year: 2025,
        specs: [
            { label: 'Safety Factor', value: '2.5x FoS' },
            { label: 'Manufacturing', value: 'Xometry (CNC)' },
            { label: 'Fit', value: 'H7/g6 Sliding Fit' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Precision-engineered all-metal upgrade with zero-fail commercial durability.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p1_4.png' },
            alt: 'META Pin V2',
        },
        tags: ['FEA', 'GD&T', 'CNC Machining', 'RCA', 'Metallurgy'],
        links: { demo: '#' },
        content: {
            challenge: 'Ground-up mechanical overhaul to a "Zero-Fail" commercial system with an interchangeable 8mm/10mm rod system.',
            approach: 'Transitioned to CNC-machined 6061-T6 Aluminum via sourced partners in the Xometry network. Utilized H7/g6 sliding fits and a concentric adapter sleeve system to ensure precision modularity. Coordinated the technical hand-off and QC inspection for all mission-critical dimensions.',
            impact: 'Verified a 2.5x Factor of Safety for dynamic peak loads (450lb+). Reduced field failure rates to 0% while supporting six-figure product growth through technical reliability and interchangeable pin modularity.'
        },
        media: {
            carousel: [
                { type: 'image', image: '/portfolio-assets/pdf_img_p1_4.png', alt: 'V2 Precision Metal Variant' }
            ],
            bottomLeftAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_5.png', alt: 'FEA Validation' },
            bottomRightAnchor: { type: 'image', image: '/portfolio-assets/pdf_img_p1_6.png', alt: 'Commercial Durability' }
        }
    }
];

export const mockExperiences: Experience[] = [
    {
        _id: 'exp-snc',
        slug: { current: 'snc-electric' },
        company: 'S&C Electric',
        role: 'Manufacturing Engineering Intern',
        date: 'Jan 2026 - Apr 2026',
        description: 'Engineered line-side manufacturing fixtures reducing cycle time by ~30%. Built Power BI dashboards from Azure data to cut safety review time by ~64%. Developed VBA inventory trackers and implemented Kanban systems to reduce material downtime.',
        thumbnail: '',
        projects: [mockProjects[0], mockProjects[3], mockProjects[4], mockProjects[5]]
    },
    {
        _id: 'exp-paragon',
        slug: { current: 'paragon-systems' },
        company: 'Paragon Systems',
        role: 'Mechanical Engineer Intern',
        date: 'May 2025 - Aug 2025',
        description: 'Executed high-cycle vibration and IP validation testing. Designed modular test fixtures in SolidWorks, increasing throughput by 20%. Automated test-log post-processing using Python to reduce reporting cycle time from hours to 15 minutes.',
        thumbnail: '',
        projects: [mockProjects[1]]
    },
    {
        _id: 'exp-guerrilla',
        slug: { current: 'guerrilla-gear' },
        company: 'Guerrilla Gear',
        role: 'Product Design & Manufacturing Lead',
        date: 'Mar 2025 - Dec 2025',
        description: 'Led DFM/DFAM for a modular weight-stack system, achieving a 2.5x FoS via FEA and material optimization. Orchestrated a distributed manufacturing network reducing per-unit cost by 13%. Transitioned V1 thermoplastic innovation to V2 precision-machined variant, scaling fulfillment for six-figure revenue growth.',
        thumbnail: '',
        projects: [mockProjects[8], mockProjects[9]]
    },
    {
        _id: 'exp-independent',
        slug: { current: 'independent-projects' },
        company: 'Independent Projects',
        role: 'Mechatronics & Design',
        date: '2024 - Present',
        description: 'Independent engineering ventures focusing on robotics, advanced kinematics, and full-stack integration.',
        thumbnail: '',
        projects: [mockProjects[2], mockProjects[6], mockProjects[7]]
    }
];
