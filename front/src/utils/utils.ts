export function getRandomTask() {
    const tasks = ["matchPicture", "writeWord", "fillGaps"];
    return tasks[Math.floor(Math.random() * tasks.length)]
}

// For TEST:
export function handleCheck(selected: string | null, answer: string, onAnswer: (result: boolean) => void) {
    if (!selected) return;
    onAnswer(selected === answer);
}