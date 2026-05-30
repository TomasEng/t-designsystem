import { spread } from "@open-wc/lit-helpers";
import * as matchers from "@testing-library/jest-dom/matchers";
import { html } from "lit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "./t-textfield.ts";
import { userEvent } from "vitest/browser";
import "../../properties.css";
import { type RenderResult, render } from "vitest-browser-lit";
import type { Locator, UserEvent } from "vitest/browser";
import type { TTextfieldAttributes } from "./t-textfield.ts";

expect.extend(matchers);

const label = "Lorem ipsum";
const defaultAttributes: TTextfieldAttributes = {
  label,
};

describe("t-textfield", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("Renders a text field with the given label", async () => {
    const view = renderTextfield();
    await view.waitForInputElementToBeVisible();
  });

  it("Calls the t-input event when the user inputs something", async () => {
    const onTInput = vi.fn();
    const view = renderTextfield();
    const text = "test";

    await view.waitForInputElementToBeVisible();
    view.getRootElement().addEventListener("t-input", onTInput);
    await view.type(text);

    await expect.element(view.getInputField()).toHaveValue(text);
    expect(onTInput).toHaveBeenCalledTimes(text.length);
    expect(onTInput).toHaveBeenLastCalledWith(expect.any(CustomEvent));
  });
});

interface ExtendedRenderResult extends RenderResult {
  user: UserEvent;
  getInputField(): Locator;
  waitForInputElementToBeVisible(): Promise<void>;
  getRootElement(): Element;
  type(text: string): Promise<void>;
}

function renderTextfield(attributes: Partial<TTextfieldAttributes> = {}): ExtendedRenderResult {
  const renderResult = render(html`<t-textfield ${spread({ ...defaultAttributes, ...attributes })}></t-textfield>`);
  const user = userEvent.setup();
  return {
    ...renderResult,
    user,
    getInputField(): Locator {
      return renderResult.getByRole("textbox", { name: attributes.label });
    },
    async waitForInputElementToBeVisible(): Promise<void> {
      await expect.element(this.getInputField()).toBeVisible();
    },
    getRootElement(): Element {
      return this.container.children[0]!;
    },
    type(text: string): Promise<void> {
      return user.type(this.getInputField().element(), text);
    },
  };
}
