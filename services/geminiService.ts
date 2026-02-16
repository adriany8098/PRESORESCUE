
import { GoogleGenAI, Type } from "@google/genai";
import { RescueAdvice } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getRescueAdvice = async (topic: string, audience: string): Promise<RescueAdvice> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Help a student who is panicking about a presentation. 
    Topic: ${topic}
    Audience: ${audience}
    
    Provide an "Instant Rescue Plan" including a compelling opening hook, a 5-slide structure, and specific visual design tips to make it look professional.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hook: { type: Type.STRING, description: "A catchy opening statement" },
          structure: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "5 slide titles with brief content description"
          },
          designTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Visual design advice for this specific topic"
          }
        },
        required: ["hook", "structure", "designTips"]
      }
    }
  });

  try {
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as RescueAdvice;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to generate rescue advice");
  }
};
