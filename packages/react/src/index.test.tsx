import React from "react";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import { TButton, TCode, TLink, TPanel, TTextField } from "./index.js";
import type { TInputEvent, TTextfield as TTextfieldElement } from "tomas-designsystem";
import type { RenderResult } from "vitest-browser-react";
import type { TCodeProps, TButtonProps, TLinkProps, TTextFieldProps, TPanelProps } from "./index.js";

describe("package", () => {
  describe("TButton", () => {
    it("Renders a button with the given name", async () => {
      const name = "Test";
      const screen = await renderButton({ children: name });
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    });

    function renderButton(props: Partial<TButtonProps> = {}): Promise<RenderResult> {
      return render(<TButton {...props} />);
    }
  });

  describe("TCode", () => {
    it("Renders a code element when the code is passed as a child", async () => {
      const code = "Test";
      const screen = await renderCode({ children: code });
      expect(screen.getByRole("code")).toHaveTextContent(code);
    });

    it("Renders a code element when the code is passed as an attribute", async () => {
      const code = "Test";
      const screen = await renderCode({ code });
      expect(screen.getByRole("code")).toHaveTextContent(code);
    });

    it("Adds the code to the clipboard when the user clicks the copy button", async () => {
      const user = userEvent.setup();
      const copyMock = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal("navigator", { clipboard: { writeText: copyMock } });
      const code = "Test";
      const copyButtonTitle = "Copy";
      const screen = await renderCode({ code, mode: "heading-panel", copyButtonTitle });

      await user.click(screen.getByRole("button", { name: copyButtonTitle }));

      expect(copyMock).toHaveBeenCalledWith(expect.stringContaining(code));
    });

    function renderCode(props: Partial<TCodeProps> = {}): Promise<RenderResult> {
      return render(<TCode {...props} />);
    }
  });

  describe("TLink", () => {
    it("Renders a link with the given name", async () => {
      const name = "Test";
      const screen = await renderLink({ children: name, href: "#" });
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    });

    function renderLink(props: Partial<TLinkProps> = {}): Promise<RenderResult> {
      return render(<TLink {...props} />);
    }
  });

  describe("TPanel", () => {
    it("Renders a panel with the given text and heading", async () => {
      const heading = "Heading";
      const text = "Test";
      const screen = await renderPanel({
        children: (
          <>
            <h1>{heading}</h1>
            {text}
          </>
        ),
      });
      expect(screen.getByRole("heading", { name: heading })).toBeVisible();
      expect(screen.getByText(text)).toBeVisible();
    });

    function renderPanel(props: Partial<TPanelProps> = {}): Promise<RenderResult> {
      return render(<TPanel {...props} />);
    }
  });

  describe("TTextfield", () => {
    it("Renders a text field with the given label", async () => {
      const label = "Test";
      const screen = await renderTextfield({ label });
      expect(screen.getByRole("textbox", { name: label })).toBeInTheDocument();
    });

    it("Calls the onTInput event handler when the user types something", async () => {
      const onTInput = vi.fn();
      const user = userEvent.setup();
      const screen = await renderTextfield({ onTInput });
      const textbox = screen.getByRole("textbox");
      await user.type(textbox, "a");
      expect(onTInput).toHaveBeenCalledTimes(1);
      expect(textbox).toHaveValue("a");
      const event = onTInput.mock.calls[0][0] as CustomEvent<TInputEvent>;
      expect(event.detail.value).toBe("a");
      expect((event.target as TTextfieldElement).input.value).toBe("a");
    });

    function renderTextfield(props: Partial<TTextFieldProps>): Promise<RenderResult> {
      return render(<TTextField {...props} />);
    }
  });
});
