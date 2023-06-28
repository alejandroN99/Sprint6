import { roll, total, playGame } from '../../src/application/rollService';

describe('Roll tests', () => {
	describe('roll', () => {
		test('should return a number between 1 and 6', () => {
			const result: number = roll();

			expect(result).toBeGreaterThan(0);
			expect(result).toBeLessThan(7);
			expect(Number.isInteger(result)).toBe(true);
		});
	});

	describe('total', () => {
		test('should return the sum of two numbers', () => {
			const num1: number = 3;
			const num2: number = 3;

			expect(total(num1, num2)).toBe(6);
		});
	});

	describe('playGame', () => {
		test(`should return an object with game properties`, () => {
			expect(playGame()).toHaveProperty('roll1');
			expect(playGame()).toHaveProperty('roll2');
			expect(playGame()).toHaveProperty('totalRoll');
			expect(playGame()).toHaveProperty('result');
		});
	});
});
