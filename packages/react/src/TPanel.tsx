import { createComponent } from "@lit/react";
import React, { type FunctionComponent } from "react";
import { TPanel as TPanelElement } from "tomas-designsystem";
import type { TWebComponentProps } from "./types/TWebComponentProps.js";

export type TPanelProps = TWebComponentProps<{}, {}>;

export const TPanel: FunctionComponent<TPanelProps> = createComponent<TPanelElement>({
  tagName: "t-panel",
  elementClass: TPanelElement,
  react: React,
});
