// app/lib/genkit-init.js
import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

export default function initGenkit() {
  if (global._genkitInitialized) return;

  configureGenkit({
    plugins: [
      googleAI({
        apiKey: process.env.GOOGLE_API_KEY, // Make sure this is in your .env
        location: 'us-central1' // Or your preferred location
      })
    ],
    logLevel: 'debug',
    enableTracing: true
  });

  global._genkitInitialized = true;
}

// Initialize immediately when imported
initGenkit();