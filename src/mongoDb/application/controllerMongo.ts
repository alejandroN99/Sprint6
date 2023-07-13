import { playerModel } from "../domain/schemaMongo";
import { Player } from '../domain/playerMongo';
import { playGame } from './rollServiceMongo';
import { Request, Response } from 'express';



export const getAllPlayers = async (_req: Request, res: Response) => {
    const players = await playerModel.find();

	if (!players) {
		return res.status(404).send('Players not found!');
	}

	return res.status(200).send(players);
};

export const createPlayer = async (req: Request, res: Response) => {
    let name: string | undefined= req.params.name;
    if(name === undefined) {
        name = 'ANOMIM!'
    }else if (await playerModel.findOne({"name": name}).exec()) {
        return res.status(409).send('Player name already exists!');
    }
    const newPlayer = new Player(name);
    const playerDb = new playerModel(newPlayer);
    
    const playerSaved = await playerDb.save();

    return res.status(201).json(playerSaved);
};

export const playerRoll = async (req: Request, res: Response) => {
	const id = req.params.id;
	const player = await playerModel.findById(id);
	if (!player) {
		return res.status(404).send('Player not found!');
	}
	const roll = playGame();
	player.rolls.push(roll);
    player.save();

	getWinPercentage(req, res);

	return res.status(200).send(roll);
};

export const getWinPercentage = async (req: Request, _res: Response) => {
	const id = req.params.id;
	const player: any = await playerModel.findById(id);

	const wins = player.rolls.filter((roll: any) => roll.result === 'You win!');
	const winPercentage = (wins.length / player.rolls.length * 100).toFixed(2);

	player.winPercentage = winPercentage;
    player.save();
};

export const updatePlayerName = async (req: Request, res: Response) => {
	const id = req.params.id;
	const player = await playerModel.findById(id);
	if (!player) {
		return res.status(404).send('Player not found!');
	}
	const { updateName } = req.params;
	if (await playerModel.findOne({"name": updateName}).exec()) {
		return res.status(409).send('Player name already exists!');
	}
    player.name = updateName;
    await player.save();

	return res.status(200).send(player);
};

// get all player rolls
export const getAllPlayerRolls = async (req: Request, res: Response) => {
	const { id } = req.params;
	const player = await playerModel.findById(id);
	if (!player) {
		return res.status(404).send('Player not found!');
	}
	const rolls = player.rolls;

	return res.status(200).send(rolls);
};


export const deletePlayerRolls = async (req: Request, res: Response) => {
    const id = req.params.id;
    const player = await playerModel.findById(id);

    if(!player) {
        return res.status(404).send('Player not found!');
    };

    player.rolls = [];
    player.winPercentage = 0;
    player.save();

    return res.status(200).send('Player rolls deleted!');  
};

export const getAverageWinPercentage = async () => {
	const players = await playerModel.find();

	const winPercentages: number[] = players.map((player: any) => player.winPercentage);
	const averageWinPercentage = (winPercentages.reduce((a: number, b: number) => a + b) /
		winPercentages.length).toFixed(2);

	return Number(averageWinPercentage);
};

// get ranking
export const getRanking = async (_req: Request, res: Response) => {
	const players = await playerModel.find().sort({winPercentage:-1});

	const averageWinPercentage = await getAverageWinPercentage();

	const playersAndAverage = { averageWinPercentage, players };

	return res.status(200).send(playersAndAverage);
};

// get losing player
export const getLosingPlayer = async (_req: Request, res: Response) => {
	const players = await playerModel.find().sort({ winPercentage: 1 });

	return res.status(200).send(players[0]);
};

// get winning player
export const getWinningPlayer = async (_req: Request, res: Response) => {
	const players = await playerModel.find().sort({ winPercentage: -1 });

	return res.status(200).send(players[0]);
};
