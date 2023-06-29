import { Player } from '../domain/player';
import { playGame } from './rollService';
import { find } from '../domain/utilities/find';
import { Request, Response } from 'express';
import * as dataJson from '../../src/dataJson.json';
import { IRoll } from '../domain/utilities/IRoll';

export const players: Player[] = [];

export const createPlayer = (req: Request, res: Response) => {
	let name: string = req.params.name;
	if (name === undefined) {
		name = 'ANÒNIM';
	}

	console.log(`Player name: ${name}`);

	const player = new Player(name);

	if (dataJson.players.includes(player) && name !== 'ANÒNIM') {
		res.send(`Player ${name} already exists!`);
	}
	else {
		dataJson.players.push(player);
		res.status(200).send(`Player ${name} created successfully!`);
	}
};

export const updatePlayerName = (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const findPlayer = find(dataJson.players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else if (
		find(dataJson.players, 'name', req.params.updateName) &&
		req.params.updateName !== 'ANÒNIM'
	) {
		return res.status(409).send('Player name already exists!');
	}
	else {
		findPlayer.name = req.params.updateName;
		return res.status(200).send(`Player name is now ${req.params.updateName}`);
	}
};

export const getAllPlayers = (_req: Request, res: Response): Object => {
	const data: Object[] = [];
	dataJson.players.forEach((player) => {
		data.push(player.name);
		data.push(player.winPercentage);
	});
	return res.status(200).send(data);
};

export const playerRoll = (req: Request, res: Response): string | object => {
	const id = Number(req.params.id);
	const findPlayer = find(dataJson.players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		const result: IRoll = playGame();
		findPlayer.rolls.push(result);
		return res.status(200).send(result);
	}
};

export const deletePlayerRolls = (req: Request, res: Response): string | object => {
	const id = Number(req.params.id);
	const findPlayer = find(dataJson.players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		findPlayer.rolls = [];
		return res.status(200).send('Player rolls deleted successfully!');
	}
};

export const getAllPlayerRolls = (req: Request, res: Response): string | object => {
	const id = Number(req.params.id);
	const findPlayer = find(dataJson.players, 'id', id);

	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		return res.status(200).send(findPlayer.rolls);
	}
};

export const getWinPercentage = (req: Request, res: Response): object | number => {
	const id = Number(req.params.id);
	const findPlayer = find(dataJson.players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		const wins = findPlayer.rolls.filter((roll) => roll.result === 'You win!');
		const winPercentage = wins.length / findPlayer.rolls.length * 100;
		findPlayer.winPercentage = winPercentage;
		return res.status(200).send(`${findPlayer.name} has win percentage: ${winPercentage}`);
	}
};

export const getRanking = (_req: Request, res: Response) => {
	if (dataJson.players === undefined) {
		return res.status(404).send('No players data found');
	}
	else {
		const ranking = dataJson.players.sort(
			(a, b) => b.winPercentage - a.winPercentage
		);
		const sumWinPercentage = players.reduce(
			(acc, player) => acc + player.winPercentage,
			0
		);
		const average = sumWinPercentage / players.length;

		return res.status(200).send({ ranking, averageAllPlayers: average });
	}
};

export const getLosingPlayer = (_req: Request, res: Response) => {
	if (dataJson.players === undefined) {
		return res.status(404).send('No players data found');
	}
	else {
		const ranking = dataJson.players.sort(
			(a, b) => b.winPercentage - a.winPercentage
		);
		const loser = ranking[ranking.length - 1];

		return res.status(200).send(loser);
	}
};

export const getWinningPlayer = (_req: Request, res: Response) => {
	if (dataJson.players === undefined) {
		return res.status(404).send('No players data found');
	}
	else {
		const ranking = dataJson.players.sort(
			(a, b) => b.winPercentage - a.winPercentage
		);
		const loser = ranking[0];

		return res.status(200).send(loser);
	}
};
