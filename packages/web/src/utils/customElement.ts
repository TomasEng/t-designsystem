// src/utils/custom-element.ts
import { customElement as litCustomElement } from "lit/decorators.js";

export function customElement(tagName: string): (target: Parameters<ReturnType<typeof litCustomElement>>[0]) => void {
  return function (target: Parameters<ReturnType<typeof litCustomElement>>[0]) {
    if (!customElements.get(tagName)) {
      litCustomElement(tagName)(target);
    }
  };
}
