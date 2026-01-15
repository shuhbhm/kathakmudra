const BACKEND_URL = "https://ayereldu0sm0l6-8000.proxy.runpod.net/";

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
