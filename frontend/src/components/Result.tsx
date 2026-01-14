import { useEffect } from "react";
import type { Question } from "../data/questions";

type ResultProps = {
  questions: Question[];
  answers: Record<number, number>;
  courseId: string;
  lessonId: string;
};

export default function Result({ questions, answers, courseId, lessonId }: ResultProps) {
  const score = questions.reduce((sum, q) => {
    return sum + (answers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

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
  }, [courseId, lessonId, score]);

  function restart() {
    localStorage.removeItem("quiz-state");
    window.location.reload();
  }

  return (
    <div className="result">
      <h2>Quiz Completed 🎉</h2>
      <p>
        You scored <strong>{score}</strong> out of{" "}
        <strong>{questions.length}</strong>
      </p>
      <button onClick={restart}>Restart Quiz</button>
    </div>
  );
}
