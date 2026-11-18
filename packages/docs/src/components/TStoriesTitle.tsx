import * as React from "react";
import { THeading } from "tomas-designsystem-react";
import { StoriesUtils } from "../utils/StoriesUtils";

export type TStoriesTitleProps = {
  of: Record<string, unknown>;
};

export function TStoriesTitle({ of }: TStoriesTitleProps): React.ReactNode {
  return <THeading level={1}>{StoriesUtils.extractTitle(of)}</THeading>;
}
