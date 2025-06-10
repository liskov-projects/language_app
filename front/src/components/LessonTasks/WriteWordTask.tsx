import { useEffect, useState } from "react";
import { TypeWord } from "../../Types";
import LittleBlobButton from "../Buttons/LittleBlobButton";
// import useLesson from "../../hooks/useLesson";

export default function WriteWordTask({
  correctWord,
  onAnswer,
  onNext,
}: {
  correctWord: TypeWord;
  onAnswer: (result: "correct" | "incorrect") => void;
  onNext: () => void;
}) {
  const [answer, setAnswer] = useState<string>("");
  const [askFor, setAskFor] = useState<"word" | "translation">("word");
  // const {handleAnswerSubmit, handleNextTask} = useLesson();

  useEffect(() => {
    setAskFor(Math.random() < 0.5 ? "word" : "translation");
  }, [correctWord]);

  //   remember controlled input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedAnswer = answer.trim().toLowerCase();
    const expectedAnswer =
      askFor === "word" ? correctWord.word : correctWord.translation;
    if (cleanedAnswer === expectedAnswer.toLowerCase()) {
      onAnswer("correct");
    } else {
      onAnswer("incorrect");
    }
    setAnswer("");
  };

  const prompt = askFor === "word" ? correctWord.translation : correctWord.word;
  return (
    <>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4 w-full max-w-md px-2 sm:px-6 md:px-8"
        >
          <p className="text-center text-base sm:text-lg">
            Translate: {prompt}
          </p>

          <input
            value={answer}
            onChange={handleChange}
            className="mb-4 w-full p-2 border border-2 rounded bg-shell focus:border-none focus:outline-none focus:ring-4 focus:ring-desert"
          />
          <div className="flex flex-row sm:flex-row gap-4 mt-4 w-full justify-center">
            <LittleBlobButton type="submit" label="check" />

            <LittleBlobButton label="next" onClick={() => onNext()} />
          </div>
        </form>
      </div>
    </>
  );
}
