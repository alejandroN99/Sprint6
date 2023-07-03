import { Player } from '../domain/player';
import { playGame } from './rollService';
import { find } from '../domain/utilities/find';
import { Request, Response } from 'express';
import * as dataJson from '../../src/dataJson.json';
import { IRoll } from '../domain/utilities/IRoll';
import { PlayerDb, Roll } from '../domain/playerSequalize';

export const getAllPlayers = async (_req: Request, res: Response)=> {
	
    const players = await PlayerDb.findAll();

	return res.status(200).send(players);
};