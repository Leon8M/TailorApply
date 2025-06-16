export async function generateResumeAPI(jobDescription, userQualifications) {
  try {
    const response = await fetch("/api/generate", { // Updated endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobDescription,
        userQualifications,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Use the detailed error message from the backend if available
      throw new Error(data.details || data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    // Re-throw the error so it can be caught by the component
    throw error;
  }
}