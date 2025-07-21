import { verifyToken } from '../utils/jwt.js';
import { UNAUTHORIZED, FORBIDDEN } from '../utils/httpStatusCodes.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
  }
}

export function authorizeHR(req, res, next) {
  if (req.user.role !== 'HR') {
    return res.status(FORBIDDEN).json({ message: 'Forbidden: HR access required' });
  }
  next();
}
