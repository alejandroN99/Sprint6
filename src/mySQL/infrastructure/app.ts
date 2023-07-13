import express from 'express';
import cors from 'cors';
import { router } from '../application/routesSQL';
import db from './sequelize';

export const app = express();

export const server = app.listen('3000', () => {
	console.log('App listening on port 3000!');
});

const dbConnection = async () => {
	try {
		await db.authenticate();
		console.log('Database online');
	} catch (error) {
		throw new Error(error as string);
	}
};

dbConnection();

app.use(express.json());
app.use(cors());
app.use('', router);
