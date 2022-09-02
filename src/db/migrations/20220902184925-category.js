"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("categories", {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			createdAt: Sequelize.DataTypes.DATE,
			updatedAt: Sequelize.DataTypes.DATE,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("categories");
	},
};
