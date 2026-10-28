import { describe, expect, it } from "vitest";
import { CodeGenerator } from "./CodeGenerator";

describe("CodeGenerator", () => {
  describe("generateHtml", () => {
    it("Works for a class component without additional classes", () => {
      const codeGenerator = new CodeGenerator([
        {
          type: "class",
          element: "button",
          reactName: "TButton",
          primaryClass: "t-button",
          secondaryClasses: { variant: "default", something: undefined },
          attributes: { type: "button" },
          children: [{ type: "string", content: "Click" }],
        },
      ]);
      const result = codeGenerator.generateHtml();
      expect(result).toBe(
        '<button\n    class="t-button t-button--default"\n    type="button"\n>\n    Click\n</button>',
      );
    });

    it("Works for a class component with additional classes", () => {
      const codeGenerator = new CodeGenerator([
        {
          type: "class",
          element: "button",
          reactName: "TButton",
          primaryClass: "t-button",
          secondaryClasses: { variant: "default", something: undefined },
          attributes: { class: "test", type: "button" },
          children: [{ type: "string", content: "Click" }],
        },
      ]);
      const result = codeGenerator.generateHtml();
      expect(result).toBe(
        '<button\n    class="t-button t-button--default test"\n    type="button"\n>\n    Click\n</button>',
      );
    });

    it("Works for a web component", () => {
      const codeGenerator = new CodeGenerator([
        {
          type: "web",
          tagName: "t-textfield",
          reactName: "TTextfield",
          attributes: { label: "Lorem ipsum", value: "Test", class: "abc" },
          children: [],
        },
      ]);
      const result = codeGenerator.generateHtml();
      expect(result).toBe('<t-textfield\n    label="Lorem ipsum"\n    value="Test"\n    class="abc"\n></t-textfield>');
    });

    it("Works for a native element", () => {
      const codeGenerator = new CodeGenerator([
        {
          type: "native",
          element: "button",
          attributes: { type: "submit", class: "test" },
          children: [{ type: "string", content: "Here" }],
        },
      ]);
      const result = codeGenerator.generateHtml();
      expect(result).toBe('<button\n    type="submit"\n    class="test"\n>\n    Here\n</button>');
    });
  });

  describe("generateReact", () => {
    it("Works for a class component without additional classes", () => {
      const codeGenerator = new CodeGenerator([
        {
          type: "class",
          element: "button",
          reactName: "TButton",
          primaryClass: "t-button",
          secondaryClasses: { variant: "default", something: undefined },
          attributes: { type: "button" },
          children: [{ type: "string", content: "Click" }],
        },
      ]);
      const result = codeGenerator.generateReact();
      expect(result).toBe('<TButton\n    variant="default"\n    type="button"\n>\n    Click\n</TButton>');
    });

    it("Works for a class component with additional classes", () => {
      const codeGenerator = new CodeGenerator([
        {
          type: "class",
          element: "button",
          reactName: "TButton",
          primaryClass: "t-button",
          secondaryClasses: { variant: "default", something: undefined },
          attributes: { class: "test", type: "button" },
          children: [{ type: "string", content: "Click" }],
        },
      ]);
      const result = codeGenerator.generateReact();
      expect(result).toBe(
        '<TButton\n    variant="default"\n    class="test"\n    type="button"\n>\n    Click\n</TButton>',
      );
    });

    it("Works for a web component", () => {
      const codeGenerator = new CodeGenerator([
        {
          type: "web",
          tagName: "t-textfield",
          reactName: "TTextfield",
          attributes: { label: "Lorem ipsum", value: "Test", class: "abc" },
          children: [],
        },
      ]);
      const result = codeGenerator.generateReact();
      expect(result).toBe('<TTextfield\n    label="Lorem ipsum"\n    value="Test"\n    class="abc"\n/>');
    });

    it("Works for a native element", () => {
      const codeGenerator = new CodeGenerator([
        {
          type: "native",
          element: "button",
          attributes: { type: "submit", class: "test" },
          children: [{ type: "string", content: "Here" }],
        },
      ]);
      const result = codeGenerator.generateReact();
      expect(result).toBe('<button\n    type="submit"\n    class="test"\n>\n    Here\n</button>');
    });
  });
});
