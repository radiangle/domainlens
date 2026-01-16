import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataTable } from "@/components/Data/DataTable";

describe("DataTable", () => {
  const defaultProps = {
    records: [
      { id: "1", name: "Test 1", severity: "High" },
      { id: "2", name: "Test 2", severity: "Low" },
    ],
    schema: { id: "string", name: "string", severity: "string" },
  };

  it("renders table header", () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText("Synthetic Training Data")).toBeInTheDocument();
  });

  it("renders record count badge", () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText("2 records")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Severity")).toBeInTheDocument();
  });

  it("renders record data", () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("Test 2")).toBeInTheDocument();
  });

  it("renders severity badges with correct colors", () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  it("renders schema information", () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText(/Schema:/)).toBeInTheDocument();
  });
});
