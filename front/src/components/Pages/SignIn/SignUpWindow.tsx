import { useState } from "react";
import { TypeUser } from "../../../Types";
import LittleBlobVariation from "../../Buttons/LittleBlobVariation";
import { useUserDataContext } from "../../../context/UserDataContext";
import { useColorContext } from "../../../context/ColorContext";

//  TODO: combine with LogInWindow.tsx
export default function SignUpWindow() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  //  uses Partial to allow to use only the necessary fields from TypeUser
  const [newUser, setNewUser] = useState<Partial<TypeUser>>({
    username: "",
    password: "",
  });

  const { login } = useUserDataContext();
  const { defaultTextColor, buttonTextColor, containerColor, frameBackgroundColor, correctColor } = useColorContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit the form with data: ", newUser);

    const userToSend = {
      ...newUser,
      lastLoggedIn: new Date(),
    };
    console.log("final user: ", userToSend);

    try {
      const response = await fetch("http://localhost:8081/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToSend),
      });

      if (!response.ok) {
        if (response.status === 400) {
          setErrorMessage("Invalid Username or Password");
        } else if (response.status == 409) {
          setErrorMessage("Username is already in use");
        } else if (response.status === 500) {
          setErrorMessage("Server Error");
        }
      } else {
        const userData = await response.json();
        login(userData.user as TypeUser);
        console.log("USERDATA", userData.user);
        setSuccessMessage("User added!");
      }
    } catch (err) {
      console.error("error adding a new user: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      <form onSubmit={handleSubmit} className={`form-box border-[${frameBackgroundColor}] bg-[${containerColor}]`}>
        {/* <div className=""> */}
        <h1 className={`form-heading text-[${frameBackgroundColor}]`}>new user</h1>
        <input
          type="text"
          name="username"
          value={newUser?.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          placeholder="name"
          className={`form-input focus:ring-[${frameBackgroundColor}] bg-[${buttonTextColor}]`}
        />
        <input
          type="password"
          name="password"
          value={newUser?.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="password"
          className={`form-input focus:ring-[${frameBackgroundColor}] bg-[${buttonTextColor}]`}
        />
        <LittleBlobVariation
          label={"sign up"}
          type="submit"
          textColour={`text-${defaultTextColor}`}
        />
        {errorMessage ? (
          <div className={`error-message bg-${buttonTextColor} border-[${defaultTextColor}]`}>{errorMessage}</div>
        ) : (
          <div className={`success-message text-[${correctColor}] bg-[${buttonTextColor}] border-[${defaultTextColor}]`}>{successMessage}</div>
        )}

        {/* </div> */}
      </form>
    </div>
  );
}
