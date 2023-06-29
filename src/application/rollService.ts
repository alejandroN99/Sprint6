import { IRoll } from "../domain/utilities/IRoll";

export const roll = () => {
	return Math.floor(Math.random() * 6) + 1;
};

export const calcTotal = (roll1: number, roll2: number) => {
	return roll1 + roll2;
};

export const playGame = (): IRoll => {
	const roll1 = roll();
	const roll2 = roll();
	const total = calcTotal(roll1, roll2);
	const result = total === 7 ? 'You win!' : 'You lose!';

	const rollResult: IRoll = {
		roll1,
		roll2,
		total,
		result
	};

	return rollResult;
};
