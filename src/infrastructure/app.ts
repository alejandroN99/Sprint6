import express from 'express';
import cors from 'cors';
import {router} from '../application/routes';
import db from './sequalize';

export const app = express();

export const server = app.listen('3306', () => {
    console.log('App listening on port 3306!')
});

const dbConnection = async () => {
    try {
        await db.authenticate();
        console.log('Database online');
    } catch (error: any) {
        throw new Error(error);
    }
};

dbConnection();

app.use(express.json());
app.use(cors());
app.use('', router);