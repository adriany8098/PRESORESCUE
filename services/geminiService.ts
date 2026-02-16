
import { GoogleGenAI, Type } from "@google/genai";
import { RescueAdvice } from "../types";

export const getRescueAdvice = async (topic: string, audience: string): Promise<RescueAdvice> => {
  // Initialize AI inside the function to ensure we use the latest injected API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        parts: [{
          text: `You are a high-end presentation designer for students. 
          Topic: ${topic}
          Audience: ${audience}
          
          Provide an "Instant Rescue Plan" including a compelling opening hook, a 5-slide structure, and specific visual design tips to make it look professional.
          Return ONLY JSON.`
        }]
      }],
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

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("Empty response from AI");
    
    return JSON.parse(jsonStr) as RescueAdvice;
  } catch (error) {
    console.error("Gemini Rescue Error:", error);
    throw error;
  }
};
