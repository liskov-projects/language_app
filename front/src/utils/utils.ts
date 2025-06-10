export default function getRandomTask() {
    const tasks = ["matchPicture", "writeWord", "fillGaps"];
    return tasks[Math.floor(Math.random() * tasks.length)]
}