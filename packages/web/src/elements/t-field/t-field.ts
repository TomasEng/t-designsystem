import { LitElement, type TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export type FieldDirection = "column" | "row";

@customElement("t-field")
export class TField extends LitElement {
  @property({ type: String }) fielddirection: FieldDirection = "column";

  render(): TemplateResult {
    return html`
      <div class="wrapper ${this.fielddirection}">
        <slot name="label"></slot>
        <slot name="input"></slot>
      </div>
    `;
  }

  static styles = css`
    .wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--t-spacing-relative-in-group);
    }

    .wrapper.row {
      flex-direction: row;
    }
  `;
}
