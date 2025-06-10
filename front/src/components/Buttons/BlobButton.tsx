import { TBlobButton } from "../../Types";

export function BlobButton({
  label,
  onClick,
  textColour = "shell",
}: TBlobButton) {
  return (
    <button
      onClick={onClick}
      className="group relative p-0 border-none bg-transparent cursor-pointer hover:translate-y-[-4px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        id="visual"
        viewBox="0 0 900 900"
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
        version="1.1"
      >
        <g transform="translate(462.3601901061138 476.86626907588925)">
          <path
            d="M165.5 -268.1C208.2 -230.2 232 -173.5 248.6 -118.9C265.3 -64.3 274.7 -11.7 288.7 56.9C302.7 125.5 321.4 210.1 287.4 248.5C253.3 287 166.5 279.3 96.3 276.2C26.1 273.1 -27.5 274.7 -86.9 269.4C-146.3 264.1 -211.4 251.9 -245.3 212.6C-279.1 173.4 -281.6 107.1 -297 39.1C-312.5 -29 -340.9 -98.8 -328.1 -159.3C-315.2 -219.8 -261.1 -271 -199.6 -300.2C-138 -329.5 -69 -336.7 -3.8 -330.8C61.5 -325 122.9 -305.9 165.5 -268.1"
            fill="#ef8e00"
          />
        </g>
      </svg>
      <span
        className={`absolute inset-0 z-10 flex items-center justify-center text-${textColour} font-semibold font-winky text-sm md:text-lg pointer-events-none`}
      >
        {label}
      </span>
    </button>
  );
}
