import { Story } from "@storybook/addon-docs/blocks";
import * as React from "react";
import { THeading } from "tomas-designsystem-react";
import styles from "./TStory.module.css";
import { TStoryCode } from "./TStoryCode";
import type { ExtendedStory } from "../types/ExtendedStory";

export type TStoryProps = {
  of: ExtendedStory;
};

export function TStory({ of }: TStoryProps): React.ReactNode {
  return (
    <div className={styles.story}>
      <THeading level={3}>{of.name}</THeading>
      <Story of={of} />
      <TStoryCode of={of} />
    </div>
  );
}
