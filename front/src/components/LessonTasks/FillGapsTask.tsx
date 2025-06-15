import { useState } from "react";
import { BaseTaskProps, TypeWord } from "../../Types";
import LittleBlobButton from "../Buttons/LittleBlobButton";
import { useColorContext } from "../../context/ColorContext";

type FillGapsTaskProps = BaseTaskProps & {
  word: TypeWord;
};

export default function FillGapsTask({
  word,
  onAnswer,
  onNext,
}: FillGapsTaskProps) {
  const [answer, setAnswer] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedAnswer = answer.trim().toLowerCase();
    onAnswer(cleanedAnswer === word.word.toLowerCase());
    setAnswer("");
  };

  const { frameBackgroundColor } = useColorContext();

  return (
    <>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-xl"
        >
          <p className="text-lg">Fill in the gap:</p>
          <p className="text-xl font-semibold">
            {getGapSentence(word.example, word.word)}
          </p>
          <input
            value={answer}
            onChange={handleChange}
            className={`border border-2 rounded focus:border-none focus:outline-none focus:ring-2 focus:ring-[${frameBackgroundColor}] w-full py-1 px-2`}
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

export function getGapSentence(example: string | null, targetWord: string) {
  if (!example) return "";
  return example.replace(new RegExp(`\\b${targetWord}\\b`, "gi"), "_____");
}
