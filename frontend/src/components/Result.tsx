import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import type { Question } from "../data/questions";
import { updateAfterQuiz } from "../utils/gamification";

type ResultProps = {
  questions: Question[];
  answers: Record<number, number>;
  courseId: string;
  lessonId: string;
};

export default function Result({ questions, answers, courseId, lessonId }: ResultProps) {
  const score = questions.reduce(
    (sum, q) => sum + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );

  const [gamification, setGamification] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/courses/${courseId}/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "test123"
      },
      body: JSON.stringify({
        userId: "demo-user",
        lessonId,
        score
      })
    });

    const g = updateAfterQuiz(score, questions.length);
    setGamification(g);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [score, courseId, lessonId, questions.length]);

  return (
    <div className="result">
      <h2>Quiz Completed 🎉</h2>
      <p>
        You scored <strong>{score}</strong> out of{" "}
        <strong>{questions.length}</strong>
      </p>

      {gamification && (
        <>
          <p>⭐ XP: {gamification.xp}</p>
          <p>🏆 Level: {gamification.level}</p>
          <p>🔥 Streak: {gamification.streak} days</p>

          {gamification.badges?.length > 0 && (
            <div>
              <h4>Badges</h4>
              {gamification.badges.map((b: string) => (
                <span key={b} style={{ marginRight: 8 }}>{b}</span>
              ))}
            </div>
          )}
        </>
      )}

      <button onClick={() => window.location.reload()}>Back to Dashboard</button>
    </div>
  );
}
