import { createComponent } from "@lit/react";
import React, { type FunctionComponent } from "react";
import { THeading as THeadingElement, type THeadingAttributes } from "tomas-designsystem";
import type { TWebComponentProps } from "./types/TWebComponentProps.js";

export type THeadingProps = TWebComponentProps<THeadingAttributes, {}>;

export const THeading: FunctionComponent<THeadingProps> = createComponent<THeadingElement>({
  tagName: "t-heading",
  elementClass: THeadingElement,
  react: React,
  events: {},
});
