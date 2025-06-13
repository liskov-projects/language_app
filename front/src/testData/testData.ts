import { TypeUserProgress, TypeWord } from "../Types";

export const mockWords: TypeWord[] = [
  {
    id: 1,
    word: "apple",
    category: "fruit",
    example: "I eat an apple every day.",
    translation: "manzana",
    translationExample: "Como una manzana cada día.",
    pronunciation: "///",
    picture: "apple.jpg",
  },
  {
    id: 2,
    word: "banana",
    category: "fruit",
    example: "Bananas are yellow.",
    translation: "plátano",
    translationExample: "Los plátanos son amarillos.",
    pronunciation: "///",
    picture: "banana.jpg",
  },
];

export const mockUserProgress: TypeUserProgress = {
  userID: "user1",
  wordsProgress: [
    { word: "apple", box: 2, category: "fruit" },
    { word: "carrot", box: 3, category: "vegetable" },
  ],
};