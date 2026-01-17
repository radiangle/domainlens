"use client";

import { useCallback } from "react";
import { usePipelineStore } from "@/stores/pipelineStore";

export function usePipeline() {
  const {
    domain,
    currentStage,
    steps,
    research,
    extract,
    visuals,
    synthesize,
    generate,
    error,
    startTime,
    useRealAPIs,
    setStage,
    setResearch,
    setExtract,
    setVisuals,
    setSynthesize,
    setGenerate,
    setError,
  } = usePipelineStore();

  const runPipeline = useCallback(async () => {
    if (!domain) return;

    try {
      // Stage 1: Research (Yutori)
      setStage("research");
      const researchRes = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, useRealAPIs }),
      });
      const researchData = await researchRes.json();
      if (!researchData.success) throw new Error(researchData.error);
      setResearch(researchData.data);

      // Stage 2: Extract (TinyFish)
      setStage("extract");
      const extractRes = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, researchData: researchData.data, useRealAPIs }),
      });
      const extractData = await extractRes.json();
      if (!extractData.success) throw new Error(extractData.error);
      setExtract(extractData.data);

      // Stage 3: Visualize (Freepik)
      setStage("visualize");
      const visualRes = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, entities: extractData.data.entities, useRealAPIs }),
      });
      const visualData = await visualRes.json();
      if (!visualData.success) throw new Error(visualData.error);
      setVisuals(visualData.data);

      // Stage 4: Synthesize (Tonic)
      setStage("synthesize");
      const synthRes = await fetch("/api/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          entities: extractData.data.entities,
          relationships: extractData.data.relationships,
          useRealAPIs,
        }),
      });
      const synthData = await synthRes.json();
      if (!synthData.success) throw new Error(synthData.error);
      setSynthesize(synthData.data);

      // Stage 5: Generate (Cline)
      setStage("generate");
      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          research: researchData.data,
          extract: extractData.data,
          synthesize: synthData.data,
          useRealAPIs,
        }),
      });
      const genData = await genRes.json();
      if (!genData.success) throw new Error(genData.error);
      setGenerate(genData.data);

      // Complete
      setStage("complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pipeline failed");
    }
  }, [
    domain,
    useRealAPIs,
    setStage,
    setResearch,
    setExtract,
    setVisuals,
    setSynthesize,
    setGenerate,
    setError,
  ]);

  return {
    domain,
    currentStage,
    steps,
    research,
    extract,
    visuals,
    synthesize,
    generate,
    error,
    startTime,
    runPipeline,
    isRunning: currentStage !== "idle" && currentStage !== "complete",
    isComplete: currentStage === "complete",
  };
}
