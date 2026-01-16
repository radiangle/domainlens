import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "@/components/ui/Spinner";

describe("Spinner", () => {
  it("renders with status role", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    render(<Spinner />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("renders screen reader text", () => {
    render(<Spinner />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders svg element", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    const svg = spinner.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies small size class to svg", () => {
    render(<Spinner size="sm" />);
    const spinner = screen.getByRole("status");
    const svg = spinner.querySelector("svg");
    expect(svg?.classList.contains("w-4")).toBe(true);
    expect(svg?.classList.contains("h-4")).toBe(true);
  });

  it("applies medium size by default", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    const svg = spinner.querySelector("svg");
    expect(svg?.classList.contains("w-6")).toBe(true);
    expect(svg?.classList.contains("h-6")).toBe(true);
  });

  it("applies large size class to svg", () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole("status");
    const svg = spinner.querySelector("svg");
    expect(svg?.classList.contains("w-8")).toBe(true);
    expect(svg?.classList.contains("h-8")).toBe(true);
  });

  it("applies orange color by default", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    const svg = spinner.querySelector("svg");
    expect(svg?.classList.contains("text-accent-orange")).toBe(true);
  });

  it("applies blue color", () => {
    render(<Spinner color="blue" />);
    const spinner = screen.getByRole("status");
    const svg = spinner.querySelector("svg");
    expect(svg?.classList.contains("text-accent-blue")).toBe(true);
  });

  it("applies white color", () => {
    render(<Spinner color="white" />);
    const spinner = screen.getByRole("status");
    const svg = spinner.querySelector("svg");
    expect(svg?.classList.contains("text-white")).toBe(true);
  });

  it("has animate-spin class", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    const svg = spinner.querySelector("svg");
    expect(svg?.classList.contains("animate-spin")).toBe(true);
  });

  it("applies custom className to container", () => {
    render(<Spinner className="custom-class" />);
    expect(screen.getByRole("status").className).toContain("custom-class");
  });
});
