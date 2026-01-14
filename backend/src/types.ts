export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

export type Lesson = {
  id: string;
  title: string;
  quiz: QuizQuestion[];
};

export type Course = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type UserProgress = {
  userId: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
};
