export function classNames(names: (string | null | undefined)[]): string {
  const notNullClasses = names.filter((name) => !!name);
  return notNullClasses.join(" ");
}
