import MatchPictureTask from "../LessonTasks/MatchPictureTask";
import WriteWordTask from "../LessonTasks/WriteWordTask";
import FillGapsTask from "../LessonTasks/FillGapsTask";
import LittleBlobVariation from "../Buttons/LittleBlobVariation";
import { useNavigate } from "react-router-dom";
import FeedbackMessage from "../LessonTasks/FeedbackMessage";
import LessonProgress from "../LessonTasks/LessonProgress";
import { useUserDataContext } from "../../context/UserDataContext";
import useLesson from "../../hooks/useLesson";
import { useState, useEffect } from "react";
import { TypeUserProgress } from "../../Types";
// import cloneDeep from 'lodash-es/cloneDeep';

export default function LessonPage() {
  // state helps persist pictures after the shuffle function
  const [pictureOptions, setPictureOptions] = useState<typeof lessonWords>([]);
  const { currentUser, userProgress, saveLessonProgress } =
    useUserDataContext();

  // console.log("Initial progress:", userProgress);

  const {
    handleAnswerSubmit,
    handleNextTask,
    handleRestart,
    index,
    currentTask,
    currentWord,
    lessonWords,
    category,
    lessonComplete,
    correctCount,
    feedback,
  } = useLesson();

  const navigate = useNavigate();

  // utility
  function shuffle<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  //  NEW: fixes the pictures re-shiffle on every render moved out of renderTask
  useEffect(() => {
    if (currentTask === "matchPicture" && currentWord) {
      const shuffled = shuffle(
        lessonWords.filter((word) => word.word !== currentWord.word)
      );
      setPictureOptions(shuffle([currentWord, ...shuffled.slice(0, 3)]));
    }
  }, [currentWord, currentTask]);

  const renderTask = () => {
    if (!currentWord) return null;

    if (currentTask === "matchPicture") {
      return (
        <MatchPictureTask
          correctWord={currentWord}
          options={pictureOptions}
          onAnswer={handleAnswerSubmit}
          onNext={handleNextTask}
        />
      );
    }

    if (currentTask === "writeWord") {
      return (
        <WriteWordTask
          correctWord={currentWord}
          onAnswer={handleAnswerSubmit}
          onNext={handleNextTask}
        />
      );
    }
    if (currentTask === "fillGaps") {
      return (
        <FillGapsTask
          word={currentWord}
          onAnswer={handleAnswerSubmit}
          onNext={handleNextTask}
        />
      );
    }
    return null;
  };

  // console.log("userProgress", userProgress);

  const getLessonProgress = (): TypeUserProgress | null => {
    if (!userProgress) return null;
    const copyUserProgress: TypeUserProgress = {
      userID: userProgress.userID,
      levelUp: userProgress.levelUp,
      wordsProgress: userProgress.wordsProgress.filter(word => lessonWords.some((lessonWord) => lessonWord.word === word.word))
    };
    return copyUserProgress;
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between p-2 w-full max-w-screen-sm mx-auto">
        <LessonProgress currentIndex={index} total={lessonWords.length} />
        <LittleBlobVariation
          label="back"
          onClick={() => navigate(`/study/${category}`)}
        />
      </div>
      <div className="p-4 max-w-4xl w-full mx-auto flex flex-col justify-center items-center sm:p-6 md:p-8">
        {/* NOTE: lesson container */}
        <div className="w-full flex flex-col border border-2 border-sand-base rounded p-4 mt-4 bg-shell shadow-lg sm:p-6 md:p-8">
          {/* <h2 className="text-2xl font-bold mb-4">Lesson</h2> */}
          {lessonComplete ? (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Lesson Complete!</h3>
              <p>
                You answered {correctCount} out of {lessonWords.length}{" "}
                correctly.
              </p>
              <LittleBlobVariation label="restart" onClick={handleRestart} />
              {/* TODO: */}
              <LittleBlobVariation
                label="ok"
                onClick={() => {
                  // const filteredLessonProgress = getLessonProgress();
                  saveLessonProgress(getLessonProgress(), currentUser?.id);
                  // console.log("LESSON RESULTS", filteredLessonProgress);
                  navigate(`/study`);
                }}
              />
            </div>
          ) : (
            <div className="container mx-auto px-4 ">{renderTask()}</div>
          )}

          {feedback && (
            <div className="mt-4">
              <FeedbackMessage message={feedback} userProgress={userProgress} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
