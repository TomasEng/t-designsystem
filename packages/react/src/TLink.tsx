import React, { type AnchorHTMLAttributes } from "react";
import { classNames } from "./utils.js";
import type { TLinkClasses } from "tomas-designsystem";

export type TLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & TLinkClasses;

export function TLink({ className: givenClass, ...rest }: TLinkProps): React.ReactElement {
  return <a className={classNames(["t-link", givenClass])} {...rest} />;
}
