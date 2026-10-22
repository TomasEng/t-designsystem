import type { ExtendedStory } from "../types/ExtendedStory.ts";

export function extractExtendedStories(module: Record<string, unknown>): Record<string, ExtendedStory> {
  const entries = Object.entries(module).filter(([, e]) => isExtendedStory(e)) as [string, ExtendedStory][];
  return Object.fromEntries(entries);
}

function isExtendedStory(e: unknown): e is ExtendedStory {
  return (
    typeof e === "object" &&
    e !== null &&
    Object.prototype.hasOwnProperty.call(e, "htmlCode") &&
    Object.prototype.hasOwnProperty.call(e, "reactCode")
  );
}
