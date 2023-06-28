import { Player } from '../domain/player';
import { playGame } from './rollService';
import { find } from '../domain/utilities/find';
import { Request,Response } from 'express';
import * as dataJson from '../../src/dataJson.json'
import { IRoll } from '../domain/utilities/IRoll';

export const players: Player[] = [];

export const createPlayer = (req: Request,res: Response) => {
	const player: Player = new Player(req.params.name);
	dataJson.players.push(player);
	
	res.status(200).send(`Player ${req.params.name} created successfully!`);
};

export const updatePlayerName = (req: Request,res: Response) => {
	const id = Number(req.params.id);
	const findPlayer = find(dataJson.players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		findPlayer.name = req.params.updateName;
		return res.status(200).send(`Player name is now ${req.params.updateName}`);
	}
};

export const getAllPlayers = (req: Request,res: Response): Object => {
	const data: Object[] = [];
	dataJson.players.forEach((player: Player) =>{
		data.push(player.name);
		data.push(player.winPercentage);
	})
	return res.status(200).send(data);
};

export const playerRoll = (req: Request,res: Response): string | object => {
	const id = Number(req.params.id);
	const findPlayer: Player | undefined = find(dataJson.players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		const result: IRoll = playGame();
		findPlayer.rolls.push(result);
		return res.status(200).send(result);
	}
};

export const deletePlayerRolls = (req: Request,res: Response): string | object => {
	const id = Number(req.params.id);
	const findPlayer: Player | undefined = find(players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		findPlayer.rolls = [];
		return res.status(200).send('Player rolls deleted successfully!');
	}
};

export const getAllPlayerRolls = (req: Request,res: Response): string | object => {
	const id = Number(req.params.id);
	const findPlayer: Player | undefined = find(players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		return res.status(200).send(findPlayer.rolls);
	}
};

export const getWinPercentage = (req: Request,res: Response): object | number => {
	const id = Number(req.params.id);
	const findPlayer: Player | undefined = find(players, 'id', id);
	if (!findPlayer) {
		return res.status(404).send('Player not found!');
	}
	else {
		const wins: object[] = findPlayer.rolls.filter((roll: any) => roll.result === 'You win!');
		const winPercentage: number = wins.length / findPlayer.rolls.length * 100;
		findPlayer.winPercentage = winPercentage;
		return res.status(200).send(`${findPlayer.name} has win percentage: ${winPercentage}`);
	}
};

export const getRanking = (_req: Request,res: Response) => {
	if(dataJson.players === undefined){
		return res.status(404).send('No players data found');

	}else{
		
		const ranking: Player[] = dataJson.players.sort((a: Player, b: Player) => b.winPercentage - a.winPercentage);
		const sumWinPercentage: number = players.reduce((acc: number, player: Player) => acc + player.winPercentage, 0);
		const average: number = sumWinPercentage / players.length;
	
	
		return res.status(200).send({ ranking, "averageAllPlayers": average });
	}
};

export const getLosingPlayer = (_req: Request,res: Response) => {
	if(dataJson.players === undefined){
		return res.status(404).send('No players data found');

	}else{
	const ranking: Player[] = dataJson.players.sort((a: Player, b: Player) => b.winPercentage - a.winPercentage);
	const loser = ranking[ranking.length - 1];

	console.log(`Loser: ${loser}`);
	return res.status(200).send(loser);
	}
};

export const getWinningPlayer = (_req: Request,res: Response) => {
	if(dataJson.players === undefined){
		return res.status(404).send('No players data found');

	}else{
	const ranking: Player[] = dataJson.players.sort((a: Player, b: Player) => b.winPercentage - a.winPercentage);
	const loser = ranking[0];

	console.log(`Loser: ${loser}`);
	return res.status(200).send(loser);
	}
};
