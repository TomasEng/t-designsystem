import highlight from "highlight.js";
import { LitElement, html, type PropertyValues, css, unsafeCSS, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ACTION_CONFIRMATION_PERIOD_MILLISECONDS } from "../../constants.js";
import { Assert } from "../../utils/Assert.ts";
import { customElement } from "../../utils/customElement.ts";
import { capitalize, trimLineBreaks, trimMargin } from "../../utils/stringUtils.js";
import { checkmarkIcon } from "../icons/checkmarkIcon.ts";
import { codeIcon } from "../icons/codeIcon.ts";
import { filesIcon } from "../icons/filesIcon.ts";
import buttonCss from "../t-button/t-button.css?inline";
import type { TCodeAttributes, TCodeDisplayMode } from "../../types/element-types.ts";

@customElement("t-code")
export class TCode extends LitElement implements Readonly<TCodeAttributes> {
  @property({ type: String }) code: string = "";
  @property({ type: String }) language: string = "";
  @property({ type: String }) mode: TCodeDisplayMode = "inline";
  @property({ type: Boolean }) trimmargin: boolean = false;
  @property({ type: String }) copyButtonTitle: string = "Kopier kode";

  @state() private copied = false;

  get codeElement(): HTMLElement {
    const e = this.shadowRoot?.querySelector("code");
    Assert.notNullNorUndefined(e);
    return e;
  }

  updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (this.copied) {
      setTimeout(() => (this.copied = false), ACTION_CONFIRMATION_PERIOD_MILLISECONDS);
    }
  }

  render(): TemplateResult<1> {
    const trimmedCode = this.trimCode();
    const code = this.language ? highlight.highlight(trimmedCode, { language: this.language }).value : trimmedCode;
    const pre = html`<pre class=${this.mode}><code>${unsafeHTML(code)}</code></pre>`;
    switch (this.mode) {
      case "panel":
        return html`<t-panel>${pre}</t-panel>`;
      case "heading-panel":
        return html`
          <t-panel>
            ${codeIcon("icon")}
            <span slot="heading" class="heading">
              ${this.language && findHumanReadableLanguage(this.language)}
              <button
                class="t-button without-background"
                title=${this.copyButtonTitle}
                @click=${(): Promise<void> => this.copyToClipboard()}
              >
                ${this.renderCopyIcon()}
              </button>
            </span>
            ${pre}
          </t-panel>
        `;
      default:
        return pre;
    }
  }

  private renderCopyIcon(): TemplateResult<1> {
    return this.copied ? checkmarkIcon("icon") : filesIcon(false, "icon");
  }

  private trimCode(): string {
    const code = this.code || this.innerHTML.toString();
    return this.trimmargin ? trimMargin(code) : trimLineBreaks(code);
  }

  private copyToClipboard(): Promise<void> {
    return navigator.clipboard.writeText(this.trimCode()).then(() => {
      this.copied = true;
    });
  }

  static styles = css`
    :host {
      position: relative;
    }

    .heading {
      display: flex;
      justify-content: space-between;
    }

    pre {
      margin: 0;
      overflow-x: auto;

      code {
        --chroma-font: var(--t-chroma-base);
        font-family: monospace;
        color: oklch(from var(--t-colour-base-high-contrast) l c calc(h * 1deg + var(--t-hue-offset-code)));
      }

      &.inline {
        background-color: color-mix(in oklab, var(--t-colour-grey-low-contrast), transparent);
        border-radius: 2px;
        box-shadow: var(--t-colour-grey-low-contrast) 0 0 0 1px;
        display: inline;
        text-wrap: wrap;
        word-break: break-word;
      }

      &.block,
      &.panel,
      &.heading-panel {
        display: block;

        code {
          display: block;
          overflow-x: auto;
        }
      }

      .hljs {
        color: var(--t-colour-grey-high-contrast);
      }

      .hljs-comment {
        color: oklch(from var(--t-colour-base-high-contrast) l 0.0085 h);
      }

      .hljs-punctuation,
      .hljs-tag {
        color: var(--t-colour-grey-high-contrast);
      }

      .hljs-tag .hljs-attr,
      .hljs-tag .hljs-name {
        color: var(--t-colour-grey-high-contrast);
      }

      .hljs-deletion,
      .hljs-number,
      .hljs-quote,
      .hljs-selector-class,
      .hljs-selector-id,
      .hljs-string,
      .hljs-template-tag,
      .hljs-type {
        color: oklch(from var(--t-colour-base-high-contrast) l c calc(h + 126));
      }

      .hljs-section,
      .hljs-title {
        color: oklch(from var(--t-colour-base-high-contrast) l c calc(h + 126));
      }

      .hljs-link,
      .hljs-operator,
      .hljs-regexp,
      .hljs-selector-attr,
      .hljs-selector-pseudo,
      .hljs-symbol,
      .hljs-template-variable,
      .hljs-variable {
        color: oklch(from var(--t-colour-base-high-contrast) l c calc(h + 118));
      }

      .hljs-literal {
        color: oklch(from var(--t-colour-base-high-contrast) l c calc(h + 235));
      }

      .hljs-addition,
      .hljs-built_in,
      .hljs-bullet,
      .hljs-code {
        color: oklch(from var(--t-colour-base-high-contrast) l c calc(h + 232));
      }

      .hljs-meta {
        color: oklch(from var(--t-colour-base-high-contrast) l c calc(h + 332));
      }

      .hljs-meta .hljs-string {
        color: oklch(from var(--t-colour-base-high-contrast) l c calc(h + 332));
      }

      .hljs-doctag,
      .hljs-keyword,
      .hljs-literal,
      .hljs-name,
      .hljs-section,
      .hljs-selector-tag,
      .hljs-strong,
      .hljs-title,
      .hljs-type {
        font-weight: 700;
      }

      .hljs-emphasis {
        font-style: italic;
      }
    }

    ${unsafeCSS(buttonCss)}
  `;
}

const findHumanReadableLanguage = (language: string): string => {
  return humanReadableLanguages[language] || capitalize(language);
};

const humanReadableLanguages: { [key: string]: string } = {
  ada: "Ada",
  angular: "Angular",
  c: "C",
  cpp: "C++",
  csharp: "C Sharp (C#)",
  css: "CSS",
  go: "Go",
  graphql: "GraphQL",
  html: "HTML",
  java: "Java",
  javascript: "Javascript",
  json: "JSON",
  jsx: "JSX",
  kotlin: "Kotlin",
  less: "Less",
  markdown: "Markdown",
  mysql: "MySQL",
  php: "PHP",
  postgresql: "PostgreSQL",
  python: "Python",
  r: "R",
  react: "React",
  ruby: "Ruby",
  rust: "Rust",
  sass: "Sass",
  scss: "SCSS",
  shell: "Shell",
  sql: "SQL",
  svelte: "Svelte",
  swift: "Swift",
  tsx: "Typescript JSX (TSX)",
  typescript: "Typescript",
  vue: "Vue",
  xhtml: "XHTML",
  xml: "XML",
  yaml: "YAML",
};
