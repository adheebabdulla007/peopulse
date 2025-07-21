import express from 'express';
import { hrSignup, login } from '../controllers/auth.js';

const router = express.Router();

router.post('/hr/signup', hrSignup);
router.post('/login', login);  // <-- Add this line

export default router;

