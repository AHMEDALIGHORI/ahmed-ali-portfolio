/** Signal / Field style: repository-backed portfolio evidence, with transparent status and provenance. */
export type Project = {
  slug: "nimbus-keyboards" | "speech-therapy-project" | "rozgarsync";
  number: string;
  name: string;
  eyebrow: string;
  kind: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  visualCode: string;
  visualCaption: string;
  description: string;
  tools: string[];
  repositoryUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  status: string;
  caseStudy: {
    statement: string;
    problem: string;
    approach: string;
    system: string[];
    evidence: string[];
    provenance: string;
  };
};

export const featuredProjects: Project[] = [
  {
    slug: "nimbus-keyboards",
    number: "01",
    name: "Nimbus Keyboards",
    eyebrow: "Interactive commerce concept",
    kind: "3D product experience / system design",
    image: "/manus-storage/nimbus-field-artifact_a51421b6.jpg",
    imageAlt: "Art-directed keyboard configuration field study for Nimbus Keyboards",
    imageFit: "cover",
    visualCode: "NMB / 75",
    visualCaption: "Art-directed configuration study",
    description:
      "A 3D keyboard storefront concept combining configurable product scenes, motion-led storytelling, CMS slices, and a server-side checkout flow.",
    tools: ["Next.js 15", "Three.js", "R3F", "GSAP", "Prismic", "Stripe"],
    repositoryUrl: "https://github.com/AHMEDALIGHORI/Nimbus-Keyword-Webiste",
    status: "Source available · concept storefront",
    caseStudy: {
      statement: "A configurable keyboard experience designed as a high-fidelity product narrative, not a standard catalog page.",
      problem:
        "The project investigates how a technical product can be explained through direct visual exploration, while keeping content editing and checkout logic structured for a real storefront workflow.",
      approach:
        "The build pairs real-time 3D scenes with scroll-directed GSAP choreography, then keeps merchandising flexible through reusable Prismic slices and a typed product model.",
      system: [
        "Interactive WebGL keyboard, keycap, and switch models",
        "Six selectable keycap themes with real-time 3D preview behavior",
        "Four switch variants with click-to-play sound samples",
        "Content-managed page composition with Prismic and Slice Machine",
        "Server-created Stripe Checkout sessions and a session-aware success page",
        "Dynamic metadata and reduced-motion handling",
      ],
      evidence: [
        "Next.js 15 App Router, React 19, and TypeScript structure",
        "Three.js, React Three Fiber, Drei, GSAP, and ScrollTrigger",
        "Prismic content types for homepage, product, and switch records",
        "Documented checkout flow and production-readiness note for webhooks",
      ],
      provenance:
        "This portfolio entry is based on the repository documentation and source structure. It is presented as a commerce concept; no claim is made that live payments, inventory, or fulfilment are operating in production.",
    },
  },
  {
    slug: "speech-therapy-project",
    number: "02",
    name: "Speech Therapy Project",
    eyebrow: "Responsible AI public demo",
    kind: "Safety-led AI product / communication practice",
    image: "/manus-storage/speech-field-artifact_f261f88a.jpg",
    imageAlt: "Art-directed consent and listening field study for the Speech Therapy Project",
    imageFit: "cover",
    visualCode: "STP / 18+",
    visualCaption: "Art-directed consent study",
    description:
      "A public, adult-only communication-practice demo shaped around consent, safety boundaries, optional reflection, and professional referral guidance.",
    tools: ["Next.js", "TypeScript", "Supabase", "RAG", "OpenAI", "Gemini"],
    repositoryUrl: "https://github.com/AHMEDALIGHORI/Speech-Thearpy-Project",
    liveUrl: "https://speech-therapy-project-pilot.ahmedunkown12.chatgpt.site/",
    liveLabel: "Open public demo",
    status: "Public demo · non-diagnostic product",
    caseStudy: {
      statement: "A communication-practice experience that treats safety, consent, and uncertainty as first-class interaction design requirements.",
      problem:
        "The project addresses the need for low-friction, adult-focused speech practice without presenting itself as a clinician, diagnostic service, or replacement for professional care.",
      approach:
        "The system creates bounded support paths around a guided screen, optional practice, privacy choices, referral guidance, and a validated AI-coaching pipeline that can fail safely.",
      system: [
        "No-account public demo with adult confirmation, consent, and privacy choices",
        "Guided screening with non-diagnostic summaries and escalation guidance",
        "Optional microphone practice with reflective observations rather than validated severity scores",
        "Independent AI drafts, final safety synthesis, exercise allowlists, and deterministic checks",
        "Public-demo mode designed without personal account history or saved audio",
        "Governance pages for safety, privacy, accessibility, and launch-readiness evidence",
      ],
      evidence: [
        "Next.js, React, TypeScript, and Tailwind-based application structure",
        "Server-side approved-knowledge retrieval with Supabase Postgres and pgvector",
        "Provider timeout, circuit-breaker, moderation, and transcription fallback design",
        "Repository test coverage targeting safety, consent, privacy, and escalation behavior",
      ],
      provenance:
        "This is an exploratory screening and communication-practice demo for adults. It does not diagnose, treat, promise a cure, or replace a licensed speech-language pathologist. Its public-launch governance conditions remain explicitly documented in the repository.",
    },
  },
  {
    slug: "rozgarsync",
    number: "03",
    name: "RozgarSync",
    eyebrow: "Bilingual multi-agent concept",
    kind: "AI systems architecture / local-context product design",
    image: "/manus-storage/rozgar-field-artifact_701c29f6.jpg",
    imageAlt: "Art-directed multi-agent routing field study for RozgarSync",
    imageFit: "cover",
    visualCode: "RZG / EN-UR",
    visualCaption: "Art-directed orchestration study",
    description:
      "A concept platform for Pakistan’s informal gig economy that coordinates matching, wage fairness, safety, financial protection, and skill development.",
    tools: ["Next.js", "Gemini", "Firebase", "TypeScript", "PWA", "i18n"],
    repositoryUrl: "https://github.com/AHMEDALIGHORI/-RozgarSync-AI-Orchestrator",
    status: "Source available · concept architecture",
    caseStudy: {
      statement: "A bilingual service-platform concept that makes complex AI decisions traceable, culturally aware, and legible to workers.",
      problem:
        "The concept explores how an AI orchestration layer could support informal gig workers through fairer matching, wage analysis, safety guidance, social-security awareness, and upskilling pathways.",
      approach:
        "Five specialized agents share an event bus and a six-phase lifecycle, while confidence scoring, circuit breakers, and hashed traces make decisions inspectable within a responsive bilingual product experience.",
      system: [
        "Opportunity matching with skill, proximity, availability, rating, and fairness dimensions",
        "Wage-assessment and counter-offer logic informed by stated market-rate and cost variables",
        "Safety risk classification and emergency-protocol concepts",
        "Financial-protection concept with escrow logic, idempotency, and audit trails",
        "Bilingual English and Urdu interface support with RTL consideration",
        "PWA-first UX with Next.js, Firebase, maps, analytics, and mobile workflow focus",
      ],
      evidence: [
        "Five-agent architecture with EventBus, CircuitBreaker, ConfidenceEngine, and AuditLogger",
        "Next.js App Router, TypeScript, Firebase, Framer Motion, next-intl, and Recharts",
        "Documented API routes for orchestration, negotiation, market rates, safety checks, and recommendations",
        "MIT-licensed public source repository with architecture and product documentation",
      ],
      provenance:
        "RozgarSync is presented as a product and systems-design concept. Its stated wage, emergency, social-security, and verification flows are architecture explorations—not evidence of an operating marketplace, government integration, or real financial service.",
    },
  },
];

export const labProjects = [
  {
    name: "Capitolium",
    role: "Motion study / reference adaptation",
    note: "A cinematic food experience with an authored loader, smooth scrolling, menu/cart interactions, and a disclosed CRAV reference origin.",
    stack: "Next.js · GSAP · Lenis",
    href: "https://github.com/AHMEDALIGHORI/capitolium-burgers",
  },
  {
    name: "VisionAI Pro",
    role: "Computer-vision lab",
    note: "A modular Python experiment for product recognition, gestures, and ASL-style sign experiments, with explicit prototype limitations.",
    stack: "Python · OpenCV · YOLOv8 · MediaPipe",
    href: "https://github.com/AHMEDALIGHORI/VisionAi-",
  },
  {
    name: "Medical Assistant Bot",
    role: "Academic NLP project",
    note: "A retrieval-grounded, general medical-information prototype with intent routing, citations, and emergency escalation messaging.",
    stack: "Python · DistilBERT · ChromaDB · Ollama",
    href: "https://github.com/AHMEDALIGHORI/Medical-Assistant-Bot",
  },
];

export function findProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}
