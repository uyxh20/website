"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Circle } from "lucide-react";

const directions = [
  { id: "01", name: "Quiet authority", note: "Editorial / restrained" },
  { id: "02", name: "Operating brief", note: "Executive / evidence-led" },
  { id: "03", name: "Field notes", note: "Human / narrative" },
  { id: "04", name: "Product index", note: "Systematic / precise" },
  { id: "05", name: "Point of view", note: "Bold / opinionated" },
];

const work = [
  {
    num: "01",
    type: "AI product · Global rollout",
    title: "SKU Profitability & Complexity Agent",
    description: "A control tower that helps procurement teams find grounded opportunities, prepare evidence, and coordinate the people who own the decision.",
    result: "DKK 10m",
    resultLabel: "2026 target",
    detail: "DKK 2.5m realised in proof of concept",
  },
  {
    num: "02",
    type: "Applied AI · Global rollout",
    title: "Manufacturing Real-Time AI Assistant",
    description: "Context-aware troubleshooting inside an operator’s normal downtime workflow, backed by a governed feedback-to-fix quality loop.",
    result: "1.5%",
    resultLabel: "OEE target",
    detail: "4 FTE multidisciplinary team",
  },
  {
    num: "03",
    type: "Enterprise product · 8 markets",
    title: "Promotion Investment Planner",
    description: "Replaced fragmented spreadsheets and email with a shared scenario, benefit method, and traceable approval workflow.",
    result: "DKK 1bn",
    resultLabel: "spend managed",
    detail: "From prototype to regional product direction",
  },
];

const principles = [
  "Start with the operating decision, not the technology.",
  "Make evidence and uncertainty visible.",
  "Ship the smallest system that can change the work.",
];

export default function Page() {
  const [variant, setVariant] = useState(0);
  const direction = directions[variant];

  return (
    <main className={`site v${variant + 1}`}>
      <a className="skip" href="#work">Skip to selected work</a>
      <header className="nav shell">
        <a className="wordmark" href="#top" aria-label="Ulysse Ha, home">UH<span>.</span></a>
        <div className="nav-context"><span>Ulysse Ha</span><span>AI Product &amp; Transformation</span></div>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a><a href="#approach">Approach</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span className="availability"><Circle size={8} fill="currentColor" /> Available for the right challenge</span><span>Copenhagen · Working globally</span></div>
        <div className="hero-grid">
          <h1>{variant === 2 ? <>I study the work.<br />Then I change it.</> : variant === 4 ? <>AI should change<br />the work—not<br />decorate it.</> : <>I turn complex operations into products people can use.</>}</h1>
          <div className="intro">
            <p>AI product leader with an anthropologist’s eye for how organisations actually work. I find consequential problems, align the people around them, and lead teams from ambiguity to measurable outcomes.</p>
            <a className="text-link" href="#work">See selected work <ArrowDown size={16} /></a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Career highlights">
          <div><strong>€25m+</strong><span>Opportunity identified</span></div>
          <div><strong>Global</strong><span>Products scaled across markets</span></div>
          <div><strong>0→1</strong><span>Strategy through delivery</span></div>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="section-head"><span>01 / Selected work</span><p>Three examples of turning operational complexity into usable, governed products.</p></div>
        <div className="project-list">
          {work.map((project) => (
            <article className="project" key={project.num}>
              <div className="project-number">{project.num}</div>
              <div className="project-main"><div className="project-type">{project.type}</div><h2>{project.title}</h2><p>{project.description}</p><button type="button" aria-label={`View ${project.title} case study`}>View case study <ArrowUpRight size={16} /></button></div>
              <div className="project-result"><strong>{project.result}</strong><span>{project.resultLabel}</span><small>{project.detail}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach shell" id="approach">
        <div className="section-head"><span>02 / How I work</span><p>Product judgment grounded in research, business value, and delivery reality.</p></div>
        <div className="approach-grid">
          <h2>The useful work happens between strategy decks and shipped systems.</h2>
          <div className="principles">{principles.map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p><Check size={17} /></div>)}</div>
        </div>
      </section>

      <footer className="footer shell" id="contact">
        <span>03 / Let’s talk</span>
        <h2>Have a consequential problem worth solving?</h2>
        <a href="https://www.linkedin.com/in/ulysse-ha-5945b91ab/" target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={22} /></a>
        <div className="footer-bottom"><span>Ulysse Ha · 2026</span><span>Product leadership · Applied AI · Transformation</span></div>
      </footer>

      <aside className="direction-switcher" aria-label="Choose a design direction">
        <div className="switcher-label"><span>{direction.name}</span><strong>{direction.id} / 05</strong></div>
        <div className="switcher-options">
          {directions.map((item, index) => <button key={item.id} className={variant === index ? "active" : ""} onClick={() => setVariant(index)} aria-pressed={variant === index}><span>{item.id}</span><span><b>{item.name}</b><small>{item.note}</small></span></button>)}
        </div>
      </aside>
    </main>
  );
}
