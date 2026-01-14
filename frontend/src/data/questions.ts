export type Question = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

export const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language", "Hyper Tool Multi Language"],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "Which hook is used for state in React?",
    options: ["useFetch", "useState", "useData", "useEffect"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Which HTTP method updates data?",
    options: ["GET", "POST", "PUT", "FETCH"],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "LocalStorage is used for?",
    options: ["Temporary storage", "Persistent storage", "Session cache", "Server memory"],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "Which tag is semantic?",
    options: ["<div>", "<span>", "<section>", "<b>"],
    correctIndex: 2,
  },
];
