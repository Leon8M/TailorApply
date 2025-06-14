export async function improveResume(jobDescription) {
  const res = await fetch("http://localhost:5000/api/improve-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobDescription }),
  });
  return await res.json();
}