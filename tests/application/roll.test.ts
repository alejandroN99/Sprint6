import { roll, total, playGame } from "../../src/application/rollService";

describe('roll', () => {

    test('should return a number between 1 and 6', () => {

       const result = roll();

        expect(result).toBeGreaterThan(0)
        expect(result).toBeLessThan(7);
        expect(Number.isInteger(result)).toBe(true);
    });
});

describe('total', () => {

    test('should return the sum of two numbers', () => {
        const num1 = 3;
        const num2 = 3;

      expect(total(num1,num2)).toBe(6);
    });
});

describe('playGame', () => {
    test(`should return 'win' or 'lose'`, () => {
        expect(playGame()).toMatch(/win|lose/);
    });
});