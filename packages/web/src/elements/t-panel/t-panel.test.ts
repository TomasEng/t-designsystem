import { html } from "lit";
import { beforeEach, describe, expect, it } from "vitest";
import "./t-panel.ts";
import "../../properties.css";
import { render } from "vitest-browser-lit";

describe("t-panel", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("Renders the text", async () => {
    const text = "Lorem ipsum";
    const renderResult = render(html`<t-panel>${text}</t-panel>`);
    expect(renderResult.container).toHaveTextContent(text);
  });

  it("Renders the heading and the text when both are present", async () => {
    const heading = "Heading";
    const text = "Lorem ipsum";
    const renderResult = render(html`<t-panel><span slot="heading">${heading}</span>${text}</t-panel>`);
    expect(renderResult.container).toHaveTextContent(heading);
    expect(renderResult.container).toHaveTextContent(text);
  });
});
