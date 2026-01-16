import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StepIcon } from "@/components/Pipeline/StepIcon";

describe("StepIcon", () => {
  it("renders with waiting status", () => {
    const { container } = render(
      <StepIcon name="Research" color="orange" status="waiting" />
    );
    const icon = container.firstChild;
    expect(icon).toHaveClass("border-border");
    expect(icon).toHaveClass("text-text-muted");
  });

  it("renders with active status", () => {
    const { container } = render(
      <StepIcon name="Research" color="orange" status="active" />
    );
    const icon = container.firstChild;
    expect(icon).toHaveClass("border-accent-orange");
    expect(icon).toHaveClass("text-accent-orange");
  });

  it("renders with completed status", () => {
    const { container } = render(
      <StepIcon name="Research" color="orange" status="completed" />
    );
    const icon = container.firstChild;
    expect(icon).toHaveClass("bg-accent-orange");
    expect(icon).toHaveClass("text-white");
  });

  it("renders with error status", () => {
    const { container } = render(
      <StepIcon name="Research" color="orange" status="error" />
    );
    const icon = container.firstChild;
    expect(icon).toHaveClass("border-accent-red");
    expect(icon).toHaveClass("text-accent-red");
  });

  it("renders different color variants", () => {
    const colors = ["orange", "blue", "purple", "green", "cyan"] as const;

    colors.forEach((color) => {
      const { container, unmount } = render(
        <StepIcon name="Research" color={color} status="active" />
      );
      const icon = container.firstChild;
      expect(icon).toHaveClass(`border-accent-${color}`);
      expect(icon).toHaveClass(`text-accent-${color}`);
      unmount();
    });
  });

  it("shows checkmark icon when completed", () => {
    const { container } = render(
      <StepIcon name="Research" color="orange" status="completed" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Check for the checkmark path
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("d")).toContain("5 13l4 4L19 7");
  });

  it("renders correct icon for each step name", () => {
    const steps = ["Research", "Extract", "Visualize", "Synthesize", "Generate"];

    steps.forEach((name) => {
      const { container, unmount } = render(
        <StepIcon name={name} color="orange" status="waiting" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      unmount();
    });
  });
});
