import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set.');
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

// Fallback models if gemini-3.8-flash hits temporary 503 capacity limits
const CANDIDATE_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.1-pro-preview',
];

/**
 * Executes generateContent with automatic retry and model fallback
 * to gracefully handle 503 "model is currently experiencing high demand" spikes.
 */
export async function generateContentWithFallback(params: {
  contents: string;
  systemInstruction?: string;
  temperature?: number;
  responseMimeType?: string;
}) {
  const ai = getGeminiClient();
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    // Up to 2 attempts per model with slight jitter
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: {
            systemInstruction: params.systemInstruction || undefined,
            temperature: params.temperature ?? 0.7,
            responseMimeType: params.responseMimeType,
          },
        });
        return { response, modelUsed: model };
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const is503OrRateLimit =
          errMsg.includes('503') ||
          errMsg.includes('high demand') ||
          errMsg.includes('UNAVAILABLE') ||
          errMsg.includes('429') ||
          errMsg.includes('RESOURCE_EXHAUSTED');

        console.warn(`Attempt ${attempt + 1} with model ${model} failed: ${errMsg}`);

        if (is503OrRateLimit) {
          // Quick wait before next attempt or next model
          await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
          continue;
        } else {
          // If it's another type of error (e.g. invalid argument), don't loop endlessly
          break;
        }
      }
    }
  }

  throw lastError || new Error('All model attempts failed');
}
