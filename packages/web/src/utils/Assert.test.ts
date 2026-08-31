import { describe, it, expect } from "vitest";
import { Assert } from "./Assert.ts";

describe('Assert', () => {
  describe('notUndefined', () => {
    it('Throws an error when the value is undefined', () => {
      expect(() => Assert.notUndefined(undefined)).toThrow();
    });

    it.each([null, true, false, 0, 1, '', 'abc'])('Does not throw when the value is %s', (value) => {
      expect(() => Assert.notUndefined(value)).not.toThrow();
    });
  });

  describe('notNull', () => {
    it('Throws an error when the value is null', () => {
      expect(() => Assert.notNull(null)).toThrow();
    });

    it.each([undefined, true, false, 0, 1, '', 'abc'])('Does not throw when the value is %s', (value) => {
      expect(() => Assert.notNull(value)).not.toThrow();
    });
  });

  describe('notNullNorUndefined', () => {
    it.each([null, undefined])('Throws an error when the value is %s', (value) => {
      expect(() => Assert.notNullNorUndefined(value)).toThrow();
    });

    it.each([true, false, 0, 1, '', 'abc'])('Does not throw when the value is %s', (value) => {
      expect(() => Assert.notNull(value)).not.toThrow();
    });
  });
});