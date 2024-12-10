import { Router } from 'express';
import { ticketRouter } from './api/ticket-routes.js';
import { userRouter } from './api/user-routes.js';
import authRouter from './auth-routes.js'; // Import authRouter
import { authenticateToken } from '../middleware/auth.js'; // Import the authenticateToken middleware

const router = Router();

// Use authRouter for login-related routes
router.use('/auth', authRouter); // This routes to /api/auth/login

// Protect the /tickets and /users routes by requiring authentication
router.use('/tickets', authenticateToken, ticketRouter); // This routes to /api/tickets
router.use('/users', authenticateToken, userRouter); // This routes to /api/users

export default router;
