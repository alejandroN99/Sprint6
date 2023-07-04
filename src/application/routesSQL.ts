import express from 'express';
import {
	getAllPlayers,
	createPlayer,
	playerRoll,
	getAllPlayerRolls,
	updatePlayerName,
	deletePlayerRolls
} from './controllerSequealize';

export const router = express.Router();

router.post('/players/:name?', createPlayer);

router.put('/players/:id/:updateName', updatePlayerName);

router.get('/players', getAllPlayers);

router.post('/games/:id', playerRoll);

router.delete('/games/:id', deletePlayerRolls);

router.get('/games/:id', getAllPlayerRolls);

// router.get('/ranking', getRanking);

// router.get('/ranking/loser', getLosingPlayer);

// router.get('/ranking/winner', getWinningPlayer);
