import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body; // Get the username and password from the request body

  try {
    const user = await User.findOne({ where: {username }}); 

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' }); 
    }

    const token = jwt.sign(
      { username: user.username, id: user.id }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' } 
    );

    // Send the token back to the client
    return res.json({ token }); // Ensure we return here
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' }); // Ensure we return here as well
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);
export default router;