import React, { useEffect, useMemo, useState } from "react";

// ====== Simple Hash Router ======
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace(/^#\/?/, "") || "home");
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.replace(/^#\/?/, "") || "home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const navigate = (to) => {
    window.location.hash = to.startsWith("#") ? to : `#/${to}`;
  };
  return { route: hash, navigate };
}

// ====== Sample Data ======
const LINKEDIN_URL = "https://www.linkedin.com/in/https://www.linkedin.com/in/jessica-castro-aguilera/"; // <-- replace

const PROJECTS = [
  {
    slug: "tax-savings-simulator",
    title: "Tax Savings Simulator",
    summary: "An interactive tool helping SMBs estimate quarterly tax impacts and cash flow.",
    tags: ["FinTech", "Data Viz", "SMB"],
    heroAlt: "Tax savings simulator dashboard",
    thumbnail: placeholderThumb("TSS"),
    hero: placeholderHero("Tax Savings Simulator"),
    problem: "SMBs struggle to forecast tax obligations across jurisdictions, which leads to surprise liabilities and suboptimal cash planning.",
    role: "Product Developer (IC) — discovery, requirements, UX wireframes, partner API selection, KPI design.",
    process: [
      "Conducted 12 stakeholder interviews (finance leads & accountants) to define scenarios.",
      "Mapped data sources; integrated with payroll & sales-tax APIs.",
      "Prototyped in Figma → validated with 7 target users; iterated on chart semantics.",
      "Shipped MVP in 8 weeks with cohort-based rollout and instrumentation (Mixpanel/GA4).",
    ],
    outcome: [
      "Reduced quarter-end variance by 28% (median) in pilot cohort.",
      "+18% user retention at 90 days; NPS +22 vs. control.",
      "Time-to-estimate cut from ~40 min spreadsheet process to <5 min.",
    ],
    images: [placeholderWide("Scenario Setup"), placeholderWide("Cash Impact Chart")],
  },
  {
    slug: "multi-jurisdiction-compliance",
    title: "Multi‑Jurisdiction Compliance Tracker",
    summary: "Consolidates filing calendars, thresholds, and alerts for fast-growing retailers.",
    tags: ["Compliance", "Automation", "Retail"],
    heroAlt: "Compliance tracker calendar view",
    thumbnail: placeholderThumb("MCT"),
    hero: placeholderHero("Compliance Tracker"),
    problem: "Rapidly expanding retailers miss registrations and filings when thresholds are crossed, risking penalties.",
    role: "Product Developer — rules engine design, event model, alerting strategy, beta program.",
    process: [
      "Audited 50+ state rules; defined normalized threshold schema.",
      "Designed rules engine for nexus/threshold events with override UX.",
      "Ran beta with 6 enterprise retailers; refined alert relevance (precision ↑).",
    ],
    outcome: [
      "Missed-deadline incidents down 63% in 6 months.",
      "Estimated $1.2M annual penalty avoidance across cohort.",
    ],
    images: [placeholderWide("Threshold Rule"), placeholderWide("Alerts Inbox")],
  },
  {
    slug: "fx-exposure-dashboard",
    title: "FX Exposure & Hedging Dashboard",
    summary: "Real-time exposure by currency with policy guardrails and scenario testing.",
    tags: ["Treasury", "Analytics", "Risk"],
    heroAlt: "FX exposure dashboard",
    thumbnail: placeholderThumb("FXD"),
    hero: placeholderHero("FX Exposure Dashboard"),
    problem: "Global sourcing teams lacked a single view of currency exposure vs. hedging policy, creating decision delays.",
    role: "Product Developer — data model, vendor integrations, UX for risk scenarios.",
    process: [
      "Unified feeds from ERP, bank portals, and procurement systems.",
      "Built scenario tool for shock/sensitivity; aligned with treasury policy.",
      "Partnered with finance to define actionable thresholds & alerts.",
    ],
    outcome: [
      "Cycle time for hedge recommendations reduced from 2 weeks to 2 days.",
      "Improved forecast accuracy by 15 bps (rolling 3 months).",
    ],
    images: [placeholderWide("Exposure by Currency"), placeholderWide("Scenario Testing")],
  },
];

