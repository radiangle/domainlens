import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DomainInput } from "@/components/Hero/DomainInput";
import { usePipelineStore } from "@/stores/pipelineStore";

// Reset store before each test
beforeEach(() => {
  usePipelineStore.getState().reset();
});

describe("DomainInput", () => {
  it("renders input with default value", () => {
    render(<DomainInput />);
    const input = screen.getByLabelText("Domain description");
    expect(input).toHaveValue("Build an AI agent for steel metallurgy defect analysis");
  });

  it("renders generate button", () => {
    render(<DomainInput />);
    expect(screen.getByRole("button", { name: /Generate Agent/i })).toBeInTheDocument();
  });

  it("shows error when submitting empty input", () => {
    render(<DomainInput />);
    const input = screen.getByLabelText("Domain description");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /Generate Agent/i }));
    expect(screen.getByText("Please enter a domain description")).toBeInTheDocument();
  });

  it("shows error when input is too short", () => {
    render(<DomainInput />);
    const input = screen.getByLabelText("Domain description");
    fireEvent.change(input, { target: { value: "short" } });
    fireEvent.click(screen.getByRole("button", { name: /Generate Agent/i }));
    expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  it("clears error when typing after error", () => {
    render(<DomainInput />);
    const input = screen.getByLabelText("Domain description");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /Generate Agent/i }));
    expect(screen.getByText("Please enter a domain description")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "new value" } });
    expect(screen.queryByText("Please enter a domain description")).not.toBeInTheDocument();
  });

  it("starts pipeline with valid input", () => {
    render(<DomainInput />);
    const input = screen.getByLabelText("Domain description");
    fireEvent.change(input, { target: { value: "Build a medical diagnosis agent" } });
    fireEvent.click(screen.getByRole("button", { name: /Generate Agent/i }));

    const state = usePipelineStore.getState();
    expect(state.domain).toBe("Build a medical diagnosis agent");
    expect(state.currentStage).toBe("research");
  });

  it("disables input and button when pipeline is running", () => {
    usePipelineStore.getState().startPipeline();
    render(<DomainInput />);

    expect(screen.getByLabelText("Domain description")).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText("Generating...")).toBeInTheDocument();
  });

  it("renders example text", () => {
    render(<DomainInput />);
    expect(screen.getByText(/Example:/)).toBeInTheDocument();
  });
});
