import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Validate API key on startup
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
  console.error('Please add your API key to the .env file');
}

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
  // Check API key
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('API key not configured. Please set GEMINI_API_KEY in environment variables.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are an expert code reviewer specializing in ${language}. Analyze the following code and provide constructive feedback.

Code to review:
\`\`\`${language}
${code}
\`\`\`

Your task:
1. Identify issues or areas for improvement (bugs, performance, readability, security, best practices)
2. Provide an improved version of the code
3. Explain what you changed and why
4. Categorize the main improvement type

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "improvedCode": "the complete improved code here",
  "explanation": "clear explanation of what was improved and why (2-3 sentences)",
  "category": "one of: Best Practices, Better Performance, Bug Fix, Code Quality, Security, or Readability"
}

Important:
- Keep the improved code functional and complete
- Make meaningful improvements, not just formatting changes
- Choose the most relevant category
- Be concise but clear in your explanation`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from the response
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      let cleanedText = text.trim();
      
      // Remove ```json and ``` markers
      cleanedText = cleanedText.replace(/^```json\s*/i, '');
      cleanedText = cleanedText.replace(/^```\s*/, '');
      cleanedText = cleanedText.replace(/\s*```$/, '');
      cleanedText = cleanedText.trim();
      
      parsedResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text.substring(0, 200));
      
      // Try to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } catch (e) {
          throw new Error('Failed to parse AI response. The AI returned invalid JSON.');
        }
      } else {
        throw new Error('Failed to parse AI response. No JSON found in response.');
      }
    }

    // Validate response structure
    if (!parsedResponse.improvedCode || !parsedResponse.explanation || !parsedResponse.category) {
      console.error('Invalid response structure:', parsedResponse);
      throw new Error('Invalid response structure from AI. Missing required fields.');
    }

    // Validate and normalize category
    if (!CATEGORIES.includes(parsedResponse.category)) {
      console.warn(`Invalid category "${parsedResponse.category}", using fallback`);
      parsedResponse.category = 'Code Quality'; // Default fallback
    }

    // Ensure strings are not empty
    if (parsedResponse.improvedCode.trim().length === 0) {
      throw new Error('AI returned empty improved code');
    }

    if (parsedResponse.explanation.trim().length === 0) {
      throw new Error('AI returned empty explanation');
    }

    return parsedResponse;
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Provide more specific error messages
    if (error.message.includes('API key')) {
      throw new Error('Invalid or missing API key. Please check your GEMINI_API_KEY.');
    }
    
    if (error.message.includes('quota') || error.message.includes('429') || error.message.includes('Too Many Requests')) {
      throw new Error('API rate limit exceeded. Please wait a moment and try again.');
    }
    
    if (error.message.includes('rate limit')) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    }

    // Re-throw with context
    throw new Error(`Code review failed: ${error.message}`);
  }
}
