import { css, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "../../utils/customElement.ts";
import type { TTabAttributes } from "../../types/element-types.ts";

@customElement("t-tab")
export class TTab extends LitElement implements Readonly<TTabAttributes> {
  @property({ type: String })
  heading = "";

  @property({ type: String })
  name = "";

  protected createRenderRoot(): HTMLElement {
    return this;
  }

  protected render(): symbol {
    return nothing;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
