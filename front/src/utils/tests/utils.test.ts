import { describe, it, expect, vi } from 'vitest';
import { handleCheck, getRandomTask } from "../utils";

describe('handleCheck', () => {
  it('should call onAnswer with "correct" when selected matches answer', () => {
    const mockFn = vi.fn();
    handleCheck('apple', 'apple', mockFn);
    expect(mockFn).toHaveBeenCalledWith(true);
  });

  it('should call onAnswer with "incorrect" when selected does not match answer', () => {
    const mockFn = vi.fn();
    handleCheck('apple', 'banana', mockFn);
    expect(mockFn).toHaveBeenCalledWith(false);
  });

  it('should not call onAnswer if selected is null', () => {
    const mockFn = vi.fn();
    handleCheck(null, 'apple', mockFn);
    expect(mockFn).not.toHaveBeenCalled();
  });
});

describe('getRandomTask', () => {
  it('should return a string', () => {
    const result = getRandomTask()
    expect(typeof result).toBe("string")
  })
})
