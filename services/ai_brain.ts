
import { GoogleGenAI, Type } from "@google/genai";
import { MissionBriefing } from "./gemini";

/**
 * Sends a prompt to Gemini 3 Flash and returns a structured Mission Briefing.
 * Uses process.env.API_KEY for authentication as per security requirements.
 */
export const sendMessage = async (prompt: string): Promise<MissionBriefing> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{
      parts: [{
        text: `ACT AS AN ELITE ACADEMIC RESCUE COMMANDER. 
        A student is in extreme academic panic over this presentation prompt: "${prompt}".
        
        Generate a complete "Mission Briefing" in JSON format:
        1. missionId: A unique tactical ID (e.g., OP-RES-####).
        2. operationName: A code name that sounds intense and professional.
        3. objective: A 1-sentence primary goal for the presentation.
        4. slides: An array of exactly 6 slide objects. Each must have:
           - title: A punchy, uppercase slide title.
           - keyPoints: 3-4 bullet points of high-value content.
           - visualDirective: A specific, short prompt for a designer.
        5. tacticalNotes: 3 pieces of field advice for presenting under pressure.
        
        Format: Return ONLY valid JSON.`
      }]
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          missionId: { type: Type.STRING },
          operationName: { type: Type.STRING },
          objective: { type: Type.STRING },
          slides: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                visualDirective: { type: Type.STRING }
              },
              required: ["title", "keyPoints", "visualDirective"]
            }
          },
          tacticalNotes: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["missionId", "operationName", "objective", "slides", "tacticalNotes"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("AI Command failed to respond.");
  
  return JSON.parse(text) as MissionBriefing;
};
