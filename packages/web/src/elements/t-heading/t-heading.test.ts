import { html } from "lit";
import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-lit";
import "./t-heading.ts";
import "../../properties.css";

describe("t-heading", () => {
  it.each([1, 2, 3, 4, 5, 6])("Renders heading level %i", async (level) => {
    const name = "Overskrift";
    const screen = render(html`<t-heading level=${level}>${name}</t-heading>`);
    await expect.element(screen.getByRole("heading", { level, name })).toBeVisible();
  });

  it("Defaults to h1", async () => {
    const name = "Overskrift";
    const screen = render(html`<t-heading>${name}</t-heading>`);
    await expect.element(screen.getByRole("heading", { level: 1, name })).toBeVisible();
  });

  it("Falls back to h1 for an invalid level", async () => {
    const name = "Overskrift";
    const screen = render(html`<t-heading level="7">${name}</t-heading>`);
    await expect.element(screen.getByRole("heading", { level: 1, name })).toBeVisible();
  });

  it("Keeps the note in a separate slot", async () => {
    const name = "Overskrift";
    const note = "Merknad";
    const screen = render(
      html`<t-heading
        >${name}
        <p slot="note">${note}</p></t-heading
      >`,
    );
    await expect.element(screen.getByRole("heading", { name })).toBeVisible();
    await expect.element(screen.getByRole("heading", { name })).not.toHaveTextContent(note);
    await expect.element(screen.getByText(note)).toBeVisible();
  });

  it("Renders a hash link when ID is given, and makes it only visible on hover", async () => {
    const user = userEvent.setup();
    const id = "id";
    const name = "Overskrift";
    const screen = render(html`<t-heading id=${id}>${name}</t-heading>`);
    const link = screen.getByRole("link", { name: "#", includeHidden: true });
    await expect.element(link).not.toBeVisible();
    await user.hover(screen.getByRole("heading", { name }));
    await expect.element(link).toBeVisible();
    await expect.element(link).toHaveAttribute("href", `#${id}`);
    await user.unhover(screen.getByRole("heading", { name }));
    await expect.element(link).not.toBeVisible();
  });
});
