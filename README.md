📚 Quiz Course Platform

A full-stack quiz and learning platform built with React + TypeScript (frontend) and Node.js + Express + TypeScript (backend).
Users can browse courses, take quizzes per lesson, track progress, and view completion status across courses.

✨ Features
Frontend

Course → Lesson → Quiz navigation

One question at a time with immediate feedback

Progress bar per quiz

Progress bar per course (lessons completed)

localStorage persistence per lesson

Keyboard accessible UI

Responsive design (mobile + desktop)

Backend

REST API for courses and progress

API key based auth middleware

In-memory data store (easy to extend to file/db)

Tracks completed lessons and quiz scores

🧩 Tech Stack
Layer	Tech
Frontend	React, TypeScript, Vite
Backend	Node.js, Express, TypeScript
Styling	CSS
State	React hooks
Storage	localStorage + in-memory backend
Version Control	Git + GitHub
🚀 Getting Started
Prerequisites

Node.js >= 18

npm or yarn

Git

1️⃣ Clone the repository
git clone https://github.com/<your-username>/quiz-course-app.git
cd quiz-course-app

2️⃣ Setup Backend
cd backend
npm install
npm run dev


Backend runs on:
http://localhost:4000

Create .env in backend:

PORT=4000
API_KEY=test123

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev


Frontend runs on:
http://localhost:5173

🔐 API Authentication

All API requests require:

x-api-key: test123

🛠 API Endpoints
Method	Endpoint	Description
POST	/courses	Create course
GET	/courses	List courses
GET	/courses/:id	Get course
POST	/courses/:id/progress	Save progress
GET	/courses/:id/progress/:userId	Get user progress
🧪 Sample Course JSON
{
  "title": "React Basics",
  "lessons": [
    {
      "id": "lesson-1",
      "title": "Intro to React",
      "quiz": []
    }
  ]
}

📸 Demo Flow

Select a course

Select a lesson

Take the quiz

View results

Progress updates automatically

📈 Future Improvements

Persistent database storage

User authentication

Admin UI for course creation

Charts for learning analytics

Gamification (badges, streaks)
