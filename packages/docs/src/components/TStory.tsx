import { Story } from "@storybook/addon-docs/blocks";
import * as React from "react";
import styles from "./TStory.module.css";
import { TStoryCode } from "./TStoryCode";
import type { ExtendedStory } from "../types/ExtendedStory";

export type TStoryProps = {
  of: ExtendedStory;
};

export function TStory({ of }: TStoryProps): React.ReactNode {
  return (
    <div className={styles.story}>
      <h2>{of.name}</h2>
      <Story of={of} />
      <TStoryCode of={of} />
    </div>
  );
}
