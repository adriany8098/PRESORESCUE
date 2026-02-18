
import { GoogleGenAI, Type } from "@google/genai";

export interface SlideContent {
  title: string;
  keyPoints: string[];
  visualDirective: string;
  imagePrompt: string;
  speakerScript?: string;
}

export interface MissionBriefing {
  missionId: string;
  operationName: string;
  objective: string;
  slides: SlideContent[];
  tacticalNotes: string[];
  theme: string;
  strategicAnalysis?: string;
  generatedImages?: string[];
  planType?: 'chill' | 'emergency';
}

export interface FileData {
  base64: string;
  mimeType: string;
}

/**
 * Generates a mission briefing using Intent-First reasoning and strict fact-checking.
 */
export const generateMissionBriefing = async (
  goal: string,
  notes: string,
  tone: string,
  theme: string,
  fileData?: FileData,
  planType: 'chill' | 'emergency' = 'chill'
): Promise<MissionBriefing> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const isPro = planType === 'emergency';
  
  const modelToUse = isPro ? "gemini-3-pro-preview" : "gemini-3-flash-preview";

  const parts: any[] = [
    {
      text: `ACT AS AN ELITE ACADEMIC RESCUE COMMANDER. 
      
      PLAN LEVEL: ${isPro ? "EMERGENCY EXIT (PRO)" : "CHILL SAVER (STANDARD)"}
      
      CORE MISSION INSTRUCTIONS:
      "The user is talking to ${goal}. Here are their raw, messy notes: ${notes}. Use the ${tone} tone. Do NOT use generic corporate fluff. Focus only on the facts provided in the notes. If the notes are too thin, ask the user for more detail before generating."

      STRICT FACT-CHECK PROTOCOL:
      "If a fact isn't in the user's notes, do not invent it. Only structure their existing ideas into professional slides."
      
      INTENT-FIRST PROTOCOLS:
      1. THE PAUSE RULE: If the combined input is vague or notes are thinner than 10 words, do NOT generate a full deck. Instead, set 'objective' to exactly: "I want to make this perfect. Could you tell me: Who is the audience? What is the #1 goal of this presentation?" and suggest 3 'Draft Angles' in the slides array.
      2. CHAIN OF THOUGHT: Populate 'strategicAnalysis' with an internal tactical approach paragraph.
      3. NO GENERIC CONTENT: Never use "Introduction", "Conclusion", "Overview". Use punchy, specific headlines derived ONLY from the provided facts.
      ${isPro ? "4. SPEAKER SCRIPT: For the Emergency plan, you MUST generate a detailed topic-specific 'speakerScript' for every slide." : ""}
      
      THEME: "${theme}"
      
      Generate JSON briefing. Slides array must contain exactly 10 specific topic-focused slides (unless Pause Rule is triggered).`
    }
  ];

  if (fileData) {
    parts.push({
      inlineData: {
        data: fileData.base64,
        mimeType: fileData.mimeType
      }
    });
  }
  
  const response = await ai.models.generateContent({
    model: modelToUse,
    contents: [{ parts }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          missionId: { type: Type.STRING },
          operationName: { type: Type.STRING },
          objective: { type: Type.STRING },
          strategicAnalysis: { type: Type.STRING },
          slides: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                visualDirective: { type: Type.STRING },
                imagePrompt: { type: Type.STRING },
                speakerScript: { type: Type.STRING }
              },
              required: ["title", "keyPoints", "visualDirective", "imagePrompt"]
            }
          },
          tacticalNotes: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["missionId", "operationName", "objective", "slides", "tacticalNotes", "strategicAnalysis"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("AI Command failed to report for duty.");
  
  const parsed = JSON.parse(text);
  return { ...parsed, theme, planType } as MissionBriefing;
};
