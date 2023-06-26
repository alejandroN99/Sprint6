import { Player } from '../../src/domain/player';

describe('class Player', () => {
	test('then created new instance of class Player, should return an object with the name, date and id to validate the constructor', () => {
		const result = new Player('Alejandro');
		const expectedResult = {
			date: '',
			id: 0,
			name: 'Alejandro',
			rolls: [],
			winPercentage: 0
		};

		expect(result).toEqual(expectedResult);
	});
});
