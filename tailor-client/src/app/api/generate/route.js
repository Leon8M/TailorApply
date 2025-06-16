import { runFlow } from '@genkit-ai/flow';
import { resumeFlow } from '@/flows/resumeFlow';
import { NextResponse } from 'next/server';
import { initGenkit } from '@genkit-ai/core';
import config from '../../../../genkit.config.js';

// Initialize Genkit with your configuration
initGenkit(config);

export async function POST(req) {
  const { jobDescription, userQualifications } = await req.json();

  try {
    // Run the flow with the provided input
    const resumeText = await runFlow(resumeFlow, { jobDescription, userQualifications });
    
    // Return the successful response
    return NextResponse.json({ resumeText });

  } catch (error) {
    console.error("Error running Genkit flow:", error);
    
    // Provide a user-friendly error message
    const errorMessage = error.cause?.message || "An unexpected error occurred.";
    
    // Return an error response
    return NextResponse.json(
      { error: "Failed to generate resume.", details: errorMessage },
      { status: 500 }
    );
  }
}