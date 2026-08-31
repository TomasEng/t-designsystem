import * as matchers from "@testing-library/jest-dom/matchers";
import { html } from "lit";
import { describe, expect, it } from "vitest";
import "../../properties.css";
import { render } from "vitest-browser-lit";
import "./t-link.css";

expect.extend(matchers);

describe("t-link", () => {
  it("Renders a link with the given name", async () => {
    const name = "Lorem ipsum";
    const { getByRole } = render(html`<a class="t-link" href="#">${name}</a>`);
    await expect.element(getByRole("link", { name })).toBeVisible();
  });
});
