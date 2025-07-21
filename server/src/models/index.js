import Sequelize from 'sequelize';
import sequelize from '../config/db.js';
import UserDef from './User.js';
import CompanyDef from './Company.js';
import EmployeeProfileDef from './EmployeeProfile.js';

const User = UserDef(sequelize, Sequelize.DataTypes);
const Company = CompanyDef(sequelize, Sequelize.DataTypes);
const EmployeeProfile = EmployeeProfileDef(sequelize, Sequelize.DataTypes);

// Add associations here
Company.hasMany(User, { foreignKey: 'company_id' });
User.belongsTo(Company, { foreignKey: 'company_id' });
User.hasOne(EmployeeProfile, { foreignKey: 'user_id' });
EmployeeProfile.belongsTo(User, { foreignKey: 'user_id' });

export { User, Company, EmployeeProfile };
