import * as React from "react";
import { StoriesUtils } from "../utils/StoriesUtils";

export type TStoriesTitleProps = {
  of: Record<string, unknown>;
};

export function TStoriesTitle({ of }: TStoriesTitleProps): React.ReactNode {
  return <h1>{StoriesUtils.extractTitle(of)}</h1>;
}
