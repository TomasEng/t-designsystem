import { LitElement, type TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../t-field/index.ts";
import { Assert } from "../../utils/Assert.ts";
import type { EventName } from "../../types/EventName.ts";

export type TTextfieldAttributes = {
  readonly name?: string;
  readonly label?: string;
  readonly value?: string;
  readonly disabled?: boolean;
};

export type TTextfieldEventName = EventName<keyof TTextfieldEvent>;
export type TTextfieldEvent = {
  input: TInputEvent;
  change: TInputEvent;
  keydown: TKeyboardEvent;
  keyup: TKeyboardEvent;
  focus: TFocusEvent;
  blur: TFocusEvent;
};
export type TInputEvent = { value: string };
export type TKeyboardEvent = { key: string; value: string };
export type TFocusEvent = { value: string };

@customElement("t-textfield")
export class TTextfield extends LitElement implements TTextfieldAttributes {
  @property({ type: String }) name: string = "";
  @property({ type: String }) label: string = "";
  @property({ type: String }) value: string = "";
  @property({ type: Boolean }) disabled: boolean = false;

  static formAssociated = true;
  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  get input(): HTMLInputElement {
    const input = this.shadowRoot?.querySelector("input");
    Assert.notNullNorUndefined(input);
    return input;
  }

  private handleInput(): void {
    const { value } = this.input;
    this.internals.setFormValue(value);
    this.dispatchEvent(new CustomEvent<TInputEvent>("t-input", { detail: { value } }));
  }

  private handleChange(): void {
    const { value } = this.input;
    this.dispatchEvent(new CustomEvent<TInputEvent>("t-change", { detail: { value } }));
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const { value } = this.input;
    this.dispatchEvent(new CustomEvent<TKeyboardEvent>("t-keydown", { detail: { value, key: e.key } }));
  }

  private handleKeyUp(e: KeyboardEvent): void {
    const { value } = this.input;
    this.dispatchEvent(new CustomEvent<TKeyboardEvent>("t-keyup", { detail: { value, key: e.key } }));
  }

  private handleFocus(): void {
    const { value } = this.input;
    this.dispatchEvent(new CustomEvent<TFocusEvent>("t-focus", { detail: { value } }));
  }

  private handleBlur(): void {
    const { value } = this.input;
    this.dispatchEvent(new CustomEvent<TFocusEvent>("t-blur", { detail: { value } }));
  }

  render(): TemplateResult {
    return html`
      <t-field>
        <label for="input" slot="label">${this.label}</label>
        <input
          id="input"
          name=${this.name}
          slot="input"
          type="text"
          value=${this.value}
          ?disabled=${this.disabled}
          @blur=${this.handleBlur}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
          @keyup=${this.handleKeyUp}
        />
      </t-field>
    `;
  }

  static styles = css`
    input {
      --border-width: 1px;
      --height: var(--t-size-clickable-area);
      --padding: calc((var(--height) - var(--t-size-font)) / 2 - var(--border-width));
      background-color: var(--t-colour-input-field-background);
      border-radius: 6px;
      border: var(--border-width) solid var(--t-colour-base-high-contrast);
      box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      color: var(--t-colour-font);
      font-family: var(--t-font-family), sans-serif;
      font-size: var(--t-size-font);
      height: var(--height);
      line-height: var(--height);
      outline: none;
      padding-block: 0;
      padding-inline: var(--padding);
      transition: var(--t-transition-duration-medium);
    }

    input:focus {
      background-color: var(--t-colour-page-background);
      box-shadow: color-mix(in oklab, var(--t-colour-base-high-contrast) 20%, transparent) 0 0 24px;
    }

    input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    input::selection {
      background-color: var(--t-selection-background-colour);
      color: var(--t-selection-font-colour);
    }

    label {
      color: var(--t-colour-font);
      font-family: var(--t-font-family), sans-serif;
      font-size: var(--t-size-font);
    }
  `;
}
