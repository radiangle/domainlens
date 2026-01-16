import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies bordered variant by default", () => {
    const { container } = render(<Card>Default</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border");
  });

  it("applies default variant styles", () => {
    const { container } = render(<Card variant="default">Default variant</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("bg-background-card");
  });

  it("applies elevated variant styles", () => {
    const { container } = render(<Card variant="elevated">Elevated</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("bg-background-elevated");
    expect(card.className).toContain("shadow-lg");
  });

  it("applies accent color on hover", () => {
    const { container } = render(<Card accentColor="orange">Orange accent</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("hover:border-accent-orange");
  });

  it("applies different accent colors", () => {
    const { container, rerender } = render(<Card accentColor="blue">Blue</Card>);
    expect((container.firstChild as HTMLElement).className).toContain("hover:border-accent-blue");

    rerender(<Card accentColor="purple">Purple</Card>);
    expect((container.firstChild as HTMLElement).className).toContain("hover:border-accent-purple");

    rerender(<Card accentColor="green">Green</Card>);
    expect((container.firstChild as HTMLElement).className).toContain("hover:border-accent-green");

    rerender(<Card accentColor="cyan">Cyan</Card>);
    expect((container.firstChild as HTMLElement).className).toContain("hover:border-accent-cyan");
  });

  it("disables hover effect when hover is false", () => {
    const { container } = render(<Card hover={false}>No hover</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain("hover:shadow-lg");
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-class">Custom</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom-class");
  });

  it("has rounded corners", () => {
    const { container } = render(<Card>Rounded</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("rounded-2xl");
  });
});
