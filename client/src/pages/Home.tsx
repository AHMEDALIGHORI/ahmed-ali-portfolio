/** Signal / Field style: asymmetric editorial portfolio with a warm paper ground and Signal Vermilion accents. */
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  MoveDown,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { featuredProjects, labProjects } from "@/lib/projects";
import { FieldAction } from "@/components/SkiperFieldMotion";
import { AvailabilityPlanner, CapabilityConstellation, CodeMotionReel, CursorSignal, ExperimentsArchive, InquiryStudio, KeyboardConfigurator, ProcessTimeline } from "@/components/InteractivePortfolio";
import { useLocation } from "wouter";

const projects = featuredProjects.map((project, index) => ({
  ...project,
  grid: ["feature", "tall", "wide"][index],
}));

const capabilities = [
  {
    title: "Spatial interfaces",
    copy: "Three.js, WebGL, and React Three Fiber projects that make interaction feel dimensional.",
    index: "A",
  },
  {
    title: "Motion systems",
    copy: "GSAP, Framer Motion, and Lenis choreography that clarifies a product’s story.",
    index: "B",
  },
  {
    title: "AI prototypes",
    copy: "Practical experiments with Python, OpenCV, RAG, Firebase, and Gemini.",
    index: "C",
  },
];

const navItems = [
  ["Work", "#work"],
  ["Practice", "#practice"],
  ["Contact", "#contact"],
];

