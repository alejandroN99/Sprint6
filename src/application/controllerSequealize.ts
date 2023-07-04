import { name } from './../../node_modules/ci-info/index.d';
import { Player } from '../domain/player';
import { playGame } from './rollService';
import { find } from '../domain/utilities/find';
import { Request, Response } from 'express';
import * as dataJson from '../../src/dataJson.json';
import { IRoll } from '../domain/utilities/IRoll';
import { PlayerDb, Roll } from '../domain/playerSequalize';

export const getAllPlayers = async (_req: Request, res: Response) => {
	const players = await PlayerDb.findAll();

	return res.status(200).send(players);
};

// create player
export const createPlayer = async (req: Request, res: Response) => {
	const { name } = req.params;
	const player = new Player(name);
	await PlayerDb.create(player as any);

	return res.status(201).send(player);
};

// player roll
export const playerRoll = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const player = await PlayerDb.findByPk(id);
	if (!player) {
		return res.status(404).send('Player not found!');
	}
	const roll = playGame(id);
	await Roll.create(roll as any);

	getWinPercentage(req, res);

	return res.status(200).send(roll);
};

// get all player rolls
export const getAllPlayerRolls = async (req: Request, res: Response) => {
	const { id } = req.params;
	const player = await PlayerDb.findByPk(id);
	if (!player) {
		return res.status(404).send('Player not found!');
	}
	const rolls = await Roll.findAll({ where: { playerId: id } });

	return res.status(200).send(rolls);
};

// update player name
export const updatePlayerName = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const player = await PlayerDb.findByPk(id);
	if (!player) {
		return res.status(404).send('Player not found!');
	}
	const { updateName } = req.params;
	if (await PlayerDb.findOne({ where: { name: updateName } })) {
		return res.status(409).send('Player name already exists!');
	}
	PlayerDb.update({ name: updateName }, { where: { id } });
	const updatedPlayer = await PlayerDb.findByPk(id);
	return res.status(200).send(updatedPlayer);
};

// delete player rolls
export const deletePlayerRolls = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const player = await PlayerDb.findByPk(id);
	if (!player) {
		return res.status(404).send('Player not found!');
	}
	await Roll.destroy({ where: { playerId: id } });
	return res.status(200).send('Player rolls deleted!');
};

// get Win Percentage
export const getWinPercentage = async (req: Request, _res: Response) => {
	const id = Number(req.params.id);
	const player = await PlayerDb.findByPk(id);
	const rolls = await Roll.findAll({ where: { playerId: id } });
	const wins = rolls.filter((roll: any) => roll.result === 'You win!');
	const winPercentage = wins.length / rolls.length * 100;
	PlayerDb.update({ winPercentage }, { where: { id } });
	const updatedPlayer = await PlayerDb.findByPk(id);
};

// get ranking
export const getRanking = async (_req: Request, res: Response) => {
	const players = await PlayerDb.findAll({ order: [ [ 'winPercentage', 'DESC' ] ] });

	return res.status(200).send(players);
};

// get losing player
export const getLosingPlayer = async (_req: Request, res: Response) => {
	const players = await PlayerDb.findAll({ order: [ [ 'winPercentage', 'ASC' ] ] });

	return res.status(200).send(players[0]);
};

// get winning player
export const getWinningPlayer = async (_req: Request, res: Response) => {
	const players = await PlayerDb.findAll({ order: [ [ 'winPercentage', 'DESC' ] ] });

	return res.status(200).send(players[0]);
};
