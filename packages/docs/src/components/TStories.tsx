import * as React from "react";
import { StoriesUtils } from "../utils/StoriesUtils";
import { TStory } from "./TStory";

export type TStoriesProps = {
  of: Record<string, unknown>;
};

export function TStories({ of }: TStoriesProps): React.ReactNode {
  return Object.entries(StoriesUtils.extractExtendedStories(of)).map(([key, story]) => <TStory key={key} of={story} />);
}
