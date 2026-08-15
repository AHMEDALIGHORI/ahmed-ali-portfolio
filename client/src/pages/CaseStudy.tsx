/** Signal / Field style: evidence-led case studies presented as a field ledger with transparent project provenance. */
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Check, Github, Mail } from "lucide-react";
import { Link } from "wouter";
import { featuredProjects, type Project } from "@/lib/projects";
import { FieldAction } from "@/components/SkiperFieldMotion";

function CaseStudy({ project }: { project: Project }) {
  const nextProject = featuredProjects[(featuredProjects.findIndex((item) => item.slug === project.slug) + 1) % featuredProjects.length];
  const [activeSection, setActiveSection] = useState("context");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-case-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.dataset.caseSection ?? "context");
      },
      { rootMargin: "-32% 0px -42% 0px", threshold: [0.05, 0.35, 0.65] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="case-page">
      <header className="case-header">
        <Link href="/" className="case-brand">
          <img src="/manus-storage/ag-monogram_bcc56c95.png" alt="" />
          <span>Ahmed Ali Ghori</span>
        </Link>
        <span className="case-header-label">Selected case study / {project.number}</span>
        <a className="case-back" href="#case-contact">Start a project <ArrowDownRight size={16} /></a>
      </header>

      <main>
        <section className="case-hero">
          <div className="case-rail" aria-label="Case study reading progress"><span>{project.number}</span><div className="case-rail-progress" aria-hidden="true">{["context", "approach", "evidence"].map((section) => <i className={activeSection === section ? "is-active" : ""} key={section} />)}</div><span>Case study</span></div>
          <div className="case-hero-content">
            <p className="eyebrow">{project.eyebrow}</p>
            <h1>{project.name}</h1>
            <p className="case-statement">{project.caseStudy.statement}</p>
            <div className="case-actions">
              <FieldAction className="case-primary" magnetic href={project.repositoryUrl} target="_blank" rel="noreferrer"><Github size={18} /> Explore source <ArrowUpRight size={18} /></FieldAction>
              {project.liveUrl && <FieldAction className="case-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel} <ArrowUpRight size={15} /></FieldAction>}
            </div>
          </div>
          <figure className={`case-visual case-visual-${project.imageFit ?? "cover"} case-visual-${project.slug}`}>
            <span className="case-visual-code">{project.visualCode}</span>
            <img src={project.image} alt={project.imageAlt} />
            <img className="case-visual-stamp" src="/manus-storage/ag-monogram_bcc56c95.png" alt="" />
            <figcaption><span>{project.visualCaption}</span><span>{project.status}</span></figcaption>
          </figure>
        </section>

        <section className="case-context" data-case-section="context">
          <div className="case-context-label"><span>01</span><span>Context</span></div>
          <div className="case-context-grid">
            <div><p className="eyebrow">The question</p><h2>{project.caseStudy.problem}</h2></div>
            <div className="case-provenance"><p className="eyebrow">Portfolio note</p><p>{project.caseStudy.provenance}</p></div>
          </div>
        </section>

        <section className="case-approach" data-case-section="approach">
          <div className="case-approach-intro"><p className="eyebrow">Design and build approach</p><h2>Build the system behind the <em>surface.</em></h2><p>{project.caseStudy.approach}</p></div>
          <div className="case-system-list">
            {project.caseStudy.system.map((item, index) => <div className="case-system-item" key={item}><span>0{index + 1}</span><p>{item}</p><Check size={17} /></div>)}
          </div>
        </section>

        <section className="case-evidence" data-case-section="evidence">
          <div className="case-evidence-mark"><img src="/manus-storage/ag-monogram_bcc56c95.png" alt="" /></div>
          <div><p className="eyebrow">Technical evidence</p><h2>A clear record of the <em>work.</em></h2></div>
          <div className="case-evidence-list">{project.caseStudy.evidence.map((item) => <p key={item}>{item}</p>)}</div>
        </section>

        <section className="case-stack" aria-label="Project technology stack">
          <span>Core toolkit</span>
          <div>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        </section>

        <section className="case-next" id="case-contact">
          <div><p className="eyebrow">Next field study</p><Link href={`/work/${nextProject.slug}`}><span>{nextProject.name}</span><ArrowUpRight size={42} /></Link></div>
          <div className="case-contact-cta"><p>Have a product that needs a stronger point of view?</p><a href="mailto:ahmedalighori92@gmail.com"><Mail size={17} /> ahmedalighori92@gmail.com</a></div>
        </section>
      </main>

      <footer className="case-footer"><Link href="/"><ArrowLeft size={16} /> All work</Link><span>© {new Date().getFullYear()} Ahmed Ali Ghori</span><a href={project.repositoryUrl} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={15} /></a></footer>
    </div>
  );
}

export function NimbusCaseStudy() { return <CaseStudy project={featuredProjects[0]} />; }
export function SpeechTherapyCaseStudy() { return <CaseStudy project={featuredProjects[1]} />; }
export function RozgarSyncCaseStudy() { return <CaseStudy project={featuredProjects[2]} />; }
