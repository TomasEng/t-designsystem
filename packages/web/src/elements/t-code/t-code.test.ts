import * as matchers from "@testing-library/jest-dom/matchers";
import { html } from "lit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "./t-code.ts";
import "../../properties.css";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-lit";
import { ACTION_CONFIRMATION_PERIOD_MILLISECONDS } from "../../constants.ts";
import type { TCodeDisplayMode } from "../../types/element-types.ts";

expect.extend(matchers);

describe("t-code", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("Renders a code block with the given code when the code is a child element", async () => {
    const code = "test";
    const view = render(html`<t-code>${code}</t-code>`);
    await expect.element(view.getByRole("code")).toHaveTextContent(code);
  });

  it("Renders a code block with the given code when the code is passed as an attribute", async () => {
    const code = "test";
    const view = render(html`<t-code code=${code}></t-code>`);
    await expect.element(view.getByRole("code")).toHaveTextContent(code);
  });

  it("Renders a code block with the given code in panel mode", async () => {
    const code = "test";
    const view = render(html`<t-code mode="panel">${code}</t-code>`);
    await expect.element(view.getByRole("code")).toHaveTextContent(code);
  });

  it("Renders the copy button in heading panel mode", async () => {
    const mode = "heading-panel" satisfies TCodeDisplayMode;
    const copyButtonTitle = "Copy";
    const view = render(html`<t-code mode=${mode} copybuttontitle=${copyButtonTitle}>test</t-code>`);
    await expect.element(view.getByRole("button", { name: copyButtonTitle })).toBeVisible();
  });

  it("Renders the name of the given language in heading panel mode", async () => {
    const mode = "heading-panel" satisfies TCodeDisplayMode;
    const view = render(html`<t-code mode=${mode} language="json">{}</t-code>`);
    await expect.element(view.getByText("JSON")).toBeVisible();
  });

  it("Renders a capitalised version of the language when it is not in the list of supported languages", async () => {
    const mode = "heading-panel" satisfies TCodeDisplayMode;
    const view = render(html`<t-code mode=${mode} language="something">test</t-code>`);
    await expect.element(view.getByText(/Something/)).toBeVisible();
  });

  it("Adds the code to the clipboard when the user clicks the copy button", async () => {
    const user = userEvent.setup();
    const copyMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText: copyMock } });

    const mode = "heading-panel" satisfies TCodeDisplayMode;
    const copyButtonTitle = "Copy";
    const code = "test";
    const view = render(html`<t-code mode=${mode} copybuttontitle=${copyButtonTitle}>${code}</t-code>`);

    await user.click(view.getByRole("button", { name: copyButtonTitle }));

    expect(copyMock).toHaveBeenCalledWith(expect.stringContaining(code));
  });

  it("Still renders the copy button after the user has clicked and enough time has passed for the checkmark icon to disappear", async () => {
    vi.useFakeTimers();
    try {
      const user = userEvent.setup();
      vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });

      const mode = "heading-panel" satisfies TCodeDisplayMode;
      const copyButtonTitle = "Copy";
      const view = render(html`<t-code mode=${mode} copybuttontitle=${copyButtonTitle}>test</t-code>`);

      await user.click(view.getByRole("button", { name: copyButtonTitle }));
      vi.advanceTimersByTime(ACTION_CONFIRMATION_PERIOD_MILLISECONDS);

      await expect.element(view.getByRole("button", { name: copyButtonTitle })).toBeVisible();
    } finally {
      vi.useRealTimers();
    }
  });

  it("Trims the margin when trimmargin is set", async () => {
    const view = render(html`<t-code trimmargin> |test</t-code>`);
    await expect.element(view.getByRole("code")).toHaveTextContent("test");
    await expect.element(view.getByRole("code")).not.toHaveTextContent("|");
  });
});
