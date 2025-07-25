'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'role', {
        type: Sequelize.ENUM('HR', 'EMPLOYEE', 'ADMIN'),
        allowNull: false,
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'role', {
        type: Sequelize.ENUM('HR', 'EMPLOYEE', 'ADMIN'),
        allowNull: false,
    });
}
