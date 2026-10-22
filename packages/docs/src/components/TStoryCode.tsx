import { DocsContext, useOf } from "@storybook/addon-docs/blocks";
import * as React from "react";
import { TCode, TTab, TTabs } from "tomas-designsystem-react";
import type { ExtendedStory } from "../types/ExtendedStory";

export type TStoryCodeProps = {
  of: ExtendedStory;
};

export function TStoryCode({ of }: TStoryCodeProps): React.ReactElement {
  const docsContext = React.useContext(DocsContext);
  const { story } = useOf(of, ["story"]);
  const context = docsContext.getStoryContext(story);

  return (
    <TTabs>
      <TTab heading="HTML">
        <TCode mode="block" language="html" code={of.htmlCode(context.args, context)} />
      </TTab>
      <TTab heading="React">
        <TCode mode="block" code={of.reactCode(context.args, context)} />
      </TTab>
    </TTabs>
  );
}
