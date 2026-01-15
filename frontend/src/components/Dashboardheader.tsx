import { useEffect, useState } from "react";
import { Moon, Sun, Flame, Trophy } from "lucide-react";
import { getGamification } from "../utils/gamification";
import type { Gamification } from "../utils/gamification";
import { useTheme } from "../hooks/useTheme";

export default function DashboardHeader() {
  const { dark, toggle } = useTheme();
  const [g, setG] = useState<Gamification | null>(null);

  useEffect(() => {
    try {
      const data = getGamification();
      setG(data);
    } catch {
      setG({ xp: 0, level: 1, streak: 0, lastCompleted: null, badges: [] });
    }
  }, []);

  if (!g) return null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        padding: "1rem 1.25rem",
        borderRadius: 16,
        color: "white",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Trophy size={18} />
          <strong>Level {g.level}</strong>
        </div>

        <div>XP {g.xp}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Flame size={18} />
          {g.streak}-day streak
        </div>
      </div>

      <button
        onClick={toggle}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}
        aria-label="Toggle theme"
      >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
