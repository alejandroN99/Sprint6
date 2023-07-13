import { IRollMongo } from "../domain/IRollMongo";

export const roll = () => {
	return Math.floor(Math.random() * 6) + 1;
};

export const calcTotal = (roll1: number, roll2: number) => {
	return roll1 + roll2;
};

export const playGame = (): IRollMongo => {
	const roll1: number = roll();
	const roll2: number = roll();
	const total: number = calcTotal(roll1, roll2);
	const result: string = total === 7 ? 'You win!' : 'You lose!';

	const rollResult: IRollMongo = {
		roll1,
		roll2,
		total,
		result
	};

	return rollResult;
};
