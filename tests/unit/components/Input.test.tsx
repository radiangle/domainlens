import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
  it("renders input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("associates label with input", () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });

  it("handles value changes", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("displays error message when provided", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("applies error styles when error is present", () => {
    render(<Input error="Error" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-accent-red");
  });

  it("applies different accent colors for focus", () => {
    const { rerender } = render(<Input accentColor="blue" />);
    expect(screen.getByRole("textbox").className).toContain(
      "focus:ring-accent-blue"
    );

    rerender(<Input accentColor="purple" />);
    expect(screen.getByRole("textbox").className).toContain(
      "focus:ring-accent-purple"
    );
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole("textbox").className).toContain("custom-class");
  });

  it("uses custom id when provided", () => {
    render(<Input id="custom-id" label="Custom" />);
    const input = screen.getByRole("textbox");
    expect(input.id).toBe("custom-id");
  });

  it("generates id from label when no id provided", () => {
    render(<Input label="First Name" />);
    const input = screen.getByRole("textbox");
    expect(input.id).toBe("first-name");
  });
});
