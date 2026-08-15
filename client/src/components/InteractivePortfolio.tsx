/** Signal / Field style: progressive, tactile interactions that reveal work without obscuring the portfolio archive. */
import { CSSProperties, FormEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, ChevronDown, CirclePlay, Code2, Mail, X } from "lucide-react";

const themes = [
  { name: "Ash", value: "#d8d6cf", ink: "#262725" },
  { name: "Signal", value: "#ff4d2e", ink: "#1c1d1b" },
  { name: "Moss", value: "#9eaf8e", ink: "#1c1d1b" },
];

const processStages = [
  { code: "01", title: "Frame", copy: "Clarify the real user task, the material available, and the single feeling worth preserving." },
  { code: "02", title: "Prototype", copy: "Translate the working idea into an interface system with explicit decisions, not decorative surface." },
  { code: "03", title: "Instrument", copy: "Add interaction, states, performance checks, and meaningful fallback behavior before the visual polish." },
  { code: "04", title: "Refine", copy: "Reduce noise until motion, type, and visual evidence all explain the same point of view." },
];

const experimentNotes = [
  { id: "A-01", title: "Spatial product lab", meta: "CSS / 3D / interaction", copy: "A compact set of material, depth, and pointer experiments for turning product configuration into a tangible interface." },
  { id: "B-07", title: "Motion timing studies", meta: "GSAP / Framer / easing", copy: "Micro-timing tests that compare direct response, anticipation, and perceived weight across familiar user actions." },
  { id: "C-12", title: "Responsible AI states", meta: "RAG / safeguards / UX", copy: "Interaction patterns for uncertainty, escalation, consent, and clear system boundaries in AI-assisted products." },
];

function getMotionPreference() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CodeMotionReel() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" className="reel-trigger" onClick={() => setOpen(true)}><CirclePlay size={17} /> Watch motion reel <ArrowUpRight size={16} /></button>
      {open && <div className="reel-dialog-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
        <section className="reel-dialog" role="dialog" aria-modal="true" aria-labelledby="reel-title" onMouseDown={(event) => event.stopPropagation()}>
          <header><div><p className="eyebrow">Motion reel / code study</p><h2 id="reel-title">A point of view, <em>in motion.</em></h2></div><button type="button" aria-label="Close motion reel" onClick={() => setOpen(false)}><X size={20} /></button></header>
          <div className={`reel-stage ${playing && !getMotionPreference() ? "is-playing" : "is-paused"}`}>
            <div className="reel-grid" /><div className="reel-line reel-line-one" /><div className="reel-line reel-line-two" /><div className="reel-cube"><span /><span /><span /></div><div className="reel-sphere" /><div className="reel-code">FIELD / 04 · 00:08</div><div className="reel-caption">interface rhythm / material response / signal</div>
          </div>
          <footer><button type="button" onClick={() => setPlaying((value) => !value)}>{playing ? "Pause study" : "Play study"}</button><p>This is a lightweight, code-based reel. An optional AI-generated version can be added later.</p></footer>
        </section>
      </div>}
    </>
  );
}

export function KeyboardConfigurator() {
  const [theme, setTheme] = useState(themes[0]);
  const [switchType, setSwitchType] = useState("Linear");
  const keys = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);
  return <section className="configurator" aria-labelledby="configurator-title">
    <div className="configurator-copy"><p className="eyebrow">Interactive study / 01</p><h2 id="configurator-title">Tune the <em>instrument.</em></h2><p>Try a lightweight configuration study inspired by the Nimbus keyboard system. It demonstrates product state, responsive material changes, and purposeful motion without loading a heavy 3D scene.</p><div className="configurator-controls"><fieldset><legend>Keycap field</legend><div>{themes.map((item) => <button type="button" key={item.name} className={theme.name === item.name ? "is-selected" : ""} onClick={() => setTheme(item)}><i style={{ background: item.value }} />{item.name}</button>)}</div></fieldset><fieldset><legend>Switch profile</legend><div>{["Linear", "Tactile", "Clicky"].map((item) => <button type="button" key={item} className={switchType === item ? "is-selected" : ""} onClick={() => setSwitchType(item)}>{item}</button>)}</div></fieldset></div></div>
    <div className="keyboard-stage" style={{ "--keycap": theme.value, "--key-ink": theme.ink } as CSSProperties}><span className="keyboard-coordinate">NMB / 75</span><div className="keyboard-model"><div className="keyboard-keys">{keys.map((key) => <i key={key} className={key === 12 ? "key-wide" : ""} />)}</div><span className="keyboard-knob" /></div><div className="keyboard-readout"><span>{theme.name} keycaps</span><span>{switchType} switches</span></div></div>
  </section>;
}

export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  return <section className="process-section" aria-labelledby="process-title"><div className="process-heading"><p className="eyebrow">Process / field record</p><h2 id="process-title">What happens before a screen <em>feels inevitable.</em></h2></div><div className="process-layout"><div className="process-stage-visual" aria-live="polite"><span>{processStages[active].code}</span><strong>{processStages[active].title}</strong><p>{processStages[active].copy}</p><div className={`process-geometry geometry-${active}`} /></div><div className="process-list">{processStages.map((stage, index) => <button type="button" className={active === index ? "is-active" : ""} key={stage.code} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>{stage.code}</span><strong>{stage.title}</strong><ChevronDown size={17} /></button>)}</div></div></section>;
}

