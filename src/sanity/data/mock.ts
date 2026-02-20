import { Project } from '../types';

export const mockProjects: Project[] = [
    {
        _id: '1',
        title: 'Automation Cell Design',
        slug: { current: 'automation-cell-design' },
        date: '2024-01-15',
        category: 'ATS CORPORATION',
        specs: [
            { label: 'PPM', value: '180' },
            { label: 'faster', value: '4x' },
            { label: 'precision', value: '80μm' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'High-speed automated assembly for wearable insulin devices.' }],
            },
        ],
        mainImage: {
            asset: { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop' },
            alt: 'Automation machinery',
        },
        tags: ['SolidWorks', 'Kinematics', 'Controls'],
        links: {
            demo: 'https://example.com',
        },
        content: {
            challenge: 'Designed a production cell assembling 5 components into insulin delivery devices at unprecedented speed while maintaining micron-level precision.',
            approach: 'Iterated pallet design to reduce dimensional stack-up to 80 microns. Performed cycle time analysis, motor/drive sizing, and kinematic calculations. Designed each stations drives, actuators and tooling to accurately locate and perform functional requirements to 50 microns. Implemented blended motion profiles to increase OEE and prolong machine lifetimes.',
            impact: 'Achieved 4x throughput over previous generation with 40% reduction in calibration time. Standardized 20% of the cell to improve repeat equipment manufacturability driving cost savings.'
        },
        media: {
            what: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
            how: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
            results: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2036&auto=format&fit=crop'
        }
    },
    {
        _id: '2',
        title: 'Roof Tilt Mechanism',
        slug: { current: 'roof-tilt-mechanism' },
        date: '2023-08-20',
        category: 'DESIGN TEAM PROJECT',
        specs: [
            { label: 'range', value: '85°' },
            { label: 'capacity', value: '200kg' },
            { label: 'load-bearing', value: '20% greater' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Mechanical tilt system for solar charging optimization.' }],
            },
        ],
        mainImage: {
            asset: { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop' },
            alt: 'Solar array on mechanism',
        },
        tags: ['CAD', 'FEA', 'Machining'],
        links: {
            github: 'https://github.com',
        },
        content: {
            challenge: 'Design a robust tilt mechanism capable of adjusting solar panel angle throughout seasons while withstanding extreme wind loads.',
            approach: 'Researched, designed and machined six-bar linkage. Analyzed FEA load cases to verify system performance under worst-case scenarios. Selected ball joint and socket mounts for telescopic poles to ease assembly and reduced stress in pole mounts.',
            impact: 'Delivered 88% more rotational range with optimized charging abilities. Strengthened and stabilized previous system with stationary support tubes and non-linear hinging. Allows car roof to be tilted at any angle up to 85°.'
        },
        media: {
            what: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop',
            how: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2136&auto=format&fit=crop',
            results: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop'
        }
    },
    {
        _id: '3',
        title: 'Flower Charm PCB',
        slug: { current: 'flower-charm-pcb' },
        date: '2023-04-10',
        category: 'PERSONAL PROJECT',
        specs: [
            { label: 'Layers', value: '4' },
            { label: 'Size', value: '25mm' },
            { label: 'Power', value: '3.3V' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Custom wearable PCB project!' }],
            },
        ],
        mainImage: {
            asset: { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop' },
            alt: 'Circuit board up close',
        },
        tags: ['Altium', 'Electronics', 'SMD'],
        links: {
            github: 'https://github.com',
        },
        content: {
            challenge: 'Create an aesthetically pleasing, ultra-compact wearable circuit board capable of driving addressable LEDs without generating excess heat against the skin.',
            approach: 'Designed a 4-layer custom PCB using Altium Designer. Carefully routed power planes to dissipate heat and isolated the microcontroller signals from switching noise. Hand-soldered 0402 SMD components under a microscope.',
            impact: 'Achieved a beautiful 25mm diameter flower-shaped board. The firmware intelligently cycles deep-sleep modes, extending the coin cell battery life from 4 hours to 3 weeks of continuous passive operation.'
        },
        media: {
            what: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
            how: 'https://images.unsplash.com/photo-1603732551658-5fabbafa84f3?q=80&w=2070&auto=format&fit=crop',
            results: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop'
        }
    },
    {
        _id: '4',
        title: 'Spatial Dashboard',
        slug: { current: 'spatial-dashboard' },
        date: '2022-11-05',
        category: 'SOFTWARE ARCHITECTURE',
        specs: [
            { label: 'FPS', value: '60' },
            { label: 'Load', value: '<1s' },
            { label: 'Engagement', value: '+45%' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'A futuristic analytics dashboard optimized for VR environments.' }],
            },
        ],
        mainImage: {
            asset: { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' },
            alt: 'Cyberpunk dashboard interface',
        },
        tags: ['Next.js', 'Three.js', 'WebXR'],
        links: {
            demo: 'https://example.com',
        },
        content: {
            challenge: 'Designing an intuitive analytics dashboard that works seamlessly in both 2D browsers and immersive VR environments without sacrificing data density.',
            approach: 'Built a custom WebGL rendering engine using Three.js mapped to React state, allowing real-time spatial organization of data cards.',
            impact: 'Achieved 60fps across mobile and VR headsets, increasing user engagement time by 45% compared to flat dashboards.'
        },
        media: {
            what: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
            how: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop', // Code image
            results: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' // Earth abstraction
        }
    },
    {
        _id: '5',
        title: 'Neon Ecommerce',
        slug: { current: 'neon-ecommerce' },
        date: '2022-06-12',
        category: 'FREELANCE',
        specs: [
            { label: 'Throughput', value: '3k/s' },
            { label: 'Return rate', value: '-18%' },
            { label: 'Stack', value: 'Headless' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'An immersive shopping experience with 3D product previews.' }],
            },
        ],
        mainImage: {
            asset: { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
            alt: 'Neon abstract shapes',
        },
        tags: ['React', 'Shopify', 'WebGL'],
        links: {
            demo: 'https://example.com',
        },
        content: {
            challenge: 'Traditional e-commerce platforms struggle to convey the physical presence and scale of premium hardware products.',
            approach: 'Integrated a headless Shopify backend with a custom React front-end featuring interactive 3D model viewers and real-time lighting calculations.',
            impact: 'Reduced product return rates by 18% and increased average session duration by presenting products interactively.'
        },
        media: {
            what: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
            how: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop',
            results: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop'
        }
    },
    {
        _id: '6',
        title: 'AI Architect',
        slug: { current: 'ai-architect' },
        date: '2021-11-20',
        category: 'ACADEMIC RESEARCH',
        specs: [
            { label: 'Speed', value: '3x' },
            { label: 'Dataset', value: '40k imgs' },
            { label: 'Model', value: 'GAN' }
        ],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Generative design tool for architectural visualization.' }],
            },
        ],
        mainImage: {
            asset: { url: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2070&auto=format&fit=crop' },
            alt: 'AI generated architecture',
        },
        tags: ['Python', 'TensorFlow', 'React'],
        links: {
            github: 'https://github.com',
        },
        content: {
            challenge: 'Architects spend countless hours generating initial massing models and conceptual iterations before narrowing down a design.',
            approach: 'Trained a custom generative adversarial network (GAN) on historical blueprints and integrated it into a rapid React prototyping interface.',
            impact: 'Accelerated the conceptual design phase by 3x, allowing firms to pitch more variations to clients in a fraction of the time.'
        },
        media: {
            what: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2070&auto=format&fit=crop',
            how: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
            results: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
        }
    }
];
