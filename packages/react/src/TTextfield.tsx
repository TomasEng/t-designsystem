import { createComponent } from "@lit/react";
import React, { type FunctionComponent } from "react";
import { TTextfield as TTextfieldElement } from "t-designsystem";
import type { TTextfieldAttributes, TTextfieldEvent } from "t-designsystem";
import type { EventList } from "./types/EventList.js";
import type { TWebComponentProps } from "./types/TWebComponentProps.js";

export type TTextFieldProps = TWebComponentProps<TTextfieldAttributes, TTextfieldEvent>;

const textfieldEventList: EventList<TTextfieldEvent> = {
  onTInput: "t-input",
  onTChange: "t-change",
  onTKeyup: "t-keyup",
  onTKeydown: "t-keydown",
  onTFocus: "t-focus",
  onTBlur: "t-blur",
};
export const TTextField: FunctionComponent<TTextFieldProps> = createComponent<TTextfieldElement>({
  tagName: "t-textfield",
  elementClass: TTextfieldElement,
  react: React,
  events: textfieldEventList,
});
