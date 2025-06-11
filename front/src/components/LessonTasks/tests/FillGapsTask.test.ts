import { describe, it, expect } from 'vitest';
import { getGapSentence } from "../FillGapsTask";

describe('getGapSentence', () => {
  it('should replace exact word with underscores', () => {
    const result = getGapSentence("The quick brown fox jumps over the lazy dog", "fox");
    expect(result).toBe("The quick brown _____ jumps over the lazy dog");
  });

  it('should be case-insensitive when replacing', () => {
    const result = getGapSentence("The Fox is clever. A FOX can be tricky.", "fox");
    expect(result).toBe("The _____ is clever. A _____ can be tricky.");
  });

  it('should not replace part of another word', () => {
    const result = getGapSentence("The boxing match was intense", "box");
    expect(result).toBe("The boxing match was intense");
  });

  it('should return original sentence if word not found', () => {
    const result = getGapSentence("The quick brown fox", "cat");
    expect(result).toBe("The quick brown fox");
  });

  it('should return empty string if example is empty', () => {
    const result = getGapSentence("", "fox");
    expect(result).toBe("");
  });

  it('should handle multiple occurrences', () => {
    const result = getGapSentence("fox fox fox", "fox");
    expect(result).toBe("_____ _____ _____");
  });
});
