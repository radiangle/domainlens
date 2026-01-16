import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VisualCard } from "@/components/Visuals/VisualCard";

describe("VisualCard", () => {
  const defaultProps = {
    image: {
      url: "/test-image.jpg",
      prompt: "Test prompt for image generation",
      caption: "Test image caption",
    },
  };

  it("renders image caption", () => {
    render(<VisualCard {...defaultProps} />);
    expect(screen.getByText("Test image caption")).toBeInTheDocument();
  });

  it("renders AI Generated badge", () => {
    render(<VisualCard {...defaultProps} />);
    expect(screen.getByText("AI Generated")).toBeInTheDocument();
  });

  it("renders view prompt toggle", () => {
    render(<VisualCard {...defaultProps} />);
    expect(screen.getByText("View prompt")).toBeInTheDocument();
  });

  it("renders prompt text", () => {
    render(<VisualCard {...defaultProps} />);
    expect(screen.getByText("Test prompt for image generation")).toBeInTheDocument();
  });

  it("renders image element", () => {
    render(<VisualCard {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/test-image.jpg");
    expect(img).toHaveAttribute("alt", "Test image caption");
  });
});
