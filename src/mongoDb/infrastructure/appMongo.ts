import express from 'express';
import cors from 'cors';
import { router } from '../application/routesMongo';
import mongoose from 'mongoose';

export const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mongoose6')
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch((error) => console.log('Error al conectar a MongoDB:', error));

export const server = app.listen('3000', () => {
	console.log('App listening on port 3000!');
});

app.use(express.json());
app.use(cors());
app.use('', router);
