import React, { type ButtonHTMLAttributes } from "react";
import { classNames } from "./utils.js";
import type { TButtonClasses } from "tomas-designsystem";

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & TButtonClasses;

export function TButton({ className: givenClass, variant, ...rest }: TButtonProps): React.ReactElement {
  return <button className={classNames(["t-button", variant, givenClass])} {...rest} />;
}
