import { html, css, LitElement, type PropertyValues, type TemplateResult } from "lit";
import { Assert } from "../../utils/Assert.ts";
import { customElement } from "../../utils/customElement.ts";
import type { TPanelAttributes } from "../../types/element-types.ts";

@customElement("t-panel")
export class TPanel extends LitElement implements Readonly<TPanelAttributes> {
  get heading(): HTMLDivElement {
    const heading = this.shadowRoot?.querySelector(".heading");
    Assert.notNullNorUndefined(heading);
    return heading as HTMLDivElement;
  }

  updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    const hasHeading = !!this.querySelector('[slot="heading"]');
    const hasIcon = !!this.querySelector('[slot="icon"]');
    const hasHeadingOrIcon = hasHeading || hasIcon;
    if (!hasHeadingOrIcon) {
      this.heading.style.display = "none";
    } else {
      this.heading.style.display = "flex";
    }
  }

  render(): TemplateResult {
    return html`
      <div class="heading">
        <slot name="icon"></slot>
        <slot name="heading"></slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      --top-shadow-inset: color-mix(in oklab, transparent 92%, black) inset 0 1px;
      --bottom-shadow-inset: color-mix(in oklab, transparent 92%, white) inset 0 -1px;
      --top-shadow: var(--top-shadow-inset);
      --bottom-shadow: var(--bottom-shadow-inset);
      --heading-colour: var(--t-colour-panel-heading);

      background-attachment: fixed;
      background-image: var(--t-image-panel-background);
      background-size: 100vw 100vh;
      border-radius: var(--t-size-border-radius-default);
      box-shadow: var(--top-shadow), var(--bottom-shadow);
      color: var(--t-colour-font);
      display: block;
      font-size: var(--t-size-font);
    }

    .heading {
      align-items: center;
      --background-filter-colour: color-mix(in oklab, var(--t-colour-panel-heading) 75%, transparent);
      --background-filter: linear-gradient(var(--background-filter-colour), var(--background-filter-colour));
      background-image: var(--background-filter), var(--t-image-app-background);
      background-size: 100vw 100vh;
      background-attachment: fixed;
      border-top-left-radius: var(--t-size-border-radius-default);
      border-top-right-radius: var(--t-size-border-radius-default);
      box-shadow: var(--top-shadow-inset);
      color: var(--t-colour-base-high-contrast);
      display: flex;
      padding: 0.5rem;
    }

    slot[name="heading"] {
      display: block;
      flex: 1;
      margin-left: 0.5rem;
    }

    .content {
      padding: 1rem;
    }
  `;
}
