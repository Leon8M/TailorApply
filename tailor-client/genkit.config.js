import { googleAI } from '@genkit-ai/googleai';
import { configureGenkit } from '@genkit-ai/core';

export default configureGenkit({
  plugins: [
    googleAI({
      // The API key is automatically read from the GOOGLE_API_KEY
      // environment variable.
    }),
  ],
  logLevel: 'debug', // Set to 'info' in production
  enableTracingAndMetrics: true,
});