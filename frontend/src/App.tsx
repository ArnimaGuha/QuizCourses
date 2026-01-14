import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import CourseProgress from "./components/CourseProgress";

type Lesson = {
  id: string;
  title: string;
};

type Course = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/courses", {
      headers: { "x-api-key": "test123" }
    })
      .then(res => res.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <div className="app-container">
      <h2>Your Courses</h2>

      {!selectedCourse && courses.map(course => (
        <div key={course.id} style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>{course.title}</strong>
            <button onClick={() => setSelectedCourse(course)}>Start</button>
          </div>
          <CourseProgress courseId={course.id} totalLessons={course.lessons.length} />
        </div>
      ))}

      {selectedCourse && (
        <>
          <h3>{selectedCourse.title}</h3>
          <Quiz
            courseId={selectedCourse.id}
            lessonId={selectedCourse.lessons[0].id}
          />
          <div style={{ marginTop: "1rem" }}>
            <button onClick={() => setSelectedCourse(null)}>← Back to courses</button>
          </div>
        </>
      )}
    </div>
  );
}
