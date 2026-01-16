import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children correctly", () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    render(<Badge color="orange">Orange</Badge>);
    const badge = screen.getByText("Orange");
    expect(badge.className).toContain("bg-accent-orange/20");
    expect(badge.className).toContain("text-accent-orange");
  });

  it("applies outline variant styles", () => {
    render(
      <Badge variant="outline" color="blue">
        Blue outline
      </Badge>
    );
    const badge = screen.getByText("Blue outline");
    expect(badge.className).toContain("border");
    expect(badge.className).toContain("bg-transparent");
    expect(badge.className).toContain("border-accent-blue");
  });

  it("applies all color variants", () => {
    const colors = ["orange", "blue", "purple", "green", "cyan", "red", "gray"] as const;

    colors.forEach((color) => {
      const { unmount } = render(<Badge color={color}>{color}</Badge>);
      const badge = screen.getByText(color);
      if (color === "gray") {
        expect(badge.className).toContain("bg-background-elevated");
      } else {
        expect(badge.className).toContain(`bg-accent-${color}`);
      }
      unmount();
    });
  });

  it("applies small size", () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = screen.getByText("Small");
    expect(badge.className).toContain("px-2");
    expect(badge.className).toContain("text-xs");
  });

  it("applies medium size", () => {
    render(<Badge size="md">Medium</Badge>);
    const badge = screen.getByText("Medium");
    expect(badge.className).toContain("px-3");
    expect(badge.className).toContain("text-sm");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText("Custom").className).toContain("custom-class");
  });

  it("has rounded-full class", () => {
    render(<Badge>Rounded</Badge>);
    expect(screen.getByText("Rounded").className).toContain("rounded-full");
  });
});
