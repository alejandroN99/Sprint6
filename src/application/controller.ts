import { Player } from '../domain/player';
import { playGame } from './rollService';
import { find } from '../domain/utilities/find';
import { Request,Response } from 'express';
import * as dataJson from '../../src/dataJson.json'

export const players: Player[] = [];

export const createPlayer = (req: Request,res: Response) => {
	const player: Player = new Player(req.params.name);
	dataJson.players.push(player);
	
	res.send(`Player ${req.params.name} created successfully!`);
};

export const updatePlayerName = (req: Request,res: Response) => {
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

export const playerRoll = (id: number) => {
	const findPlayer = find(players, 'id', id);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		const result = playGame();
		findPlayer.rolls.push(result);
		return result;
	}
};

export const deletePlayerRolls = (id: number) => {
	const findPlayer = find(players, 'id', id);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		findPlayer.rolls = [];
		return findPlayer.rolls;
	}
};

export const getAllPlayerRolls = (id: number) => {
	const findPlayer = find(players, 'id', id);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		return findPlayer.rolls;
	}
};

export const getWinPercentage = (id: number) => {
	const findPlayer = find(players, 'id', id);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		const wins = findPlayer.rolls.filter((roll: any) => roll.result === 'You win!');
		const winPercentage = wins.length / findPlayer.rolls.length * 100;
		findPlayer.winPercentage = winPercentage;
		return winPercentage;
	}
};

export const getRanking = (array: Player[]) => {
	const ranking = array.sort((a, b) => b.winPercentage - a.winPercentage);
	const sumWinPercentage = players.reduce((acc, player) => acc + player.winPercentage, 0);
	const average = sumWinPercentage / players.length;


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
