import { Player } from '../domain/player';
import { playGame } from './rollService';
import { find } from '../infrastructure/utilities/find';

export const players: Player[] = [];

export const createdPlayer = (name: string) => {
	const player = new Player(name);
	players.push(player);
	return 'Player created successfully!';
};

export const updatePlayerName = (name: string, updateName: string) => {
	const findPlayer = find(players, 'name', name);
	if (!findPlayer) {
		return 'Player not found!';
	}
	else {
		findPlayer.name = updateName;
		console.log(players);
		return 'Update player name successfully!';
	}
};

export const getAllPlayers = () => {
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
