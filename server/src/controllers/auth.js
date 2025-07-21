import { User, Company } from '../models/index.js';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import sequelize from '../config/db.js';
import { generateToken } from '../utils/jwt.js';
import {
  CREATED,
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
  SERVER_ERROR,
} from '../utils/httpStatusCodes.js';

/**
 * Creates a new company and its first HR user account.
 * Ensures atomicity via a database transaction.
 */
export async function hrSignup(req, res, next) {
  // Begin a transaction to ensure atomicity
  const transaction = await sequelize.transaction();

  try {
    // Destructure and validate input
    const { companyName, firstName, lastName, email, password, dob } = req.body;

    // Check for required fields
    if (!companyName || !firstName || !lastName || !email || !password || !dob) {
      await transaction.rollback();
      return res.status(BAD_REQUEST).json({ message: 'All fields are required' });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      await transaction.rollback();
      return res.status(BAD_REQUEST).json({ message: 'Invalid email format' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email }, transaction });
    if (existingUser) {
      await transaction.rollback();
      return res.status(CONFLICT).json({ message: 'Email already in use' });
    }

    // Create company
    const company = await Company.create(
      { name: companyName },
      { transaction }
    );

    // Hash password
    const passwordHash = await bcryptjs.hash(password, 10);

    // Create HR user
    const hrUser = await User.create(
      {
        company_id: company.company_id,
        role: 'HR',
        email,
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        dob,
      },
      { transaction }
    );

    // All operations succeeded; commit transaction
    await transaction.commit();

    // Respond with success (no password)
    res.status(CREATED).json({
      message: 'HR and company created',
      user: {
        user_id: hrUser.user_id,
        first_name: hrUser.first_name,
        last_name: hrUser.last_name,
        email: hrUser.email,
        role: hrUser.role,
      },
      company: {
        company_id: company.company_id,
        name: company.name,
      },
    });
  } catch (err) {
    // If any error, rollback to avoid inconsistent state
    await transaction.rollback();
    next(err);
  }
}

/**
 * Authenticates a user (HR or EMPLOYEE) and issues a JWT.
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(BAD_REQUEST).json({ message: 'Email and password are required' });
    }

    // Validate email address
    if (!validator.isEmail(email)) {
      return res.status(BAD_REQUEST).json({ message: 'Invalid email format' });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcryptjs.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = generateToken({
      user_id: user.user_id,
      role: user.role,
      email: user.email,
    });

    // Respond with token and basic user info (no password)
    res.json({
      token,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

