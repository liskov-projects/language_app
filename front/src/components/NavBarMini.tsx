//  hooks
import { useUserDataContext } from "../context/UserDataContext";
// types
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useColorContext } from "../context/ColorContext";

export default function NavBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { isLoggedIn } = useUserDataContext();
  const { defaultTextColor, buttonTextColor } = useColorContext();

  return (
    <nav
      className={`fixed top-0 right-0 h-full w-64 bg-[${buttonTextColor}] text-[${defaultTextColor}] shadow-lg z-40 
                transform transition-transform ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>
      <button onClick={() => setOpen((prev) => !prev)} className="p-4">
        X
      </button>
      <ul className={`px-4 flex flex-col gap-4 font-gummy text-[${defaultTextColor}] text-xl`}>
        <li>
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/dictionary" onClick={() => setOpen(false)}>
            Dictionary
          </Link>
        </li>
        <li>
          <Link to="/study" onClick={() => setOpen(false)}>
            Study
          </Link>
        </li>
        {!isLoggedIn ? (
          <li>
            <Link to="/signin" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          </li>
        ) : (
          <LoggedInSegment onClose={setOpen} />
        )}
      </ul>
    </nav>
  );
}

function LoggedInSegment({
  onClose,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const { currentUser, logout } = useUserDataContext();
  return (
    <>
      <li>
        <Link to="/progress" onClick={() => onClose(false)}>
          {currentUser?.username}&apos;s Progress
        </Link>
      </li>
      <li>
        <Link
          to="/"
          onClick={() => {
            logout();
            onClose(false);
          }}
        >
          Log Out
        </Link>
      </li>
    </>
  );
}
