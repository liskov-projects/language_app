import { useState } from "react";
// import IADLogo from "./IADLogo";
import NavBar from "./NavBar";
import NavBarMini from "./NavBarMini";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <header className="bg-desert text-black w-full">
      <div className=" w-full mx-auto px-4 flex justify-around items-center">
        <div className="sm:hidden">
          <NavBarMini open={open} setOpen={setOpen} />
        </div>

        <h1 className="py-2 text-mocha-base text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-marker">
          Buryat
        </h1>
        <div className="hidden sm:block">
          <NavBar />
        </div>

        <button
          className="sm:hidden pr-4"
          onClick={toggle}
          aria-label="toggle navigation"
        >
          <svg
            className="w-8 h-8 text-mocha-base"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
