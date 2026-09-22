import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { generateContentWithFallback } from './src/server/gemini.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Zulfiqar AI Social Media Manager Server',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Gemini Text Generation Endpoint with auto-retry and model fallback
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction, temperature = 0.7 } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const { response, modelUsed } = await generateContentWithFallback({
      contents: prompt,
      systemInstruction: systemInstruction || undefined,
      temperature,
    });

    const text = response.text || '';
    res.json({ text, modelUsed });
  } catch (error: any) {
    console.error('Error generating AI text:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate content with Gemini',
    });
  }
});

// Structured JSON Generation Endpoint with auto-retry and model fallback
app.post('/api/ai/generate-json', async (req, res) => {
  try {
    const { prompt, systemInstruction, schemaDescription } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const finalPrompt = `${prompt}\n\nIMPORTANT: Return ONLY valid, raw JSON (no markdown formatting, no \`\`\`json fences). Match this specification: ${schemaDescription || 'A valid JSON object or array'}`;

    const { response, modelUsed } = await generateContentWithFallback({
      contents: finalPrompt,
      systemInstruction:
        systemInstruction ||
        'You are Zulfiqar AI Social Media Manager Agent. You always return strictly valid JSON matching the requested structure.',
      temperature: 0.6,
      responseMimeType: 'application/json',
    });

    const rawText = response.text || '{}';
    try {
      const parsed = JSON.parse(rawText);
      res.json({ data: parsed, modelUsed });
    } catch (parseErr) {
      // Clean up potential markdown wrapper if model output was enclosed in fences
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      res.json({ data: parsed, modelUsed });
    }
  } catch (error: any) {
    console.error('Error generating AI JSON:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate structured data with Gemini',
    });
  }
});

// AI Visual Design Generator
app.post('/api/ai/design-concept', async (req, res) => {
  try {
    const { topic, headline, brandColors, visualStyle, platform, modestRule } = req.body;

    const prompt = `Create a professional visual layout specification for a social media graphic.
Topic: "${topic}"
Headline: "${headline}"
Platform: "${platform || 'instagram'}"
Brand Primary Color: "${brandColors?.primary || '#059669'}"
Brand Secondary Color: "${brandColors?.secondary || '#0f172a'}"
Visual Style: "${visualStyle || 'minimal_modern'}"
Modest Imagery Rule: ${modestRule ? 'YES. If any women or people are depicted, ensure full hijab covering with zero visible hair.' : 'Standard'}

Return a JSON with:
{
  "themeBgGradient": "from-slate-900 to-emerald-950",
  "accentColor": "#10b981",
  "textColor": "#ffffff",
  "badgeText": "META ADS INSIGHT",
  "graphicLayout": "bento" | "quote_focus" | "split_hero" | "stat_callout" | "checklist_card",
  "headlineStyle": "text-2xl font-bold tracking-tight text-white",
  "supportingPoints": ["Point 1", "Point 2", "Point 3"],
  "visualPromptForAIImage": "A high-end 3D minimalist dark workspace with subtle emerald laser lines...",
  "svgPatternType": "geometric_mesh" | "minimal_dots" | "waves" | "gradient_orb"
}`;

    const { response, modelUsed } = await generateContentWithFallback({
      contents: prompt,
      responseMimeType: 'application/json',
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ design: parsed, modelUsed });
  } catch (err: any) {
    console.error('Error creating design concept:', err);
    res.status(500).json({ error: err.message || 'Failed to create design layout' });
  }
});

// Vite middleware in dev or static files in production
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zulfiqar AI Social Media Manager server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
});
