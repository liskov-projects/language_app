import { useState } from "react";
import { TypeWord } from "../../Types";
import LittleBlobButton from "../Buttons/LittleBlobButton";

export default function MatchPictureTask({
  correctWord,
  options,
  onAnswer,
  onNext,
}: // setUserProgress
{
  correctWord: TypeWord;
  options: TypeWord[];
  onAnswer: (result: "correct" | "incorrect") => void;
  onNext: () => void;
  // setUserProgress: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    setSelected(choice);
  };

  const handleCheck = () => {
    if (!selected) return;
    const result = selected === correctWord.word ? "correct" : "incorrect";
    onAnswer(result);
  };

  return (
    <>
      <p className="flex justify-center text-center text-semibold border rounded mb-2 text-lg md:text-2xl font-bold">
        {correctWord.word}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-full items-center">
        {options.map((opt) => (
          <div
            key={opt.word}
            className={`border rounded  cursor-pointer p-2 hover:border-sand-base hover:border-3 shadow-lg ${
              selected === opt.word
                ? "border-4 border-desert bg-white"
                : "border"
            }`}
            onClick={() => handleSelect(opt.word)}
          >
            <img
              src={`/pictures/${opt.picture}.webp`}
              alt={opt.word}
              className="object-contain rounded w-full h-40 sm:h-48 md:h-56"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row sm:flex-row gap-4 mt-4 w-full justify-center">
        <LittleBlobButton type="button" label="check" onClick={handleCheck} />
        <LittleBlobButton label="next" onClick={onNext} />
      </div>
    </>
  );
}
