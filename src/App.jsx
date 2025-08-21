import React, { useEffect, useMemo, useState } from "react"

// ====== Simple Hash Router ======
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace(/^#\/?/, "") || "home")
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.replace(/^#\/?/, "") || "home")
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])
  const navigate = (to) => {
    window.location.hash = to.startsWith("#") ? to : `#/${to}`
  }
  return { route: hash, navigate }
}

// ====== Sample Data ======
const LINKEDIN_URL = "https://www.linkedin.com/in/your-profile" // <-- replace with your profile

const PROJECTS = [
  {
    slug: "tax-savings-simulator",
    title: "Tax Savings Simulator",
    summary: "An interactive tool helping SMBs estimate quarterly tax impacts and cash flow.",
    tags: ["FinTech", "Data Viz", "SMB"],
    heroAlt: "Tax savings simulator dashboard",
    thumbnail: placeholderThumb("TSS"),
    hero: placeholderHero("Tax Savings Simulator"),
    problem:
      "SMBs struggle to forecast tax obligations across jurisdictions, which leads to surprise liabilities and suboptimal cash planning.",
    role: "Product Developer — discovery, requirements, UX wireframes, partner API selection, KPI design.",
    process: [
      "Conducted 12 stakeholder interviews to define scenarios.",
      "Mapped data sources; integrated with payroll & sales-tax APIs.",
      "Prototyped in Figma → validated with 7 users; iterated on charts.",
      "Shipped MVP in 8 weeks with instrumentation (Mixpanel/GA4).",
    ],
    outcome: [
      "Reduced quarter-end variance by 28% in pilot cohort.",
      "+18% user retention at 90 days; NPS +22 vs. control.",
      "Time-to-estimate cut from ~40 min spreadsheet to <5 min.",
    ],
    images: [placeholderWide("Scenario Setup"), placeholderWide("Cash Impact Chart")],
  },
]

// ====== UI helpers ======
function Container({ children, className = "" }) {
  return <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>
}

function Chip({ children }) {
  return (
    <span className="inline-block rounded-full border px-2 py-1 text-xs leading-none">{children}</span>
  )
}

function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="mb-6">
      {kicker && <div className="text-xs uppercase tracking-wider text-gray-500">{kicker}</div>}
      <h2 className="text-2xl sm:text-3xl font-semibold mt-1">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  )
}

// ====== Pages ======
function HomePage({ navigate }) {
  const top = PROJECTS.slice(0, 3)
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
                I design and ship finance-forward products that turn complexity into confident
                decisions.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => navigate("work")}
                  className="rounded-xl border px-4 py-2"
                >
                  View my work
                </button>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border px-4 py-2"
                >
                  Contact on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

function WorkPage({ navigate }) {
  return (
    <Container className="py-10">
      <SectionTitle kicker="Portfolio" title="Work" subtitle="Curated projects." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <article
            key={p.slug}
            className="rounded-xl border bg-white overflow-hidden hover:shadow-sm transition"
          >
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
                <button
                  onClick={() => navigate(`case/${p.slug}`)}
                  className="text-sky-700 text-sm"
                >
                  View case →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  )
}

function CasePage({ slug, navigate }) {
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) {
    return (
      <Container className="py-10">
        <p>Project not found.</p>
        <button className="mt-4 rounded-lg border px-3 py-2" onClick={() => navigate("work")}>
          Back to work
        </button>
      </Container>
    )
  }
  return (
    <>
      <div className="border-b bg-white">
        <Container className="py-8">
          <button onClick={() => navigate("work")} className="text-sm text-gray-600">
            ← Back to work
          </button>
          <h1 className="text-3xl sm:text-4xl font-semibold mt-2">{project.title}</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">{project.summary}</p>
        </Container>
      </div>
    </>
  )
}

function AboutPage() {
  return (
    <Container className="py-10">
      <SectionTitle kicker="About" title="Hi, I’m [Your Name]" subtitle="Product Developer" />
      <p className="text-gray-700">
        I build finance-forward products that simplify compliance, forecasting, and decision-making.
      </p>
    </Container>
  )
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
        Connect on LinkedIn
      </a>
    </Container>
