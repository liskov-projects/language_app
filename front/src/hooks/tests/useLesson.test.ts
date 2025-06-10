import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { WordsContext } from '../../context/WordsContext';
import { UserDataContext } from '../../context/UserDataContext';

// Mock data
const mockWords = [
  { word: 'apple', category: 'fruit', id: 1, example: null, translation: 'Apfel', translationExample: null, pronunciation: '', picture: null },
  { word: 'banana', category: 'fruit', id: 2, example: null, translation: 'Banane', translationExample: null, pronunciation: '', picture: null },
];

const mockUserProgress = {
  userID: '1',
  wordsProgress: [],
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter initialEntries={['/lesson/fruit']}>
    <WordsContext.Provider value={{ words: mockWords }}>
      <UserDataContext.Provider value={{
        userProgress: mockUserProgress,
        setUserProgress: vi.fn(),
        currentUser: null,
        login: vi.fn(),
        logout: vi.fn(),
        isLoggedIn: true,
        saveLessonProgress: vi.fn(),
        fetchUserProgress: vi.fn(),
      }}>
        <Routes>
          <Route path="/lesson/:category" element={children} />
        </Routes>
      </UserDataContext.Provider>
    </WordsContext.Provider>
  </MemoryRouter>
);

describe('useLesson', () => {
  it('should initialize with the first word', () => {
    const { result } = renderHook(() => useLesson(), { wrapper });
    expect(result.current.currentWord.word).toBe('apple');
  });

  it('should handle correct answer', () => {
    const { result } = renderHook(() => useLesson(), { wrapper });
    act(() => {
      result.current.handleAnswerSubmit('correct');
    });
    expect(result.current.feedback).toBe('Well Done!');
    expect(result.current.correctCount).toBe(1);
  });

  it('should handle incorrect answer', () => {
    const { result } = renderHook(() => useLesson(), { wrapper });
    act(() => {
      result.current.handleAnswerSubmit('incorrect');
    });
    expect(result.current.feedback).toBe('Try again!');
    expect(result.current.correctCount).toBe(0);
  });

  it('should go to next task', () => {
    const { result } = renderHook(() => useLesson(), { wrapper });
    act(() => {
      result.current.handleNextTask();
    });
    expect(result.current.index).toBe(1);
    expect(result.current.currentWord.word).toBe('banana');
  });

  it('should restart the lesson', () => {
    const { result } = renderHook(() => useLesson(), { wrapper });
    act(() => {
      result.current.handleNextTask();
      result.current.handleRestart();
    });
    expect(result.current.index).toBe(0);
    expect(result.current.correctCount).toBe(0);
    expect(result.current.lessonComplete).toBe(false);
  });
});