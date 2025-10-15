import express from 'express';
import { reviewCode } from '../services/gemini.js';

const router = express.Router();

router.post('/review', async (req, res, next) => {
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

    // Call Gemini service
    const result = await reviewCode(code, language);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
