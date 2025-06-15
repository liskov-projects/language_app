// hooks
import { useWordsContext } from "../../context/WordsContext";
import { useNavigate } from "react-router-dom";
// components
import CategoryCard from "../Cards/CategoryCard";
import { BlobButton } from "../Buttons/BlobButton";
import { useColorContext } from "../../context/ColorContext";

export default function StudyPage() {
  const { categories } = useWordsContext();
  const { defaultTextColor } = useColorContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className={`text-sm md:text-xl font-bold mb-4 text-[${defaultTextColor}]`}>Choose a Category</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
            showProgress={false}
          />
        ))}
      </div>
      <BlobButton
        label={"random"}
        onClick={() => {
          let randomCategory = categories[Math.floor(Math.random() * categories.length)];
          navigate(`/study/${randomCategory.name}/:lesson`);
        }}
        textColour={`[${defaultTextColor}]`}
      />
    </div>
  );
}
