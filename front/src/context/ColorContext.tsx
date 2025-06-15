import { createContext, useContext, useEffect, useState } from "react";
import { TypeColorContext } from "../Types";

const ColorContext = createContext<TypeColorContext | null>(null);

export function ColorContextProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(() =>
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const [baseColor, setBaseColor] = useState<string>("#eeeeee");
  const [containerColor, setContainerColor] = useState<string>("#ef8e00");
  const [buttonTextColor, setButtonTextColor] = useState<string>("#eeeee4");
  const [defaultTextColor, setDefaultTextColor] = useState<string>("#4d4a46");
  const [cardTextColor, setCardTextColor] = useState<string>("#2f2116");
  const [frameBorderColor, setFrameBorderColor] = useState<string>("#c8985f");
  const [frameBackgroundColor, setFrameBackgroundColor] = useState<string>("#ef8e00");
  const [correctColor, setCorrectColor] = useState<string>("#518d3c");
  const [alertColor, setAlertColor] = useState<string>("#c24b34");

  useEffect(() => {
    if (darkMode) {
      console.log("Theme changed to dark mode.");
      setBaseColor("#000000");
      setContainerColor("#2f2116");
      setButtonTextColor("#eeeee4");
      setDefaultTextColor("#eeeee4");
      setCardTextColor("#eeeee4");
      setFrameBorderColor("#c8985f");
      setFrameBackgroundColor("#4d4a46");
      setCorrectColor("#518d3c");
      setAlertColor("#c24b34");
    } else {
      console.log("Theme changed to light mode.");
      setBaseColor("#eeeee4");
      setContainerColor("#ef8e00");
      setButtonTextColor("#eeeee4");
      setDefaultTextColor("#4d4a46");
      setCardTextColor("#2f2116");
      setFrameBorderColor("#ef8e00");
      setFrameBackgroundColor("#c8985f");
      setCorrectColor("#518d3c");
      setAlertColor("#c24b34");
    }
  }, [darkMode]);
  
  return (
    <ColorContext.Provider
      value={{
        setDarkMode,
        darkMode,
        baseColor,
        containerColor,
        buttonTextColor,
        defaultTextColor,
        cardTextColor,
        frameBorderColor,
        frameBackgroundColor,
        correctColor,
        alertColor
      }}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColorContext = (): TypeColorContext => {
  const context = useContext(ColorContext);
  if (!context)
    throw new Error(
      "colorContext must be used within a ColorContextProvider"
    );
  return context;
};