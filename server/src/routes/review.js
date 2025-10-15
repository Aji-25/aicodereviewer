import express from 'express';
import { reviewCode } from '../services/gemini.js';

const router = express.Router();

// Simple in-memory rate limiter
const requestTimestamps = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 10; // Max 10 requests per minute

const rateLimiter = (req, res, next) => {
  const clientId = req.ip || 'unknown';
  const now = Date.now();
  
  // Get or create timestamp array for this client
  if (!requestTimestamps.has(clientId)) {
    requestTimestamps.set(clientId, []);
  }
  
  const timestamps = requestTimestamps.get(clientId);
  
  // Remove timestamps older than the window
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  
  // Check if limit exceeded
  if (recentTimestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.'
    });
  }
  
  // Add current timestamp
  recentTimestamps.push(now);
  requestTimestamps.set(clientId, recentTimestamps);
  
  next();
};

router.post('/review', rateLimiter, async (req, res, next) => {
  try {
    const { code, language } = req.body;

    // Validation
    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        error: 'Code is required and must be a string'
      });
    }

    if (!language || typeof language !== 'string') {
      return res.status(400).json({
        error: 'Language is required and must be a string'
      });
    }

    // Additional validation
    if (code.trim().length === 0) {
      return res.status(400).json({
        error: 'Code cannot be empty'
      });
    }

    if (code.length > 10000) {
      return res.status(400).json({
        error: 'Code is too long (maximum 10,000 characters)'
      });
    }

    // Log request for debugging
    console.log(`📝 Review request for ${language} code (${code.length} chars)`);

    // Call Gemini service
    const result = await reviewCode(code, language);

    // Validate result structure before sending
    if (!result.improvedCode || !result.explanation || !result.category) {
      throw new Error('Invalid response structure from AI service');
    }

    console.log(`✅ Review completed: ${result.category}`);

    res.json(result);
  } catch (error) {
    console.error('❌ Review error:', error.message);
    
    // Send appropriate error response
    if (error.message.includes('API key')) {
      return res.status(500).json({
        error: 'AI service configuration error. Please check API key.'
      });
    }
    
    if (error.message.includes('quota') || error.message.includes('rate limit')) {
      return res.status(429).json({
        error: 'API rate limit exceeded. Please try again later.'
      });
    }

    next(error);
  }
});

export default router;
