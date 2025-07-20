// server/src/migrations/20250720123456-init-models.js

/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Companies", {
      company_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.TEXT,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.createTable("Users", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("HR", "EMPLOYEE"),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
    });

    await queryInterface.createTable("EmployeeProfiles", {
      profile_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      job_title: Sequelize.STRING,
      department: Sequelize.STRING,
      date_of_joining: Sequelize.DATEONLY,
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE", "ON_LEAVE"),
        defaultValue: "ACTIVE",
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    // Drop in reverse order to avoid foreign key errors
    await queryInterface.dropTable("EmployeeProfiles");
    await queryInterface.dropTable("Users");
    await queryInterface.dropTable("Companies");
  },
};
