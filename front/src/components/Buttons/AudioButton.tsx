import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function AudioButton({
  audioName,
  category,
}: {
  audioName: string;
  category: string;
}) {
  // some category names have more than one word
  const categoryJoined = category.replaceAll(" ", "_");
  // console.log(categoryJoined);

  // creates a new audio object and plays it
  const handlePlay = () => {
    // console.log(`/pronunciation/${categoryJoined}/${audioName}.mp3`);
    const audio = new Audio(
      `/pronunciation/${categoryJoined}/${audioName}.mp3`
    );
    audio
      .play()
      .catch((error) => console.error("Audio playback failed:", error));
  };

  return (
    <div className="flex justify-end">
      <button onClick={handlePlay}>
        <FontAwesomeIcon icon={faVolumeHigh} />
      </button>
    </div>
  );
}
