import * as matchers from "@testing-library/jest-dom/matchers";
import { html } from "lit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "./t-code.ts";
import "../../properties.css";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-lit";
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

  it("Renders the copy button in heading panel mode", async () => {
    const mode = "heading-panel" satisfies TCodeDisplayMode;
    const copyButtonTitle = "Copy";
    const view = render(html`<t-code mode=${mode} copybuttontitle=${copyButtonTitle}>test</t-code>`);
    await expect.element(view.getByRole("button", { name: copyButtonTitle })).toBeVisible();
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
});
