import { useEffect, useState } from "react";

type CourseProgressProps = {
  courseId: string;
  totalLessons: number;
};

export default function CourseProgress({ courseId, totalLessons }: CourseProgressProps) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:4000/courses/203fc05b-d8b5-43a1-bea3-583e194bdff0/progress/demo-user`, {
      headers: { "x-api-key": "test123" }
    })
      .then(res => res.json())
      .then(data => {
        setCompleted(data.completedLessons?.length || 0);
      });
  }, [courseId]);

  const percent = Math.round((completed / totalLessons) * 100);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: 14, marginBottom: 4 }}>
        Course progress: {completed}/{totalLessons}
      </div>
      <div className="progress-container">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
