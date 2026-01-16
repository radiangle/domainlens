import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroSection } from "@/components/Hero/HeroSection";

describe("HeroSection", () => {
  it("renders the badge", () => {
    render(<HeroSection />);
    expect(screen.getByText("AI Agent Generator")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("DomainLens");
  });

  it("renders the description", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Transform any domain description into a working/)
    ).toBeInTheDocument();
  });

  it("renders the domain input", () => {
    render(<HeroSection />);
    expect(screen.getByLabelText("Domain description")).toBeInTheDocument();
  });

  it("renders the generate button", () => {
    render(<HeroSection />);
    expect(screen.getByRole("button", { name: /Generate Agent/i })).toBeInTheDocument();
  });
});
