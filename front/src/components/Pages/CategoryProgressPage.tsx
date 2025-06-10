// hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
//  types
import { TypeWordProgress } from "../../Types";
import LittleBlobButton from "../Buttons/LittleBlobButton";

export default function CategoryProgressPage() {
  const [search, setSearch] = useState("");
  const { userProgress } = useUserDataContext();
  const pathname = useParams();
  //  WORKS: data as expected
  // console.log("pathname", pathname);
  console.log("userProgress", userProgress);

  //  picks out whatever words are from the current category (pathname)
  const wordsToShow =
    userProgress?.wordsProgress.filter(
      (item) => item.category === pathname.category
    ) || []; // ensures we have the right data type even though empty

  // searching functionality
  const filteredWords = wordsToShow.filter((word) =>
    word.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="m-3 flex gap-6 h-screen items-start justify-center">
      {wordsToShow.length > 0 ? (
        <div className="flex w-full flex-col text-mocha-base font-winky">
          <input
            className="border border-gray-300 rounded mb-2 hover:border-desert form-input opacity-60 hover:opacity-90"
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="overflow-y-auto h-full border border-gray-300 rounded">
            {filteredWords.map((word, idx) => (
              <WordEntry index={idx} word={word} />
            ))}
          </ul>
        </div>
      ) : (
        <EmptyProgressList path={pathname.category} />
      )}
    </div>
  );
}

const WordEntry = ({ index, word }: { word: TypeWordProgress }) => {
  return (
    <li
      key={index}
      className={`flex justify-between items-center p-2 border-b hover:bg-gray-200 rounded text-lg mb-2`}
    >
      <p>{word.word}</p>
      <p className="text-xl font-semibold mt-3">
        {"★".repeat(Number(word.box))}
        {"☆".repeat(5 - Number(word.box))}
      </p>
    </li>
  );
};

const EmptyProgressList = ({ path }: { path: string }) => {
  const navigate = useNavigate();

  return (
    <div className="form-box mt-8">
      <p className="flex text-xl tracking-widest text-desert font-semibold font-winky py-4">
        No progress... Yet
      </p>
      <LittleBlobButton
        label="GO!"
        onClick={() => navigate(`/study/${path}`)}
      />
    </div>
  );
};
