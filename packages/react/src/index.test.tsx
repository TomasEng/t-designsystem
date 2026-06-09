import React from "react";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
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

    it("Calls the onTInput event handler when the user types something", async () => {
      const onTInput = vi.fn();
      const user = userEvent.setup();
      const screen = await renderTextfield({ onTInput });
      const textbox = screen.getByRole("textbox");
      await user.type(textbox, "a");
      expect(onTInput).toHaveBeenCalledTimes(1);
      expect(textbox).toHaveValue("a");
      const event = onTInput.mock.calls[0][0] as CustomEvent<InputEvent>;
      expect(event.detail.value).toBe("a");
      expect(event.target.input.value).toBe("a");
    });

    function renderTextfield(props: Partial<TTextFieldProps>): Promise<RenderResult> {
      return render(<TTextField {...props} />);
    }
  });
});
