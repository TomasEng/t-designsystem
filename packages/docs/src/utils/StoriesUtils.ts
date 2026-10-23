import type { ExtendedStory } from "../types/ExtendedStory.ts";
import type { StoriesModule } from "../types/StoriesModule.ts";

export class StoriesUtils {
  static extractExtendedStories(module: StoriesModule): Record<string, ExtendedStory> {
    const entries = Object.entries(module).filter(([, e]) => this.isExtendedStory(e)) as [string, ExtendedStory][];
    return Object.fromEntries(entries);
  }

  private static isExtendedStory(e: unknown): e is ExtendedStory {
    return (
      typeof e === "object" &&
      e !== null &&
      Object.prototype.hasOwnProperty.call(e, "htmlCode") &&
      Object.prototype.hasOwnProperty.call(e, "reactCode")
    );
  }

  static extractTitle(module: StoriesModule): string {
    if (this.hasDefault(module) && this.hasTitle(module.default)) {
      const parts = module.default.title.split("/");
      return parts[parts.length - 1];
    } else return "";
  }

  private static hasDefault(module: StoriesModule): module is { default: unknown; [key: string]: unknown } {
    return Object.prototype.hasOwnProperty.call(module, "default");
  }

  private static hasTitle(obj: unknown): obj is { title: string; [key: string]: unknown } {
    return Object.prototype.hasOwnProperty.call(obj, "title");
  }
}
