
import pptxgen from "pptxgenjs";
import { MissionBriefing } from "./gemini";

interface ThemeConfig {
  bg: string;
  accent: string;
  text: string;
  font: string;
  headerFont: string;
}

const THEMES: Record<string, ThemeConfig> = {
  'Midnight Tech': {
    bg: "050505",
    accent: "6366f1",
    text: "FFFFFF",
    font: "Arial",
    headerFont: "Arial Black"
  },
  'Minimalist Pro': {
    bg: "FFFFFF",
    accent: "000000",
    text: "1A1A1A",
    font: "Helvetica",
    headerFont: "Helvetica-Bold"
  },
  'Venture Capital': {
    bg: "001F3F",
    accent: "D4AF37",
    text: "FFFFFF",
    font: "Times New Roman",
    headerFont: "Georgia"
  }
};

const buildPresentation = (briefing: MissionBriefing) => {
  const pres = new pptxgen();
  const theme = THEMES[briefing.theme] || THEMES['Midnight Tech'];
  const isPro = briefing.planType === 'emergency';
  
  pres.title = briefing.operationName;
  pres.subject = briefing.objective;
  pres.author = "PresoRescue AI HQ";

  // 1. Title Slide
  const titleSlide = pres.addSlide();
  titleSlide.background = { color: theme.bg };
  titleSlide.addText(briefing.operationName.toUpperCase(), {
    x: "10%", y: "40%", w: "80%",
    fontSize: 44, bold: true, color: theme.accent, align: "center",
    fontFace: theme.headerFont
  });
  titleSlide.addText(briefing.objective, {
    x: "10%", y: "55%", w: "80%",
    fontSize: 18, italic: true, color: theme.text, align: "center"
  });

  // 2. Content Slides
  briefing.slides.forEach((slideData, index) => {
    const slide = pres.addSlide();
    slide.background = { color: theme.bg };
    
    // Add Speaker Script to Notes if available
    if (slideData.speakerScript) {
      slide.notes = slideData.speakerScript;
    }

    slide.addText(`${String(index + 1).padStart(2, '0')} // ${slideData.title.toUpperCase()}`, {
      x: 0.5, y: 0.4, w: "90%",
      fontSize: 24, bold: true, color: theme.accent, fontFace: theme.headerFont
    });

    const points = slideData.keyPoints.map(p => ({ 
      text: p, 
      options: { bullet: true, color: theme.text, fontSize: 16, margin: 10 } 
    }));
    
    // Layout adjusts based on whether an image exists
    const imageBase64 = briefing.generatedImages?.[index];
    const textWidth = imageBase64 ? "4.5" : "9.0";

    slide.addText(points as any, {
      x: 0.5, y: 1.2, w: textWidth, h: "3.5",
      valign: "top"
    });

    if (imageBase64) {
      slide.addImage({
        data: imageBase64,
        x: 5.2, y: 1.2, w: 4.3, h: 3.2,
        sizing: { type: 'cover', w: 4.3, h: 3.2 }
      });
    }
  });

  // 3. Final Strategic Slide
  const endSlide = pres.addSlide();
  endSlide.background = { color: theme.bg };
  endSlide.addText("TACTICAL BRIEFING SUMMARY", {
    x: 0.5, y: 0.5, w: "90%",
    fontSize: 24, bold: true, color: theme.accent
  });
  
  const notes = briefing.tacticalNotes.map(n => ({ 
    text: n, 
    options: { bullet: true, color: theme.text, fontSize: 16 } 
  }));
  endSlide.addText(notes as any, {
    x: 0.5, y: 1.5, w: "90%", h: "60%",
    valign: "top"
  });

  return pres;
};

export const downloadPresentation = async (briefing: MissionBriefing) => {
  const pres = buildPresentation(briefing);
  await pres.writeFile({ fileName: `${briefing.operationName.replace(/\s+/g, '_')}.pptx` });
};

export const generatePresentationBase64 = async (briefing: MissionBriefing): Promise<string> => {
  const pres = buildPresentation(briefing);
  // @ts-ignore
  const data = await pres.write({ outputType: 'base64' });
  return data as string;
};
