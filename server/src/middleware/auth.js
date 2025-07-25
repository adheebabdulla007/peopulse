import { verifyToken } from '../utils/jwt.js';
import { UNAUTHORIZED, FORBIDDEN } from '../utils/httpStatusCodes.js';
import { User } from '../models/index.js';

// Verifies JWT and confirms the user exists in the DB
export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.user_id);
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
  }
}

// Restricts route to specified roles
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(FORBIDDEN).json({ 
        message: `Forbidden: ${allowedRoles.join(' or ')} access required` 
      });
    }
    next();
  };
}

