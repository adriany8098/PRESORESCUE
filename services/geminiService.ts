
import { GoogleGenAI, Type } from "@google/genai";
import { RescueAdvice } from "../types";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 2, initialDelay = 1000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isRateLimit = error?.message?.includes('429') || error?.status === 429;
      if (isRateLimit && i < maxRetries - 1) {
        await sleep(initialDelay * Math.pow(2, i));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

/**
 * Enhanced Gemini Service with Intent-First logic.
 * Implements: Pause Rule, Chain of Thought, Draft First (Angles), and Generic Content Ban.
 */
export const getRescueAdvice = async (topic: string, audience: string): Promise<RescueAdvice> => {
  return withRetry(async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        parts: [{
          text: `You are an Elite Intent-First Academic Presentation Strategist. 
          Topic: ${topic}
          Audience: ${audience}
          
          MANDATORY OPERATIONAL RULES:
          1. THE PAUSE RULE: If the prompt is shorter than 10 words or lacks sufficient detail to create a high-impact strategy, do NOT generate a structure. Instead, set the 'hook' to exactly: "I want to make this perfect. Could you tell me: Who is the audience? What is the #1 goal of this presentation?" and leave 'structure' empty.
          
          2. CHAIN OF THOUGHT: Before generating the final JSON fields, you must internally generate a 'strategicAnalysis' (provided in the JSON) that identifies the user's true intent, hidden challenges of the topic, and the psychological impact needed for the specific audience.
          
          3. DRAFT FIRST: If the prompt is sufficient, instead of a slide-by-slide structure, provide 3 distinct 'Strategic Angles' in the 'structure' array (e.g., 'The Pitch Deck Angle', 'The Educational Angle', 'The Storytelling Angle'). Each angle should summarize a unique way to approach the topic.
          
          4. NO GENERIC CONTENT: You are STRICTLY FORBIDDEN from using words like "Introduction", "Conclusion", "Overview", "Background", or "Summary" in your titles or angles. Every title must be hyper-specific to the topic.
          
          Return your response in valid JSON.`
        }]
      }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategicAnalysis: { type: Type.STRING, description: "Internal analysis of intent and strategy" },
            hook: { type: Type.STRING, description: "A catchy opening statement or the Pause Rule message" },
            structure: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 Strategic Angles or follow-up questions"
            },
            designTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Visual design advice tied to the strategic analysis"
            }
          },
          required: ["strategicAnalysis", "hook", "structure", "designTips"]
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("Empty response from AI");
    
    return JSON.parse(jsonStr) as RescueAdvice;
  });
};
