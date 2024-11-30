import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: 'Authentication has failed' });
  }

  // Verify the password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication has failed' });
  }

  // Ensure the JWT_SECRET_KEY exists
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not defined in the environment variables.');
  }

  // Generate a JWT token
  const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '2h' });

  return res.json({ token });
};

// Create and export the login router
const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
