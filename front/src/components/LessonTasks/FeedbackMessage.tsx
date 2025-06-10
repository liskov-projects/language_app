export default function FeedbackMessage({message}: {message: string | null}) {
  const baseClass = "text-lg font-semibold";
  const style = message === "Well Done!" ? "text-green" : "text-red";

  return <p className={`${baseClass} ${style}`}>{message}</p>;
}
