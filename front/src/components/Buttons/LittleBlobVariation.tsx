import { TBlobButton } from "../../Types";

export default function LittleBlobVariation({
  label,
  onClick,
  textColour = "text-shell",
}: TBlobButton) {
  return (
    <button className="blob-button-style" onClick={onClick}>
      <svg
        viewBox="-200 -180 400 360"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M158.7 -169.1C201.7 -153.1 229.9 -99.3 215.6 -56.4C201.2 -13.5 144.5 18.6 108.5 45.6C72.6 72.6 57.5 94.6 35 107.7C12.5 120.9 -17.3 125.3 -44.5 117.5C-71.6 109.6 -96 89.6 -123.2 61.8C-150.5 33.9 -180.6 -1.6 -183.6 -40.6C-186.6 -79.7 -162.4 -122.2 -127.3 -139.7C-92.1 -157.1 -46.1 -149.6 5.9 -156.6C57.9 -163.6 115.7 -185.2 158.7 -169.1"
          fill="#ef8e00"
        />
      </svg>
      <span className={`blob-button-label ${textColour}`}>{label}</span>
    </button>
  );
}
