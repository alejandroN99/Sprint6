import { Player } from '../domain/player';
import { playGame } from './rollService';
import { find } from '../domain/utilities/find';
import { Request, Response } from 'express';
import * as dataJson from '../../src/dataJson.json'

export const players: Player[] = [];

export const createPlayer = (req: Request, res: Response) => {
	const player: Player = new Player(req.params.name);

	if (players.includes(player) && (req.params.name !== "ANÒNIM")) {
		res.send(`Player ${req.params.name} already exists!`)
	}
	else {
		dataJson.players.push(player);
		res.send(`Player ${req.params.name} created successfully!`);
	}
};

export const updatePlayerName = (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const findPlayer = find(dataJson.players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		findPlayer.name = req.params.updateName;
		return `Player name is now ${req.params.updateName}`;
	}
};

export const getAllPlayers = (): Player[] => {
	return players;
};

export const playerRoll = (id: number): string | object => {
	const findPlayer: Player | undefined = find(players, 'id', id);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		const result: object = playGame();
		findPlayer.rolls.push(result);
		return result;
	}
};

export const deletePlayerRolls = (id: number): string | object[] => {
	const findPlayer: Player | undefined = find(players, 'id', id);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		findPlayer.rolls = [];
		return findPlayer.rolls;
	}
};

export const getAllPlayerRolls = (id: number): string | object[] => {
	const findPlayer: Player | undefined = find(players, 'id', id);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		return findPlayer.rolls;
	}
};

export const getWinPercentage = (id: number): string | number => {
	const findPlayer: Player | undefined = find(players, 'id', id);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		const wins: object[] = findPlayer.rolls.filter((roll: any) => roll.result === 'You win!');
		const winPercentage: number = wins.length / findPlayer.rolls.length * 100;
		findPlayer.winPercentage = winPercentage;
		return winPercentage;
	}
};

export const getRanking = (array: Player[]) => {
	const ranking: Player[] = array.sort((a: Player, b: Player) => b.winPercentage - a.winPercentage);
	const sumWinPercentage: number = players.reduce((acc: number, player: Player) => acc + player.winPercentage, 0);
	const average: number = sumWinPercentage / players.length;


	return { ranking, "averageAllPlayers": average };
};

export const getLosingPlayer = (array: Player[]) => {
	const ranking = getRanking(array).ranking;
	const loser = ranking[ranking.length - 1];

	console.log(`Loser: ${loser}`);
	return loser;
};

export const getWinningPlayer = (array: Player[]) => {
	const ranking = getRanking(array).ranking;
	const winner = ranking[0];

	return winner;
};
