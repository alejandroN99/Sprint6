import { Player } from '../domain/player';
import { playGame } from './rollService';
import { Request, Response } from 'express';
import { IRollInstance, PlayerDb, PlayerInstance, Roll } from '../domain/playerSequelize';
import { IRoll } from '../domain/utilities/IRoll';

export const getAllPlayers = async (_req: Request, res: Response) => {
	const players = await PlayerDb.findAll();

	if (!players) {
		return res.status(404).send('Players not found!');
	}

	return res.status(200).send(players);
};

// create player
export const createPlayer = async (req: Request, res: Response) => {
	let { name } = req.params;

	if (name === undefined) {
		name = 'ANÒNIM';
	}
	else if (await PlayerDb.findOne({ where: { name } })) {
		return res.status(409).send('Player name already exists!');
	}

	const player = new Player(name);
	await PlayerDb.create(player as PlayerInstance);

	return res.status(201).send(player);
};

// player roll
export const playerRoll = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const player= await PlayerDb.findByPk(id);
	if (!player) {
		return res.status(404).send('Player not found!');
	}
	const roll = playGame(id);
	await Roll.create(roll as IRollInstance);

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
	PlayerDb.update({ winPercentage: 0 }, { where: { id } });
	return res.status(200).send('Player rolls deleted!');
};

// get Win Percentage
export const getWinPercentage = async (req: Request, _res: Response) => {
	const id = Number(req.params.id);

	const rolls = await Roll.findAll({ where: { playerId: id } });
	const wins = rolls.filter((roll: any) => roll.result === 'You win!');
	const winPercentage = Number((wins.length / rolls.length * 100).toFixed(2));

	PlayerDb.update({ winPercentage }, { where: { id } });
};

// get average win percentage from all players
export const getAverageWinPercentage = async () => {
	const players= await PlayerDb.findAll();

	if (players.length === 0 || !players) {
		return 0;
	}

	const winPercentages: number[] = players.map((player: any) => player.winPercentage);
	const averageWinPercentage = (winPercentages.reduce((a: number, b: number) => a + b) /
		winPercentages.length).toFixed(2);

	return Number(averageWinPercentage);
};

// get ranking
export const getRanking = async (_req: Request, res: Response) => {
	const players= await PlayerDb.findAll({ order: [ [ 'winPercentage', 'DESC' ] ] });

	const averageWinPercentage = await getAverageWinPercentage();

	const result = { players, averageWinPercentage };

	return res.status(200).send(result);
};

// get losing player
export const getLosingPlayer = async (_req: Request, res: Response) => {
	const players= await PlayerDb.findAll({ order: [ [ 'winPercentage', 'ASC' ] ] });

	return res.status(200).send(players[0]);
};

// get winning player
export const getWinningPlayer = async (_req: Request, res: Response) => {
	const players= await PlayerDb.findAll({ order: [ [ 'winPercentage', 'DESC' ] ] });

	return res.status(200).send(players[0]);
};


