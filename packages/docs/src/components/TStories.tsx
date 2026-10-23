import { DocsContext, useOf } from "@storybook/addon-docs/blocks";
import * as React from "react";
import { StoriesUtils } from "../utils/StoriesUtils";
import { TStory } from "./TStory";
import type { StoriesModule } from "../types/StoriesModule";

export type TStoriesProps = {
  of: StoriesModule;
};

export function TStories({ of }: TStoriesProps): React.ReactNode {
  const context = React.useContext(DocsContext);
  const { csfFile } = useOf(of, ["meta"]);

  return StoriesUtils.extendedStoriesFromCsfFile(context, csfFile).map((story) => (
    <TStory key={story.name} of={story} />
  ));
}
