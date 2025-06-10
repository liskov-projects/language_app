// components/LessonProgress.tsx
import { useEffect, useState } from "react";

export default function LessonProgress({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) {
  const progressBarWidth = 900;
  const progressBarHeight = 150;
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setProgressWidth((currentIndex / total) * progressBarWidth);
  }, [currentIndex]);

  return (
    <svg
      viewBox={`0 90 ${progressBarWidth} ${progressBarHeight}`}
      width="100%"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <defs>
        <clipPath id="revealClip" style={{ transition: "clip-path 0.5s ease" }}>
          <rect
            x="-5"
            y="0"
            width={progressWidth + 1}
            height={progressBarHeight * 2}
            style={{ transition: "width 0.3s ease-in-out" }}
          />
        </clipPath>
      </defs>
      <path
        d="M0 222L21.5 203C43 184 86 146 128.8 124.7C171.7 103.3 214.3 98.7 257.2 115C300 131.3 343 168.7 385.8 175.7C428.7 182.7 471.3 159.3 514.2 159C557 158.7 600 181.3 642.8 183.7C685.7 186 728.3 168 771.2 162.7C814 157.3 857 164.7 878.5 168.3L900 172"
        fill="none"
        stroke="#ef8e00"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="miter"
        clipPath="url(#revealClip)"
        style={{ strokeDasharray: 10, strokeDashoffset: 0 }}
      />
    </svg>
  );
}
