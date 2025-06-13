import { TypeUserProgress, TypeWord, TypeWordProgress } from "../Types";

export function getRandomTask() {
    const tasks = ["matchPicture", "writeWord", "fillGaps"];
    return tasks[Math.floor(Math.random() * tasks.length)]
}

// For TEST:
export function handleCheck(selected: string | null, answer: string, onAnswer: (result: boolean) => void) {
    if (!selected) return;
    onAnswer(selected === answer);
}

//  NEW: used to be in the useLesson hook (addWordToProgress & updateBox)
  export function addWordToProgress (userProgress: TypeUserProgress | null, currentWord: TypeWord){
    if (!userProgress || !currentWord) return;

    const exists = userProgress.wordsProgress.some(
      (item) => item.word === currentWord.word
    );

    if(exists) return;
    
    return {
        ...userProgress,
        wordsProgress: [
            ...userProgress.wordsProgress,
            {
              word: currentWord.word,
              box: 1,
              category: currentWord.category,
            },
          ],
     };
  };

 export function updateBox (userProgress: TypeUserProgress, currentWord: TypeWord, result: string)  {
      if (!userProgress || !currentWord) return userProgress;

      const wordIndex = userProgress.wordsProgress.findIndex(
        (item) => item.word === currentWord.word
      );

      // only updates if the word is already in progress
      if (wordIndex === -1) return userProgress;

      const updatedWordsProgress = userProgress.wordsProgress.map((item, idx) => {
        if (idx !== wordIndex) return item;

        const newBox  = calculateNextBox(item, result)

        return { ...item, box: newBox };
      });

      return {
        ...userProgress,
        wordsProgress: updatedWordsProgress,
      };
  };

//    helper for updateBox
  function calculateNextBox(item: TypeWordProgress, result: string){
        let newBox = 0;
        if (result === "correct") newBox = item.box < 5 ? item.box + 1 : 5;
        else newBox = 1 < item.box ? item.box - 1 : 1;
  }