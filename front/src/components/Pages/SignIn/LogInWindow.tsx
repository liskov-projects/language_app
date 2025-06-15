import { useState } from "react";
import { TypeUser } from "../../../Types";
import LittleBlobButton from "../../Buttons/LittleBlobButton";
import { useUserDataContext } from "../../../context/UserDataContext";
import { useColorContext } from "../../../context/ColorContext";

//  TODO: combine with SignUpWindow.tsx
export default function LogInWindow() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  //  uses Partial to allow to use only the necessary fields from TypeUser
  const [existingUser, setExistingUser] = useState<Partial<TypeUser | null>>({
    username: "",
    password: "",
  });

  const { login } = useUserDataContext();
  const { defaultTextColor, buttonTextColor, containerColor, frameBackgroundColor, correctColor } = useColorContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("existing user: ", existingUser);

    const userToSend = {
      ...existingUser,
      lastLoggedIn: new Date(),
    };
    console.log("final user: ", userToSend);

    try {
      const response = await fetch("http://localhost:8081/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToSend),
      });
      console.log("RESPONSE", response);
      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage("Invalid username or password");
        } else if (response.status === 500) {
          setErrorMessage("Server error, try again");
        }
      } else {
        console.log(response);
        const userData = await response.json();
        console.log(userData);
        login(userData);
        setSuccessMessage(`Welcome back ${userData.username}`);
      }
    } catch (err) {
      console.error("error loggining: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      <form onSubmit={handleSubmit} className={`form-box border-[${frameBackgroundColor}] bg-[${containerColor}]`}>
        <h1 className={`form-heading text-[${frameBackgroundColor}]`}>existing user</h1>
        <input
          type="text"
          name="username"
          value={existingUser?.username}
          onChange={(e) =>
            setExistingUser({ ...existingUser, username: e.target.value })
          }
          placeholder="name"
          className={`form-input focus:ring-[${frameBackgroundColor}] bg-[${buttonTextColor}]`}
        />
        <input
          type="password"
          name="password"
          value={existingUser?.password}
          onChange={(e) =>
            setExistingUser({ ...existingUser, password: e.target.value })
          }
          placeholder="password"
          className={`form-input focus:ring-[${frameBackgroundColor}] bg-[${buttonTextColor}]`}
        />
        <LittleBlobButton
          label={"log in"}
          type="submit"
          textColour={`text-[${defaultTextColor}]`}
        />
        {errorMessage ? (
          <div className={`error-message bg-[${buttonTextColor}] border-[${defaultTextColor}]`}>{errorMessage}</div>
        ) : (
          <div className={`success-message text-[${correctColor}] bg-[${buttonTextColor}] border-[${defaultTextColor}]`}>{successMessage}</div>
        )}
      </form>
    </div>
  );
}
