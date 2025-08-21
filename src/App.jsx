import React, { useState } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/your-profile"; // <-- change me

// ---- sample projects (edit these later) ----
const PROJECTS = [
  {
    id: "tax-savings-simulator",
    title: "Tax Savings Simulator",
    summary: "Interactive tool helping SMBs estimate quarterly tax impacts and cash flow.",
    problem:
      "SMBs struggle to forecast tax obligations across jurisdictions, leading to surprise liabilities and poor cash planning.",
    role: "Product Developer — discovery, requirements, UX wireframes, API selection, KPI design.",
    process: [
      "12 stakeholder interviews to define scenarios.",
      "Integrated payroll & sales-tax APIs.",
      "Prototyped → validated with 7 users; iterated on charts."
    ],
    outcome: [
      "Quarter-end variance reduced by 28% (pilot).",
      "+18% 90-day retention vs. control."
    ],
  },
  {
    id: "withholding-advisor",
    title: "Withholding Advisor",
    summary: "Guided flows that recommend safer paycheck withholdings for multi-state workers.",
    problem:
      "Employees with hybrid work patterns mis-set withholdings, causing under/overpayments.",
    role: "Discovery, journey mapping, decision-tree logic, copy and compliance review.",
    process: ["Wizard flow design", "Decision trees", "A/B copy tests"],
    outcome: ["Support tickets –26%", "Refund surprises –19% YoY"],
  },
  {
    id: "audit-prep-dashboard",
    title: "Audit Prep Dashboard",
    summary: "One place to see risks, missing docs, and deadlines for audits.",
    problem:
      "Teams scramble for artifacts across tools when audits start.",
    role: "Product spec, UX, success metrics, release plan.",
    process: ["Data inventory", "Risk scoring model", "MVP shipped in 6 weeks"],
    outcome: ["Audit cycle time –22%", "Stakeholder satisfaction +24 NPS"],
  },
];

function Nav({ setView }) {
  const link = (v, label) => (
    <button
      onClick={() => setView(v)}
      style={{ border: "none", background: "transparent", padding: "8px 12px", cursor: "pointer" }}
    >
      {label}
    </button>
  );
  return (
    <header style={{ position: "sticky", top: 0, background: "#fff", borderBottom: "1px solid #e5e5e5" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
        <strong>Your Name</strong>
        <nav>
          {link("home", "Home")}
          {link("work", "Work")}
          {link("about", "About")}
          {link("contact", "Contact")}
        </nav>
      </div>
    </header>
  );
}

function Home({ setView }) {
  return (
    <section style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 16px" }}>
      <h1 style={{ fontSize: 36, textAlign: "center", marginBottom: 8 }}>
        Product Developer for Fiscal & Financial Products
      </h1>
      <p style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 24px" }}>
        I design and ship finance-forward products that turn complexity into confident decisions.
      </p>
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setView("work")} style={{ padding: "10px 16px", cursor: "pointer" }}>
          View my work
        </button>
      </div>

      <h2 style={{ marginTop: 48 }}>Featured Projects</h2>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 12 }}>
        {PROJECTS.slice(0, 3).map((p) => (
          <article key={p.id} style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: 16, background: "#fff" }}>
            <h3 style={{ margin: 0 }}>{p.title}</h3>
            <p style={{ fontSize: 14, color: "#555" }}>{p.summary}</p>
            <button onClick={() => setView(`case:${p.id}`)} style={{ cursor: "pointer" }}>
              Read case →
            </button>
         
