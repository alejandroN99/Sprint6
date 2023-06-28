import express from 'express';
import {router} from '../application/routes'

export const app = express();

export const server = app.listen(8080, () => {
    console.log('App listening on port 8080!')
});

app.use(express.json());
app.use('', router)