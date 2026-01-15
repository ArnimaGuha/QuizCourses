import { useEffect, useState } from "react";
import type { Question } from "../data/questions";
import { updateAfterQuiz } from "../utils/gamification";

type Props = {
  questions: Question[];
  answers: Record<number, number>;
  courseId: string;
  lessonId: string;
};

export default function Result({ questions, answers, courseId, lessonId }: Props) {
  const score = questions.reduce(
    (s, q) => s + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );

  const [gamification, setGamification] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/courses/203fc05b-d8b5-43a1-bea3-583e194bdff0/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": "test123" },
      body: JSON.stringify({ userId: "demo-user", lessonId, score })
    });

    const g = updateAfterQuiz(score, questions.length);
    setGamification(g);
  }, [score]);

  return (
    <div className="result">
      <h2>🎉 Quiz Completed!</h2>
      <p>Score: {score} / {questions.length}</p>

      {gamification && (
        <>
          <p>⭐ XP: {gamification.xp}</p>
          <p>🏆 Level: {gamification.level}</p>
          <p>🔥 Streak: {gamification.streak} days</p>

          {gamification.badges.length > 0 && (
            <div>
              <h4>Badges</h4>
              {gamification.badges.map((b: string) => (
                <span key={b} style={{ marginRight: 8 }}>{b}</span>
              ))}
            </div>
          )}
        </>
      )}

      <button onClick={() => window.location.reload()}>Back to Courses</button>
    </div>
  );
}
