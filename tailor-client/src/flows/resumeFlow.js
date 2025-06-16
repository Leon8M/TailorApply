import { defineFlow } from '@genkit-ai/core'; // Changed from @genkit-ai/flow

import { gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod'

// Define the input schema for our flow using Zod for validation.
const ResumeInputSchema = z.object({
  jobDescription: z.string().min(50, { message: "Job description must be at least 50 characters." }),
  userQualifications: z.string().min(50, { message: "User qualifications must be at least 50 characters." }),
});

export const resumeFlow = defineFlow(
  {
    name: 'resumeFlow',
    inputSchema: ResumeInputSchema,
    outputSchema: z.string(), // The output will be the resume text as a string.
  },
  async (input) => {
    const { jobDescription, userQualifications } = input;

    // A more detailed and structured prompt for better results.
    const prompt = `
      Act as a professional resume writer. Your task is to create a compelling, modern, and professional resume in Markdown format.

      Here is the information to use:

      **1. Job Description (The Target Role):**
      ---
      ${jobDescription}
      ---

      **2. Candidate's Qualifications (Their Skills & Experience):**
      ---
      ${userQualifications}
      ---

      **Instructions:**
      1.  **Analyze the Job Description:** Identify the key skills, responsibilities, and qualifications the employer is seeking.
      2.  **Tailor the Resume:** Emphasize the candidate's qualifications that directly match the job description. Use keywords from the job description naturally throughout the resume.
      3.  **Structure:** Generate a complete resume with the following sections in this order:
          * **Contact Information:** (Use placeholders like "[Your Name]", "[City, State]", "[Phone Number]", "[Email Address]", "[LinkedIn Profile URL]").
          * **Professional Summary:** A concise 3-4 sentence summary that highlights the candidate's key strengths and career goals, tailored to the target role.
          * **Skills:** A bulleted list of key technical and soft skills. Prioritize skills mentioned in the job description.
          * **Professional Experience:** Detail past roles from the provided qualifications. For each role, use 3-5 bullet points to describe achievements, not just duties. Use action verbs and quantify achievements where possible (e.g., "Increased efficiency by 15%").
          * **Education:** List the candidate's educational background.
      4.  **Formatting:**
          * Use clean Markdown.
          * Use bolding for titles and job positions.
          * Use bullet points for lists.
          * Maintain a professional and confident tone.

      Generate the final resume now.
    `;

    // Generate the content using the Gemini 1.5 Flash model.
    const llmResponse = await gemini15Flash.generate({
      prompt: prompt,
      config: {
        temperature: 0.6, // A bit of creativity but still professional.
      },
    });

    return llmResponse.text();
  }
);