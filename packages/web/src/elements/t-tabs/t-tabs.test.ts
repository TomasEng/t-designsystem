import { html, type TemplateResult } from "lit";
import { beforeEach, describe, expect, it, test } from "vitest";
import { type Locator, type UserEvent, userEvent } from "vitest/browser";
import { render, type RenderResult } from "vitest-browser-lit";
import "./t-tabs.ts";
import "../t-tab/t-tab.ts";
import "../t-panel/t-panel.ts";
import "../../properties.css";
import { Assert } from "../../utils/Assert.ts";
import type { TTabs } from "./t-tabs.ts";

const items = [
  { heading: "Første fane", content: "Innhold i første fane" },
  { heading: "Andre fane", content: "Innhold i andre fane" },
  { heading: "Tredje fane", content: "Innhold i tredje fane" },
];
const tabsHtml: TemplateResult<1> = html`
  <t-tabs>${items.map((item) => html`<t-tab heading=${item.heading}>${item.content}</t-tab>`)}</t-tabs>
`;

describe("t-tabs", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("Loads tabs", async () => {
    const view = renderTabs();
    await expect.element(view.getByRole("tablist")).toBeVisible();
    expect(view.getTabs()).toHaveLength(3);
    await Promise.all(items.map((item, index) => view.expectTabToHaveContent(index, item.heading)));
    await expect.element(view.getTabPanel()).toBeVisible();
  });

  it("Selects the first tab by default", async () => {
    const view = renderTabs();
    await view.expectTabToBeSelected(0);
    await view.expectTabNotToBeSelected(1);
    await view.expectTabNotToBeSelected(2);
    await expect.element(view.getTabPanel()).toHaveTextContent(items[0].content);
  });

  it("Selects the clicked tab", async () => {
    const view = renderTabs();
    await view.user.click(view.getNthTab(1));
    await view.expectTabToBeSelected(1);
    await view.expectTabNotToBeSelected(0);
    await view.expectTabNotToBeSelected(2);
    await expect.element(view.getTabPanel()).toHaveTextContent(items[1].content);
  });

  it("Can be navigated with arrow keys", async () => {
    const view = renderTabs();
    await view.user.click(view.getNthTab(0));
    await view.expectFocusedTab(0);
    await view.user.keyboard("{ArrowRight}");
    await view.expectFocusedTab(1);
    await view.expectTabNotToBeSelected(1);
    await view.user.keyboard("{Enter}");
    await view.expectTabToBeSelected(1);
    await view.user.keyboard("{ArrowRight}");
    await view.expectFocusedTab(2);
    await view.user.keyboard("{ArrowRight}");
    await view.expectFocusedTab(2);
    await view.user.keyboard("{ArrowLeft}");
    await view.expectFocusedTab(1);
    await view.user.keyboard("{ArrowLeft}{ArrowLeft}");
    await view.expectFocusedTab(0);
  });

  it("Supports moving focus with the moveFocus method", async () => {
    const view = renderTabs();
    await view.user.click(view.getNthTab(0));
    view.getTabsElement().moveFocus(2);
    await view.expectFocusedTab(2);
  });

  it("Supports moving focus with the moveFocusLeft method", async () => {
    const view = renderTabs();
    await view.user.click(view.getNthTab(2));
    view.getTabsElement().moveFocusLeft();
    await view.expectFocusedTab(1);
  });

  it("Supports moving focus with the moveFocusRight method", async () => {
    const view = renderTabs();
    await view.user.click(view.getNthTab(1));
    view.getTabsElement().moveFocusRight();
    await view.expectFocusedTab(2);
  });

  it("Nothing happens when moveFocus is called with an inexistent index", async () => {
    const view = renderTabs();
    await view.user.click(view.getNthTab(0));
    view.getTabsElement().moveFocus(5);
    await view.expectFocusedTab(0);
  });

  test("There are no errors when no tabs are given", async () => {
    renderTabs(html`<t-tabs></t-tabs>`);
  });
});

type ExtendedRenderResult = RenderResult & {
  user: UserEvent;
  getTabsElement(): TTabs;
  getTabs(): Locator;
  getActiveElement(): HTMLElement | null;
  getNthTab(n: number): Locator;
  getTabPanel(): Locator;
  expectFocusedTab(index: number): Promise<void>;
  expectTabToBeSelected(index: number): Promise<HTMLElement | SVGElement | null | void>;
  expectTabNotToBeSelected(index: number): Promise<HTMLElement | SVGElement | null | void>;
  expectTabToHaveContent(index: number, text: string): Promise<HTMLElement | SVGElement | null | void>;
};

function renderTabs(html: TemplateResult<1> = tabsHtml): ExtendedRenderResult {
  const renderResult = render(html);
  const user = userEvent.setup();
  return {
    ...renderResult,
    user,
    getTabsElement(): TTabs {
      const element: TTabs | null = this.container.querySelector("t-tabs");
      Assert.notNull(element);
      return element;
    },
    getTabs(): Locator {
      return this.getByRole("tab");
    },
    getActiveElement(): HTMLElement | null {
      return this.getTabsElement().shadowRoot!.activeElement as HTMLElement | null;
    },
    getNthTab(n: number): Locator {
      return this.getTabs().nth(n);
    },
    getTabPanel(): Locator {
      return this.getByRole("tabpanel");
    },
    async expectFocusedTab(index: number): Promise<void> {
      return expect.element(this.getActiveElement()).toBe(this.getNthTab(index).element());
    },
    async expectTabToBeSelected(index: number): Promise<HTMLElement | SVGElement | null | void> {
      return expect.element(this.getNthTab(index)).toHaveAttribute("aria-selected", "true");
    },
    async expectTabNotToBeSelected(index: number): Promise<HTMLElement | SVGElement | null | void> {
      return expect.element(this.getNthTab(index)).toHaveAttribute("aria-selected", "false");
    },
    async expectTabToHaveContent(index: number, text: string): Promise<HTMLElement | SVGElement | null | void> {
      return expect.element(this.getNthTab(index)).toHaveTextContent(text);
    },
  };
}
