import { createComponent } from "@lit/react";
import React, { type FunctionComponent } from "react";
import { TTabs as TTabsElement, type TTabsAttributes } from "tomas-designsystem";
import type { TWebComponentProps } from "./types/TWebComponentProps.js";

export type TTabsProps = TWebComponentProps<TTabsAttributes, {}>;

export const TTabs: FunctionComponent<TTabsProps> = createComponent<TTabsElement>({
  tagName: "t-tabs",
  elementClass: TTabsElement,
  react: React,
  events: {},
});
