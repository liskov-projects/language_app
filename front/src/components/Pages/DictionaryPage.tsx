// hooks
import { useEffect, useState } from "react";
// context
import { useWordsContext } from "../../context/WordsContext";
// types
import { TypeWord } from "../../Types";
//components
import WordCard from "../Cards/WordCard";

export default function DictoinaryPage() {
  // TODO: Context task
  const [search, setSearch] = useState("");
  const [selectedWord, setSelectedWord] = useState<TypeWord | null>(null);

  const { words } = useWordsContext();

  useEffect(() => {
    // picks a random word
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSelectedWord(randomWord);
    }
  }, [words]);

  // searching functionality
  const filteredWords = words
    .filter(
      (word) =>
        word.word.toLowerCase().includes(search.toLowerCase()) ||
        word.translation.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.word.localeCompare(b.word));
  return (
    <div className="flex gap-6 h-screen">
      {/* LEFT side */}
      <div className="m-2 w-full sm:w-1/3 flex flex-col font-winky">
        <input
          className="border border-gray-300 rounded hover:border-desert form-input opacity-60 hover:opacity-90 w-full"
          type="text"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className={`overflow-y-auto sm:h-full border border-gray-300 rounded p-2`}
        >
          {filteredWords.map((word, idx) => (
            <DictionaryItem
              word={word}
              selected={selectedWord?.id === word.id}
              clickEvent={setSelectedWord}
              key={idx}
            />
          ))}
        </div>
      </div>
      {/* RIGHT side */}
      <div className="w-2/3 sm:flex justify-center items-center hidden">
        {selectedWord && <WordCard word={selectedWord} />}
      </div>
    </div>
  );
}

function DictionaryItem({
  word,
  selected,
  clickEvent
}: {
  word: TypeWord;
  selected: boolean;
  clickEvent: React.Dispatch<React.SetStateAction<TypeWord | null>>;
}) {
  const [showImageCard, setShowImageCard] = useState<boolean>(false);
  const toggleImageCardState = () => {
    setShowImageCard(!showImageCard);
  };

  const textColor = `${selected ? "bg-desert text-shell" : "hover:bg-gray-200 hover:text-mocha-base text-mocha-base"}`;

  return (
    <div className={`flex-row mb-2 border-b border-mocha-base `}>
      <div className={`flex justify-between p-2 ${textColor} text-lg`}>
        <p
          className="flex-1 cursor-pointer"
          onClick={() => clickEvent(word)}
        >
          {word.word} - {word.translation}
        </p>
        <button
          className="flex-shrink-0 sm:hidden justify-center items-center font-semibold"
          onClick={toggleImageCardState}
        >
          ···
        </button>
      </div>
      {showImageCard && (
        <div className="sm:hidden justify-center items-center mb-2">
          <WordCard word={word} />
        </div>
      )}
    </div>
  );
}
