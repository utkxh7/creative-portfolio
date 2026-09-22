export const SITE_DATA = {
  profile: {
    brand: "UTKARSH©2026",
    location: "INDORE, IN",
    statement: "I explore how human stories, spatial aesthetics, and power grid mathematics intersect—shaping digital products, systems research, and visual craft.",
    substatement: "Currently building Sidekick™, researching stability-aware power grid dispatch algorithms, and documenting observations on corporate entropy.",
    email: "utk9rsh@gmail.com",
    socials: [
      { name: "utk9rsh@gmail.com", href: "mailto:utk9rsh@gmail.com" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/utkarsh-gupta-a2020a251/" },
      { name: "Instagram", href: "https://www.instagram.com/utkarshhguptaaa/" }
    ]
  },

  projects: [
    {
      id: "sidekick",
      category: "Product Architecture & Real-Time UX",
      title: "Sidekick™ — Co-Presence Engine for the Shared Web",
      tag: "app↗",
      year: "2025–2026",
      role: "Product Architect & Full-Stack Developer",
      summary: "A real-time co-presence engine pairing wanderers for synchronized shared-web hangouts without video anxiety or infinite feeds.",
      description: "Sidekick revives the lost feeling of shared internet exploration. Users calibrate their frequency with an anthem and 5 vibe questions, get paired through a live Socket.io queue, and explore 360 Street Views, virtual museums, and casual games together with persistent text chat.",
      image: "/assets/sidekick.png",
      outcomes: [
        "Eliminated video/camera anxiety upfront with a 3-step onboarding strip and text-only co-presence",
        "Engineered real-time matchmaking queue pairing users on vibe-tag overlap with synergy scoring",
        "Curated interactive destinations (Tokyo 360, Smithsonian, Lichess, Lofi stream) with persistent chat",
        "Built zero-friction safety architecture with instant 1-click report/block and server moderation"
      ],
      tags: ["Node.js", "Socket.io", "Product Design", "UX Strategy", "Real-Time Systems"]
    },
    {
      id: "grid_dispatch",
      category: "Research Paper",
      title: "Stability-Aware Power Grid Dispatch Model",
      tag: "paper↗",
      year: "2025–2026",
      role: "Lead Quantitative Researcher",
      summary: "Mathematical optimization enforcing dynamic Rate of Change of Frequency (RoCoF) constraints for high-renewable grids.",
      description: "As renewable energy penetration increases, power grids lose traditional rotational inertia. This research paper formulates a mixed-integer linear programming (MILP) dispatch matrix in Python PyPSA calculating dynamic inertia margins without relying on fossil fuel backup.",
      image: "/assets/grid_research.png",
      keyMetrics: [
        { label: "RoCoF Penalty Reduction", value: "-42%" },
        { label: "Inertia Safety Margin", value: "+18.4%" },
        { label: "Solve Speed", value: "< 1.2s" }
      ],
      tags: ["Python", "PyPSA", "MILP Optimization", "IEEE 39-Bus"]
    },
    {
      id: "indore_sim",
      category: "Simulation Tool",
      title: "10,000 Possible Indores",
      tag: "interactive↗",
      year: "2026",
      role: "Simulation Architect",
      summary: "Monte Carlo stress test analyzing regional microgrid financial resilience under monsoon failure & tariff surges.",
      description: "What happens to a microgrid when monsoon patterns fail, policy changes, and tariffs stop behaving? An interactive Monte Carlo simulation testing microgrid financial stability across 10,000 randomized scenarios.",
      image: "/assets/grid_research.png",
      hasInteractiveSim: true,
      tags: ["Monte Carlo", "Python", "Data Art", "React"]
    },
    {
      id: "discom_analytics",
      category: "Business Analysis",
      title: "DISCOM Financial & Loss Recovery Diagnostic",
      tag: "analytics↗",
      year: "2025",
      role: "Business Analyst & Data Engineer",
      summary: "Quantitative analysis framework diagnosing Aggregate Technical & Commercial (AT&C) losses across power distribution transformers.",
      description: "Electricity distribution companies suffer cash flow bottlenecks from unmetered line losses. Developed an analytics pipeline auditing 450+ transformer nodes to uncover revenue leakage.",
      image: "/assets/grid_research.png",
      keyMetrics: [
        { label: "AT&C Loss Targets", value: "-8.5%" },
        { label: "Unmetered Loss Detected", value: "₹4.2 Cr" },
        { label: "Transformers Audited", value: "450+" }
      ],
      tags: ["SQL", "Pandas", "AT&C Loss", "Financial Analytics"]
    },
    {
      id: "chingari_brand",
      category: "Brand Architecture",
      title: "Chingari — Mythological Surrealism Brand System",
      tag: "identity↗",
      year: "2025–2026",
      role: "Brand Strategist & Creative Director",
      summary: "Brand identity, narrative positioning, and GTM strategy for a modern Indian cult label.",
      description: "Exploring brand identity as spatial storytelling. Positioned Chingari away from generic 'psychedelic' aesthetics toward Mythological Surrealism—combining celestial moods, old print-memories, and a pre-order infrastructure built on Cloudflare.",
      image: "/assets/sidekick.png",
      outcomes: [
        "Formulated 'Mythological Surrealism' visual narrative & tone manifesto",
        "Designed Instagram layout, print-memory art themes, and product storytelling",
        "Architected direct-to-consumer pre-order stack & Cloudflare edge infrastructure"
      ],
      tags: ["Brand Identity", "Creative Direction", "Narrative Strategy", "GTM Tech"]
    },
    {
      id: "laser_magenta_study",
      category: "Visual Study",
      title: "Cosmic Laser & Magenta Light",
      tag: "frames↗",
      year: "2026",
      role: "Visual Photographer",
      summary: "Cinematic portrait shot under saturated magenta gel light and green laser rays. External polish, interior locked.",
      description: "A visual study exploring gaze aversion, laser projections, and interior tension held in a single frame.",
      image: "/assets/utkarsh_laser_magenta.jpg",
      tags: ["Photography", "Light Study", "35mm Frame"]
    },
    {
      id: "transmission_static",
      category: "Writing",
      title: "Static on the Transmission Line",
      tag: "prose↗",
      year: "2026",
      role: "Author",
      summary: "Three hundred kilovolts suspended in air, singing a single frequency to the wheat fields below...",
      content: `Three hundred kilovolts suspended in air,
Singing a single frequency to the wheat fields below.
We build towers to talk across rivers,
Yet whisper across kitchen tables in quiet hesitation.

In the dispatch control room,
A green line dips by two cycles per second—
The whole state shivers for a fraction of a pulse,
And no one outside ever knows.`,
      tags: ["Poetry", "Prose", "Observation"]
    }
  ]
};
