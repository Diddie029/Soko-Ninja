import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

export interface AnalysisResult {
  summary: string;
  marketComparison: {
    title: string;
    content: string;
    bestMarket: string;
  };
  trends: {
    title: string;
    prediction: string;
    recommendation: string;
  };
  negotiation: {
    minPrice: string;
    phrases: string[];
    advice: string;
  };
  weather: {
    impact: string;
  };
  finalRecommendation: string;
}

export async function analyzeMarket(data: string, language: string): Promise<AnalysisResult> {
  const prompt = `
    You are "Nego na Mkulima", a pro Kenyan market analyzer and negotiator.
    Use realistic, current Kenyan market prices (e.g., Maize 90kg KES 3200-5400, Beans 90kg KES 8500-12000, 
    Onions 1kg KES 80-150, Potatoes 50kg KES 2500-4500). Prices fluctuate based on region (Nairobi is usually highest).

    INPUT DATA:
    ${data}
    
    RESPONSE LANGUAGE: ${language} (Options: English, Kiswahili, Sheng, Auto)
    
    If language is "Sheng", use realistic urban Kenyan slang.

    TASK:
    1. Compare market prices across regions realistically.
    2. Provide a predictive price trend.
    3. Give negotiation advice (minimum price and specific phrases).
    4. Explain weather impact.
    5. Give a final recommendation.

    FORMAT: Return a JSON object with strictly these keys:
    {
      "summary": "Greeting and short summary in specified language",
      "marketComparison": {
        "title": "...",
        "content": "...",
        "bestMarket": "..."
      },
      "trends": {
        "title": "...",
        "prediction": "...",
        "recommendation": "..."
      },
      "negotiation": {
        "minPrice": "...",
        "phrases": ["phrase1", "phrase2"],
        "advice": "..."
      },
      "weather": {
        "impact": "..."
      },
      "finalRecommendation": "..."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze market. Please ensure input is clear.");
  }
}

export async function chatWithNego(message: string, language: string): Promise<string> {
  const prompt = `
    You are "Nego na Mkulima", a friendly and street-smart Kenyan agricultural advisor.
    User says: "${message}"
    Language: ${language}
    Provide a helpful, realistic, and witty response in the selected language. Use local context (Kenyan markets, crops, weather). 
    Keep it under 3 sentences.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text || "Sina jibu kwa sasa, jaribu tena baadaye.";
  } catch (error) {
    return "Error connecting to Nego.";
  }
}
