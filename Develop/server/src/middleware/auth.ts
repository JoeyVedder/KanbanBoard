import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401); 
  }

  const token = authHeader.split(' ')[1]; 

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not defined in the environment variables.');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }

    req.user = user as JwtPayload; 
    next();
  });
};
