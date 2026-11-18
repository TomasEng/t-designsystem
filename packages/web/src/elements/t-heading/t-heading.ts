import { css, html, LitElement, nothing, unsafeCSS, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "../../utils/customElement.ts";
import linkCss from "../t-link/t-link.css?inline";
import headingCss from "./t-heading.css?inline";
import type { THeadingAttributes, THeadingLevel } from "../../types/element-types.ts";

@customElement("t-heading")
export class THeading extends LitElement implements Readonly<THeadingAttributes> {
  @property({ type: Number }) level: THeadingLevel = 1;
  @property({ type: String, reflect: true }) override id = "";

  render(): TemplateResult {
    return html`
      <header class="wrapper level-${this.level}" role="presentation">
        <div class="main-line">
          ${this.renderHeading()} ${this.id ? html`<a class="t-link hashlink" href=${`#${this.id}`}>#</a>` : nothing}
        </div>
        <slot name="note"></slot>
      </header>
    `;
  }

  private renderHeading(): TemplateResult {
    switch (this.level) {
      case 2:
        return html`<h2><slot></slot></h2>`;
      case 3:
        return html`<h3><slot></slot></h3>`;
      case 4:
        return html`<h4><slot></slot></h4>`;
      case 5:
        return html`<h5><slot></slot></h5>`;
      case 6:
        return html`<h6><slot></slot></h6>`;
      default:
        return html`<h1><slot></slot></h1>`;
    }
  }

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
    unsafeCSS(headingCss),
    unsafeCSS(linkCss),
  ];
}
