import AudioButton from "../Buttons/AudioButton";
import { TypeWord } from "../../Types";
import { useColorContext } from "../../context/ColorContext";

export default function WordCard({ word }: { word: TypeWord }) {
  const { frameBorderColor, frameBackgroundColor, cardTextColor } = useColorContext();
  return (
    <div className={`w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto border-2 border-[${frameBorderColor}] p-4 
                    rounded-lg shadow-lg bg-[${frameBackgroundColor}] text-[${cardTextColor}]`}>
      <img
        src={`/pictures/${word.picture}.webp`}
        alt={word.word}
        className="w-full object-full rounded self-center"
      />
      <h2 className="text-xl font-semibold mt-2">{word.word}</h2>
      <p className={`text-[${cardTextColor}] opacity-60 italic`}>{word.translation}</p>
      <p className="mt-2">{word.example}</p>
      <p className="mt-2">{word.translationExample}</p>

      <AudioButton category={word.category} audioName={word.pronunciation} />
    </div>
  );
}
