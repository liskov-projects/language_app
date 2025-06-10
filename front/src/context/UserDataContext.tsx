import { createContext, useContext, useEffect, useState } from "react";
import {
  TypeLessonResult,
  TypeUser,
  TypeUserDataContext,
  TypeUserProgress,
} from "../Types";

const UserDataContext = createContext<TypeUserDataContext | null>(null);

export function UserDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [users, setUsers] = useState<TypeUser[]>([]);
  const [currentUser, setCurrentUser] = useState<TypeUser | null>(null);
  const [userProgress, setUserProgress] = useState<TypeUserProgress | null>(
    null
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // WORKS: getting the expected data
  const fetchUserProgress = async (userId: string) => {
    console.log("user id", currentUser?.id);

    if (!currentUser?.id) console.error("Missing user id");

    await fetch(`http://localhost:8081/user/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("wordsProgress from back", data.wordsProgress);
        setUserProgress({
          userID: data.userID,
          wordsProgress: data.wordsProgress || [],
        });
      });
  };

  useEffect(() => {
    //  the guard to ensure currentUser.id exists
    if (!currentUser?.id) console.log("userId is missing");
    else {
      fetchUserProgress(currentUser?.id);
    }
  }, [currentUser?.id]);

  // WORKS: link to the existing
  const login = (userData: TypeUser) => {
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const isLoggedIn = currentUser !== null;

  //  REVIEW: dp we need both args?
  const saveLessonProgress = async (
    lessonResults: TypeUserProgress,
    userId: string
  ) => {
    const response = await fetch(
      `http://localhost:8081/user_progress/${userId}`,
      {
        method: "POST",
        body: JSON.stringify(lessonResults),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) throw new Error("POST request for user Progress failed");
  };

  return (
    <UserDataContext.Provider
      value={{
        // users,
        userProgress,
        setUserProgress,
        currentUser,
        // setCurrentUser,
        login,
        logout,
        isLoggedIn,
        fetchUserProgress,
        saveLessonProgress,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserDataContext = (): TypeUserDataContext => {
  const context = useContext(UserDataContext);
  if (!context)
    throw new Error(
      "useUserDataContext must be used within a UserDataContextProvider"
    );
  return context;
};

// OLD: recycle for leaderboard?
// const fetchUsers = async () => {
//   console.log("fetch users ran");
//   try {
//     fetch("http://localhost:8081/users", {
//       method: "GET"
//     }).then(res => res.json().then(data => setUsers(data)));
//   } catch (err) {
//     console.error("Failed to fetch users: ", err);
//   }
// };
