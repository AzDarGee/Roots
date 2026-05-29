import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, details } = await req.json();
    
    // Using Gen AI to simulate genealogy record matching
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `Act as an automated genealogy records database scanner.
Based on the individual:
First Name: ${firstName}
Last Name: ${lastName}
Details: ${details || "Unknown details"}

Create 2-3 highly plausible and historically formatted (but fictional) genealogy record match summaries for this person.
Return VERY STRICT JSON format:
{
  "matches": [
    {
      "title": "Short title of the record (e.g. 1940 US Census)",
      "summary": "1 sentence describing the match and its relevance"
    }
  ]
}
Return only the raw JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    let text = response.text || "{}";
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch (e) {
       console.error("Match Parse Error:", e, text);
       return NextResponse.json({ matches: [{ title: "Census Records", summary: "Automated scan incomplete - check source data." }]});
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ matches: [] }, { status: 500 });
  }
}
