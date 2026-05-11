import { Project, Experience } from '../types';

export const mockProjects: Project[] = [
    {
        _id: '1',
        title: 'Manufacturing Review Dashboards',
        slug: { current: 'manufacturing-review-dashboards' },
        year: 2026,
        category: 'S&C ELECTRIC | AME/MQE',
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
            alt: 'Data Dashboard',
        },
        tags: ['Power BI', 'DAX', 'Power Query', 'Data Analytics'],
        links: {
            demo: '#',
        },
        content: {
            challenge: 'Scattered safety and hazard logs across production groups made weekly reviews inefficient, causing slow issue escalation and unclear ownership.',
            approach: 'Built Power BI dashboards from Azure-linked TeamAssurance data tables, using Power Query and DAX measures. Transformed raw safety and hazard records into repeatable KPI views for overdue actions, ownership, backlog, and department-level trends.',
            impact: 'Reduced weekly production review time by ~64% (from ~51 min to <18 min) by replacing manual log searches. Cut manual filtering work by ~86% and improved open-action visibility across 100+ safety and hazard records.'
        },
        media: {
            what: '/portfolio-assets/pdf_img_p1_4.png',
            how: '/portfolio-assets/pdf_img_p1_5.png',
            results: '/portfolio-assets/pdf_img_p1_6.png'
        }
    },
    {
        _id: '2',
        title: 'Dust Collection Systems',
        slug: { current: 'dust-collection-systems' },
        year: 2025,
        category: 'PARAGON SYSTEMS | AME',
        specs: [
            { label: 'Airflow', value: '+10.5%' },
            { label: 'Reruns', value: '-22%' },
            { label: 'Budget', value: '-76%' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Centralized lab airflow system upgrade reducing particulate-related reruns.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p2_6.png' },
            alt: 'Manufacturing Facility Ducting',
        },
        tags: ['HVAC', 'Fluid Dynamics', 'Project Management'],
        links: {
            demo: '#',
        },
        content: {
            challenge: 'A scattered dust collection setup led to poor capture, limited station coverage, and inconsistent cleanup around material prep and fixture areas.',
            approach: 'Mapped duct runs, measured velocity, calculated CFM, and verified airflow. Installed centralized ducting, blast gates, quick-connect drops, custom in-house brackets, and serviceable filter access points.',
            impact: 'Increased point-of-use airflow by ~10.5% through controlled drops. Expanded coverage from 3 to 8 stations while reducing inefficient duct reruns by ~22%. Delivered the upgrade ~76% under budget.'
        },
        media: {
            what: '/portfolio-assets/pdf_img_p2_6.png',
            how: '/portfolio-assets/pdf_img_p2_7.png',
            results: '/portfolio-assets/pdf_img_p2_5.png'
        }
    },
    {
        _id: '3',
        title: 'Brick It! LEGO 3D Printer',
        slug: { current: 'brick-it-lego-3d-printer' },
        year: 2025,
        category: 'ENGINEERING PROJECT',
        specs: [
            { label: 'Speed', value: '9.5 s/brick' },
            { label: 'Accuracy', value: '92%' },
            { label: 'Deflection', value: '-15%' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Autonomous robotic cell converting user media into physical LEGO builds.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p3_1.png' },
            alt: 'LEGO Bricks',
        },
        tags: ['SolidWorks', 'Robotics', 'React', 'Three.js'],
        links: {
            demo: '#',
        },
        content: {
            challenge: 'Develop a gantry-based robotic cell that converts user media into automated LEGO builds, requiring precise part feeding, motion control, and toolpath generation.',
            approach: 'Led mechanical architecture using SolidWorks and FEA. Programmed ROBOTC homing, placement, recovery, and sensor checks. Built a full-stack React/Three.js web slicer for automated EV3 export.',
            impact: 'Achieved 9.5 s/brick cycle time and 92% placement accuracy over 100+ builds. Reduced dispenser part count by 30%, cut changeover by 25%, and improved end-effector stiffness by 15% for stable high-speed operation.'
        },
        media: {
            what: '/portfolio-assets/pdf_img_p3_1.png',
            how: '/portfolio-assets/pdf_img_p3_2.png',
            results: '/portfolio-assets/pdf_img_p3_4.png'
        }
    },
    {
        _id: '4',
        title: 'Material Flow Dashboard',
        slug: { current: 'material-flow-dashboard' },
        year: 2026,
        category: 'S&C ELECTRIC | AME',
        specs: [
            { label: 'Lookup Time', value: '-70%' },
            { label: 'Updates', value: '-60%' },
            { label: 'Scale', value: '100+ Parts' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Line-side tracker for hardware inventory, shortages, and reorder status.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p1_8.png' },
            alt: 'Warehouse Inventory',
        },
        tags: ['Excel VBA', 'Inventory', 'Kanban'],
        links: {
            demo: '#',
        },
        content: {
            challenge: 'Manual tracking issues caused part-search delays, unclear stock levels, and missed replenishment signals across the production floor.',
            approach: 'Developed Excel VBA workflows for inbound, outbound, live inventory, and part lookup using structured tables. Built dashboard views for inventory health, warning items, and reorder triggers.',
            impact: 'Reduced part lookup time by ~70% (from 10 min to <3 min). Improved shortage visibility across 100+ hardware transactions by flagging critical levels before production impact.'
        },
        media: {
            what: '/portfolio-assets/pdf_img_p1_8.png',
            how: '/portfolio-assets/pdf_img_p1_5.png',
            results: '/portfolio-assets/pdf_img_p1_6.png'
        }
    },
    {
        _id: '5',
        title: '3-Axis Assembly Workbench',
        slug: { current: '3-axis-assembly-workbench' },
        year: 2026,
        category: 'S&C ELECTRIC | AME',
        specs: [
            { label: 'Workflow', value: '-30%' },
            { label: 'Type', value: 'Welded Frame' },
            { label: 'Docs', value: 'Fabrication Ready' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Custom assembly workbench replacing cart-based workflows for rollerdeck production.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p2_1.png' },
            alt: 'Workbench Tools',
        },
        tags: ['SolidWorks', 'DFMA', 'Sheet Metal'],
        links: {
            demo: '#',
        },
        content: {
            challenge: 'Existing cart-based workflows were inefficient for rollerdeck-floor production, lacking dedicated operator access, storage, and tool organization.',
            approach: 'Built SolidWorks CAD, BOMs, sheet-metal drawings, and assembly documentation. Iterated around floor-space limits, Atlas Copco arm reach, hardware bins, and operator feedback.',
            impact: 'Advanced design from concept to welded sheet-metal frame. Reduced assembler workflow by ~30% by consolidating tools, hardware, and workholding into one dedicated station.'
        },
        media: {
            what: '/portfolio-assets/pdf_img_p2_1.png',
            how: '/portfolio-assets/pdf_img_p2_2.png',
            results: '/portfolio-assets/pdf_img_p2_5.png'
        }
    },
    {
        _id: '6',
        title: 'Trace It! Interactive Targeting',
        slug: { current: 'trace-it-interactive-targeting' },
        year: 2024,
        category: 'ENGINEERING PROJECT',
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
            alt: 'Electronics and sensors',
        },
        tags: ['Arduino', 'C++', 'CNC', 'SolidWorks'],
        links: {
            demo: '#',
        },
        content: {
            challenge: 'Design an interactive targeting platform capable of highly accurate and stable tracking under variable environmental conditions.',
            approach: 'Engineered a belt-driven motion platform utilizing closed-loop stepper control and IR sensing. Applied DFM and tolerance analysis, utilizing CNC machining and additive manufacturing for structural components.',
            impact: 'Achieved 95% detection accuracy and stable tracking at 8 cm/s under variable lighting. Improved overall system reliability and simplified the assembly process for repeatable builds.'
        },
        media: {
            what: '/portfolio-assets/pdf_img_p3_5.png',
            how: '/portfolio-assets/pdf_img_p3_6.png',
            results: '/portfolio-assets/pdf_img_p3_7.png'
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
        projectIds: ['1', '4', '5'] // 'Manufacturing Review Dashboards', 'Material Flow Dashboard', '3-Axis Assembly Workbench'
    },
    {
        _id: 'exp-paragon',
        slug: { current: 'paragon-systems' },
        company: 'Paragon Systems',
        role: 'Mechanical Engineer Intern',
        date: 'May 2025 - Aug 2025',
        description: 'Executed high-cycle vibration and IP validation testing. Designed modular test fixtures in SolidWorks, increasing throughput by 20%. Automated test-log post-processing using Python to reduce reporting cycle time from hours to 15 minutes.',
        thumbnail: '',
        projectIds: ['2'] // 'Dust Collection Systems'
    },
    {
        _id: 'exp-guerrilla',
        slug: { current: 'guerrilla-gear' },
        company: 'Guerrilla Gear',
        role: 'Product Design & Manufacturing Lead',
        date: 'Mar 2025 - Dec 2025',
        description: 'Led DFM/DFAM for a modular weight-stack attachment. Sourced machine shops and additive vendors, reducing per-unit cost by 13%. Transitioned V1 assemblies to thermoplastics, scaling fulfillment and supporting six-figure revenue growth.',
        thumbnail: '',
        projectIds: [] // No explicit projects mapped yet in mock data, but structure holds.
    },
    {
        _id: 'exp-independent',
        slug: { current: 'independent-projects' },
        company: 'Independent Projects',
        role: 'Mechatronics & Design',
        date: '2024 - Present',
        description: 'Independent engineering ventures focusing on robotics, advanced kinematics, and full-stack integration.',
        thumbnail: '',
        projectIds: ['3', '6'] // 'Brick It! LEGO 3D Printer', 'Trace It! Interactive Targeting'
    }
];
