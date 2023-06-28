export const roll = (): number => {
	return Math.floor(Math.random() * 6) + 1;
};

export const total = (roll1: number, roll2: number): number => {
	return roll1 + roll2;
};

export const playGame = (): object => {
	const roll1: number = roll();
	const roll2: number = roll();
	const totalRoll: number = total(roll1, roll2);
	const result: string = totalRoll === 7 ? 'You win!' : 'You lose!';

	const rollResult: object = {
		roll1,
		roll2,
		totalRoll,
		result
	};

	return rollResult;
};
