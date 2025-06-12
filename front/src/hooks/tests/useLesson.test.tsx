import React from "react";
import useLesson from "../useLesson";
//
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

// test data
const mockWords = [
  { word: "apple", category: "fruit" },
  { word: "banana", category: "fruit" },
];

const mockProgress = {
  wordsProgress: [],
};

// useLesson consumes the WordsContext hook so we mock it
vi.mock("../../context/WordsContext", () => ({
  useWordsContext: () => ({
    words: mockWords,
    categories: ["fruit"],
  }),
}));

//  useLesson consumes the UseDataContext hook so we mock it
vi.mock("../../context/UserDataContext", () => ({
  useUserDataContext: () => ({
    userProgress: mockProgress,
    setUserProgress: vi.fn(),
  }),
}));

// fakes the router environment so useLesson can get caetgory param from url
function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/lesson/fruit"]}>
      <Routes>
        <Route path="/lesson/:category" element={children} />
      </Routes>
    </MemoryRouter>
  );
}

describe("useLesson", () => {
  // 1
  it("should handle the correct answer with handleAnswerSubmit", () => {
    //  runs the hook in the routing context, so it can work as if it’s inside the app
    const { result } = renderHook(() => useLesson(), { wrapper });
    // calls the hook function
    act(() => {
      result.current.handleAnswerSubmit(true);
    });
    //  asserts
    expect(result.current.feedback).toBe("Well Done!");
    expect(result.current.correctCount).toBe(1);
  });

  // 2
  it("should handle INcorrect answer in handleSubmit", () => {
    const { result } = renderHook(() => useLesson(), { wrapper });

    act(() => {
      result.current.handleAnswerSubmit(false);
    });

    expect(result.current.feedback).toBe("Try again!");
    expect(result.current.correctCount).toBe(0);
  });
});
