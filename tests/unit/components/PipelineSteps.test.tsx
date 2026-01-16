import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { PipelineSteps } from "@/components/Pipeline/PipelineSteps";
import { usePipelineStore } from "@/stores/pipelineStore";

beforeEach(() => {
  usePipelineStore.getState().reset();
});

describe("PipelineSteps", () => {
  it("does not render when pipeline is idle", () => {
    const { container } = render(<PipelineSteps />);
    expect(container.firstChild).toBeNull();
  });

  it("renders all 5 steps when pipeline is active", () => {
    usePipelineStore.getState().startPipeline();
    render(<PipelineSteps />);

    expect(screen.getByText("Research")).toBeInTheDocument();
    expect(screen.getByText("Extract")).toBeInTheDocument();
    expect(screen.getByText("Visualize")).toBeInTheDocument();
    expect(screen.getByText("Synthesize")).toBeInTheDocument();
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  it("shows tool names for each step", () => {
    usePipelineStore.getState().startPipeline();
    render(<PipelineSteps />);

    expect(screen.getByText("Yutori")).toBeInTheDocument();
    expect(screen.getByText("TinyFish")).toBeInTheDocument();
    expect(screen.getByText("Freepik")).toBeInTheDocument();
    expect(screen.getByText("Tonic")).toBeInTheDocument();
    expect(screen.getByText("Cline")).toBeInTheDocument();
  });

  it("marks first step as active when pipeline starts", () => {
    usePipelineStore.getState().startPipeline();
    render(<PipelineSteps />);

    const step1 = screen.getByText("Research").closest("[data-step]");
    expect(step1?.getAttribute("data-status")).toBe("active");
  });

  it("marks completed steps correctly", () => {
    usePipelineStore.getState().startPipeline();
    usePipelineStore.getState().setStage("extract");
    render(<PipelineSteps />);

    const step1 = screen.getByText("Research").closest("[data-step]");
    const step2 = screen.getByText("Extract").closest("[data-step]");

    expect(step1?.getAttribute("data-status")).toBe("completed");
    expect(step2?.getAttribute("data-status")).toBe("active");
  });

  it("updates step statuses as pipeline progresses", () => {
    usePipelineStore.getState().startPipeline();
    usePipelineStore.getState().setStage("visualize");
    render(<PipelineSteps />);

    const step1 = screen.getByText("Research").closest("[data-step]");
    const step2 = screen.getByText("Extract").closest("[data-step]");
    const step3 = screen.getByText("Visualize").closest("[data-step]");
    const step4 = screen.getByText("Synthesize").closest("[data-step]");

    expect(step1?.getAttribute("data-status")).toBe("completed");
    expect(step2?.getAttribute("data-status")).toBe("completed");
    expect(step3?.getAttribute("data-status")).toBe("active");
    expect(step4?.getAttribute("data-status")).toBe("waiting");
  });
});
