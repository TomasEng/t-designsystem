export class Assert {
  static notUndefined<T>(value: T | undefined): asserts value is T {
    if (value === undefined) {
      throw Error(`${value} is undefined.`);
    }
  }

  static notNull<T>(value: T | null): asserts value is T {
    if (value === null) {
      throw Error(`${value} is null.`);
    }
  }

  static notNullNorUndefined<T>(value: T | null | undefined): asserts value is T {
    Assert.notNull(value);
    Assert.notUndefined(value);
  }
}
