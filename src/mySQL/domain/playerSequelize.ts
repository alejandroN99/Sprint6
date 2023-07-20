import { DataTypes,Model, Sequelize } from 'sequelize';
import db from '../infrastructure/sequelize';

interface PlayerAttributes {
	id: number;
	name: string;
	date: string;
	winPercentage: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface PlayerInstance extends Model<PlayerAttributes>, PlayerAttributes {}


export const PlayerDb = db.define<PlayerInstance>('players', {
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
interface IRollAttributes{
	id: number;
	roll1: number;
	roll2: number;
	total: number;
	result: string;
	createdAt: Date;
	updatedAt: Date;
	playerId: number;
};

export interface IRollInstance extends Model<IRollAttributes>, IRollAttributes {}

export const Roll = db.define<IRollInstance>('rolls', {
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
