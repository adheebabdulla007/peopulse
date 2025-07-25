import express from 'express';
import {
  addEmployee,
  getAllEmployees,
  getMyProfile,
  updateMyProfile,
} from '../controllers/employee.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// HR or ADMIN can list all employees
router.get(
  '/',
  authenticate,
  authorizeRoles('HR', 'ADMIN'),
  getAllEmployees
);

// Only HR can add an employee
router.post(
  '/',
  authenticate,
  authorizeRoles('HR'),
  addEmployee
);

// Employee can view and update their own profile
router
  .route('/my-profile')
  .get(
    authenticate,
    authorizeRoles('EMPLOYEE'),
    getMyProfile
  )
  .patch(
    authenticate,
    authorizeRoles('EMPLOYEE'),
    updateMyProfile
  );

export default router;

