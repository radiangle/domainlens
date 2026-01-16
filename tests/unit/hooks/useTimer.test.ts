import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useTimer } from "@/hooks/useTimer";

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 0 elapsed time when startTime is null", () => {
    const { result } = renderHook(() => useTimer(null));
    expect(result.current.elapsed).toBe(0);
    expect(result.current.formatted).toBe("0s");
  });

  it("calculates elapsed time from startTime", () => {
    const startTime = Date.now();
    const { result } = renderHook(() => useTimer(startTime));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.elapsed).toBeGreaterThanOrEqual(5000);
  });

  it("formats time in seconds when under a minute", () => {
    const startTime = Date.now();
    const { result } = renderHook(() => useTimer(startTime));

    act(() => {
      vi.advanceTimersByTime(30000);
    });

    expect(result.current.formatted).toBe("30s");
  });

  it("formats time with minutes when over a minute", () => {
    const startTime = Date.now();
    const { result } = renderHook(() => useTimer(startTime));

    act(() => {
      vi.advanceTimersByTime(90000);
    });

    expect(result.current.formatted).toBe("1:30");
  });

  it("resets when startTime becomes null", () => {
    const { result, rerender } = renderHook(
      ({ startTime }) => useTimer(startTime),
      { initialProps: { startTime: Date.now() } }
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.elapsed).toBeGreaterThan(0);

    rerender({ startTime: null });
    expect(result.current.elapsed).toBe(0);
  });
});
