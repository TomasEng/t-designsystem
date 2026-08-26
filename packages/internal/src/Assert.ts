export class Assert {
  static isArray(variable: unknown): asserts variable is Array<unknown> {
    if (!Array.isArray(variable)) throw new Error(`Expected value to be array, but it was not.`);
  }
}
