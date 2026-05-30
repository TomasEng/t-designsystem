import * as matchers from "@testing-library/jest-dom/matchers";
import { html } from "lit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "./t-button.ts";
import { userEvent } from "vitest/browser";
import "../../properties.css";
import { render } from "vitest-browser-lit";

expect.extend(matchers);

describe("t-button", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("Renders a button with the given name", async () => {
    const name = "Lorem ipsum";
    const { getByRole } = render(html`<button class="t-button">${name}</button>`);
    await expect.element(getByRole("button", { name })).toBeVisible();
  });

  it("Calls the click event when the shadow button is clicked", async () => {
    const user = userEvent.setup();
    const screen = render(html`<button class="t-button">Test</button>`);
    const button = screen.getByRole("button").element();
    const onClick = vi.fn();
    button.addEventListener("click", onClick);
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ target: button }));
  });

  it("Calls the focus event when the button is focused", async () => {
    const user = userEvent.setup();
    const screen = render(html`<button class="t-button">Test</button>`);
    const button = screen.getByRole("button").element();
    const onFocus = vi.fn();
    button.addEventListener("focus", onFocus);
    await user.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ target: button }));
  });

  it("Calls the blur event when the button is blurred", async () => {
    const user = userEvent.setup();
    const screen = render(html`<button class="t-button">Test</button>`);
    const button = screen.getByRole("button").element();
    const onBlur = vi.fn();
    button.addEventListener("blur", onBlur);
    await user.tab();
    await user.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ target: button }));
  });
});
