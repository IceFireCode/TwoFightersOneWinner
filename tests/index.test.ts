// tests/index.test.ts
import { helloWorld } from "../src/";

describe('helloWorld function', () => {
  describe('in scenario A', () => {
    it('should return a hello message', () => {
      expect(helloWorld()).toBe('Hello, world!');
    });
  })
});