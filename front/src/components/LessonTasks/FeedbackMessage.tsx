import { useColorContext } from "../../context/ColorContext";

export default function FeedbackMessage({message}: {message: string | null}) {
  const { correctColor, alertColor } = useColorContext();

  const baseClass = "text-lg font-semibold";
  const style = message === "Well Done!" ? `text-[${correctColor}]` : `text-[${alertColor}]`;

  return <p className={`${baseClass} ${style}`}>{message}</p>;
}
