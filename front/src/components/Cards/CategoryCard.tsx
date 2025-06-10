// hooks:
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
//  types:
import { TypeCategory } from "../../Types";
import { useWordsContext } from "../../context/WordsContext";
import { useEffect, useState } from "react";

// Common setting for progress display
const commonLineColor = "#ef8e00";
const commonLineThickness = 20;
const commonLineShape = "round";
const commonFill = "#eeeee4";
const commonLineOffset = "0";
const commonViewBoxSize = "0 0 450 450";
const lineAnimation = "stroke-dashoffset 0.35s";

export default function CategoryCard({
  category,
  showProgress,
}: {
  category: TypeCategory;
  showProgress: boolean;
}) {
  const navigate = useNavigate();
  const { words } = useWordsContext();
  const { userProgress } = useUserDataContext();

  const [categoryWordCount, setCategoryWord] = useState<number>(0);
  const [masteredWordCount, setMasteredWordCount] = useState<number>(0);

  const route = showProgress ? "progress" : "study";

  // TODO: move both useEffects into userProgress and do all computations there?
  // Set the total word count initially
  useEffect(() => {
    const categoryWords = words.filter(
      (word) => word.category === category.name
    );
    setCategoryWord(categoryWords.length);
  }, []);

  // Set mastered word count if user progress has changed
  useEffect(() => {
    if (route === "progress") {
      if (!userProgress || !userProgress.wordsProgress) return; // prevents error when data is still loading | early exit
      const categoryProgress = userProgress.wordsProgress.filter(
        (word) => word.category === category.name
      );
      const masteredWordsInCategory = categoryProgress.filter(
        (word) => word.box === 5
      );
      setMasteredWordCount(masteredWordsInCategory.length);
    }
  }, [userProgress]);
  //

  const getRandomBlobShape = () => {
    const random = Math.floor(Math.random() * 4); // It should be changed from 4 to 3 if the circle needs to be deleted

    switch (random) {
      case 0:
        return (
          <ProgressBlob1
            total={categoryWordCount}
            progress={masteredWordCount}
          />
        );
      case 1:
        return (
          <ProgressBlob2
            total={categoryWordCount}
            progress={masteredWordCount}
          />
        );
      case 2:
        return (
          <ProgressBlob3
            total={categoryWordCount}
            progress={masteredWordCount}
          />
        );
      default:
        return (
          <CircularProgress
            total={categoryWordCount}
            progress={masteredWordCount}
          />
        );
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer hover:shadow-xl transition"
      onClick={() => navigate(`/${route}/${category.name}`)}
    >
      <h2 className="text-lg md:text-xl font-semibold p-2">{category.name}</h2>
      <p>{category.translation}</p>
      <img
        className="mx-2"
        alt={category.name}
        src={`/pictures/${category.name}.webp`}
      />

      {showProgress ? (
        <>
          <div className="flex flex-col items-center justify-center">
            {getRandomBlobShape()}
          </div>
          <p className="font-bold">
            {masteredWordCount} / {categoryWordCount}
          </p>
        </>
      ) : null}
    </div>
  );
}

const ProgressBlob1 = ({ progress = 0, total = 1 }) => {
  const transfromCoordination = "translate(240 200)";
  const shapePath = `M76.2 -130.3C98.7 -119 116.9 -98.5 117.5 -75.2C118.2 -52 101.3 -26 108.5 4.2C115.7 34.3 147.1 68.7 144.7 
                    88.9C142.3 109.1 106.1 115.2 76.4 131.2C46.7 147.2 23.3 173.1 -5 181.7C-33.3 190.4 -66.7 181.8 -84 158.6C-101.3 
                    135.5 -102.6 97.7 -120.6 68.9C-138.6 40 -173.3 20 -183.3 -5.7C-193.2 -31.5 -178.5 -63 -162.5 -95.5C-146.6 -128 
                    -129.6 -161.4 -102.3 -170C-75 -178.6 -37.5 -162.3 -5.3 -153C26.8 -143.8 53.7 -141.6 76.2 -130.3`;
  return (
    <ProgressBlob
      transformCoordination={transfromCoordination}
      shapePath={shapePath}
      progress={progress}
      total={total}
    />
  );
};

const ProgressBlob2 = ({ progress = 0, total = 1 }) => {
  const transfromCoordination = "translate(220 240)";
  const shapePath = `M99 -162.4C122.9 -157.6 133.3 -120.3 146.6 -87.8C159.8 -55.3 175.9 -27.7 179.2 1.9C182.6 31.5 173.1 63 148.2 
                    75.2C123.2 87.4 82.7 80.2 55.4 88C28.1 95.7 14.1 118.4 -3.5 124.4C-21 130.4 -42 119.7 -64.1 109C-86.2 98.2 
                    -109.3 87.4 -130.2 69.2C-151 51 -169.5 25.5 -160.1 5.4C-150.7 -14.7 -113.5 -29.3 -97.9 -56.6C-82.3 -83.9 -88.4 
                    -123.8 -75.7 -135.1C-63 -146.5 -31.5 -129.2 3 -134.4C37.5 -139.6 75 -167.2 99 -162.4`;
  return (
    <ProgressBlob
      transformCoordination={transfromCoordination}
      shapePath={shapePath}
      progress={progress}
      total={total}
    />
  );
};

const ProgressBlob3 = ({ progress = 0, total = 1 }) => {
  const transfromCoordination = "translate(250 200)";
  const shapePath = `M79.3 -122.4C104 -123.2 126.1 -104.3 126.2 -80.7C126.4 -57 104.7 -28.5 109.2 2.6C113.6 33.7 144.3 67.3 145.2 
                    92.9C146.1 118.4 117.3 135.9 88.2 154.7C59 173.5 29.5 193.8 10.1 176.3C-9.4 158.9 -18.8 103.8 -50.2 86.3C-81.7 
                    68.8 -135.2 88.9 -153.2 80.8C-171.2 72.7 -153.6 36.3 -154.6 -0.6C-155.6 -37.5 -175.2 -75 -160.7 -89.1C-146.2 
                    -103.3 -97.6 -94.1 -65.1 -88.8C-32.7 -83.6 -16.3 -82.3 5.5 -91.8C27.3 -101.3 54.7 -121.7 79.3 -122.4`;
  return (
    <ProgressBlob
      transformCoordination={transfromCoordination}
      shapePath={shapePath}
      progress={progress}
      total={total}
    />
  );
};

const ProgressBlob = ({
  transformCoordination,
  shapePath,
  progress,
  total,
}: {
  transformCoordination: string;
  shapePath: string;
  progress: number;
  total: number;
}) => {
  const pathLength = 1120;
  const visibleLength = (progress / total) * pathLength;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="visual"
      viewBox={commonViewBoxSize}
      width="100"
      height="100"
      version="1.1"
    >
      <g transform={transformCoordination}>
        <path
          d={shapePath}
          fill={commonFill}
          stroke={commonLineColor}
          strokeWidth={progress === 0 ? 0 : commonLineThickness}
          strokeLinecap={commonLineShape}
          strokeDasharray={`${visibleLength} ${pathLength}`}
          strokeDashoffset={commonLineOffset}
          style={{ transition: `${lineAnimation}` }}
        />
      </g>
    </svg>
  );
};

const CircularProgress = ({ progress = 0, total = 1 }) => {
  const radius = 200;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / total) * circumference;

  return (
    <svg
      className="block mx-auto p-3"
      height={100}
      width={100}
      viewBox={commonViewBoxSize}
    >
      <circle
        cx={170}
        cy={225}
        r={radius}
        stroke={commonLineColor}
        strokeWidth={commonLineThickness * 1.3}
        strokeLinecap={commonLineShape}
        fill={commonFill}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${radius} ${radius})`}
        style={{ transition: `${lineAnimation}` }}
      />
    </svg>
  );
};
