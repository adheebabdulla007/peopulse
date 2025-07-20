export default (sequelize, DataTypes) => {
  const EmployeeProfile = sequelize.define('EmployeeProfile', {
    profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    job_title: DataTypes.STRING,
    department: DataTypes.STRING,
    date_of_joining: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'ON_LEAVE'),
      defaultValue: 'ACTIVE',
    },
  });

  return EmployeeProfile;
};
