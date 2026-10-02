export type TInputEvent = { value: string };
export type TKeyboardEvent = { value: string; key: string };
export type TFocusEvent = { value: string };
export type TCodeDisplayMode = "inline" | "block" | "panel" | "heading-panel";
export type TTextfieldAttributes = { name?: string; label?: string; value?: string; disabled?: boolean };
export type TCodeAttributes = {
  code?: string;
  language?: string;
  mode?: TCodeDisplayMode;
  trimmargin?: boolean;
  copyButtonTitle?: string;
};
export type TPanelAttributes = {};
export type TButtonClasses = { variant?: TButtonVariant };
export type TButtonVariant = "default" | "transparent" | "link" | "without-background";
export type TLinkClasses = {};