export function CapabilityConstellation() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const onMove = (event: MouseEvent<HTMLDivElement>) => { if (getMotionPreference()) return; const box = event.currentTarget.getBoundingClientRect(); setOffset({ x: (event.clientX - box.left - box.width / 2) / box.width, y: (event.clientY - box.top - box.height / 2) / box.height }); };
  return <section className="constellation-section" aria-labelledby="constellation-title"><div className="constellation-copy"><p className="eyebrow">Capability constellation</p><h2 id="constellation-title">Technical range with a clear <em>center.</em></h2><p>Move across the field to reveal the relationships between visual craft, frontend systems, and responsible experimentation.</p><div className="constellation-ledger"><span>React / TypeScript</span><span>WebGL / Three.js</span><span>Motion systems</span><span>AI product UX</span></div></div><div className="constellation-field" onMouseMove={onMove} onMouseLeave={() => setOffset({ x: 0, y: 0 })} style={{ "--constellation-x": `${offset.x * 14}px`, "--constellation-y": `${offset.y * 14}px` } as CSSProperties}><i className="constellation-axis axis-a" /><i className="constellation-axis axis-b" />{["React", "WebGL", "Motion", "AI", "RAG"].map((node, index) => <button type="button" className={`constellation-node node-${index}`} key={node} aria-label={node}><span>{node}</span></button>)}</div></section>;
}

export function ExperimentsArchive() {
  return <section className="experiments-section" aria-labelledby="experiments-title"><div className="experiments-heading"><p className="eyebrow">Expandable archive</p><h2 id="experiments-title">Small studies, <em>serious questions.</em></h2></div><div className="experiments-list">{experimentNotes.map((note) => <details key={note.id}><summary><span>{note.id}</span><strong>{note.title}</strong><em>{note.meta}</em><ChevronDown size={18} /></summary><div><p>{note.copy}</p><a href="https://github.com/AHMEDALIGHORI" target="_blank" rel="noreferrer">Explore source archive <ArrowUpRight size={15} /></a></div></details>)}</div></section>;
}

export function AvailabilityPlanner() {
  const [open, setOpen] = useState(false); const [start, setStart] = useState("2–4 weeks"); const [scope, setScope] = useState("Interactive frontend build");
  const href = `mailto:ahmedalighori92@gmail.com?subject=${encodeURIComponent("Portfolio inquiry — " + scope)}&body=${encodeURIComponent(`Hello Ahmed,%0A%0AI would like to discuss a ${scope.toLowerCase()}.%0A%0AIdeal start: ${start}.%0A%0AProject context:%0A`)}`;
  return <><button type="button" className="planner-trigger" onClick={() => setOpen(true)}><CalendarDays size={17} /> Check availability <ArrowUpRight size={16} /></button>{open && <div className="planner-backdrop" role="presentation" onMouseDown={() => setOpen(false)}><section className="planner-modal" role="dialog" aria-modal="true" aria-labelledby="planner-title" onMouseDown={(event) => event.stopPropagation()}><button className="planner-close" type="button" onClick={() => setOpen(false)} aria-label="Close availability planner"><X size={18} /></button><p className="eyebrow">Availability planner</p><h2 id="planner-title">Set the right <em>starting point.</em></h2><label>Ideal project start<select value={start} onChange={(event) => setStart(event.target.value)}><option>2–4 weeks</option><option>4–6 weeks</option><option>6+ weeks</option></select></label><label>What are you making?<select value={scope} onChange={(event) => setScope(event.target.value)}><option>Interactive frontend build</option><option>Motion-led product site</option><option>Prototype or experiment</option><option>Creative collaboration</option></select></label><a className="planner-submit" href={href}><Mail size={17} /> Draft inquiry <ArrowUpRight size={17} /></a><p className="planner-note">This opens your email client with the selected project context. It does not create a calendar booking.</p></section></div>}</>;
}

export function InquiryStudio() {
  const [open, setOpen] = useState(false); const [sent, setSent] = useState(false); const [name, setName] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <><button type="button" className="inquiry-trigger" onClick={() => { setOpen(true); setSent(false); }}><Mail size={18} /> Open inquiry field <ArrowUpRight size={16} /></button>{open && <div className="planner-backdrop" role="presentation" onMouseDown={() => setOpen(false)}><section className="inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" onMouseDown={(event) => event.stopPropagation()}>{!sent ? <><button className="planner-close" type="button" onClick={() => setOpen(false)} aria-label="Close inquiry form"><X size={18} /></button><p className="eyebrow">Inquiry field</p><h2 id="inquiry-title">Start with the <em>useful detail.</em></h2><form onSubmit={submit}><label>Name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label><label>Project note<textarea required placeholder="What should the work make clearer, easier, or more memorable?" /></label><button type="submit">Send signal <ArrowUpRight size={17} /></button></form><p>After confirmation, email remains the direct hand-off for the full conversation.</p></> : <div className="inquiry-success"><div className="success-path"><i /><i /><i /><b><Check size={24} /></b></div><p className="eyebrow">Signal received</p><h2>Thanks{name ? `, ${name}` : ""}. The field is <em>open.</em></h2><p>Use the email link below to send the full context and continue the conversation.</p><a href="mailto:ahmedalighori92@gmail.com">Email Ahmed <ArrowUpRight size={17} /></a><button type="button" onClick={() => setOpen(false)}>Close</button></div>}</section></div>}</>;
}

export function CursorSignal() {
  const [cursor, setCursor] = useState({ x: -100, y: -100, label: "" });
  useEffect(() => { const move = (event: PointerEvent) => { const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor-label]") : null; setCursor({ x: event.clientX, y: event.clientY, label: target?.dataset.cursorLabel ?? "" }); }; window.addEventListener("pointermove", move, { passive: true }); return () => window.removeEventListener("pointermove", move); }, []);
  return <div className={`cursor-signal ${cursor.label ? "is-visible" : ""}`} aria-hidden="true" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}><span>{cursor.label}</span></div>;
}
