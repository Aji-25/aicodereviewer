import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const CATEGORIES = [
  'Best Practices',
  'Better Performance',
  'Bug Fix',
  'Code Quality',
  'Security',
  'Readability'
];

export async function reviewCode(code, language) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert code reviewer. Analyze the following ${language} code and provide:
1. An improved version of the code
2. A clear explanation of what was improved and why
3. A single category from this list: ${CATEGORIES.join(', ')}

Code to review:
\`\`\`${language}
${code}
\`\`\`

Respond in the following JSON format (no markdown, just raw JSON):
{
  "improvedCode": "the improved code here",
  "explanation": "detailed explanation of improvements",
  "category": "one category from the list"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from the response
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      throw new Error('Failed to parse AI response');
    }

    // Validate response structure
    if (!parsedResponse.improvedCode || !parsedResponse.explanation || !parsedResponse.category) {
      throw new Error('Invalid response structure from AI');
    }

    // Validate category
    if (!CATEGORIES.includes(parsedResponse.category)) {
      parsedResponse.category = 'Code Quality'; // Default fallback
    }

    return parsedResponse;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error(`Code review failed: ${error.message}`);
  }
}
