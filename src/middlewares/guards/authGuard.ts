import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthPayload extends JwtPayload {
  userId: string;
  tenantId: string;
  roleId?: string;
}

// Extend Express Request type
export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}

export const authGuard = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token) as AuthPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
