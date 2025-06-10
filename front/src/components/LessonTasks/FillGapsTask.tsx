import { useState } from "react";
import { TypeWord } from "../../Types";
import LittleBlobButton from "../Buttons/LittleBlobButton";

export default function FillGapsTask({
  word,
  onAnswer,
  onNext,
  setUserProgress,
}: {
  word: TypeWord;
  onAnswer: (result: "correct" | "incorrect") => void;
  onNext: () => void;
}) {
  const [answer, setAnswer] = useState<string>("");

  const getGapSentence = () => {
    if (!word.example) return "";
    return word.example.replace(
      new RegExp(`\\b${word.word}\\b`, "gi"),
      "_____"
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedAnswer = answer.trim().toLowerCase();
    onAnswer(
      cleanedAnswer === word.word.toLowerCase() ? "correct" : "incorrect"
    );
    setAnswer("");
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-xl"
        >
          <p className="text-lg">Fill in the gap:</p>
          <p className="text-xl font-semibold">{getGapSentence()}</p>
          <input
            value={answer}
            onChange={handleChange}
            className="border border-2 rounded focus:border-none focus:outline-none focus:ring-2 focus:ring-desert w-full py-1 px-2"
            placeholder="Your answer"
          />
          <div className="flex flex-row sm:flex-row gap-4 mt-4 w-full justify-center">
            <LittleBlobButton type="submit" label="check" />
            <LittleBlobButton label="next" onClick={onNext} />
          </div>
        </form>
      </div>
    </>
  );
}
