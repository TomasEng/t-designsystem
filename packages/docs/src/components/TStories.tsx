import * as React from "react";
import { extractExtendedStories } from "../utils/extractExtendedStories";
import { TStory } from "./TStory";

export type TStoriesProps = {
  of: Record<string, unknown>;
};

export function TStories({ of }: TStoriesProps): React.ReactNode {
  return Object.entries(extractExtendedStories(of)).map(([key, story]) => <TStory key={key} of={story} />);
}
