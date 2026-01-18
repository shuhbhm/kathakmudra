const BACKEND_URL = "https://q4gqphuvj4xc7m-8000.proxy.runpod.net/:8000";

export async function inferBatch(frames) {
  const formData = new FormData();

  frames.forEach((blob, idx) => {
    formData.append("files", blob, `frame_${idx}.jpg`);
  });

  const response = await fetch(`${BACKEND_URL}/infer_batch`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Inference failed");
  }

  return response.json();
}
