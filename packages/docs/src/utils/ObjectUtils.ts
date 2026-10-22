export class ObjectUtils {
  static removeProperty<T>(key: string, object: { [s: string]: T }): { [s: string]: T } {
    return Object.fromEntries(Object.entries(object).filter(([k]) => k !== key));
  }

  static removeUndefined<T>(obj: { [s: string]: T }): { [s: string]: Exclude<undefined, T> } {
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v !== undefined) as [string, Exclude<undefined, T>][],
    );
  }
}
