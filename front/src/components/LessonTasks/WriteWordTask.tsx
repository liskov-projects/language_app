import { useEffect, useState } from "react";
import { BaseTaskProps, TypeWord } from "../../Types";
import LittleBlobButton from "../Buttons/LittleBlobButton";
import { useColorContext } from "../../context/ColorContext";

//  NOTE: combining prop types
type WriteWordTaskProps = BaseTaskProps & {
  correctWord: TypeWord;
};

export default function WriteWordTask({
  correctWord,
  onAnswer,
  onNext,
}: WriteWordTaskProps) {
  const [answer, setAnswer] = useState<string>("");
  const [askFor, setAskFor] = useState<"word" | "translation">("word");
  // const {handleAnswerSubmit, handleNextTask} = useLesson();

  const { buttonTextColor, frameBackgroundColor } = useColorContext();

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
    onAnswer(cleanedAnswer === expectedAnswer.toLowerCase());
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
            className={`mb-4 w-full p-2 border border-2 rounded bg-[${buttonTextColor}] focus:border-none focus:outline-none focus:ring-4 focus:ring-[${frameBackgroundColor}]`}
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
