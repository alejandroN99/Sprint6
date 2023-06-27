import {
	createdPlayer,
	updatePlayerName,
	players,
	getAllPlayers,
	playerRoll,
	deletePlayerRolls,
	getAllPlayerRolls,
	getWinPercentage,
	getRanking
} from '../../src/application/controller';


describe('Function createdPlayer', () => {
	test('', () => {
		const result = createdPlayer('Juan');
		const expectedResult = 'Player created successfully!';

		expect(result).toBe(expectedResult);
	});
});

describe('Function updatePlayerName', () => {
	test('', () => {
		const result: string = updatePlayerName('Juan', 'Pepe');
		const expectedResult = 'Update player name successfully!';

		expect(result).toBe(expectedResult);
	});
});

describe('Function getAllPlayers', () => {
	test('should get all players', () => {

		const result = getAllPlayers();
		const expectedResult = players;

		expect(result).toEqual(expectedResult);
	});
});

describe('Function playerRoll', () => {
	test('should play the game', () => {

		const result = playerRoll(0);
		const expectedResult = players[0].rolls[0];
		
		expect(result).toEqual(expectedResult);
	});
});

describe('Function getAllPlayerRolls', () => {
	test('should get all rolls from a player', () => {

		const result = getAllPlayerRolls(0);
		const expectedResult = players[0].rolls;

		expect(result).toEqual(expectedResult);
	});
});

describe('Get winPercentage', () => {
	test('should return the win percentage of a player', () => {

		const result = getWinPercentage(0);
		const expectedResult = players[0].winPercentage;

		expect(result).toBe(expectedResult);
	});
});

describe('Function deletePlayerRolls', () => {
	test('should delete all rolls from a player', () => {

		const result = deletePlayerRolls(0);
		const expectedResult = players[0].rolls = [];


		expect(result).toEqual(expectedResult);
	});
});

describe('', () => {
	test('', () => {
		const result = getRanking(players);
		const expectedResult = {
		"averageAllPlayers": 0,
		"ranking":  [
			      {
			     	"date": "",
		       		"id": 0,
			     	"name": "Pepe",
			      	"rolls":[],
			      	"winPercentage": 0,
				},
			   ]
			};

		expect(result).toEqual(expectedResult);
	})
});

