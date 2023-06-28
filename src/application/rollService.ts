import { IRoll } from "../domain/utilities/IRoll";

export const roll = (): number => {
	return Math.floor(Math.random() * 6) + 1;
};

export const calcTotal = (roll1: number, roll2: number): number => {
	return roll1 + roll2;
};

export const playGame = (): IRoll => {
	const roll1: number = roll();
	const roll2: number = roll();
	const total: number = calcTotal(roll1, roll2);
	const result: string = total === 7 ? 'You win!' : 'You lose!';

	const rollResult: IRoll = {
		roll1,
		roll2,
		total,
		result
	};

	return rollResult;
};
