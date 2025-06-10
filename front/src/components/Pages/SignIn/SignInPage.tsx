import { useState } from "react";
import SignUpWindow from "./SignUpWindow";
import LogInWindow from "./LogInWindow";
import LittleBlobButton from "../../Buttons/LittleBlobButton";
import LittleBlobVariation from "../../Buttons/LittleBlobVariation";

// import {useUserDataContext} from "../../context/UserDataContext";
// import {BlobButton} from "../Buttons/BlobButton";

export default function SignInPage() {
  const [isNew, setIsNew] = useState<boolean | null>(null);
  return (
    <div className="flex flex-col justify-around w-full px-4 py-8">
      <div className="flex flex-row items-center justify-center mt-2">
        <LittleBlobButton label={"log in"} onClick={() => setIsNew(false)} />
        <LittleBlobVariation label={"sign up"} onClick={() => setIsNew(true)} />
      </div>
      {isNew !== null && (
        <div className="flex flex-row justify-center mt-2">
          {isNew ? <SignUpWindow /> : <LogInWindow />}
        </div>
      )}
    </div>
  );
}
