import { svg, type TemplateResult } from "lit";
import { iconTemplate } from "./iconTemplate.ts";

export function filesIcon(slot?: string): TemplateResult<1> {
  return iconTemplate(
    svg`
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.25 3.5c0-.69.56-1.25 1.25-1.25H14a.75.75 0 0 1 .53.22l5 5c.141.14.22.331.22.53v8.5c0 .69-.56 1.25-1.25 1.25h-9c-.69 0-1.25-.56-1.25-1.25v-13Zm6.25 5.25c-.69 0-1.25-.56-1.25-1.25V3.75h-3.5v12.5h8.5v-7.5H14.5Zm.25-3.94 2.44 2.44h-2.44V4.81ZM6.502 7.75H5.75v12.5h8.5v-.748a.75.75 0 0 1 1.5 0v.998c0 .69-.56 1.25-1.25 1.25h-9c-.69 0-1.25-.56-1.25-1.25v-13c0-.69.56-1.25 1.25-1.25h1.002a.75.75 0 1 1 0 1.5Z"
        fill="currentColor"
      />
    `,
    slot,
  );
}
