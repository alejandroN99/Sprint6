import {
	createdPlayer,
	updatePlayerName,
	players,
	getAllPlayers,
	playerRoll,
	deletePlayerRolls,
	getAllPlayerRolls,
	getWinPercentage
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
		const result = updatePlayerName('Juan', 'Pepe');
		const expectedResult = 'Update player name successfully!';

		expect(result).toBe(expectedResult);
	});
});

describe('Function getAllPlayers', () => {
	test('should get all players', () => {
		expect(getAllPlayers()).toEqual(players);
	});
});

describe('Function playerRoll', () => {
	test('should play the game', () => {
		expect(playerRoll(0)).toEqual(players[0].rolls[0]);
	});
});

describe('Function getAllPlayerRolls', () => {
	test('should get all rolls from a player', () => {
		expect(getAllPlayerRolls(0)).toEqual(players[0].rolls);
	});
});

describe('Get winPercentage', () => {
	test('should return the win percentage of a player', () => {
		expect(getWinPercentage(0)).toBe(players[0].winPercentage);
	});
});

describe('Function deletePlayerRolls', () => {
	test('should delete all rolls from a player', () => {
		expect(deletePlayerRolls(0)).toEqual((players[0].rolls = []));
	});
});
