import { spread } from "@open-wc/lit-helpers";
import { LitElement, type TemplateResult, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Assert } from "../../utils/Assert.ts";
import cssString from "./t-button.css?inline";
import type { ClassInfo } from "lit/directives/class-map.js";

export type TButtonVariant = "default" | "transparent" | "link" | "without-background";

export type TButtonClasses = {
  readonly variant?: TButtonVariant;
};

export type TButtonAttributes = TButtonClasses & {
  readonly buttonAttributes?: Record<string, unknown>;
  readonly focusable?: boolean;
  readonly type?: "button" | "submit" | "reset";
  readonly disabled?: boolean;
};

@customElement("t-button")
export class TButton extends LitElement implements Required<TButtonAttributes> {
  @property({ type: Object }) buttonAttributes: Record<string, unknown> = {};
  @property({ type: String }) variant: TButtonVariant = "default";
  @property({ type: Boolean }) focusable: boolean = true;
  @property({ type: String }) type: "button" | "submit" | "reset" = "button";
  @property({ type: Boolean }) disabled: boolean = false;

  #internals = this.attachInternals();

  static formAssociated = true;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  private handleClick(e: MouseEvent): void {
    this.dispatchEvent(new CustomEvent("tclick", { detail: e }));
    if (this.type === "submit") {
      this.#internals.form?.requestSubmit();
    }
  }

  private handleFocus(e: FocusEvent): void {
    this.dispatchEvent(new CustomEvent("tfocus", { detail: e }));
  }

  private handleBlur(e: FocusEvent): void {
    this.dispatchEvent(new CustomEvent("tblur", { detail: e }));
  }

  focusOnButton(): void {
    this.button.focus();
  }

  get button(): HTMLButtonElement {
    const button = this.shadowRoot?.querySelector("button");
    Assert.notNullNorUndefined(button);
    return button;
  }

  render(): TemplateResult {
    const tabIndex = this.focusable ? 0 : -1;
    const classes: ClassInfo = {
      "t-button": true,
      [this.variant]: true,
    };

    return html`
      <button
        class=${classMap(classes)}
        part="button"
        tabindex=${tabIndex}
        type=${this.type}
        ?disabled=${this.disabled}
        @blur=${this.handleBlur}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        ${spread(this.buttonAttributes)}
      >
        <slot name="icon" aria-hidden="true"></slot>
        <slot></slot>
      </button>
    `;
  }

  static styles = css`
    ${unsafeCSS(cssString)}
  `;
}
