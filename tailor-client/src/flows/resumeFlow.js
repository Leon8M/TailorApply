// flows/resumeFlow.js
import { defineFlow } from '@genkit-ai/core';
import { generate } from '@genkit-ai/ai';
import { z } from 'zod';

export const ResumeInputSchema = z.object({
  jobDescription: z.string().min(50),
  userQualifications: z.string().min(50)
});

export default defineFlow({
  name: 'resumeFlow',
  inputSchema: ResumeInputSchema,
  outputSchema: z.string(),
}, async ({ jobDescription, userQualifications }) => {
  const prompt = `Generate a professional resume for a candidate with these qualifications:
  
  Job Requirements:
  ${jobDescription}
  
  Candidate Qualifications:
  ${userQualifications}
  
  Format the resume in markdown with these sections:
  1. Professional Summary
  2. Technical Skills
  3. Work Experience
  4. Education
  5. Certifications (if applicable)
  `;

  const llmResponse = await generate({
    model: 'googleai/gemini-pro',
    prompt: prompt,
    config: {
      temperature: 0.7,
      maxOutputTokens: 2000
    }
  });

  return llmResponse.text();
});