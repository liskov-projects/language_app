// hooks
import { useState } from "react";
import { useWordsContext } from "../context/WordsContext";
import { useParams } from "react-router-dom";
// types
import { TypeUserProgress, TypeWord } from "../Types";
// utilities
import { getRandomTask, addWordToProgress, updateBox } from "../utils/utils";

const useLesson = () => {
  const [currentTask, setCurrentTask] = useState(getRandomTask);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [lessonComplete, setLessonComplete] = useState(false);

  const { category } = useParams();
  const { words } = useWordsContext();

  const lessonWords = words.filter((w) => w.category === category);
  const currentWord = lessonWords[index];

  function handleAnswerSubmit(
    userProgress: TypeUserProgress,
    currentWord: TypeWord,
    result: boolean
  ) {
    const resultMsg = result ? "correct" : "incorrect";
    if (result) {
      setFeedback("Well Done!");
      setCorrectCount((prev) => prev + 1);
      updateBox(userProgress, currentWord, resultMsg);
      addWordToProgress(userProgress, currentWord);
    } else {
      setFeedback("Try again!");
      updateBox(userProgress, currentWord, resultMsg);
      addWordToProgress(userProgress, currentWord);
    }
  }

  function handleNextTask() {
    if (index < lessonWords.length - 1) {
      setIndex((prev) => prev + 1);
      setCurrentTask(getRandomTask());
      setFeedback(null);
    } else {
      setLessonComplete(true);
      setIndex((prev) => prev + 1);
    }
  }

  //  NEW:
  const handleSaveProgress = async (
    lessonResults: TypeUserProgress,
    userId: string | null
  ) => {
    if (!userId) return;

    const response = await fetch(
      `http://localhost:8081/user_progress/${userId}`,
      {
        method: "POST",
        body: JSON.stringify(lessonResults),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) throw new Error("POST request for user Progress failed");
  };

  function handleRestart() {
    setIndex(0);
    setCorrectCount(0);
    setLessonComplete(false);
    setCurrentTask(getRandomTask());
    setFeedback(null);
  }
  return {
    handleAnswerSubmit,
    handleNextTask,
    handleSaveProgress,
    handleRestart,
    index,
    currentTask,
    currentWord,
    lessonWords,
    category,
    lessonComplete,
    correctCount,
    feedback,
  };
};

export default useLesson;
