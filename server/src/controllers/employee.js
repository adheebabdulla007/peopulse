import { User, EmployeeProfile } from '../models/index.js';
import bcryptjs from 'bcryptjs';
import sequelize from '../config/db.js';

// HR/ADMIN: List all employees for the company
export async function getAllEmployees(req, res) {
  try {
    const employees = await User.findAll({
      where: { company_id: req.user.company_id },
      attributes: ['user_id', 'first_name', 'last_name', 'email', 'role'],
      include: [{
        model: EmployeeProfile,
        attributes: ['job_title', 'department', 'date_of_joining', 'status'],
      }],
    });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// EMPLOYEE: Get own profile
export async function getMyProfile(req, res) {
  try {
    const profile = await User.findOne({
      where: { user_id: req.user.user_id },
      attributes: ['user_id', 'first_name', 'last_name', 'email', 'role'],
      include: [{
        model: EmployeeProfile,
        attributes: ['job_title', 'department', 'date_of_joining', 'status'],
      }],
    });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// HR: Add employee (your existing logic)
export async function addEmployee(req, res, next) {
  const transaction = await sequelize.transaction();
  try {
    const {
      firstName, lastName, email, password, dob,
      jobTitle, department, dateOfJoining
    } = req.body;

    if (!firstName || !lastName || !email || !password || !dob ||
        !jobTitle || !department || !dateOfJoining) {
      await transaction.rollback();
      return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = await User.findOne({
      where: { email },
      transaction,
    });
    if (exists) {
      await transaction.rollback();
      return res.status(409).json({ message: 'Email already exists' });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const employeeUser = await User.create({
      company_id: req.user.company_id,
      role: 'EMPLOYEE',
      email,
      password_hash: passwordHash,
      first_name: firstName,
      last_name: lastName,
      dob,
    }, { transaction });

    const employeeProfile = await EmployeeProfile.create({
      user_id: employeeUser.user_id,
      job_title: jobTitle,
      department,
      date_of_joining: dateOfJoining,
      status: 'ACTIVE',
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      message: 'Employee added',
      user: {
        user_id: employeeUser.user_id,
        first_name: employeeUser.first_name,
        last_name: employeeUser.last_name,
        email: employeeUser.email,
        role: employeeUser.role,
      },
      profile: {
        profile_id: employeeProfile.profile_id,
        job_title: employeeProfile.job_title,
        department: employeeProfile.department,
        date_of_joining: employeeProfile.date_of_joining,
        status: employeeProfile.status,
      }
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
}

export async function updateMyProfile(req, res) {
  try {
    const { firstName, lastName, email, dob } = req.body;
    const [updatedCount] = await User.update(
      { first_name: firstName, last_name: lastName, email, dob },
      { where: { user_id: req.user.user_id } }
    );
    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}


