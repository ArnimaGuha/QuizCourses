import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const facts = [
  {
    title: "Active Recall",
    short: "Testing yourself improves retention.",
    long: "Active recall forces your brain to retrieve information, strengthening neural pathways and improving long-term memory."
  },
  {
    title: "Spaced Repetition",
    short: "Spacing learning beats cramming.",
    long: "Spacing out study sessions over time leverages the forgetting curve and improves durable learning."
  }
];

export default function FactsCard() {
  const fact = facts[new Date().getDay() % facts.length];
  const [open, setOpen] = useState(false);

  return (
    <div className="course-card" style={{ height: "fit-content" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Lightbulb size={18} />
        <strong>{fact.title}</strong>
      </div>

      <p style={{ marginTop: 8, opacity: 0.8 }}>{fact.short}</p>

      <button
        onClick={() => setOpen(o => !o)}
        style={{ marginTop: 8, background: "none", border: "none", color: "#6366f1", cursor: "pointer" }}
      >
        {open ? <>Hide <ChevronUp size={14} /></> : <>Know more <ChevronDown size={14} /></>}
      </button>

      {open && (
        <p style={{ marginTop: 8, fontSize: 14, opacity: 0.75 }}>
          {fact.long}
        </p>
      )}
    </div>
  );
}
