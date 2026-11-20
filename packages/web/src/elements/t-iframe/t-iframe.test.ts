import { spread } from "@open-wc/lit-helpers";
import { html } from "lit";
import { afterEach, describe, expect, it, vi, type MockInstance } from "vitest";
import { render, type RenderResult } from "vitest-browser-lit";
import type { TIframeAttributes } from "../../types/element-types.ts";
import type { TIframe } from "./t-iframe.ts";
import "./t-iframe.ts";

const defaultAttributes: TIframeAttributes = { title: "Eksempel" };
const fixtureSrc = new URL("./fixtures/iframe-content.html", import.meta.url).href;

describe("t-iframe", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Renders an iframe with the content defined in srcdoc", async () => {
    const view = renderIframe({ srcdoc: "<p>Innhold</p>" });
    const element = view.getRootElement();
    await expect.poll(() => element.iframeDocument?.body.textContent).toBe("Innhold");
  });

  it("Renders an iframe with the source defined in src", async () => {
    const view = renderIframe({ src: fixtureSrc });
    const element = view.getRootElement();
    await expect.poll(() => element.iframeDocument?.body).toHaveTextContent("Hello, world!");
  });

  it("Prefers srcdoc when both src and srcdoc are given", async () => {
    const view = renderIframe({ src: fixtureSrc, srcdoc: "<p>Innhold</p>" });
    const element = view.getRootElement();
    await expect.poll(() => element.iframeDocument?.body.textContent).toBe("Innhold");
  });

  it("Shows the frame only after its initial height has settled", async () => {
    const srcdoc = `
      <!doctype html>
      <style>
        body { margin: 0; }
        div { height: 40px; }
        @media (max-height: 100px) { div { height: 80px; } }
      </style>
      <div>Innhold</div>
    `;
    const view = renderIframe({ srcdoc });
    const element = view.getRootElement();
    await element.updateComplete;
    expect(getComputedStyle(element.iframe).visibility).toBe("hidden");
    await view.waitForIframeToBeVisible();
    expect(element.iframe.height).toBe("80px");
  });

  it("Fits same-origin content up to half the viewport height", async () => {
    const srcdoc = '<!doctype html><body style="margin: 0"><div style="height: 200vh"></div></body>';
    const view = renderIframe({ srcdoc, resize: "both" });
    const element = view.getRootElement();
    await expect.poll(() => element.iframe.height).toBe(`${window.innerHeight * 0.5}px`);
  });

  it("Restores the default resize mode and clears optional attributes when removed", async () => {
    const view = renderIframe({ src: fixtureSrc, resize: "both" });
    const element = view.getRootElement();
    await view.waitForIframeToBeVisible();

    element.removeAttribute("resize");
    element.removeAttribute("title");
    element.removeAttribute("src");
    await element.updateComplete;

    expect(getComputedStyle(element.iframe).resize).toBe("none");
    expect(element.iframe).not.toHaveAttribute("title");
    expect(element.iframe).not.toHaveAttribute("src");
  });

  it("Shows content from an opaque origin without assigning a measured height", async () => {
    const view = renderIframe({ src: "data:text/html,Innhold" });
    await view.waitForIframeToBeVisible();

    const element = view.getRootElement();
    expect(element.iframeDocument).toBeNull();
    expect(element.iframe.height).toBe("");
  });

  it("Shows the frame even when the content height keeps changing with the viewport", async () => {
    const srcdoc = `
      <!doctype html>
      <style>
        body { margin: 0; }
        div { height: 30px; }
        @media (max-height: 50px) { div { height: 70px; } }
      </style>
      <div>Innhold</div>
    `;
    const view = renderIframe({ srcdoc });
    await view.waitForIframeToBeVisible();

    expect(["30px", "70px"]).toContain(view.getRootElement().iframe.height);
  });

  it("Cancels pending resize work and ignores load events after removal", async () => {
    const view = renderIframe({ src: fixtureSrc });
    await view.waitForIframeToBeVisible();
    const element = view.getRootElement();
    const iframe = element.iframe;
    const requestFrame = scheduleHeightRecheck(element);
    const cancelFrame = vi.spyOn(window, "cancelAnimationFrame");

    element.remove();
    iframe.dispatchEvent(new Event("load"));

    expect(cancelFrame).toHaveBeenCalledWith(0);
    expect(requestFrame).toHaveBeenCalledTimes(1);
  });

  it.each(["document", "scrolling element"] as const)(
    "Skips a pending measurement when the %s is gone",
    async (missing) => {
      const view = renderIframe({ src: fixtureSrc });
      await view.waitForIframeToBeVisible();
      const element = view.getRootElement();
      const iframe = element.iframe;
      const document = element.iframeDocument!;
      const requestFrame = scheduleHeightRecheck(element);

      if (missing === "document") {
        vi.spyOn(iframe, "contentDocument", "get").mockReturnValue(null);
      } else {
        vi.spyOn(document, "scrollingElement", "get").mockReturnValue(null);
      }

      iframe.height = "1";
      requestFrame.mock.calls[0][0](performance.now());
      expect(iframe.height).toBe("1");
      expect(requestFrame).toHaveBeenCalledTimes(1);
    },
  );
});

interface ExtendedRenderResult extends RenderResult {
  getRootElement(): TIframe;
  waitForIframeToBeVisible(): Promise<void>;
}

function renderIframe(attributes: Partial<TIframeAttributes> = {}): ExtendedRenderResult {
  const renderResult = render(html`<t-iframe ${spread({ ...defaultAttributes, ...attributes })}></t-iframe>`);
  return {
    ...renderResult,
    getRootElement(): TIframe {
      return this.container.querySelector<TIframe>("t-iframe")!;
    },
    async waitForIframeToBeVisible(): Promise<void> {
      await expect.poll(() => getComputedStyle(this.getRootElement().iframe).visibility).toBe("visible");
    },
  };
}

function scheduleHeightRecheck(element: TIframe): MockInstance<typeof window.requestAnimationFrame> {
  const requestFrame = vi.spyOn(window, "requestAnimationFrame").mockReturnValueOnce(0);
  element.iframe.height = "1";
  element.iframeWindow!.dispatchEvent(new Event("resize"));
  expect(requestFrame).toHaveBeenCalledOnce();
  return requestFrame;
}
