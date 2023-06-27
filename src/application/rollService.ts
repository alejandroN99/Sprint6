export const roll = () => {
	return Math.floor(Math.random() * 6) + 1;
};

export const total = (roll1: number, roll2: number): number => {
	return roll1 + roll2;
};

export const playGame = (): object => {
	const roll1 = roll();
	const roll2 = roll();
	const totalRoll = total(roll1, roll2);
	const result = totalRoll === 7 ? 'You win!' : 'You lose!';

	const rollResult = {
		roll1,
		roll2,
		totalRoll,
		result
	};

	return rollResult;
};
