import {
	createPlayer,
	updatePlayerName,
	players,
	getAllPlayers,
	playerRoll,
	deletePlayerRolls,
	getAllPlayerRolls,
	getWinPercentage,
	getRanking
} from '../../src/application/controller';
import { Player } from '../../src/domain/player';

describe('Controller tests', () => {

	describe('Function createdPlayer', () => {
		test('', () => {
			const playerName: string = 'Juan';
			const result: string = createPlayer(playerName);
			const expectedResult: string = `Player ${playerName} created successfully!`;

			expect(result).toBe(expectedResult);
		});
	});

	describe('Function updatePlayerName', () => {
		test('', () => {
			const newPlayerName: string = 'Pepe';
			const result: string = updatePlayerName(0, newPlayerName);
			const expectedResult: string = `Player name is now ${newPlayerName}`;

			expect(result).toBe(expectedResult);
		});
	});

	describe('Function getAllPlayers', () => {
		test('should get all players', () => {

			const result: Player[] = getAllPlayers();
			const expectedResult: Player[] = players;

			expect(result).toEqual(expectedResult);
		});
	});

	describe('Function playerRoll', () => {
		test('should play the game', () => {

			const result: string | object = playerRoll(0);
			const expectedResult: object = players[0].rolls[0];

			expect(result).toEqual(expectedResult);
		});
	});

	describe('Function getAllPlayerRolls', () => {
		test('should get all rolls from a player', () => {

			const result: string | object = getAllPlayerRolls(0);
			const expectedResult: object[] = players[0].rolls;

			expect(result).toEqual(expectedResult);
		});
	});

	describe('Get winPercentage', () => {
		test('should return the win percentage of a player', () => {

			const result: string | number = getWinPercentage(0);
			const expectedResult: number = players[0].winPercentage;

			expect(result).toBe(expectedResult);
		});
	});

	describe('Function deletePlayerRolls', () => {
		test('should delete all rolls from a player', () => {

			const result: string | object = deletePlayerRolls(0);
			const expectedResult: never[] = players[0].rolls = [];


			expect(result).toEqual(expectedResult);
		});
	});

	describe('', () => {
		test('', () => {
			const result: object = getRanking(players);
			const expectedResult: object = {
				"averageAllPlayers": 0,
				"ranking": [
					{
						"date": "",
						"id": 0,
						"name": "Pepe",
						"rolls": [],
						"winPercentage": 0,
					},
				]
			};

			expect(result).toEqual(expectedResult);
		})
	});
});