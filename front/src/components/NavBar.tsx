//  hooks
import { useUserDataContext } from "../context/UserDataContext";
//  components
import { Link } from "react-router-dom";
import ThemeToggle from "./Buttons/ThemeToggle";

export default function NavBar() {
  const { isLoggedIn } = useUserDataContext();

  return (
    <nav>
      <ul className="m-4 p-4 flex flex-row space-x-6 font-gummy text-mocha-base text-xl">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/dictionary">Dictionary</Link>
        </li>
        <li className="nav-item">
          <Link to="/study">Study</Link>
        </li>
        {!isLoggedIn ? (
          <li className="nav-item">
            <Link to="/signin">Sign In</Link>
          </li>
        ) : (
          <LoggedInSegment />
        )}
        <li className="nav-item">
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}

function LoggedInSegment() {
  const { currentUser, logout } = useUserDataContext();
  return (
    <>
      <li className="nav-item">
        <Link to="/progress">{currentUser?.username}&apos;s Progress</Link>
      </li>
      <li className="nav-item">
        <Link to="/" onClick={logout}>
          Log Out
        </Link>
      </li>
    </>
  );
}