function Monogram({ className = "" }: { className?: string }) {
  return (
    <img
      className={`monogram ${className}`}
      src="/manus-storage/ag-monogram_bcc56c95.png"
      alt="Ahmed Ali Ghori monogram"
    />
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [routeVeil, setRouteVeil] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 22);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const openCaseStudy = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) { setLocation(href); return; }
    setRouteVeil(true);
    window.setTimeout(() => setLocation(href), 230);
  };

  return (
    <div className="site-shell">
      <div className={`route-veil ${routeVeil ? "is-active" : ""}`} aria-hidden="true"><span>Opening field study</span></div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" aria-label="Back to top">
          <Monogram />
          <span>Ahmed Ali Ghori</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>

        <a className="availability-chip" href="mailto:ahmedalighori92@gmail.com">
          <span className="pulse-dot" /> Available for select work
        </a>

        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={21} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <span className="eyebrow">Navigate</span>
          {navItems.map(([label, href], index) => (
            <a href={href} key={label} onClick={closeMenu} style={{ transitionDelay: `${60 + index * 45}ms` }}>
              <span>0{index + 1}</span>
              {label}
              <ArrowDownRight size={25} />
            </a>
          ))}
          <a className="mobile-email" href="mailto:ahmedalighori92@gmail.com" onClick={closeMenu}>
            ahmedalighori92@gmail.com
          </a>
        </div>
      </div>

      <main id="top">
        <section className="hero-section">
          <div className="hero-guide hero-guide-top" aria-hidden="true" />
          <div className="hero-metadata">
            <span>Frontend developer</span>
            <span>Hyderabad, PK</span>
            <span>Est. 2026</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow reveal-up">Independent creative developer</p>
            <h1 className="hero-title">
              <span className="reveal-up delay-1">Interfaces</span>
              <span className="hero-title-italic reveal-up delay-2">with a point</span>
              <span className="reveal-up delay-3">of view<span className="title-dot">.</span></span>
            </h1>
            <div className="hero-bottom reveal-up delay-4">
              <p>
                I build cinematic, responsive web experiences with WebGL, React,
                and purposeful motion.
              </p>
              <a className="scroll-cue" href="#work">
                <span>Selected work</span>
                <MoveDown size={19} />
              </a>
              <CodeMotionReel />
            </div>
          </div>

          <div className="hero-art" aria-label="Generative 3D composition">
            <img src="/manus-storage/signal-field-hero_fd7624de.jpg" alt="Abstract generative 3D composition" />
            <Monogram className="hero-stamp" />
            <div className="hero-art-caption">
              <span>Field study</span>
              <span>001 / 024</span>
            </div>
          </div>

          <div className="portrait-plate reveal-up delay-3">
            <div className="portrait-frame">
              <img src="/manus-storage/ahmed-ali-portrait_96003ad9.jpeg" alt="Ahmed Ali Ghori" />
            </div>
            <div className="portrait-caption">
              <span>Ahmed Ali Ghori</span>
              <span>Developer / observer</span>
            </div>
          </div>
          <div className="hero-guide hero-guide-bottom" aria-hidden="true" />
        </section>

        <section className="marquee-strip" aria-label="Core technologies">
          <div className="marquee-track">
            <span>React <i /> Three.js <i /> WebGL <i /> Next.js <i /> GSAP <i /> React Three Fiber <i /> TypeScript <i /> Python <i /> React <i /> Three.js <i /> WebGL <i /> Next.js <i /> GSAP <i /> React Three Fiber <i /> TypeScript <i /> Python <i /></span>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-rail">
            <span className="section-index">01</span>
            <span className="vertical-label">Selected work</span>
          </div>
          <div className="work-content">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2>Made to be <em>explored.</em></h2>
              </div>
              <p className="section-intro">A selection of spatial interfaces, exploratory prototypes, and motion-first product experiences.</p>
            </div>

            <div className="project-ledger">
              {projects.map((project) => (
                <article className={`project-card project-${project.grid} project-${project.slug}`} key={project.number}>
                  <FieldAction href={`/work/${project.slug}`} onClick={(event) => openCaseStudy(event, `/work/${project.slug}`)} data-cursor-label="Explore" aria-label={`Read ${project.name} case study`} className="project-image-wrap skipper-evidence-plate">
                    <img src={project.image} alt="" />
                    <span className="field-study-label">Field study / {project.number}</span>
                    <Monogram className="project-monogram" />
                    <span className="project-open"><ArrowUpRight size={22} /></span>
                    <span className="project-number">{project.number}</span>
                  </FieldAction>
                  <div className="project-info">
                    <div className="project-heading">
                      <div>
                        <span className="project-kind">{project.kind}</span>
                        <h3>{project.name}</h3>
                      </div>
                      <a className="text-link" href={`/work/${project.slug}`}>
                        Read case study <ArrowUpRight size={15} />
                      </a>
                    </div>
                    <p>{project.description}</p>
                    <div className="tag-row">
                      {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <a className="all-work-link" href="https://github.com/AHMEDALIGHORI?tab=repositories" target="_blank" rel="noreferrer">
              <span>Browse the verified source archive</span>
              <span className="circle-arrow"><ArrowUpRight size={22} /></span>
            </a>
          </div>
        </section>

        <KeyboardConfigurator />

        <section className="practice-section" id="practice">
          <div className="section-rail section-rail-dark">
            <span className="section-index">02</span>
            <span className="vertical-label">Practice</span>
          </div>
          <div className="practice-art" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="wire-arc" />
            <span className="coordinate coordinate-one">34° 02’ N</span>
            <span className="coordinate coordinate-two">FIELD / B</span>
          </div>
          <div className="practice-content">
            <p className="eyebrow">What I build</p>
            <h2>From familiar screens to <em>felt experiences.</em></h2>
            <p className="practice-lede">
              The best digital work is clear in use and memorable in motion. I bridge interface craft, realtime visuals, and practical experimentation to get there.
            </p>
            <div className="capability-list">
              {capabilities.map((item) => (
                <div className="capability" key={item.index}>
                  <span>{item.index}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                  <ArrowDownRight size={21} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProcessTimeline />
        <CapabilityConstellation />

        <section className="about-section">
          <div className="about-field-rail" aria-hidden="true">
            <span>03</span>
            <span>Field note</span>
          </div>
          <div className="about-marker"><Sparkles size={22} /></div>
          <p className="about-kicker">A short note on practice</p>
          <p className="about-statement">
            I care about the moment an interface shifts from <span>functional</span> to <span>felt.</span> That takes rigor, rhythm, and a willingness to experiment.
          </p>
          <div className="about-footer">
            <span>Open to freelance &amp; collaborative projects</span>
            <a href="#contact">Let’s connect <ArrowDownRight size={19} /></a>
          </div>
        </section>

        <section className="lab-section" id="lab">
          <div className="lab-rail"><span>04</span><span>Laboratory</span></div>
          <div className="lab-content">
            <div className="lab-heading"><div><p className="eyebrow">Beyond the featured work</p><h2>Studies, prototypes, and <em>open questions.</em></h2></div><p>Supporting work is kept separate from the selected case studies so the portfolio stays clear about scope, provenance, and experimental status.</p></div>
            <div className="lab-grid">
              {labProjects.map((project) => <a className="lab-card" href={project.href} target="_blank" rel="noreferrer" key={project.name}><span className="lab-card-top"><span>{project.role}</span><ArrowUpRight size={18} /></span><h3>{project.name}</h3><p>{project.note}</p><span className="lab-stack">{project.stack}</span></a>)}
            </div>
          </div>
        </section>

        <ExperimentsArchive />

        <section className="contact-section" id="contact">
          <div className="contact-mark" aria-hidden="true">
            <Monogram />
            <span>F / 04</span>
          </div>
          <div className="contact-topline">
            <span>04 / Contact</span>
            <span>Hyderabad, Pakistan</span>
          </div>
          <div className="contact-main">
            <div>
              <p className="eyebrow">A new field note</p>
              <h2>Bring the next idea <em>into focus.</em></h2>
            </div>
            <FieldAction className="contact-button" magnetic data-cursor-label="Email" href="mailto:ahmedalighori92@gmail.com">
              <Send size={21} />
              <span>Start a conversation</span>
              <ArrowUpRight size={21} />
            </FieldAction>
            <a className="resume-request" href="mailto:ahmedalighori92@gmail.com?subject=Resume%20request%20for%20Ahmed%20Ali%20Ghori">
              Request selected résumé <ArrowUpRight size={15} />
            </a>
            <AvailabilityPlanner />
            <InquiryStudio />
          </div>
          <div className="contact-links">
            <a href="https://github.com/AHMEDALIGHORI" target="_blank" rel="noreferrer"><Github size={19} /> GitHub</a>
            <a href="https://www.linkedin.com/in/ahmed-ali-ghori-85a24b338" target="_blank" rel="noreferrer"><Linkedin size={19} /> LinkedIn</a>
            <a href="mailto:ahmedalighori92@gmail.com"><Mail size={19} /> Email</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Monogram className="footer-monogram" />
        <span>© {new Date().getFullYear()} Ahmed Ali Ghori</span>
        <span>Built with intention</span>
        <a className="skiper-credit" href="https://skiper-ui.com/" target="_blank" rel="noreferrer">Motion link treatment: Skiper UI <ArrowUpRight size={13} /></a>
        <a href="#top">Back to top <ArrowUpRight size={15} /></a>
      </footer>
      <CursorSignal />
    </div>
  );
}
