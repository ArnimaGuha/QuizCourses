export type Gamification = {
  xp: number;
  level: number;
  streak: number;
  lastCompleted: string | null;
  badges: string[];
};

const XP_PER_QUIZ = 100;

export function getGamification(): Gamification {
  const saved = localStorage.getItem("gamification");
  return saved
    ? JSON.parse(saved)
    : { xp: 0, level: 1, streak: 0, lastCompleted: null, badges: [] };
}

export function saveGamification(g: Gamification) {
  localStorage.setItem("gamification", JSON.stringify(g));
}

export function updateAfterQuiz(score: number, total: number): Gamification {
  const g = getGamification();
  const today = new Date().toDateString();

  g.xp += Math.round((score / total) * XP_PER_QUIZ);
  g.level = Math.floor(g.xp / 300) + 1;

  if (g.lastCompleted !== today) {
    g.streak += 1;
    g.lastCompleted = today;
  }

  if (g.streak === 5 && !g.badges.includes("🔥 5-Day Streak")) {
    g.badges.push("🔥 5-Day Streak");
  }

  saveGamification(g);
  return g;
}
