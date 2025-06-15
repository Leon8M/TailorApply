export async function improveResume(jobDescription, userQualifications) {
  try {
    const res = await fetch("http://localhost:5000/api/improve-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription, userQualifications }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to generate resume');
    }

    return await res.json();
  } catch (err) {
    console.error("API request failed:", err);
    return { error: err.message };
  }
}