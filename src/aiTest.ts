 import { geminiClient } from "./Utilities/geminiClient";

export async function testGemini() {
  try {
    const prompt = `
Return ONLY valid JSON.
{
  "hello": "world"
}
`;

    const response = await geminiClient.generate(prompt);

    console.log("AI Raw Response:\n", response);
  } catch (error) {
    console.error("Gemini Test Failed:", error);
  }
}

