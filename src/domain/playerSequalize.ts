import { DataTypes, Sequelize } from 'sequelize';
import db from '../infrastructure/sequalize';

export const PlayerDb = db.define('players', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING
	},
	date: {
		type: DataTypes.STRING
	},
	winPercentage: {
		type: DataTypes.FLOAT
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	}
});

export const Roll = db.define('rolls', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	roll1: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	roll2: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	total: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	result: {
		type: DataTypes.STRING,
		allowNull: false
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	},
	playerId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'players',
			key: 'id'
		},
		allowNull: false
	}
});

PlayerDb.sync();
Roll.sync();
