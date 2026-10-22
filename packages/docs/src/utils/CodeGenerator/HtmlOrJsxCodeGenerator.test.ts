import { describe, expect, it } from "vitest";
import { HtmlOrJsxCodeGenerator } from "./HtmlOrJsxCodeGenerator.ts";

describe("HtmlOrJsxCodeGenerator", () => {
  describe("generateHtml", () => {
    it("Returns a string when only a string is given", () => {
      const generator = new HtmlOrJsxCodeGenerator(["Lorem ipsum"]);
      expect(generator.generateHtml()).toEqual("Lorem ipsum");
    });

    it("Returns the strings on separate lines when multiple strings are given", () => {
      const generator = new HtmlOrJsxCodeGenerator(["Lorem ipsum", "dolor sit amet"]);
      expect(generator.generateHtml()).toEqual("Lorem ipsum\ndolor sit amet");
    });

    it("Returns the HTML tags when no other input is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: {}, children: [] }]);
      expect(generator.generateHtml()).toEqual("<button></button>");
    });

    it("Is case-sensitive", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "ButtoN", attributes: {}, children: [] }]);
      expect(generator.generateHtml()).toEqual("<ButtoN></ButtoN>");
    });

    it("Ruturns void elements correctly", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "br", attributes: {}, children: [] }]);
      expect(generator.generateHtml()).toEqual("<br/>");
    });

    it("Ruturns void elements correctly with upper case", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "BR", attributes: {}, children: [] }]);
      expect(generator.generateHtml()).toEqual("<BR/>");
    });

    it("Returns the HTML tags when two nodes are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: {}, children: [] },
        { name: "p", attributes: {}, children: [] },
      ]);
      expect(generator.generateHtml()).toEqual("<button></button>\n<p></p>");
    });

    it("Returns the HTML tags with the attribute on the same line when one attribute only is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: { type: "button" }, children: [] }]);
      expect(generator.generateHtml()).toEqual('<button type="button"></button>');
    });

    it("Returns the HTML tags with the attributes on separate lines when multiple attributes are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: { type: "button", name: "haha" }, children: [] },
      ]);
      expect(generator.generateHtml()).toEqual('<button\n    type="button"\n    name="haha"\n></button>');
    });

    it("Does not include undefined attributes", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: { type: "button", name: undefined }, children: [] },
      ]);
      expect(generator.generateHtml()).toEqual('<button type="button"></button>');
    });

    it("Returns boolean attributes correctly when true", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: { disabled: true }, children: [] }]);
      expect(generator.generateHtml()).toEqual("<button disabled></button>");
    });

    it("Does not include boolean attributes when they are false", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: { disabled: false }, children: [] }]);
      expect(generator.generateHtml()).toEqual("<button></button>");
    });

    it("Returns attributes correctly when there are both true and non-boolean attributes", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: { type: "button", disabled: true }, children: [] },
      ]);
      expect(generator.generateHtml()).toEqual('<button\n    type="button"\n    disabled\n></button>');
    });

    it("Returns attributes correctly when there are both false and non-boolean attributes", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: { type: "button", disabled: false }, children: [] },
      ]);
      expect(generator.generateHtml()).toEqual('<button type="button"></button>');
    });

    it("Stringifies number attributes correctly for whole numbers", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "input", attributes: { type: "number", value: 72 }, children: [] },
      ]);
      expect(generator.generateHtml()).toEqual('<input\n    type="number"\n    value="72"\n/>');
    });

    it("Stringifies number attributes correctly for decimal numbers", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "input", attributes: { type: "number", value: 3.14 }, children: [] },
      ]);
      expect(generator.generateHtml()).toEqual('<input\n    type="number"\n    value="3.14"\n/>');
    });

    it("Returns the child when a child string is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: {}, children: ["Lorem ipsum"] }]);
      expect(generator.generateHtml()).toEqual("<button>\n    Lorem ipsum\n</button>");
    });

    it("Returns the children when multiple child strings are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: {}, children: ["Lorem ipsum", "dolor sit amet"] },
      ]);
      expect(generator.generateHtml()).toEqual("<button>\n    Lorem ipsum\n    dolor sit amet\n</button>");
    });

    it("Returns the child when a child tag is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "div", attributes: {}, children: [{ name: "button", attributes: {}, children: [] }] },
      ]);
      expect(generator.generateHtml()).toEqual("<div>\n    <button></button>\n</div>");
    });

    it("Returns the children when several child tags are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        {
          name: "div",
          attributes: {},
          children: [
            { name: "button", attributes: {}, children: [] },
            { name: "p", attributes: {}, children: [] },
          ],
        },
      ]);
      expect(generator.generateHtml()).toEqual("<div>\n    <button></button>\n    <p></p>\n</div>");
    });

    it("Works with three layers", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        {
          name: "div",
          attributes: {},
          children: [{ name: "div", attributes: {}, children: [{ name: "button", attributes: {}, children: [] }] }],
        },
      ]);
      expect(generator.generateHtml()).toEqual("<div>\n    <div>\n        <button></button>\n    </div>\n</div>");
    });

    it("Works with complex setup", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "custom-heading", attributes: {}, children: ["The form"] },
        {
          name: "form",
          attributes: { action: "#", method: "get" },
          children: [
            {
              name: "fieldset",
              attributes: { class: "test", disabled: false },
              children: [
                { name: "legend", attributes: {}, children: ["Lorem ipsum"] },
                { name: "label", attributes: { for: "field" }, children: ["Field"] },
                { name: "input", attributes: { type: "text", id: "field", name: "f" }, children: [] },
                { name: "button", attributes: { type: "submit", disabled: true }, children: ["Submit"] },
              ],
            },
          ],
        },
        "Some text here",
      ]);
      const expectedResult: string =
        "<custom-heading>\n" +
        "    The form\n" +
        "</custom-heading>\n" +
        "<form\n" +
        '    action="#"\n' +
        '    method="get"\n' +
        ">\n" +
        '    <fieldset class="test">\n' +
        "        <legend>\n" +
        "            Lorem ipsum\n" +
        "        </legend>\n" +
        '        <label for="field">\n' +
        "            Field\n" +
        "        </label>\n" +
        "        <input\n" +
        '            type="text"\n' +
        '            id="field"\n' +
        '            name="f"\n' +
        "        />\n" +
        "        <button\n" +
        '            type="submit"\n' +
        "            disabled\n" +
        "        >\n" +
        "            Submit\n" +
        "        </button>\n" +
        "    </fieldset>\n" +
        "</form>\n" +
        "Some text here";
      expect(generator.generateHtml()).toEqual(expectedResult);
    });
  });

  describe("generateJsx", () => {
    it("Returns a string when only a string is given", () => {
      const generator = new HtmlOrJsxCodeGenerator(["Lorem ipsum"]);
      expect(generator.generateJsx()).toEqual("Lorem ipsum");
    });

    it("Returns the strings on separate lines when multiple strings are given", () => {
      const generator = new HtmlOrJsxCodeGenerator(["Lorem ipsum", "dolor sit amet"]);
      expect(generator.generateJsx()).toEqual("Lorem ipsum\ndolor sit amet");
    });

    it("Returns the JSX tag when no other input is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: {}, children: [] }]);
      expect(generator.generateJsx()).toEqual("<button/>");
    });

    it("Is case-sensitive", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "ButtoN", attributes: {}, children: [] }]);
      expect(generator.generateJsx()).toEqual("<ButtoN/>");
    });

    it("Returns the JSX tags when two nodes are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: {}, children: [] },
        { name: "p", attributes: {}, children: [] },
      ]);
      expect(generator.generateJsx()).toEqual("<button/>\n<p/>");
    });

    it("Returns the JSX tags with the attribute on the same line when one attribute only is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: { type: "button" }, children: [] }]);
      expect(generator.generateJsx()).toEqual('<button type="button"/>');
    });

    it("Returns the JSX tags with the attributes on separate lines when multiple attributes are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: { type: "button", name: "haha" }, children: [] },
      ]);
      expect(generator.generateJsx()).toEqual('<button\n    type="button"\n    name="haha"\n/>');
    });

    it("Does not include undefined attributes", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: { type: "button", name: undefined }, children: [] },
      ]);
      expect(generator.generateJsx()).toEqual('<button type="button"/>');
    });

    it("Returns boolean attributes correctly when true", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: { disabled: true }, children: [] }]);
      expect(generator.generateJsx()).toEqual("<button disabled/>");
    });

    it("Returns boolean attributes correctly when false", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: { disabled: false }, children: [] }]);
      expect(generator.generateJsx()).toEqual("<button disabled={false}/>");
    });

    it("Returns attributes correctly when there are both true and non-boolean attributes", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: { type: "button", disabled: true }, children: [] },
      ]);
      expect(generator.generateJsx()).toEqual('<button\n    type="button"\n    disabled\n/>');
    });

    it("Returns attributes correctly when there are both false and non-boolean attributes", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: { type: "button", disabled: false }, children: [] },
      ]);
      expect(generator.generateJsx()).toEqual('<button\n    type="button"\n    disabled={false}\n/>');
    });

    it("Returns whole number attributes correctly", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "input", attributes: { type: "number", value: 72 }, children: [] },
      ]);
      expect(generator.generateJsx()).toEqual('<input\n    type="number"\n    value={72}\n/>');
    });

    it("Returns decimal number attributes correctly", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "input", attributes: { type: "number", value: 3.14 }, children: [] },
      ]);
      expect(generator.generateJsx()).toEqual('<input\n    type="number"\n    value={3.14}\n/>');
    });

    it("Returns the child when a child string is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: {}, children: ["Lorem ipsum"] }]);
      expect(generator.generateJsx()).toEqual("<button>\n    Lorem ipsum\n</button>");
    });

    it("Returns the children when multiple child strings are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: {}, children: ["Lorem ipsum", "dolor sit amet"] },
      ]);
      expect(generator.generateJsx()).toEqual("<button>\n    Lorem ipsum\n    dolor sit amet\n</button>");
    });

    it("Returns the child when a child tag is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "div", attributes: {}, children: [{ name: "button", attributes: {}, children: [] }] },
      ]);
      expect(generator.generateJsx()).toEqual("<div>\n    <button/>\n</div>");
    });

    it("Returns the children when several child tags are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        {
          name: "div",
          attributes: {},
          children: [
            { name: "button", attributes: {}, children: [] },
            { name: "p", attributes: {}, children: [] },
          ],
        },
      ]);
      expect(generator.generateJsx()).toEqual("<div>\n    <button/>\n    <p/>\n</div>");
    });

    it("Works with three layers", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        {
          name: "div",
          attributes: {},
          children: [{ name: "div", attributes: {}, children: [{ name: "button", attributes: {}, children: [] }] }],
        },
      ]);
      expect(generator.generateJsx()).toEqual("<div>\n    <div>\n        <button/>\n    </div>\n</div>");
    });

    it("Works with complex setup", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "custom-heading", attributes: {}, children: ["The form"] },
        {
          name: "form",
          attributes: { action: "#", method: "get" },
          children: [
            {
              name: "fieldset",
              attributes: { class: "test", disabled: false },
              children: [
                { name: "legend", attributes: {}, children: ["Lorem ipsum"] },
                { name: "label", attributes: { for: "field" }, children: ["Field"] },
                { name: "input", attributes: { type: "text", id: "field", name: "f" }, children: [] },
                { name: "button", attributes: { type: "submit", disabled: true }, children: ["Submit"] },
              ],
            },
          ],
        },
        "Some text here",
      ]);
      const expectedResult: string =
        "<custom-heading>\n" +
        "    The form\n" +
        "</custom-heading>\n" +
        "<form\n" +
        '    action="#"\n' +
        '    method="get"\n' +
        ">\n" +
        "    <fieldset\n" +
        '        class="test"\n' +
        "        disabled={false}\n" +
        "    >\n" +
        "        <legend>\n" +
        "            Lorem ipsum\n" +
        "        </legend>\n" +
        '        <label for="field">\n' +
        "            Field\n" +
        "        </label>\n" +
        "        <input\n" +
        '            type="text"\n' +
        '            id="field"\n' +
        '            name="f"\n' +
        "        />\n" +
        "        <button\n" +
        '            type="submit"\n' +
        "            disabled\n" +
        "        >\n" +
        "            Submit\n" +
        "        </button>\n" +
        "    </fieldset>\n" +
        "</form>\n" +
        "Some text here";
      expect(generator.generateJsx()).toEqual(expectedResult);
    });
  });

  describe("generateLitTemplate", () => {
    it("Returns a string when only a string is given", () => {
      const generator = new HtmlOrJsxCodeGenerator(["Lorem ipsum"]);
      expect(generator.generateLitTemplate()).toEqual("Lorem ipsum");
    });

    it("Returns the strings on separate lines when multiple strings are given", () => {
      const generator = new HtmlOrJsxCodeGenerator(["Lorem ipsum", "dolor sit amet"]);
      expect(generator.generateLitTemplate()).toEqual("Lorem ipsum\ndolor sit amet");
    });

    it("Returns the HTML tags when no other input is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: {}, children: [] }]);
      expect(generator.generateLitTemplate()).toEqual("<button></button>");
    });

    it("Is case-sensitive", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "ButtoN", attributes: {}, children: [] }]);
      expect(generator.generateLitTemplate()).toEqual("<ButtoN></ButtoN>");
    });

    it("Ruturns void elements correctly", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "br", attributes: {}, children: [] }]);
      expect(generator.generateLitTemplate()).toEqual("<br/>");
    });

    it("Ruturns void elements correctly with upper case", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "BR", attributes: {}, children: [] }]);
      expect(generator.generateLitTemplate()).toEqual("<BR/>");
    });

    it("Returns the HTML tags when two nodes are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: {}, children: [] },
        { name: "p", attributes: {}, children: [] },
      ]);
      expect(generator.generateLitTemplate()).toEqual("<button></button>\n<p></p>");
    });

    it("Returns the HTML tags with the attribute on the same line when one attribute only is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: { type: "button" }, children: [] }]);
      expect(generator.generateLitTemplate()).toEqual('<button type="button"></button>');
    });

    it("Returns the HTML tags with the attributes on separate lines when multiple attributes are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: { type: "button", name: "haha" }, children: [] },
      ]);
      expect(generator.generateLitTemplate()).toEqual('<button\n    type="button"\n    name="haha"\n></button>');
    });

    it("Returns boolean attributes correctly when true", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: { disabled: true }, children: [] }]);
      expect(generator.generateLitTemplate()).toEqual("<button ?disabled=${true}></button>");
    });

    it("Does not include boolean attributes when they are false", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: { disabled: false }, children: [] }]);
      expect(generator.generateLitTemplate()).toEqual("<button ?disabled=${false}></button>");
    });

    it("Returns whole number attributes correctly", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "input", attributes: { type: "number", value: 72 }, children: [] },
      ]);
      expect(generator.generateLitTemplate()).toEqual('<input\n    type="number"\n    value=${72}\n/>');
    });

    it("Returns decimal number attributes correctly", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "input", attributes: { type: "number", value: 3.14 }, children: [] },
      ]);
      expect(generator.generateLitTemplate()).toEqual('<input\n    type="number"\n    value=${3.14}\n/>');
    });

    it("Returns the child when a child string is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([{ name: "button", attributes: {}, children: ["Lorem ipsum"] }]);
      expect(generator.generateLitTemplate()).toEqual("<button>\n    Lorem ipsum\n</button>");
    });

    it("Returns the children when multiple child strings are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "button", attributes: {}, children: ["Lorem ipsum", "dolor sit amet"] },
      ]);
      expect(generator.generateLitTemplate()).toEqual("<button>\n    Lorem ipsum\n    dolor sit amet\n</button>");
    });

    it("Returns the child when a child tag is given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "div", attributes: {}, children: [{ name: "button", attributes: {}, children: [] }] },
      ]);
      expect(generator.generateLitTemplate()).toEqual("<div>\n    <button></button>\n</div>");
    });

    it("Returns the children when several child tags are given", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        {
          name: "div",
          attributes: {},
          children: [
            { name: "button", attributes: {}, children: [] },
            { name: "p", attributes: {}, children: [] },
          ],
        },
      ]);
      expect(generator.generateLitTemplate()).toEqual("<div>\n    <button></button>\n    <p></p>\n</div>");
    });

    it("Works with three layers", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        {
          name: "div",
          attributes: {},
          children: [{ name: "div", attributes: {}, children: [{ name: "button", attributes: {}, children: [] }] }],
        },
      ]);
      expect(generator.generateLitTemplate()).toEqual(
        "<div>\n    <div>\n        <button></button>\n    </div>\n</div>",
      );
    });

    it("Works with complex setup", () => {
      const generator = new HtmlOrJsxCodeGenerator([
        { name: "custom-heading", attributes: {}, children: ["The form"] },
        {
          name: "form",
          attributes: { action: "#", method: "get" },
          children: [
            {
              name: "fieldset",
              attributes: { class: "test", disabled: false },
              children: [
                { name: "legend", attributes: {}, children: ["Lorem ipsum"] },
                { name: "label", attributes: { for: "field" }, children: ["Field"] },
                { name: "input", attributes: { type: "text", id: "field", name: "f" }, children: [] },
                { name: "button", attributes: { type: "submit", disabled: true }, children: ["Submit"] },
              ],
            },
          ],
        },
        "Some text here",
      ]);
      const expectedResult: string =
        "<custom-heading>\n" +
        "    The form\n" +
        "</custom-heading>\n" +
        "<form\n" +
        '    action="#"\n' +
        '    method="get"\n' +
        ">\n" +
        "    <fieldset\n" +
        '        class="test"\n' +
        "        ?disabled=${false}\n" +
        "    >\n" +
        "        <legend>\n" +
        "            Lorem ipsum\n" +
        "        </legend>\n" +
        '        <label for="field">\n' +
        "            Field\n" +
        "        </label>\n" +
        "        <input\n" +
        '            type="text"\n' +
        '            id="field"\n' +
        '            name="f"\n' +
        "        />\n" +
        "        <button\n" +
        '            type="submit"\n' +
        "            ?disabled=${true}\n" +
        "        >\n" +
        "            Submit\n" +
        "        </button>\n" +
        "    </fieldset>\n" +
        "</form>\n" +
        "Some text here";
      expect(generator.generateLitTemplate()).toEqual(expectedResult);
    });
  });
});
