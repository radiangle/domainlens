const FREEPIK_API_URL = "https://api.freepik.com/v1/ai/mystic";

interface FreepikTask {
  task_id: string;
  status: "IN_PROGRESS" | "COMPLETED" | "FAILED";
  generated?: Array<{ url: string }>;
}

interface FreepikResponse {
  data: FreepikTask;
}

export async function generateImageWithFreepik(
  prompt: string
): Promise<FreepikResponse> {
  const apiKey = process.env.FREEPIK_API_KEY;

  if (!apiKey) {
    throw new Error("FREEPIK_API_KEY not configured");
  }

  const response = await fetch(FREEPIK_API_URL, {
    method: "POST",
    headers: {
      "x-freepik-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      resolution: "2k",
      aspect_ratio: "widescreen_16_9",
      model: "realism",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Freepik API error: ${response.status} - ${error}`);
  }

  return response.json();
}

export async function checkFreepikTaskStatus(
  taskId: string
): Promise<FreepikTask> {
  const apiKey = process.env.FREEPIK_API_KEY;

  if (!apiKey) {
    throw new Error("FREEPIK_API_KEY not configured");
  }

  const response = await fetch(
    `https://api.freepik.com/v1/ai/mystic/${taskId}`,
    {
      headers: {
        "x-freepik-api-key": apiKey,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Freepik status check error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.data;
}

export async function generateAndWaitForImage(
  prompt: string,
  maxWaitMs: number = 60000
): Promise<string | null> {
  const { data } = await generateImageWithFreepik(prompt);

  const startTime = Date.now();
  let task = data;

  while (task.status === "IN_PROGRESS" && Date.now() - startTime < maxWaitMs) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    task = await checkFreepikTaskStatus(task.task_id);
  }

  if (task.status === "COMPLETED" && task.generated?.[0]?.url) {
    return task.generated[0].url;
  }

  return null;
}
