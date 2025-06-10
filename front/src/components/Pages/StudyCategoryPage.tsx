import { useParams } from "react-router-dom";
import { useWordsContext } from "../../context/WordsContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import WordCard from "../Cards/WordCard";
import LittleBlobButton from "../Buttons/LittleBlobButton";
import { useUserDataContext } from "../../context/UserDataContext";

export default function StudyCategoryPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { words } = useWordsContext();
  const { currentUser } = useUserDataContext();

  if (!category || !words) return <Loader />;

  const filteredWords = words.filter((word) => word.category === category);

  return (
    <div className="p-6">
      {/* buttons */}
      <div className="flex flex-row justify-around mb-4 sm:gap-y-0 sm:items-center">
        <LittleBlobButton
          label={"back"}
          onClick={() => navigate(`/study`)}
          textColour="text-shell"
        />
        <LittleBlobButton
          label={"study!"}
          onClick={() => navigate(`/study/${category}/:lesson`)}
        />
      </div>

      {/* heading */}
      <h1 className="text-lg md:text-2xl font-bold mb-4">
        {currentUser?.username} is learning: {category}
      </h1>

      {/* word cards */}
      {filteredWords.length === 0 ? (
        <p>No words found for this category.</p>
      ) : (
        <>
          {/* mobile with horizontal swipe */}
          {/* sm:hidden makes sure we have only one ul at a time depending on the screen size */}
          <ul className="flex gap-4 overflow-x-auto snap-x sm:hidden pb-4">
            {filteredWords.map((word, index) => (
              <li key={index} className="flex-shrink-0 w-72 snap-center">
                <WordCard word={word} />
              </li>
            ))}
          </ul>

          {/* desktop - grid */}
          {/* hidden/sm:hidden makes sure we have only one ul at a time depending on the screen size */}
          <ul className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredWords.map((word, index) => (
              <li key={index}>
                <WordCard word={word} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
