import { css, html, LitElement, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { Assert } from "../../utils/Assert.ts";
import { customElement } from "../../utils/customElement.ts";
import type { TIframeAttributes, TIframeResizeMode } from "../../types/element-types.ts";

@customElement("t-iframe")
export class TIframe extends LitElement implements Readonly<TIframeAttributes> {
  @property({ type: String }) src: string = "";
  @property({ type: String }) srcdoc: string = "";
  @property({ type: String }) resize: TIframeResizeMode = "none";
  @property({ type: String, reflect: true }) override title = "";

  @state() private ready = false;

  private resizeListener?: AbortController;
  private resizeFrame?: number;

  get iframe(): HTMLIFrameElement {
    const iframe = this.shadowRoot?.querySelector("iframe");
    Assert.notNullNorUndefined(iframe);
    return iframe;
  }

  get iframeDocument(): Document | null {
    return this.iframe.contentDocument;
  }

  get iframeWindow(): Window | null {
    return this.iframe.contentWindow;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopResizing();
    this.ready = false;
  }

  render(): TemplateResult {
    return html`
      <iframe
        @load=${this.handleLoad}
        class="resizable-${this.resize ?? "none"}"
        ?data-ready=${this.ready}
        title=${this.title || nothing}
        srcdoc=${this.srcdoc || nothing}
        src=${this.srcdoc ? nothing : (this.src ?? nothing)}
      ></iframe>
    `;
  }

  private handleLoad(): void {
    this.stopResizing();
    if (!this.isConnected) return;
    if (!this.iframeDocument?.scrollingElement) {
      this.ready = true;
      return;
    }

    this.resizeListener = new AbortController();
    this.iframeWindow?.addEventListener("resize", () => this.resizeIframe(), {
      signal: this.resizeListener.signal,
    });
    this.resizeIframe();
  }

  private resizeIframe(): void {
    const document = this.iframeDocument;
    if (!document || this.resizeFrame !== undefined) return;

    const iframe = this.iframe;
    const maxPasses = 10;
    let passes = 0;

    const fit = (): void => {
      this.resizeFrame = undefined;
      if (iframe.contentDocument !== document) return;

      const scrollingElement = document.scrollingElement;
      if (scrollingElement) {
        const height = Math.min(scrollingElement.getBoundingClientRect().height, window.innerHeight * 0.5);
        const fittedHeight = `${height}px`;
        if (iframe.height !== fittedHeight) {
          iframe.height = fittedHeight;
          // Recheck after layout for documents sized relative to the iframe viewport.
          if (++passes < maxPasses) {
            this.resizeFrame = requestAnimationFrame(fit);
            return;
          }
        }
      }
      this.ready = true;
    };
    fit();
  }

  private stopResizing(): void {
    this.resizeListener?.abort();
    if (this.resizeFrame !== undefined) {
      cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = undefined;
    }
  }

  static styles = css`
    :host {
      width: 100%;
    }

    iframe {
      width: 100%;
      border: 1px solid var(--t-colour-font);
      background-color: white;
    }

    iframe:not([data-ready]) {
      visibility: hidden;
    }

    .resizable-both {
      resize: both;
    }

    .resizable-horizontal {
      resize: horizontal;
    }

    .resizable-vertical {
      resize: vertical;
    }

    .resizable-none {
      resize: none;
    }
  `;
}
