import { createComponent } from "@lit/react";
import React, { type FunctionComponent } from "react";
import { TCode as TCodeElement } from "tomas-designsystem";
import type { TCodeAttributes } from "tomas-designsystem";
import type { TWebComponentProps } from "./types/TWebComponentProps.js";

export type TCodeProps = TWebComponentProps<TCodeAttributes, {}>;

export const TCode: FunctionComponent<TCodeProps> = createComponent<TCodeElement>({
  tagName: "t-code",
  elementClass: TCodeElement,
  react: React,
});
