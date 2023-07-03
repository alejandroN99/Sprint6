import {  DataTypes, Sequelize } from 'sequelize';
import db from '../infrastructure/sequalize';

db.sync();

export const PlayerDb = db.define('players',{
    name: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    rolls: {
        type: DataTypes.NUMBER
    },
    winPercentage: {
        type: DataTypes.NUMBER
    },
    createdAt:{
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
    roll1: {
        type: DataTypes.NUMBER
    },
    roll2: {
        type: DataTypes.NUMBER
    },
    total: {
        type: DataTypes.NUMBER
    },
    result: {
        type: DataTypes.STRING
    },
    createdAt:{
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