// ====== UI Atoms ======
function Container({ children, className = "" }) {
  return <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

function Chip({ children }) {
  return (
    <span className="inline-block rounded-full border px-2 py-1 text-xs leading-none">
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="mb-6">
      {kicker && <div className="text-xs uppercase tracking-wider text-gray-500">{kicker}</div>}
      <h2 className="text-2xl sm:text-3xl font-semibold mt-1">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
}

function NavLink({ to, label, navigate }) {
  const isActive = useMemo(() => {
    const route = window.location.hash.replace(/^#\/?/, "");
    return route === to || (route.startsWith("case/") && to === "work");
  }, []);
  return (
    <button
      onClick={() => navigate(to)}
      className={`px-3 py-2 rounded-lg text-sm transition hover:bg-gray-100 ${
        isActive ? "bg-gray-100 font-medium" : ""
      }`}
    >
      {label}
    </button>
  );
}

// ====== Pages ======
function HomePage({ navigate }) {
  const top = PROJECTS.slice(0, 3);
  return (
    <>
      <div className="bg-gradient-to-b from-white to-sky-50/60 border-b">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-8 sm:grid-cols-2 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">
                Product Developer for <span className="text-sky-700">Fiscal & Financial</span> Products
              </h1>
              <p className="mt-4 text-gray-600">
                I design and ship finance-forward products that turn complexity into confident decisions —
                from tax forecasting to compliance automation and treasury analytics.
              </p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => navigate("work")} className="rounded-xl border px-4 py-2">
                  View my work
                </button>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-2">
                  Contact on LinkedIn
                </a>
              </div>
            </div>
            <div className="aspect-video rounded-2xl border bg-white shadow-sm p-6">
              <HeroGraphic />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <SectionTitle kicker="Featured" title="Selected Projects" subtitle="A few recent builds and outcomes." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((p) => (
            <article key={p.slug} className="rounded-xl border bg-white overflow-hidden hover:shadow-sm transition">
              <img src={p.thumbnail} alt={p.title} className="w-full aspect-[4/3] object-cover" />
              <div className="p-4">
                <h3 className="font-medium text-lg">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                <div className="mt-4">
                  <button onClick={() => navigate(`case/${p.slug}`)} className="text-sky-700 text-sm">
                    Read case study →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}

function WorkPage({ navigate }) {
  return (
    <Container className="py-10">
      <SectionTitle kicker="Portfolio" title="Work" subtitle="Curated projects across tax, compliance, and treasury." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <article key={p.slug} className="rounded-xl border bg-white overflow-hidden hover:shadow-sm transition">
            <img src={p.thumbnail} alt={p.title} className="w-full aspect-[4/3] object-cover" />
            <div className="p-4">
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button onClick={() => navigate(`case/${p.slug}`)} className="text-sky-700 text-sm">
                  View case →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}

function CasePage({ slug, navigate }) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return (
      <Container className="py-10">
        <p>Project not found.</p>
        <button className="mt-4 rounded-lg border px-3 py-2" onClick={() => navigate("work")}>
          Back to work
        </button>
      </Container>
    );
  }
  return (
    <>
      <div className="border-b bg-white">
        <Container className="py-8">
          <button onClick={() => navigate("work")} className="text-sm text-gray-600">← Back to work</button>
          <h1 className="text-3xl sm:text-4xl font-semibold mt-2">{project.title}</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">{project.summary}</p>
        </Container>
      </div>

      <Container className="py-6">
        <img src={project.hero} alt={project.heroAlt} className="w-full rounded-2xl border" />
      </Container>

      <Container className="py-2">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <SectionTitle title="Problem" />
            <p className="text-gray-700">{project.problem}</p>

            <SectionTitle title="My Role & Process" />
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {project.process.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>

            <SectionTitle title="Outcome & Results" />
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {project.outcome.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
          <aside>
            <div className="rounded-xl border p-4">
              <div className="text-xs uppercase tracking-wider text-gray-500">Role</div>
              <div className="mt-1 font-medium">{project.role}</div>
              <div className="mt-4 text-xs uppercase tracking-wider text-gray-500">Tags</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <SectionTitle title="Gallery" subtitle="Selected visuals from the build." />
        <div className="grid gap-4 sm:grid-cols-2">
          {project.images.map((src, i) => (
            <img key={i} src={src} alt={`${project.title} visual ${i + 1}`} className="rounded-xl border w-full" />
          ))}
        </div>
      </Container>
    </>
  );
}

function AboutPage() {
  return (
    <Container className="py-10">
      <div className="grid gap-8 sm:grid-cols-[180px,1fr] items-start">
        <div className="w-40 h-40 rounded-2xl border bg-gradient-to-br from-sky-50 to-emerald-50 flex items-center justify-center text-gray-500">
          <span className="text-xs">Headshot\nPlaceholder</span>
        </div>
        <div>
          <SectionTitle kicker="About" title="Hi, I’m [Jessy Castro]" subtitle="Product Developer for fiscal/financial products" />
          <p className="text-gray-700">
            I build finance-forward products that simplify compliance, forecasting, and decision-making for complex organizations.
            My background spans sourcing finance, treasury analytics, and large-scale retail operations. I thrive turning messy data
            and rules into clear, actionable experiences.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 mt-6">
            <div>
              <h3 className="font-medium mb-2">Core Skills</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>Discovery & stakeholder interviews</li>
                <li>Systems thinking & data modeling</li>
                <li>Product requirements & roadmapping</li>
                <li>Experiment design & metrics (GA4/Mixpanel)</li>
                <li>UX wireframing & prototyping</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tools</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>Figma, FigJam</li>
                <li>SQL, Python (pandas)</li>
                <li>Looker/Power BI, Excel</li>
                <li>Jira/Linear, Notion, Confluence</li>
                <li>API integrations (payroll, ERP, bank portals)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ContactPage() {
  return (
    <Container className="py-10">
      <SectionTitle kicker="Contact" title="Let’s connect" subtitle="The fastest way to reach me is via LinkedIn." />
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border px-4 py-2"
      >
        <LinkedInIcon />
        Connect on LinkedIn
      </a>
    </Container>
  );
}

// ====== App Shell ======
function Header({ navigate }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <Container className="py-3 flex items-center justify-between">
        <button onClick={() => navigate("home")} className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold">Jessy Castro</span>
        </button>
        <nav className="flex items-center gap-1">
          <NavLink to="home" label="Home" navigate={navigate} />
          <NavLink to="work" label="Work" navigate={navigate} />
          <NavLink to="about" label="About" navigate={navigate} />
          <NavLink to="contact" label="Contact" navigate={navigate} />
        </nav>
      </Container>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-10">
      <Container className="py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {year} Jessy Castro. All rights reserved.</div>
        <div className="flex items-center gap-3">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="underline">LinkedIn</a>
          <span>•</span>
          <a href="#/home" className="underline">Home</a>
        </div>
      </Container>
    </footer>
  );
}

export default function App() {
  const { route, navigate } = useHashRoute();
  const [page, slug] = useMemo(() => {
    const parts = route.split("/");
    if (parts[0] === "case") return ["case", parts[1]];
    return [parts[0] || "home", undefined];
  }, [route]);

  useEffect(() => {
    if (!window.location.hash) navigate("home");
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header navigate={navigate} />
      <main>
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "work" && <WorkPage navigate={navigate} />}
        {page === "case" && <CasePage slug={slug} navigate={navigate} />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
}

// ====== Visuals & Helpers ======
function Logo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="4" className="fill-sky-50 stroke-sky-700" strokeWidth="1.5" />
      <path d="M6 9h12M6 13h7M6 17h4" className="stroke-sky-700" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zm7.5 0h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4 0 4.74 2.6 4.74 6v9.5h-4V15.5c0-2 0-4.6-2.8-4.6-2.8 0-3.2 2.1-3.2 4.4V24h-4V8.5z" />
    </svg>
  );
}

function HeroGraphic() {
  return (
    <div className="w-full h-full grid place-items-center">
      <svg viewBox="0 0 600 300" className="w-full h-full">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#ecfdf5" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="600" height="300" fill="url(#g)" rx="16" />
        <g>
          <rect x="40" y="40" width="220" height="140" rx="10" fill="#fff" stroke="#0ea5e9" />
          <rect x="60" y="70" width="180" height="12" rx="6" fill="#bae6fd" />
          <rect x="60" y="95" width="130" height="12" rx="6" fill="#bae6fd" />
          <rect x="60" y="120" width="160" height="12" rx="6" fill="#bae6fd" />
        </g>
        <g>
          <rect x="300" y="60" width="260" height="160" rx="10" fill="#fff" stroke="#10b981" />
          <polyline points="320,180 360,140 410,160 470,120 540,140" fill="none" stroke="#10b981" strokeWidth="3" />
          <circle cx="360" cy="140" r="4" fill="#10b981" />
          <circle cx="410" cy="160" r="4" fill="#10b981" />
          <circle cx="470" cy="120" r="4" fill="#10b981" />
          <circle cx="540" cy="140" r="4" fill="#10b981" />
        </g>
      </svg>
    </div>
  );
}

function placeholderThumb(text = "PRJ") {
  const svg = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
      <rect width='100%' height='100%' fill='white'/>
      <rect x='20' y='20' width='760' height='560' rx='24' fill='#f0f9ff' stroke='#0ea5e9'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial' font-size='80' fill='#0369a1'>${text}</text>
    </svg>`);
  return `data:image/svg+xml;utf8,${svg}`;
}

function placeholderHero(title = "Case Study") {
  const svg = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'>
      <defs>
        <linearGradient id='g' x1='0' x2='1'>
          <stop offset='0%' stop-color='#e0f2fe'/>
          <stop offset='100%' stop-color='#ecfdf5'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <rect x='40' y='60' width='1120' height='480' rx='32' fill='white' stroke='#e2e8f0'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial' font-size='48' fill='#0f172a'>${title}</text>
    </svg>`);
  return `data:image/svg+xml;utf8,${svg}`;
}

function placeholderWide(caption = "Visual") {
  const svg = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='1000' height='620'>
      <rect width='100%' height='100%' fill='white'/>
      <rect x='24' y='24' width='952' height='520' rx='24' fill='#f8fafc' stroke='#e2e8f0'/>
      <text x='50%' y='95%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial' font-size='28' fill='#475569'>${caption}</text>
    </svg>`);
  return `data:image/svg+xml;utf8,${svg}`;
}
