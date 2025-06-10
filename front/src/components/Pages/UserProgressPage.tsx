//  hooks
import { useUserDataContext } from "../../context/UserDataContext";
import { useWordsContext } from "../../context/WordsContext";
//  types
// components
import CategoryCard from "../Cards/CategoryCard";

export default function UserProgressPage() {
  const { isLoggedIn } = useUserDataContext();
  const { categories } = useWordsContext();

  // WORKS: as expected
  // console.log("progress", userProgress?.wordsProgress);

  const renderedCategories = categories.map((category, idx) => {
    return <CategoryCard key={idx} category={category} showProgress={true} />;
  });

  return (
    <div className="flex flex-col items-center p-6">
      {!isLoggedIn ? (
        <p>You need to be signed in to save your progress</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl">
          {renderedCategories}
        </div>
      )}
    </div>
  );
}
