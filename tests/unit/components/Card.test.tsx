import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies bordered variant by default", () => {
    render(<Card data-testid="card">Default</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("border");
  });

  it("applies default variant styles", () => {
    render(<Card variant="default" data-testid="card">Default variant</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("bg-background-card");
  });

  it("applies elevated variant styles", () => {
    render(<Card variant="elevated" data-testid="card">Elevated</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("bg-background-elevated");
    expect(card.className).toContain("shadow-lg");
  });

  it("applies accent color on hover", () => {
    render(<Card accentColor="orange" data-testid="card">Orange accent</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("hover:border-accent-orange");
  });

  it("applies different accent colors", () => {
    const { rerender } = render(<Card accentColor="blue" data-testid="card">Blue</Card>);
    expect(screen.getByTestId("card").className).toContain("hover:border-accent-blue");

    rerender(<Card accentColor="purple" data-testid="card">Purple</Card>);
    expect(screen.getByTestId("card").className).toContain("hover:border-accent-purple");

    rerender(<Card accentColor="green" data-testid="card">Green</Card>);
    expect(screen.getByTestId("card").className).toContain("hover:border-accent-green");

    rerender(<Card accentColor="cyan" data-testid="card">Cyan</Card>);
    expect(screen.getByTestId("card").className).toContain("hover:border-accent-cyan");
  });

  it("disables hover effect when hover is false", () => {
    render(<Card hover={false} data-testid="card">No hover</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).not.toContain("hover:shadow-lg");
  });

  it("applies custom className", () => {
    render(<Card className="custom-class" data-testid="card">Custom</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("custom-class");
  });

  it("has rounded corners", () => {
    render(<Card data-testid="card">Rounded</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("rounded-2xl");
  });
});
