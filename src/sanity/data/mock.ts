import { Project, Experience } from '../types';

export const mockProjects: Project[] = [
    {
        _id: '1',
        title: 'Manufacturing Review Dashboards',
        slug: { current: 'manufacturing-review-dashboards' },
        startDate: '2026-01-01',
        duration: 'Jan 2026 - Apr 2026',
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
        _id: '7',
        title: 'META Pin (Guerilla Gear V2)',
        slug: { current: 'meta-pin-v2' },
        startDate: '2025-09-01',
        duration: 'Sep 2025 - Dec 2025',
        year: 2025,
        category: 'GUERRILLA GEAR | AME/MQE',
        specs: [
            { label: 'Safety Factor', value: '2.5x FoS' },
            { label: 'Material', value: '6061-T6 Al' },
            { label: 'Fit', value: 'H7/g6' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Precision-engineered all-metal upgrade with zero-fail commercial durability.' }],
            },
        ],
        mainImage: {
            asset: { url: '/portfolio-assets/pdf_img_p1_4.png' },
            alt: 'Machined Metal Weight Pin',
        },
        tags: ['FEA', 'GD&T', 'CNC Machining', 'RCA', 'Metallurgy'],
        links: {
            demo: '#',
        },
        content: {
            challenge: 'Transition from a consumer polymer tool to a "Zero-Fail" commercial-grade system. Goal: Increase FoS to 2.5x and eliminate fatigue failure modes identified in the V1 lifecycle under dynamic loading.',
            approach: 'Transitioned to CNC-machined 6061-T6 Aluminum via Xometry. Utilized H7/g6 sliding fits and a concentric adapter sleeve system to ensure precision modularity. Coordinated the technical hand-off and QC inspection for all mission-critical dimensions.',
            impact: 'Verified a 2.5x Factor of Safety for dynamic peak loads (450lb+). Reduced field failure rates to 0% by implementing strict technical sourcing and QC protocols, enabling six-figure product growth.'
        },
        media: {
            what: '/portfolio-assets/pdf_img_p1_4.png',
            how: '/portfolio-assets/pdf_img_p1_5.png',
            results: '/portfolio-assets/pdf_img_p1_6.png'
        }
    },
    {
        _id: '8',
        title: 'Thermo Pin (Guerilla Gear V1)',
        slug: { current: 'thermo-pin-v1' },
        startDate: '2025-03-01',
        duration: 'Mar 2025 - Aug 2025',
        year: 2025,
        category: 'GUERRILLA GEAR | PRODUCT DESIGN',
        specs: [
            { label: 'Safety Factor', value: '2.0x FoS' },
            { label: 'Sourcing', value: 'Slant 3D' },
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
            alt: 'Thermoplastic Weight Pin',
        },
        tags: ['SolidWorks', 'DFAM', 'Additive Manufacturing', 'Product Launch'],
        links: {
            demo: '#',
        },
        content: {
            challenge: 'Identify and solve a significant gap in the strength equipment market: the lack of a modular weight-loading pin. Existing solutions were monolithic/fixed-length, forcing users to carry multiple pins for varying machine clearances.',
            approach: 'Engineered a "Base + Extender" system with a variable moment arm, telescoping from 4.5" to 7". Optimized Design for Additive Manufacturing (DFAM) print orientations for shear-force resistance. Sourced and coordinated with Slant 3D to utilize their distributed print farm, scaling to thousands of units.',
            impact: 'Established a new product category and enabled six-figure product growth via agile thermoplastic production. Dynamic stress testing revealed elastic deformation limits, providing the baseline requirements for the V2 overhaul.'
        },
        media: {
            what: '/portfolio-assets/pdf_img_p1_4.png',
            how: '/portfolio-assets/pdf_img_p1_5.png',
            results: '/portfolio-assets/pdf_img_p1_6.png'
        }
    }
];

export const mockExperiences: Experience[] = [
    {
        _id: 'exp-guerrilla',
        slug: { current: 'guerrilla-gear' },
        company: 'Guerrilla Gear',
        role: 'Product Design & Manufacturing Lead',
        date: 'Mar 2025 - Dec 2025',
        description: 'Led DFM/DFAM for a modular weight-stack system, achieving a 2.5x FoS via FEA and material optimization. Orchestrated a distributed manufacturing network reducing per-unit cost by 13%. Transitioned V1 thermoplastic innovation to V2 precision-machined variant, scaling fulfillment for six-figure revenue growth.',
        thumbnail: '',
        projects: [mockProjects[2], mockProjects[1]] // V1 then V2
    }
];
