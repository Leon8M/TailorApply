// app/api/generate/route.js
import { NextResponse } from 'next/server';
import { runFlow } from '@genkit-ai/core';
import resumeFlow from '../../../flows/resumeFlow';

// Initialize Genkit
import '../../lib/genkit-init';

export const dynamic = 'force-dynamic'; // Ensure dynamic execution

export async function POST(request) {
  try {
    const { jobDescription, userQualifications } = await request.json();

    if (!jobDescription || !userQualifications) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await runFlow(resumeFlow, {
      jobDescription,
      userQualifications
    });

    return NextResponse.json({ resumeText: result });

  } catch (error) {
    console.error('Resume generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate resume',
        details: error.message 
      },
      { status: 500 }
    );
  }
}