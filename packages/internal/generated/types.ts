export type TInputEvent = { value: string };
export type TKeyboardEvent = { value: string; key: string };
export type TFocusEvent = { value: string };
export type TTextfieldAttributes = { name?: string; label?: string; value?: string; disabled?: boolean };
export type TButtonClasses = { variant?: TButtonVariant };
export type TButtonVariant = "default" | "transparent" | "link" | "without-background";
