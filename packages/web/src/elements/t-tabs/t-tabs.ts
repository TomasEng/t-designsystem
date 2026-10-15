import { LitElement, html, css, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { TTabsAttributes } from "../../types/element-types.ts";
import type { TTab } from "../t-tab/t-tab.ts";

@customElement("t-tabs")
export class TTabs extends LitElement implements Readonly<TTabsAttributes> {
  @state() private selectedIndex = 0;
  @state() private focusableIndex = 0;
  @state() private tabList: TTab[] = [];

  get tabs(): NodeListOf<HTMLButtonElement> {
    return this.renderRoot.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  }

  protected willUpdate(): void {
    if (!this.hasUpdated) {
      this.tabList = Array.from(this.querySelectorAll<TTab>("t-tab"));
    }
  }

  selectTab(index: number): void {
    this.focusableIndex = index;
    this.selectedIndex = index;
  }

  moveFocus(index: number): void {
    const tab = this.tabs[index];

    if (!tab) {
      return;
    }

    this.focusableIndex = index;
    tab.focus();
  }

  moveFocusLeft(): void {
    if (this.focusableIndex > 0) {
      this.moveFocus(this.focusableIndex - 1);
    }
  }

  moveFocusRight(): void {
    if (this.focusableIndex < this.tabs.length - 1) {
      this.moveFocus(this.focusableIndex + 1);
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        this.moveFocusLeft();
        break;

      case "ArrowRight":
        event.preventDefault();
        this.moveFocusRight();
        break;
    }
  }

  protected render(): TemplateResult<1> {
    return html`
      <div class="t-tabs">
        <div role="tablist">
          ${this.tabList.map(
            (tab, index) => html`
              <button
                type="button"
                id=${`tab-${index}`}
                role="tab"
                aria-controls=${`panel-${index}`}
                aria-selected=${this.selectedIndex === index ? "true" : "false"}
                tabindex=${this.focusableIndex === index ? 0 : -1}
                @click=${(): void => this.selectTab(index)}
                @keydown=${this.handleKeyDown}
              >
                ${tab.heading}
              </button>
            `,
          )}
        </div>
        ${this.tabList.map(
          (tab, index) => html`
            <t-panel
              id=${`panel-${index}`}
              role="tabpanel"
              aria-labelledby=${`tab-${index}`}
              class=${this.selectedIndex === index ? "active" : "inactive"}
            >
              ${tab}
            </t-panel>
          `,
        )}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .t-tabs {
      --bottom-shadow-inset: color-mix(in oklab, transparent 92%, white) inset 0 -1px;
      --bottom-shadow: var(--bottom-shadow-inset);
      --heading-colour: var(--t-colour-panel-heading);
      --selected-colour: var(--t-colour-panel-heading);
      --tab-margin: 3px;
      --top-shadow-inset: color-mix(in oklab, transparent 92%, black) inset 0 1px;
      --top-shadow: var(--top-shadow-inset);

      [role="tablist"] {
        background-color: var(--heading-colour);
        border-top-left-radius: var(--t-size-border-radius-default);
        border-top-right-radius: var(--t-size-border-radius-default);
        box-shadow: var(--top-shadow);
        height: calc(var(--t-size-clickable-area) + var(--tab-margin));

        [role="tab"] {
          background: var(--selected-colour);
          border-top-left-radius: var(--t-size-border-radius-default);
          border-top-right-radius: var(--t-size-border-radius-default);
          border-width: 0;
          box-sizing: border-box;
          color: var(--t-colour-font);
          cursor: pointer;
          font-size: var(--t-size-font);
          height: var(--t-size-clickable-area);
          margin-left: var(--tab-margin);
          margin-top: var(--tab-margin);
          padding: 0.5rem;

          &[aria-selected="true"] {
            background-attachment: fixed;
            background-image: var(--t-image-panel-background);
            background-size: 100vw 100vh;
          }

          &[aria-selected="false"]:not(:hover) {
            color: color-mix(in oklab, var(--t-colour-font) 75%, var(--t-colour-page-background));
          }
        }
      }

      [role="tabpanel"] {
        background-image: var(--t-image-panel-background);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        box-shadow: var(--bottom-shadow);

        &.inactive {
          display: none;
        }
      }
    }
  `;
}
