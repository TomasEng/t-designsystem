import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { TButton, TTextField } from "./index.js";
import type { RenderResult } from "vitest-browser-react";
import type { TButtonProps, TTextFieldProps } from "./index.js";

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

  describe("TTextfield", () => {
    it("Renders a text field with the given label", async () => {
      const label = "Test";
      const screen = await renderTextfield({ label });
      expect(screen.getByRole("textbox", { name: label })).toBeInTheDocument();
    });

    function renderTextfield(props: Partial<TTextFieldProps>): Promise<RenderResult> {
      return render(<TTextField {...props} />);
    }
  });
});
