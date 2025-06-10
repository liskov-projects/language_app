export interface TypeWord {
  id: number;
  word: string;
  example: string | null;
  translation: string;
  translationExample: string | null;
  category: string;
  pronunciation: string;
  picture: string | null;
}

export interface TypeUser {
  id: string | null;
  username: string;
  password: string;
  userProgress?: TypeUserProgress[];
  lastLoggedIn?: string | null;
}

export interface TypeUserProgress {
  userID: string;
  wordsProgress: TypeWordProgress[] | [];
}

export interface TypeWordProgress {
  // TODO: clean up
  box:  number;
  word: string;
  category: string;
  // prob not needed
  lastReviewed?: Date;
  nextReview?: Date;
}

export interface TypeCategory {
  name: string;
  translation: string;
}

// export interface TypeLessonResult {
//   word: string;
//   result: boolean | null; 
// }

export type TBlobButton = {
  label: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  textColour?: string;
};

export interface TypeUserDataContext {
  userProgress: TypeUserProgress | null;
  setUserProgress: React.Dispatch<React.SetStateAction<TypeUserProgress | null>>;
  currentUser: TypeUser | null;

  login: (userData: TypeUser) => void;
  logout: () => void;
  isLoggedIn: boolean;
  // REVIEW:
  saveLessonProgress: (lessonResults: TypeUserProgress | null, userId: string) => void;
  fetchUserProgress: (userId: string) => void;
}
