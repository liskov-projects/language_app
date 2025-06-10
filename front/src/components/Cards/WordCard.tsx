import AudioButton from "../Buttons/AudioButton";
import { TypeWord } from "../../Types";

export default function WordCard({ word }: { word: TypeWord }) {
  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
      <img
        src={`/pictures/${word.picture}.webp`}
        alt={word.word}
        className="w-full object-full rounded self-center"
      />
      <h2 className="text-xl font-semibold mt-2">{word.word}</h2>
      <p className="text-gray-500 italic">{word.translation}</p>
      <p className="mt-2">{word.example}</p>
      <p className="mt-2">{word.translationExample}</p>

      <AudioButton category={word.category} audioName={word.pronunciation} />
    </div>
  );
}
