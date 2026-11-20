import { createComponent } from "@lit/react";
import React, { type FunctionComponent } from "react";
import { TIframe as TIframeElement } from "tomas-designsystem";
import type { TIframeAttributes } from "tomas-designsystem";
import type { TWebComponentProps } from "./types/TWebComponentProps.js";

export type TIframeProps = TWebComponentProps<TIframeAttributes, {}>;

export const TIframe: FunctionComponent<TIframeProps> = createComponent<TIframeElement>({
  tagName: "t-iframe",
  elementClass: TIframeElement,
  react: React,
});
