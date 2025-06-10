import { useState } from "react";
import { useWordsContext } from "../context/WordsContext";
import { useParams } from "react-router-dom";
import { TypeUserProgress } from "../Types";
import { useUserDataContext } from "../context/UserDataContext";
import getRandomTask from "../utils/utils";

const useLesson = () => {
  const [currentTask, setCurrentTask] = useState(getRandomTask);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  // const [lessonResluts, setLessonResults] = useState<TypeLessonResult[]>([]);
  const [lessonComplete, setLessonComplete] = useState(false);

  const { words } = useWordsContext();
  const { category } = useParams();
  //  NEW: import it to derive lesson result
  const { userProgress, setUserProgress } = useUserDataContext();
  const lessonWords = words.filter((w) => w.category === category);
  const currentWord = lessonWords[index];

  const checkTheWord = () => {
    if (!userProgress || !currentWord) return;

    const exists = userProgress.wordsProgress.some(
      (item) => item.word === currentWord.word
    );

    if (!exists) {
      setUserProgress((prev: TypeUserProgress | null) => {
        if (!prev) return null;
        return {
          ...prev,
          wordsProgress: [
            ...prev.wordsProgress,
            {
              word: currentWord.word,
              box: 1,
              category: currentWord.category,
            },
          ],
        };
      });
    }
  };

  //  REVIEW:
  const updateBoxOnAnswer = (result: string) => {
    setUserProgress((prev: TypeUserProgress | null) => {
      if (!prev || !currentWord) return prev;

      const wordIndex = prev.wordsProgress.findIndex(
        (item) => item.word === currentWord.word
      );

      // only updates if the word is already in progress
      if (wordIndex === -1) return prev;

      const updatedWordsProgress = prev.wordsProgress.map((item, idx) => {
        if (idx !== wordIndex) return item;
        let newBox = 0;
        if (result === "correct") newBox = item.box < 5 ? item.box + 1 : 5;
        else newBox = 1 < item.box ? item.box - 1 : 1;
        return { ...item, box: newBox };
      });

      return {
        ...prev,
        wordsProgress: updatedWordsProgress,
      };
    });
  };

  function handleAnswerSubmit(result: "correct" | "incorrect") {
    if (result === "correct") {
      setFeedback("Well Done!");
      setCorrectCount((prev) => prev + 1);
      updateBoxOnAnswer(result);
      // setLessonResults((prev) => (prev[index].result = true));
      checkTheWord();
    } else {
      setFeedback("Try again!");
      updateBoxOnAnswer(result);
      checkTheWord();
    }
  }

  function handleNextTask() {
    // console.log(lessonWords); // goes through ok
    // console.log(index); // stops at 12 cause start at 0

    if (index < lessonWords.length - 1) {
      //  NEW:

      // setLessonResults((prev: TypeLessonResult[]) => {
      //   const updatedResult = [...prev];
      //   updatedResult[index] = { ...updatedResult[index], result: true };
      //   return updatedResult;
      // });
      setIndex((prev) => prev + 1);
      setCurrentTask(getRandomTask());
      setFeedback(null);
    } else {
      setLessonComplete(true);
      setIndex((prev) => prev + 1);
    }
  }

  // WORKS:
  function handleRestart() {
    setIndex(0);
    setCorrectCount(0);
    setLessonComplete(false);
    setCurrentTask(getRandomTask());
    setFeedback(null);
    // setLessonResults([]);
  }
  return {
    handleAnswerSubmit,
    handleNextTask,
    handleRestart,
    index,
    currentTask,
    currentWord,
    lessonWords,
    category,
    // lessonResluts,
    lessonComplete,
    correctCount,
    feedback,
  };
};

export default useLesson;
