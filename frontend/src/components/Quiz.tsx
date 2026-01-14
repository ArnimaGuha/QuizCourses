import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import Result from "./Result";

type QuizProps = {
  courseId: string;
  lessonId: string;
};


export default function Quiz({ courseId, lessonId }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("quiz-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentIndex(parsed.currentIndex ?? 0);
      setAnswers(parsed.answers ?? {});
      setShowResult(parsed.showResult ?? false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "quiz-state",
      JSON.stringify({ currentIndex, answers, showResult })
    );
  }, [currentIndex, answers, showResult]);

  function handleAnswer(questionId: number, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function next() {
    setAnimate(true);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setShowResult(true);
      }
      setAnimate(false);
    }, 200);
  }

  function previous() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  if (showResult) {
    return (
      <Result
        questions={questions}
        answers={answers}
        courseId={courseId}
        lessonId={lessonId}
      />
    );
  }

  const current = questions[currentIndex];

  return (
    <div className={`quiz-card ${animate ? "fade" : ""}`}>
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <Question
        data={current}
        selected={answers[current.id]}
        onSelect={handleAnswer}
      />

      <div className="nav-buttons">
        <button onClick={previous} disabled={currentIndex === 0}>
          Back
        </button>

        <button onClick={next} disabled={answers[current.id] == null}>
          {currentIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
