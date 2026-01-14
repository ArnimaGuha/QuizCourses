import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { courses, progressStore } from "../data/store";
import { Course, UserProgress } from "../types";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { title, lessons } = req.body;

  if (!title || !lessons) {
    return res.status(400).json({ error: "title and lessons required" });
  }

  const course: Course = { id: uuidv4(), title, lessons };
  courses.push(course);
  res.status(201).json(course);
});

router.get("/", (req, res) => {
  res.json(courses);
});

router.get("/:id", (req: Request, res: Response) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
});

router.post("/:id/progress", (req: Request, res: Response) => {
  const { userId, lessonId, score } = req.body;

  if (!userId || !lessonId) {
    return res.status(400).json({ error: "userId and lessonId required" });
  }

  const course = courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });

  let progress = progressStore[userId];
  if (!progress) {
    progress = { userId, completedLessons: [], quizScores: {} };
    progressStore[userId] = progress;
  }

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }

  if (score !== undefined) {
    progress.quizScores[lessonId] = score;
  }

  res.json(progress);
});

router.get("/:id/progress/:userId", (req: Request, res: Response) => {
  const progress = progressStore[req.params.userId];
  if (!progress) return res.status(404).json({ error: "No progress found" });
  res.json(progress);
});

export default router;
