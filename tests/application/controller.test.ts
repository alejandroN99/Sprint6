import { createdPlayer, updatePlayerName } from "../../src/application/controller";
import { Player } from "../../src/domain/player";


describe('Function createdPlayer', () => {
    test('', () => {
        const result = createdPlayer('Juan');
        const expectedResult = 'Player created successfully!';

        expect(result).toBe(expectedResult);
    });
});

describe('Function updatePlayerName', () => {
    test('', () => {
        
        const result = updatePlayerName('Juan','Pepe');
        const expectedResult = 'Update player name successfully!';

        expect(result).toBe(expectedResult);
    });
});
