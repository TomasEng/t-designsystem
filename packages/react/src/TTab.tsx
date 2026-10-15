import { createComponent } from "@lit/react";
import React, { type FunctionComponent } from "react";
import { TTab as TTabElement, type TTabAttributes } from "tomas-designsystem";
import type { TWebComponentProps } from "./types/TWebComponentProps.js";

export type TTabProps = TWebComponentProps<TTabAttributes, {}>;

export const TTab: FunctionComponent<TTabProps> = createComponent<TTabElement>({
  tagName: "t-tab",
  elementClass: TTabElement,
  react: React,
  events: {},
});
