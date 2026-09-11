import { html, type TemplateResult } from "lit";

export function iconTemplate(innerSvg: TemplateResult<2>, slot?: string): TemplateResult<1> {
  return html`
    <svg
      fill="none"
      focusable="false"
      height="1em"
      slot=${slot}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${innerSvg}
    </svg>
  `;
}
