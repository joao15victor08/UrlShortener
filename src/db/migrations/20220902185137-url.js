"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("urls", {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			originalUrl: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			path: {
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
				unique: true,
			},
			thumbnail: {
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
			},
			totalVisits: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			active: {
				type: Sequelize.DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			maxVisits: {
				type: Sequelize.DataTypes.BIGINT,
				allowNull: false,
				defaultValue: Number.MAX_SAFE_INTEGER,
			},
			maxTimeActive: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(8640000000000000),
			},
			categoryId: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
			},
			createdAt: Sequelize.DataTypes.DATE,
			updatedAt: Sequelize.DataTypes.DATE,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("urls");
	},
};
