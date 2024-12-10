import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Login handler
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Use the expiration time from the environment variable
    const tokenExpiration = process.env.JWT_EXPIRATION_TIME || '1h';

    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: tokenExpiration } // Token expiration time
    );

    return res.json({ token }); // Send the token back in the response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// Define the POST route for login
router.post('/login', login);

export default router;
