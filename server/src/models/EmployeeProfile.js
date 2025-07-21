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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'employee_profiles',
  });

  return EmployeeProfile;
};
