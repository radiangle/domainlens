import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ChatInterface } from "@/components/Chat/ChatInterface";

describe("ChatInterface", () => {
  it("renders chat header", () => {
    render(<ChatInterface />);
    expect(screen.getByText("Steel Defect Analysis Agent")).toBeInTheDocument();
  });

  it("renders powered by text", () => {
    render(<ChatInterface />);
    expect(screen.getByText("Powered by DomainLens")).toBeInTheDocument();
  });

  it("renders online badge", () => {
    render(<ChatInterface />);
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("renders input placeholder", () => {
    render(<ChatInterface />);
    expect(screen.getByPlaceholderText("Ask about steel defects...")).toBeInTheDocument();
  });

  it("renders send button", () => {
    render(<ChatInterface />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
