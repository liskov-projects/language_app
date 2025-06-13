import React from "react";
import useLesson from "../useLesson";
//
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

// test data
const mockWords = [
  { word: "apple", category: "fruit" },
  { word: "banana", category: "fruit" },
];

// instead of `const mockProgress = { wordsProgress: [], };` as a factory func it will ensure fresh data and test isonlation
const getMockProgress = () => ({
  //  userid?
  wordsProgress: [],
});

// if we want to reset our state before every test we need to define its setter here
const setUserProgress = vi.fn();

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
    userProgress: getMockProgress(),
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

// ressets the userProgress state for each test
let result: ReturnType<typeof renderHook>["result"];
beforeEach(() => {
  setUserProgress.mockClear();
  // resets mockProgress
  const hook = renderHook(() => useLesson(), { wrapper });
  result = hook.result;
});

describe("useLesson", () => {
  //nested structure to improve readability
  describe("handleAnswerSubmit", () => {
    it("should handle the correct answer", () => {
      //  runs the hook in the routing context, so it can work as if it’s inside the app | vaguely similar to how we call it in components
      const { result } = renderHook(() => useLesson(), { wrapper });
      // calls the hook function
      act(() => {
        result.current.handleAnswerSubmit(true);
      });
      //  asserts
      expect(result.current.feedback).toBe("Well Done!");
      expect(result.current.correctCount).toBe(1);
    });

    it("should handle INcorrect answer", () => {
      const { result } = renderHook(() => useLesson(), { wrapper });

      act(() => {
        result.current.handleAnswerSubmit(false);
      });

      expect(result.current.feedback).toBe("Try again!");
      expect(result.current.correctCount).toBe(0);
    });
  });
});
