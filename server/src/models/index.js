import Company from './Company.js';
import User from './User.js';
import EmployeeProfile from './EmployeeProfile.js';

export default async (sequelize) => {
  const models = {
    Company: Company(sequelize),
    User: User(sequelize),
    EmployeeProfile: EmployeeProfile(sequelize),
  };

  // Associate models here
  models.Company.hasMany(models.User, { foreignKey: 'company_id' });
  models.User.belongsTo(models.Company, { foreignKey: 'company_id' });
  models.User.hasOne(models.EmployeeProfile, { foreignKey: 'user_id' });
  models.EmployeeProfile.belongsTo(models.User, { foreignKey: 'user_id' });

  return models;
};
