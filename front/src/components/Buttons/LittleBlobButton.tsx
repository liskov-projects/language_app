import { TBlobButton } from "../../Types";

export default function LittleBlobButton({
  label,
  onClick,
  type,
  textColour = "text-shell",
}: TBlobButton) {
  return (
    <button className="blob-button-style" onClick={onClick} type={type}>
      <svg
        viewBox="-180 -190 360 380"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M134.9 -168.1C154.1 -144.7 134.7 -82.5 131.4 -33.2C128.2 16.1 141.2 52.6 127.7 71.8C114.3 91.1 74.5 93.1 38.2 107.4C1.9 121.7 -30.9 148.2 -53.7 142.2C-76.5 136.2 -89.3 97.6 -107.1 63.5C-124.9 29.3 -147.6 -0.4 -157.1 -41.7C-166.5 -83.1 -162.6 -136.2 -134.2 -158C-105.8 -179.8 -52.9 -170.4 2.5 -173.3C57.9 -176.3 115.7 -191.6 134.9 -168.1"
          fill="#ef8e00"
        />
      </svg>
      <span className={`blob-button-label ${textColour}`}>{label}</span>
    </button>
  );
}
