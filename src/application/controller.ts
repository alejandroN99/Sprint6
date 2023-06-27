import { Player } from '../domain/player';
import { playGame } from './rollService';
import { find } from '../domain/utilities/find';

export const players: Player[] = [];

export const createPlayer = (name: string) => {
	const player = new Player(name);
	players.push(player);
	return `Player ${name} created successfully!`;
};

export const updatePlayerName = (id: number, updateName: string) => {
	const findPlayer = find(players, 'id', id);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		findPlayer.name = updateName;
		return `Player name is now ${updateName}`;
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