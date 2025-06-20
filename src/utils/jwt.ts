import jwt from 'jsonwebtoken';
import {
  AuthenticatedRequest,
  AuthPayload,
} from '../middlewares/guards/authGuard';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // ⛔ Replace in production

const JWT_EXPIRES_IN = '1d'; // 1 day or adjust as needed

export const generateToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
