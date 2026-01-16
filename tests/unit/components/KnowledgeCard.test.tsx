import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { KnowledgeCard } from "@/components/Knowledge/KnowledgeCard";

describe("KnowledgeCard", () => {
  const defaultProps = {
    title: "Test Knowledge",
    summary: "This is a test summary",
    sources: ["Source 1", "Source 2"],
    parameters: { "Key 1": "Value 1", "Key 2": "Value 2" },
  };

  it("renders title correctly", () => {
    render(<KnowledgeCard {...defaultProps} />);
    expect(screen.getByText("Test Knowledge")).toBeInTheDocument();
  });

  it("renders summary correctly", () => {
    render(<KnowledgeCard {...defaultProps} />);
    expect(screen.getByText("This is a test summary")).toBeInTheDocument();
  });

  it("renders all sources", () => {
    render(<KnowledgeCard {...defaultProps} />);
    expect(screen.getByText("Source 1")).toBeInTheDocument();
    expect(screen.getByText("Source 2")).toBeInTheDocument();
  });

  it("renders source count", () => {
    render(<KnowledgeCard {...defaultProps} />);
    expect(screen.getByText("Sources (2)")).toBeInTheDocument();
  });

  it("renders all parameters", () => {
    render(<KnowledgeCard {...defaultProps} />);
    expect(screen.getByText("Key 1")).toBeInTheDocument();
    expect(screen.getByText("Value 1")).toBeInTheDocument();
    expect(screen.getByText("Key 2")).toBeInTheDocument();
    expect(screen.getByText("Value 2")).toBeInTheDocument();
  });

  it("renders Research badge", () => {
    render(<KnowledgeCard {...defaultProps} />);
    expect(screen.getByText("Research")).toBeInTheDocument();
  });
});
