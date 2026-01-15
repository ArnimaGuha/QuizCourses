import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import CourseProgress from "./components/CourseProgress";
import DashboardHeader from "./components/Dashboardheader";
import FactsCard from "./components/FactsCard";
import { mixedQuiz } from "./data/mixedQuiz";
import { Gift, BookOpen, Layers } from "lucide-react";


type Lesson = {
  id: string;
  title: string;
  quiz: any[];
};

type Course = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/courses", {
      headers: { "x-api-key": "test123" }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCourses(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-container">
      <DashboardHeader />
      <FactsCard />

        <div className="course-card" onClick={() => {
          setSelectedCourse({ id: "bonus", title: "Bonus Quiz", lessons: [{ id: "bonus", title: "Mixed", quiz: mixedQuiz }] });
          }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong><Gift size={16} /> Bonus Mixed Quiz</strong>
            <span>+50 XP</span>
          </div>
        </div>


      <h2>Courses</h2>

      {loading && (
        <>
          <div className="course-card">Loading course...</div>
          <div className="course-card">Loading course...</div>
        </>
      )}

      {!loading && courses.length === 0 && (
        <div className="course-card" style={{ textAlign: "center" }}>
          <h3>No courses yet</h3>
          <p style={{ opacity: 0.7 }}>
            Add a course from the backend to get started.
          </p>
        </div>
      )}

      {!selectedCourse && !loading && courses.map(course => (
        <div
          key={course.id}
          className="course-card"
          onClick={() => setSelectedCourse(course)}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong><BookOpen size={16} /> {course.title}</strong>
            <span>{course.lessons.length} lessons</span>
          </div>
          <CourseProgress courseId={course.id} totalLessons={course.lessons.length} />
        </div>
      ))}

      {selectedCourse && !selectedLesson && (
        <>
          <h3>📘 {selectedCourse.title}</h3>
          {selectedCourse.lessons.map(lesson => (
            <div
              key={lesson.id}
              className="course-card"
              onClick={() => setSelectedLesson(lesson)}
            >
              <Layers size={16} /> {lesson.title}
            </div>
          ))}
          <button onClick={() => setSelectedCourse(null)}>← Back to courses</button>
        </>
      )}

      {selectedCourse && selectedLesson && (
        <>
          <h3>📘 {selectedCourse.title} — 🧩 {selectedLesson.title}</h3>
          <Quiz
            courseId={selectedCourse.id}
            lessonId={selectedLesson.id}
          />
          <button onClick={() => setSelectedLesson(null)}>← Back to lessons</button>
        </>
      )}
    </div>
  );
}
